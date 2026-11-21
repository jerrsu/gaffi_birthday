(() => {
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("rsvp-status");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async event => {
    event.preventDefault();
    status.classList.remove("error");
    status.textContent = "";

    const data = {
      name: form.elements.name.value.trim(),
      attendance: form.elements.attendance.value,
      guestCount: Number(form.elements.guestCount.value),
      message: form.elements.message.value.trim()
    };

    if (!data.name || !data.attendance) {
      status.textContent = "Mohon lengkapi nama dan konfirmasi kehadiran.";
      status.classList.add("error");
      return;
    }
    if (data.attendance === "Tidak hadir") data.guestCount = 0;

    submitButton.disabled = true;
    submitButton.textContent = "Mengirim...";
    try {
      const response = await fetch(window.GAFFI_CONFIG.rsvpEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Konfirmasi belum berhasil dikirim.");
      status.textContent = "Yeay! Konfirmasi kamu berhasil dikirim. Terima kasih! 🚀";
      form.reset();
    } catch (error) {
      status.textContent = error.message || "Terjadi kendala. Silakan coba lagi.";
      status.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = "<span>🛸</span> Kirim Konfirmasi";
    }
  });
})();
