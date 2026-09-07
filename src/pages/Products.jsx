import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import CartModal from "../components/CartModal";
import WishlistModal from "../components/WishlistModal";
import AOS from "../components/AOS";

const ITEMS_PER_LOAD = 8;

function SkeletonGrid() {
  return Array(8)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="glass p-4 rounded-3xl">
        <div className="skeleton w-full h-64 rounded-2xl mb-5" />
        <div className="space-y-3 px-2">
          <div className="skeleton h-6 w-3/4 rounded-lg" />
          <div className="skeleton h-5 w-1/2 rounded-lg" />
        </div>
        <div className="skeleton h-12 w-full rounded-xl mt-6" />
      </div>
    ));
}

export default function Products() {
  const { products, loading, error } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  useEffect(() => {
    const open = searchParams.get("open");
    if (open === "cart") setCartOpen(true);
    if (open === "wishlist") setWishlistOpen(true);
  }, [searchParams]);

  const closeCart = useCallback(() => {
    setCartOpen(false);
    searchParams.delete("open");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const closeWishlist = useCallback(() => {
    setWishlistOpen(false);
    searchParams.delete("open");
    setSearchParams(searchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  const categories = ["All", ...new Set(products.flatMap((p) => p.kategori))];

  const filtered = products.filter((p) => {
    const matchSearch = p.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory === "All" || p.kategori.includes(activeCategory);
    return matchSearch && matchCategory;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function handleSearch(value) {
    setSearchQuery(value);
    setVisibleCount(ITEMS_PER_LOAD);
  }

  function handleCategory(cat) {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_LOAD);
  }

  function loadMore() {
    setVisibleCount((c) => c + ITEMS_PER_LOAD);
  }

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <AOS animation="fade-right">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight">
            Koleksi<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 pr-4">JAM 35</span>
          </h1>
        </AOS>
        <div className="md:hidden w-full" data-aos="fade-up">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 transition-all text-sm"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <AOS animation="fade-up">
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {categories.map((kat) => (
            <button
              key={kat}
              onClick={() => handleCategory(kat)}
              className={`px-8 py-2.5 rounded-full border whitespace-nowrap transition-all duration-500 text-xs tracking-widest uppercase ${
                kat === activeCategory
                  ? "bg-blue-600 text-white font-bold border-transparent shadow-lg shadow-blue-600/20"
                  : "glass text-gray-400 border-white/10 hover:bg-white/5"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </AOS>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <SkeletonGrid />
        </div>
      ) : error ? (
        <p className="col-span-full text-center text-red-500 font-bold mt-10">
          Gagal memuat database. Cek koneksi internet.
        </p>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="empty-state-anim">&#128336;</div>
          <p className="text-gray-500 italic mt-4 text-center text-sm tracking-widest uppercase">
            Waktu terhenti... Jam tidak ditemukan.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {visible.map((p, idx) => (
              <AOS key={p.id} animation="fade-up" delay={Math.min(idx, 7) * 50}>
                <ProductCard product={p} />
              </AOS>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-20 mb-10">
              <button
                onClick={loadMore}
                className="px-10 py-4 glass hover:bg-blue-600 hover:border-transparent text-white font-bold rounded-2xl transition-all duration-500 shadow-xl tracking-widest text-xs uppercase"
              >
                Load More Collection &#11015;&#65039;
              </button>
            </div>
          )}
        </>
      )}

      <CartModal isOpen={cartOpen} onClose={closeCart} />
      <WishlistModal isOpen={wishlistOpen} onClose={closeWishlist} />
    </div>
  );
}
