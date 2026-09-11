export const WA_NUMBER = "6282164605637";
export const API_URL = "https://sheetdb.io/api/v1/dsm9o1yvodvy3";

export const IMG_FALLBACK =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23050505'/><circle cx='50' cy='50' r='28' fill='none' stroke='%233b82f6' stroke-width='4'/><path d='M50 38v12l8 6' stroke='%233b82f6' stroke-width='4' fill='none' stroke-linecap='round'/></svg>";

export function imgFallback(e) {
  e.target.onerror = null;
  e.target.src = IMG_FALLBACK;
}

export function getDetailUrl(p) {
  return `/detail/${encodeURIComponent(p.id)}`;
}

export function formatCurrency(val) {
  if (val == null || val === "") return val;
  const numeric = String(val).replace(/\D/g, "");
  if (!numeric) return String(val);
  return `Rp ${new Intl.NumberFormat("id-ID").format(Number(numeric))}`;
}

export function safeParse(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function removeControlChars(str) {
  let out = "";
  for (const ch of str) {
    const code = ch.codePointAt(0);
    if ((code >= 0x20 && code !== 0x7f) || code === 0x0a || code === 0x0d || code === 0x09) out += ch;
  }
  return out;
}

export function sanitizeWA(text) {
  if (!text) return "";
  return removeControlChars(String(text))
    .replace(/[*_`~]/g, "")
    .replace(/\s{3,}/g, "  ")
    .trim()
    .slice(0, 500);
}

export function normalizeGambar(path) {
  if (!path) return path;
  const cleaned = String(path).replace(/^src\//, "/");
  if (/^(https?:)?\//.test(cleaned) || cleaned.startsWith("data:")) return cleaned;
  return `/${cleaned}`;
}
