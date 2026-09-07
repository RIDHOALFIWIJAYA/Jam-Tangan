import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getDetailUrl, imgFallback } from "../data/api";

export default function ProductCard({ product, delay = 0 }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const isFav = isInWishlist(product.id);

  return (
    <div className="glass p-4 rounded-[35px] hover:bg-blue-600/5 transition-all duration-700 group hover:-translate-y-3 flex flex-col h-full relative">
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product); }}
          className="w-10 h-10 glass rounded-full flex items-center justify-center text-sm hover:scale-110 transition-all"
        >
          {isFav ? "\u2764\uFE0F" : "\uD83E\uDD0D"}
        </button>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
          className="w-10 h-10 glass rounded-full flex items-center justify-center text-sm hover:scale-110 transition-all"
        >
          &#128722;
        </button>
      </div>

      <div>
        <div className="relative overflow-hidden rounded-[25px] mb-6">
          <img
            src={product.gambar}
            loading="lazy"
            onError={imgFallback}
            className="w-full h-72 object-cover transform transition duration-1000 group-hover:scale-110"
            alt={product.nama}
          />
          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-1.5 pointer-events-none">
            {product.kategori.map((kat) => (
              <div key={kat} className="bg-black/60 backdrop-blur-md text-[8px] text-white px-2 py-0.5 rounded-full uppercase tracking-[0.2em] font-black border border-white/10">
                {kat}
              </div>
            ))}
          </div>
        </div>
        <div className="px-2">
          <h3 className="text-xl font-bold mb-1 tracking-tight uppercase">{product.nama}</h3>
          <p className="text-blue-400 mb-6 font-black text-lg italic">{product.harga}</p>
        </div>
      </div>

      <div className="px-2 pb-2 mt-auto">
        <Link
          to={getDetailUrl(product)}
          className="block w-full text-center py-4 bg-white text-black rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl uppercase"
        >
          Discover More
        </Link>
      </div>
    </div>
  );
}
