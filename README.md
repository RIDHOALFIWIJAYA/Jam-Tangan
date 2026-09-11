# JAM35 - Premium Watches Store

Toko jam tangan online yang dibangun dengan **React 19 + Vite 7 + Tailwind CSS 3**. Data produk diambil dari SheetDB.io (Google Sheets sebagai database) dan checkout dilakukan melalui WhatsApp.

## Tech Stack

- React 19
- Vite 7
- React Router DOM 7
- Tailwind CSS 3
- SheetDB.io (database)
- Google Fonts (Plus Jakarta Sans)

## Fitur

- Landing page dengan animasi scroll (custom AOS via IntersectionObserver)
- Katalog produk dengan pencarian (`?q=`) dan filter kategori
- Detail produk dengan route bersih `/detail/:id`
- Keranjang belanja & wishlist yang tersimpan di localStorage
- Checkout via WhatsApp (bulk order & order satuan)
- Caching data produk di localStorage (TTL 5 menit)
- Loading skeleton, lazy loading route, dan Error Boundary

## Struktur Folder

```
├── index.html                # HTML entry point
├── src/
│   ├── main.jsx              # Entry React (ErrorBoundary + Router + Provider)
│   ├── App.jsx               # Route config (lazy loaded)
│   ├── index.css             # Tailwind + custom styles
│   ├── components/           # Layout, Header, Footer, ProductCard, Modal, dll
│   ├── pages/                # Home, Products, Detail, NotFound
│   ├── context/ShopContext   # State global (cart, wishlist, recently, toast)
│   ├── hooks/useProducts     # Fetch + cache produk dari SheetDB
│   └── data/api              # Konstanta & helper (WA, format harga, sanitasi)
└── public/                   # Aset statis (gambar produk, favicon, sitemap)
```

## Cara Setup

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build untuk production
npm run build

# Preview hasil build
npm run preview

# Lint & format
npm run lint
npm run format
```

## Cara Update Produk

Produk dijalankan dari Google Sheet melalui SheetDB.io:

1. Buka SheetDB dashboard
2. Edit / tambah baris pada spreadsheet
3. Kolom: `id`, `nama`, `gambar`, `harga`, `kategori`, `deskripsi`
4. Path `gambar` relatif ke folder `public/` (contoh: `analog/analog1.webp`)

## Deploy

Situs ini di-deploy ke Vercel sebagai static site. Push ke branch `main` untuk deploy otomatis. Aturan SPA rewrite sudah diatur di `vercel.json`.

## License

ISC
