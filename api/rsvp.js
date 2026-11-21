const { createSign } = require("node:crypto");

function base64url(value) {
  return Buffer.from(value).toString("base64")
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!email || !privateKey) throw new Error("Google Sheets belum dikonfigurasi di Vercel.");

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(privateKey, "base64url")}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error_description || "Gagal autentikasi ke Google.");
  return result.access_token;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, attendance, guestCount, message = "" } = req.body || {};
  if (typeof name !== "string" || !name.trim() || name.length > 80) {
    return res.status(400).json({ error: "Nama wajib diisi (maksimal 80 karakter)." });
  }
  if (!["Hadir", "Tidak hadir"].includes(attendance)) {
    return res.status(400).json({ error: "Pilihan kehadiran tidak valid." });
  }
  if (typeof message !== "string" || message.length > 300) {
    return res.status(400).json({ error: "Pesan maksimal 300 karakter." });
  }
  const guests = attendance === "Hadir" ? Number(guestCount) : 0;
  if (!Number.isInteger(guests) || guests < 0 || guests > 5) {
    return res.status(400).json({ error: "Jumlah tamu tidak valid." });
  }

  try {
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (!spreadsheetId) throw new Error("SPREADSHEET_ID belum diatur.");
    const token = await getAccessToken();
    const values = [[new Date().toISOString(), name.trim(), attendance, guests, message.trim()]];
    const range = encodeURIComponent("'RSVP'!A:E");
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ values })
    });
    const result = await response.json();
    if (!response.ok) {
      console.error("Sheets API error:", result);
      throw new Error("Gagal menyimpan RSVP ke Google Sheets. Periksa izin spreadsheet dan nama tab RSVP.");
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("RSVP error:", error);
    return res.status(500).json({ error: error.message || "Terjadi kesalahan server." });
  }
}
