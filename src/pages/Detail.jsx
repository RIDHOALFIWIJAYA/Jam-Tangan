import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useProducts } from "../hooks/useProducts";
import { WA_NUMBER, imgFallback, getDetailUrl } from "../data/api";
import AOS from "../components/AOS";

export default function Detail() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const nama = params.get("nama");
  const gambar = params.get("gambar");
  const harga = params.get("harga");
  const deskripsi = params.get("deskripsi");

  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, recentlyViewed } = useShop();
  const { products } = useProducts();
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderNama, setOrderNama] = useState("");
  const [orderAlamat, setOrderAlamat] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [copyDone, setCopyDone] = useState(false);

  const product = id ? { id, nama, gambar, harga, deskripsi } : null;
  const isFav = isInWishlist(id);

  useEffect(() => {
    if (!product) return;
    document.title = `${product.nama} | JAM35 Premium Watches`;
    addRecentlyViewed(product);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="text-center p-20 pt-32">
        <h1 className="text-4xl font-black mb-4">Produk Tidak Ditemukan!</h1>
        <Link to="/produk" className="text-blue-500 font-bold">Kembali ke Katalog</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const recentFiltered = recentlyViewed.filter((i) => i.id !== id).slice(0, 4);

  function openOrderModal() {
    const inv = "JAM-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    setInvoiceId(inv);
    setOrderOpen(true);
  }

  function sendOrder() {
    if (!orderNama || !orderAlamat) {
      alert("Lengkapi data kamu dulu ya!");
      return;
    }
    const waText =
      `*INVOICE ORDER JAM35*\n` +
      `--------------------------\n` +
      `*ID:* #${invoiceId}\n` +
      `*Produk:* ${nama}\n` +
      `*Harga:* ${harga}\n\n` +
      `*Data Pemesan:*\n` +
      `Nama: ${orderNama}\n` +
      `Alamat: ${orderAlamat}\n` +
      `--------------------------\n` +
      `_Link Produk: ${window.location.href}_`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`, "_blank");
  }

  function shareToWA() {
    const text = `Cek deh jam tangan keren ini: *${nama}* di JAM35! \uD83D\uDD25\n\nLink: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  function shareToIG() {
    alert("PRO-TIP: Screenshot halaman ini, lalu share ke IG Story kamu & tag @JAM35_PREMIUM! \uD83D\uDCF8");
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopyDone(true);
      setTimeout(() => setCopyDone(false), 2000);
    });
  }

  return (
    <>
      {/* Main Product */}
      <div className="max-w-4xl w-full mx-auto mt-10 px-6">
        <AOS animation="fade-up">
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-6 right-6 z-10 w-12 h-12 glass rounded-full flex items-center justify-center text-xl hover:scale-110 transition-all ${isFav ? "bg-white/10" : ""}`}
            >
              {isFav ? "\u2764\uFE0F" : "\uD83E\uDD0D"}
            </button>

            <div className="md:w-1/2 p-4">
              <img src={gambar} onError={imgFallback} className="w-full h-[400px] object-cover rounded-2xl shadow-lg" loading="lazy" alt={nama} />
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-black uppercase tracking-widest mb-2">
                  Premium Series
                </span>
                <h1 className="text-4xl font-black mb-2 italic tracking-tighter">{nama}</h1>
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-6 italic">{harga}</h3>

              <div className="border-t border-white/10 pt-6">
                <p className="text-gray-400 leading-relaxed mb-8 text-sm">{deskripsi}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-3 bg-white text-black font-black py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5 text-sm uppercase tracking-wider"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    TAMBAH KERANJANG
                  </button>
                  <button
                    onClick={openOrderModal}
                    className="flex items-center justify-center gap-3 bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 text-sm uppercase tracking-wider"
                  >
                    PESAN SEKARANG
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button onClick={shareToWA} className="flex flex-col items-center justify-center gap-2 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/10 transition group">
                    <span className="text-lg group-hover:scale-110 transition-transform">&#128242;</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">WhatsApp</span>
                  </button>
                  <button onClick={shareToIG} className="flex flex-col items-center justify-center gap-2 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/10 transition group">
                    <span className="text-lg group-hover:scale-110 transition-transform">&#128248;</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">IG Story</span>
                  </button>
                  <button onClick={copyToClipboard} className="flex flex-col items-center justify-center gap-2 py-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/10 transition group">
                    <span className="text-lg group-hover:scale-110 transition-transform">{copyDone ? "\u2705" : "\uD83D\uDD17"}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">{copyDone ? "Copied!" : "Copy Link"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </AOS>
      </div>

      {/* Recently Viewed */}
      {recentFiltered.length > 0 && (
        <div className="max-w-4xl w-full mx-auto mt-20 px-6">
          <AOS animation="fade-up">
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-gray-500 font-black uppercase tracking-widest mb-3">
                  Your History
                </div>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Terakhir Dilihat</h2>
              </div>
            </div>
          </AOS>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recentFiltered.map((p) => (
              <Link key={p.id} to={getDetailUrl(p)} className="glass p-4 rounded-[25px] border-white/5 hover:border-blue-500/20 transition-all group">
                <img src={p.gambar} onError={imgFallback} className="w-full h-32 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" alt={p.nama} />
                <h4 className="text-[10px] font-bold truncate uppercase tracking-tighter">{p.nama}</h4>
                <p className="text-[10px] text-blue-400 font-black mt-1 italic">{p.harga}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="max-w-4xl w-full mx-auto mt-16 px-6">
        <AOS animation="fade-up">
          <h2 className="text-2xl font-black mb-8 italic uppercase tracking-tight">Mungkin Kamu Suka</h2>
        </AOS>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.length === 0
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl animate-pulse">
                    <div className="bg-white/10 h-48 rounded-xl mb-4" />
                    <div className="h-4 bg-white/10 w-3/4 rounded mb-2" />
                    <div className="h-4 bg-white/10 w-1/2 rounded" />
                  </div>
                ))
            : related.map((p) => (
                <Link key={p.id} to={getDetailUrl(p)} className="bg-white/5 border border-white/10 p-4 rounded-3xl hover:bg-white/10 transition-all group">
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img src={p.gambar} loading="lazy" onError={imgFallback} className="w-full h-48 object-cover group-hover:scale-110 transition duration-500" alt={p.nama} />
                  </div>
                  <h3 className="font-bold text-sm mb-1 uppercase tracking-tighter">{p.nama}</h3>
                  <p className="text-blue-400 text-xs font-bold italic">{p.harga}</p>
                </Link>
              ))}
        </div>
      </div>

      {/* Floating WA Button */}
      <a
        href="https://wa.me/6282164605637"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-green-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-green-400 hover:scale-110 transition-all duration-300 group"
      >
        <span className="hidden group-hover:block transition-all duration-300">Tanya Expert?</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

      {/* Order Modal */}
      {orderOpen && (
        <div className="modal active" onClick={() => setOrderOpen(false)}>
          <div
            className="glass p-1 md:p-1.5 rounded-[45px] max-w-lg w-full border-blue-500/30 relative shadow-[0_0_50px_rgba(59,130,246,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0a0a0a] rounded-[40px] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full" />

              <button
                onClick={() => setOrderOpen(false)}
                className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full glass border-white/5 z-20"
              >
                &times;
              </button>

              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-black uppercase tracking-widest mb-4">
                  Secure Checkout
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-2 italic uppercase tracking-tighter leading-tight">
                  Complete<br />Your Order.
                </h2>
                <p className="text-gray-500 text-xs mb-10 uppercase tracking-widest leading-relaxed">
                  Silahkan isi data pengiriman Anda dengan benar untuk pembuatan invoice resmi.
                </p>

                <div className="space-y-6">
                  <div className="group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3 block group-focus-within:text-blue-500 transition-colors">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama Anda..."
                      className="bg-white/[0.03] border border-white/10 focus:border-blue-500/50 focus:bg-white/[0.06] transition-all pl-5 pr-5 py-4 rounded-2xl w-full outline-none text-white"
                      value={orderNama}
                      onChange={(e) => setOrderNama(e.target.value)}
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-3 block group-focus-within:text-blue-500 transition-colors">
                      Alamat Lengkap
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Jl. Kemewahan No. 35, Kota..."
                      className="bg-white/[0.03] border border-white/10 focus:border-blue-500/50 focus:bg-white/[0.06] transition-all pl-5 pr-5 py-4 rounded-2xl resize-none w-full outline-none text-white"
                      value={orderAlamat}
                      onChange={(e) => setOrderAlamat(e.target.value)}
                    />
                  </div>

                  <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Order Summary</span>
                      <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">#{invoiceId}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <h4 className="text-xl font-bold tracking-tight truncate max-w-[150px]">{nama}</h4>
                      <div className="text-lg font-black italic text-white">{harga}</div>
                    </div>
                  </div>

                  <button
                    onClick={sendOrder}
                    className="group relative w-full bg-white text-black font-black py-5 rounded-[20px] hover:bg-blue-600 hover:text-white transition-all duration-500 overflow-hidden shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      KIRIM VIA WHATSAPP
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </button>
                  <p className="text-[9px] text-center text-gray-600 uppercase tracking-widest font-bold">Encrypted & Secure Transaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
