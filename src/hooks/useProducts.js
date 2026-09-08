import { useState, useEffect } from "react";
import { API_URL } from "../data/api";

const CACHE_KEY = "jam35_products_cache_v2";
const CACHE_TIME_KEY = "jam35_products_cache_time_v2";
const CACHE_EXPIRY = 5 * 60 * 1000;

async function fetchWithCache(url) {
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
  const now = Date.now();

  if (cachedData && cachedTime && now - Number(cachedTime) < CACHE_EXPIRY) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIME_KEY, now.toString());
    return data;
  } catch (error) {
    if (cachedData) return JSON.parse(cachedData);
    throw error;
  }
}

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchWithCache(API_URL);
        if (!cancelled) {
          setProducts(
            data.map((item) => ({
              id: item.id,
              nama: item.nama,
              gambar: item.gambar.replace(/^src\//, ""),
              harga: item.harga,
              kategori: item.kategori
                ? item.kategori.split(",").map((k) => k.trim())
                : ["Lainnya"],
              deskripsi: item.deskripsi,
            }))
          );
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Gagal memuat database.");
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
}
