import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";

export default function Header({ showSearch, onSearch, searchValue }) {
  const { cartCount } = useShop();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProducts = location.pathname === "/produk";
  const isDetail = location.pathname === "/detail";

  return (
    <header className="fixed top-0 w-full glass z-[100] px-6 md:px-8 py-4 md:py-5 flex justify-between items-center transition-all duration-300">
      <div className="flex items-center gap-4 md:gap-8">
        {isDetail ? (
          <Link to="/produk" className="text-xl font-black hover:text-blue-500 transition-colors">&larr;</Link>
        ) : null}
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tighter text-glow italic">JAM35.</Link>

        {isHome && (
          <nav className="hidden md:flex gap-10 text-[10px] font-bold tracking-[0.3em] uppercase">
            <a href="/#produk" className="hover:text-blue-500 transition">Collections</a>
            <Link to="/produk" className="hover:text-blue-500 transition">Catalog</Link>
            <a href="https://wa.me/6282164605637" className="hover:text-blue-500 transition">Support</a>
          </nav>
        )}

        {isProducts && showSearch && (
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-blue-500/50 transition-all">
            <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search collection..."
              className="bg-transparent border-none outline-none text-xs w-48 lg:w-64"
              value={searchValue || ""}
              onChange={(e) => onSearch && onSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {isProducts && (
          <Link to="/produk?open=wishlist" className="relative glass p-2.5 rounded-full hover:bg-white/10 transition">
            <span className="text-sm">&#10084;&#65039;</span>
          </Link>
        )}
        <Link
          to={isProducts ? "#cart" : "/produk?open=cart"}
          className="relative glass p-2.5 rounded-full hover:bg-white/10 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-blue-600 text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
            {cartCount}
          </span>
        </Link>
        {isHome && (
          <Link to="/produk" className="hidden sm:block px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-600 hover:text-white transition-all">
            Shop Now
          </Link>
        )}
      </div>
    </header>
  );
}
