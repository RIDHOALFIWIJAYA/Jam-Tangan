import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getDetailUrl } from "../data/api";

export default function WishlistModal({ isOpen, onClose }) {
  const { wishlist, toggleWishlist } = useShop();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="modal active" onClick={onClose}>
      <div
        className="glass p-8 rounded-[40px] max-w-2xl w-full border-blue-500/20 relative max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(59,130,246,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full glass border-white/5 z-20"
        >
          &times;
        </button>
        <div className="mb-8">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Wishlist &#10084;&#65039;</h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Simpan jam idaman kamu di sini</p>
        </div>
        <div className="overflow-y-auto space-y-4 pr-2 flex-grow custom-scrollbar">
          {wishlist.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 italic text-sm">Belum ada jam favorit...</p>
            </div>
          ) : (
            wishlist.map((p) => (
              <div key={p.id} className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all">
                <img
                  src={p.gambar}
                  onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23050505'/><circle cx='50' cy='50' r='28' fill='none' stroke='%233b82f6' stroke-width='4'/></svg>"; }}
                  className="w-20 h-20 object-cover rounded-2xl"
                  alt={p.nama}
                />
                <div className="flex-grow">
                  <h4 className="font-bold text-lg tracking-tight">{p.nama}</h4>
                  <p className="text-blue-400 font-bold text-sm italic">{p.harga}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      navigate(getDetailUrl(p));
                    }}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-blue-600 transition text-sm"
                  >
                    &#128065;&#65039;
                  </button>
                  <button
                    onClick={() => toggleWishlist(p)}
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-red-600 transition text-sm"
                  >
                    &#128465;&#65039;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
