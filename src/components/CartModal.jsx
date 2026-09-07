import { useShop } from "../context/ShopContext";
import { WA_NUMBER } from "../data/api";

export default function CartModal({ isOpen, onClose }) {
  const { cart, cartCount, changeQty, removeFromCart } = useShop();

  if (!isOpen) return null;

  function checkoutViaWA() {
    if (cart.length === 0) return;
    const itemText = cart
      .map((p, i) => {
        const qty = p.qty || 1;
        const totalLine = qty > 1 ? ` x${qty}` : "";
        return `${i + 1}. *${p.nama}* (${p.harga})${totalLine}`;
      })
      .join("\n");
    const invId = "INV-B" + Math.random().toString(36).substr(2, 5).toUpperCase();
    const waText =
      `*BULK ORDER - JAM35*\n` +
      `--------------------------\n` +
      `*ID:* #${invId}\n` +
      `*Total Item:* ${cartCount} pcs\n` +
      `*Daftar Pesanan:*\n${itemText}\n` +
      `--------------------------\n` +
      `_Mohon diproses pesanannya ya Min!_`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`, "_blank");
  }

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
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Shopping Bag &#128722;</h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Review items sebelum checkout via WhatsApp</p>
        </div>

        <div className="overflow-y-auto space-y-4 pr-2 flex-grow custom-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 italic text-sm">Keranjang belanja kosong...</p>
            </div>
          ) : (
            cart.map((p) => {
              const qty = p.qty || 1;
              return (
                <div key={p.id} className="flex items-center gap-4 sm:gap-5 bg-white/[0.03] p-4 sm:p-5 rounded-[30px] border border-white/5">
                  <img src={p.gambar} onError={(e) => { e.target.onerror = null; e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23050505'/><circle cx='50' cy='50' r='28' fill='none' stroke='%233b82f6' stroke-width='4'/></svg>"; }} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl" alt={p.nama} />
                  <div className="flex-grow">
                    <h4 className="font-black text-lg sm:text-xl tracking-tight">{p.nama}</h4>
                    <p className="text-blue-400 font-black text-lg italic">{p.harga}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => changeQty(p.id, -1)} className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-sm font-black">&minus;</button>
                      <span className="text-sm font-bold w-6 text-center">{qty}</span>
                      <button onClick={() => changeQty(p.id, 1)} className="w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-blue-600 transition text-sm font-black">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(p.id)} className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-red-600/20 hover:text-red-500 transition-all duration-300">&#128465;&#65039;</button>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Items</span>
              <span className="text-2xl font-black text-blue-500 italic">{cartCount} Items</span>
            </div>
            <button
              onClick={checkoutViaWA}
              className="w-full bg-white text-black font-black py-5 rounded-[20px] hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 text-sm tracking-widest uppercase"
            >
              CHECKOUT VIA WHATSAPP
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
