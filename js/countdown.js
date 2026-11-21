(() => {
  const target = new Date(window.GAFFI_CONFIG.eventDate).getTime();
  const ids = ["days", "hours", "minutes", "seconds"];
  const pad = value => String(value).padStart(2, "0");

  function updateCountdown() {
    const remaining = target - Date.now();
    if (remaining <= 0) {
      ids.forEach(id => { document.getElementById(id).textContent = "00"; });
      document.getElementById("countdown-message").textContent =
        remaining > -86400000 ? "Hari ini waktunya berpesta! 🎉" : "Terima kasih sudah merayakan bersama GAFFI!";
      return;
    }
    const values = [
      Math.floor(remaining / 86400000),
      Math.floor((remaining % 86400000) / 3600000),
      Math.floor((remaining % 3600000) / 60000),
      Math.floor((remaining % 60000) / 1000)
    ];
    ids.forEach((id, index) => { document.getElementById(id).textContent = pad(values[index]); });
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
