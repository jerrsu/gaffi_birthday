# GAFFI — Space Adventure Birthday Invitation

Website undangan ulang tahun GAFFI ke-5. Dibuat dengan HTML, CSS, dan Vanilla JavaScript.

## Fitur
- Countdown ke 5 Desember 2026, pukul 10.00 WIB.
- Foto asli GAFFI (file disalin tanpa mengedit gambar).
- RSVP tersimpan ke Google Sheets melalui Vercel Function.
- Guestbook disimpan lokal pada browser menggunakan `localStorage`.
- Responsive layout, tanpa framework dan tanpa build step.

## Menjalankan lokal
Untuk preview halaman statis, buka `index.html` di browser. Agar endpoint RSVP bisa berjalan, deploy ke Vercel atau jalankan Vercel CLI (`vercel dev`).

## Setup Google Sheets untuk RSVP
Spreadsheet ID sudah ditetapkan di environment Vercel, bukan di frontend.

1. Buat Google Cloud project dan aktifkan **Google Sheets API**.
2. Buat Service Account dan buat JSON key.
3. Bagikan spreadsheet kepada email Service Account sebagai **Editor**.
4. Pastikan ada worksheet bernama persis `RSVP`.
5. Buat header pada baris pertama, misalnya:
   `Timestamp | Nama | Kehadiran | Jumlah Orang | Pesan`
6. Di Vercel Project → Settings → Environment Variables, tambahkan:
   - `SPREADSHEET_ID` = `1y3PYrfNDWktthlBZ8o76f4HpgfY6pLmjH4GHKJQZtmc`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = email service account
   - `GOOGLE_PRIVATE_KEY` = nilai `private_key` dari JSON key (baris baru boleh disimpan sebagai `\n`)
7. Redeploy project setelah mengatur environment variables.

**Jangan** memasukkan private key ke `js/config.js`, HTML, atau repository Git.

## Guestbook
Guestbook menggunakan `localStorage` pada browser masing-masing. Data tidak masuk ke Google Sheets dan tidak tersinkron antar pengunjung. Tombol "Hapus ucapan lokal" menghapus data pada browser tersebut.

## Deploy ke Vercel
1. Upload folder project ke repository GitHub.
2. Import repository di Vercel.
3. Framework Preset: **Other**.
4. Build Command: kosongkan / None.
5. Output Directory: `.`.
6. Tambahkan environment variables untuk Google Sheets seperti di atas.
7. Deploy.

## Catatan
- RSVP membutuhkan Vercel Function dan kredensial Google Service Account.
- ID spreadsheet bukan rahasia, tetapi private key service account adalah rahasia.
- Alamat Maps saat ini menggunakan pencarian alamat. Pastikan pin yang benar sebelum membagikan undangan.
- Ganti foto tambahan pada folder `assets/images` dan perbarui HTML bila ingin menambah galeri.
# gaffi_birthday
