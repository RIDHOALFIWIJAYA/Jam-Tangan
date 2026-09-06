# JAM35 - Premium Watches Store

Toko jam tangan online yang dibangun dengan HTML, Tailwind CSS, dan JavaScript vanilla. Data produk diambil dari SheetDB.io (spreadsheet sebagai database).

## Tech Stack

- HTML5
- Tailwind CSS 3
- JavaScript Vanilla
- SheetDB.io (database)
- Google Fonts (Plus Jakarta Sans)

## Struktur Folder

```
├── index.html          # Halaman utama (landing page)
├── produk.html         # Katalog produk dengan pencarian & filter
├── detail.html         # Detail produk (via query string)
├── 404.html            # Halaman error custom
├── favicon.svg         # Icon situs
├── gambar.webp         # Gambar OG/social share
├── sitemap.xml         # Sitemap untuk SEO
├── robots.txt          # Robots directive
├── dist/
│   └── style.css       # CSS hasil build Tailwind
├── src/
│   ├── input.css       # CSS sumber (Tailwind directives + custom styles)
│   ├── analog/         # Gambar produk jam analog
│   ├── digital/        # Gambar produk jam digital
│   └── jamku/          # Gambar produk jam lainnya
└── package.json
```

## Cara Setup

```bash
# Install dependencies
npm install

# Development (watch mode)
npm run dev

# Build untuk production
npm run build
```

## Cara Update Produk

Produk dijalankan dari Google Sheet melalui SheetDB.io:
1. Buka SheetDB dashboard
2. Edit / tambah baris pada spreadsheet
3. Kolom: `id`, `nama`, `gambar`, `harga`, `kategori`, `deskripsi`

## Deploy

Situs ini di-deploy ke Vercel sebagai static site. Push ke branch `main` untuk deploy otomatis.

## License

ISC
