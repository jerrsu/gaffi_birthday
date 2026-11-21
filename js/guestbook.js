(() => {
  const form = document.getElementById("guestbook-form");
  const nameInput = document.getElementById("guestbook-name");
  const messageInput = document.getElementById("guestbook-message");
  const list = document.getElementById("guestbook-list");
  const count = document.getElementById("guestbook-count");
  const status = document.getElementById("guestbook-status");
  const clearButton = document.getElementById("clear-guestbook");
  const key = window.GAFFI_CONFIG.guestbookStorageKey;

  function readEntries() {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function render() {
    const entries = readEntries();
    count.textContent = `(${entries.length})`;
    list.replaceChildren();

    if (!entries.length) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Belum ada ucapan. Jadilah yang pertama! ✨";
      list.append(empty);
      return;
    }

    entries.forEach(entry => {
      const card = document.createElement("article");
      card.className = "guestbook-entry";
      const name = document.createElement("strong");
      name.textContent = entry.name;
      const message = document.createElement("p");
      message.textContent = entry.message;
      const time = document.createElement("time");
      time.dateTime = entry.createdAt;
      time.textContent = new Date(entry.createdAt).toLocaleString("id-ID", {
        dateStyle: "medium", timeStyle: "short"
      });
      card.append(name, message, time);
      list.append(card);
    });
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (!name || !message) {
      status.textContent = "Nama dan ucapan wajib diisi.";
      status.classList.add("error");
      return;
    }

    const entries = readEntries();
    entries.unshift({ name, message, createdAt: new Date().toISOString() });
    try {
      localStorage.setItem(key, JSON.stringify(entries.slice(0, window.GAFFI_CONFIG.maxGuestbookEntries)));
      status.classList.remove("error");
      status.textContent = "Ucapan tersimpan di browser ini. Terima kasih! 💙";
      form.reset();
      render();
    } catch {
      status.textContent = "Penyimpanan browser penuh atau tidak tersedia.";
      status.classList.add("error");
    }
  });

  clearButton.addEventListener("click", () => {
    if (!readEntries().length) return;
    if (window.confirm("Hapus semua ucapan yang tersimpan di browser ini?")) {
      localStorage.removeItem(key);
      status.textContent = "Ucapan lokal sudah dihapus.";
      render();
    }
  });

  render();
})();
