export const WA_NUMBER = "6282164605637";
export const API_URL = "https://sheetdb.io/api/v1/dsm9o1yvodvy3";

export const IMG_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23050505'/><circle cx='50' cy='50' r='28' fill='none' stroke='%233b82f6' stroke-width='4'/><path d='M50 38v12l8 6' stroke='%233b82f6' stroke-width='4' fill='none' stroke-linecap='round'/></svg>";

export function imgFallback(e) {
  e.target.onerror = null;
  e.target.src = IMG_FALLBACK;
}

export function getDetailUrl(p) {
  const params = new URLSearchParams({
    id: p.id,
    nama: p.nama,
    gambar: p.gambar,
    harga: p.harga,
    deskripsi: p.deskripsi,
  });
  return `/detail?${params.toString()}`;
}

export function formatCurrency(val) {
  return val;
}
