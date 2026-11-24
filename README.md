# GAFFI — SpongeBob Undersea Birthday Invitation

Website undangan ulang tahun GAFFI ke-5 dengan tema petualangan bawah laut SpongeBob SquarePants & teman-temannya di Bikini Bottom. Dibuat dengan HTML5, CSS3, dan Vanilla JavaScript.

## Fitur
- **Tema Bawah Laut SpongeBob & Teman-Teman**: Menampilkan SpongeBob, Patrick Star, Gary, Squidward, Pineapple House, Jellyfish, dan Krabby Patty dengan visual SVG tajam dan animasi gelembung laut serta awan bunga khas Bikini Bottom.
- **Countdown Timer**: Menghitung mundur menuju Sabtu, 5 Desember 2026, pukul 10.00 WIB.
- **Foto Asli GAFFI**: Dibingkai dengan porthole kapal selam bernuansa Bikini Bottom.
- **Guestbook**: Disimpan secara lokal pada browser pengunjung menggunakan `localStorage`.
- **Integrasi Peta & WhatsApp**: Navigasi Google Maps dan tombol share WhatsApp dengan format pesan otomatis.
- **Responsive**: Tampilan optimal untuk smartphone, tablet, maupun layar desktop.

## Menjalankan Lokal
Buka file `index.html` langsung di browser untuk melihat preview halaman statis.
Untuk menjalankan endpoint RSVP dengan Vercel Functions:
```bash
vercel dev
```

## Setup Google Sheets untuk RSVP (Opsional)
Spreadsheet ID diatur di environment Vercel:
1. Buat Google Cloud project dan aktifkan **Google Sheets API**.
2. Buat Service Account dan buat JSON key.
3. Bagikan spreadsheet kepada email Service Account sebagai **Editor**.
4. Buat tab bernama persis `RSVP` dengan header:
   `Timestamp | Nama | Kehadiran | Jumlah Orang | Pesan`
5. Di Vercel Settings → Environment Variables:
   - `SPREADSHEET_ID` = `1y3PYrfNDWktthlBZ8o76f4HpgfY6pLmjH4GHKJQZtmc`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = email service account
   - `GOOGLE_PRIVATE_KEY` = private key dari service account

## Catatan
- Guestbook menggunakan `localStorage` pada perangkat masing-masing.
- Semua karakter dan ornamen (SpongeBob, Patrick, Gary, dsb.) dirancang dalam format vektor SVG mandiri tanpa dependensi gambar eksternal.
