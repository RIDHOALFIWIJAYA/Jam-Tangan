import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { imgFallback } from "../data/api";
import AOS from "../components/AOS";

const BRANDS = ["ROLEX", "CASIO", "PATEK PHILIPPE", "SEIKO", "OMEGA"];

const STATS = [
  { value: "12K+", label: "Happy Clients" },
  { value: "50+", label: "Premium Brands" },
  { value: "24H", label: "Fast Delivery" },
  { value: "100%", label: "Originality" },
];

const TESTIMONIALS = [
  {
    name: "Andrian Syah",
    role: "Verified Buyer",
    text: '"Gak nyangka banget kualitasnya se-premium ini buat harga segini. Build quality-nya solid, kacanya bening banget. Pengiriman juga cepet!"',
    gradient: "from-blue-600 to-indigo-600",
    initial: "A",
  },
  {
    name: "Siska Amelia",
    role: "Fashion Enthusiast",
    text: '"Desainnya bener-bener mewah, dipake buat ngantor atau nongkrong tetep masuk. Pelayanannya lewat WA ramah banget dan responsif. Recommended!"',
    gradient: "from-purple-600 to-pink-600",
    initial: "S",
  },
  {
    name: "Budi Santoso",
    role: "Outdoor Athlete",
    text: '"Jam sport-nya gokil, diajak berenang aman banget. Udah gue tes sendiri. Packaging-nya juga niat banget pake box kayu eksklusif."',
    gradient: "from-green-600 to-teal-600",
    initial: "B",
  },
];

const FAQ = [
  {
    q: "Apakah barang yang dijual 100% Original?",
    a: "Tentu saja. Semua koleksi di Jam35 itu barang original yang dijamin keasliannya. Kami memberikan garansi uang kembali 200% jika terbukti palsu.",
  },
  {
    q: "Bagaimana dengan sistem pengirimannya?",
    a: "Kami menggunakan jasa kirim prioritas dengan asuransi penuh. Barang biasanya sampai dalam 1-3 hari kerja setelah pemesanan dikonfirmasi.",
  },
  {
    q: "Apakah saya bisa retur jika ukuran tidak pas?",
    a: "Bisa, kami menyediakan layanan penyesuaian ukuran gratis atau retur barang dalam jangka waktu 7 hari setelah barang diterima.",
  },
];

function SkeletonCard() {
  return (
    <div className="glass p-6 rounded-[40px] border-white/5">
      <div className="skeleton w-full h-[450px] rounded-[30px] mb-8" />
      <div className="flex justify-between items-start px-2">
        <div className="w-full">
          <div className="skeleton h-3 w-20 rounded-full mb-3" />
          <div className="skeleton h-6 w-3/4 rounded-lg" />
        </div>
        <div className="skeleton h-6 w-16 rounded-lg" />
      </div>
      <div className="skeleton h-14 w-full rounded-2xl mt-10" />
    </div>
  );
}

export default function Home() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-mesh overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6">
          <AOS animation="fade-down" delay={500}>
            <div className="inline-block px-4 py-1.5 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-black tracking-[0.2em] uppercase mb-8 mt-20">
              Timeless Craftsmanship
            </div>
          </AOS>
          <AOS animation="zoom-out-up" duration={1500}>
            <h1 className="text-5xl md:text-9xl font-black mb-8 leading-[1.1] md:leading-none tracking-tighter uppercase italic">
              Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 pr-4">Every</span> Second.
            </h1>
          </AOS>
          <AOS animation="fade-up" delay={800}>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-12 leading-relaxed tracking-wide">
              Lebih dari sekadar penunjuk waktu. Kami menghadirkan karya seni yang melingkar di pergelangan tangan Anda dengan presisi tingkat tinggi dan desain yang mendefinisikan kesuksesan.
            </p>
          </AOS>
          <AOS animation="fade-up" delay={1000}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/produk" className="px-12 py-5 bg-blue-600 text-white font-black text-[11px] tracking-[0.2em] uppercase rounded-2xl shadow-2xl shadow-blue-600/30 hover:scale-105 transition-all">
                Explore Now
              </Link>
              <a href="https://wa.me/6282164605637" className="px-12 py-5 glass rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                Consult Expert
              </a>
            </div>
          </AOS>
        </div>
      </section>

      {/* Brand Ticker */}
      <div className="py-16 border-y border-white/5 bg-black/80 overflow-hidden">
        <div className="flex gap-16 md:gap-24 animate-pulse justify-center grayscale invert opacity-30">
          {BRANDS.map((b, i) => (
            <span key={b} className={`text-xl md:text-2xl font-black italic tracking-tighter ${i >= 3 ? "hidden md:block" : ""}`}>
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="px-6 py-24 bg-black/50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s, i) => (
            <AOS key={s.label} animation="fade-up" delay={i * 100}>
              <div className="text-center">
                <h2 className="text-5xl font-black text-blue-500 mb-2">{s.value}</h2>
                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">{s.label}</p>
              </div>
            </AOS>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="px-8 py-32 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <AOS animation="fade-right">
              <div className="inline-block px-4 py-1.5 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-black tracking-[0.2em] uppercase mb-6">
                Physical Store
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-8">
                Kunjungi Toko<br /><span className="text-blue-500">Kami di Lubuk Pakam</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-500 flex-shrink-0">&#128205;</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 italic">Lokasi Store</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Jln tengku Raja muda no 33, Lubuk Pakam,<br />Deli Serdang, Sumatera Utara.
                      <br /><span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Cari "Toko Jam 35" di Google Maps</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-500 flex-shrink-0">&#128336;</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 italic">Jam Operasional</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Senin - Sabtu: 12:00 - 20:00 WIB<br />Minggu: Tutup</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-blue-500 flex-shrink-0">&#128222;</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 italic">Kontak</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">+62 821-6460-5637<br />ridhoalfiwijaya@gmail.com</p>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/Toko+Jam+35+Lubuk+Pakam"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-block px-10 py-4 bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
              >
                Buka di Google Maps &rarr;
              </a>
            </AOS>
            <div className="relative" data-aos="fade-left">
              <div className="absolute -inset-4 bg-blue-600/10 blur-[100px] rounded-full" />
              <div className="relative glass aspect-square rounded-[50px] overflow-hidden border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.26123456789!2d98.8752777!3d3.5552777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303149dfa5105105%3A0x503149dfa5105105!2sLubuk%20Pakam%2C%20Deli%20Serdang%20Regency%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1715560000000!5m2!1sen!2sid"
                  className="w-full h-full grayscale invert opacity-70 contrast-125"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="produk" className="px-6 py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <AOS animation="fade-right">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
                Signature<br /><span className="text-blue-500">Series</span>
              </h2>
            </AOS>
            <AOS animation="fade-left">
              <Link to="/produk" className="group flex items-center gap-4 text-blue-500 font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:gap-6">
                View All Catalog <span>&rarr;</span>
              </Link>
            </AOS>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : error ? (
              <p className="col-span-full text-center text-red-500 font-bold">Failed to load products.</p>
            ) : (
              featured.map((p, idx) => (
                <AOS key={p.id} animation="fade-up" delay={idx * 150}>
                  <div className="group relative glass p-6 rounded-[40px] transition-all duration-1000 hover:bg-blue-600/5 hover:-translate-y-4 hover:border-blue-500/40">
                    <div className="relative overflow-hidden rounded-[30px] mb-8">
                      <img
                        src={p.gambar}
                        loading="lazy"
                        onError={imgFallback}
                        className="w-full h-[450px] object-cover transition duration-1000 group-hover:scale-110"
                        alt={p.nama}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 flex items-end p-10">
                        <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold line-clamp-3 leading-loose">
                          {p.deskripsi}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-start px-2">
                      <div>
                        <span className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] mb-2 block">
                          {p.kategori?.[0] || "Premium"}
                        </span>
                        <h3 className="text-2xl font-bold tracking-tighter uppercase italic">{p.nama}</h3>
                      </div>
                      <div className="text-right italic font-black text-xl text-blue-400">{p.harga}</div>
                    </div>
                    <Link
                      to={`/detail?id=${p.id}&nama=${encodeURIComponent(p.nama)}&gambar=${p.gambar}&harga=${p.harga}&deskripsi=${encodeURIComponent(p.deskripsi)}`}
                      className="mt-10 block text-center py-5 glass border-white/10 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] group-hover:bg-blue-600 group-hover:border-transparent transition-all duration-500 shadow-xl"
                    >
                      Details
                    </Link>
                  </div>
                </AOS>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-8 py-32 bg-black">
        <div className="max-w-7xl mx-auto">
          <AOS animation="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4 text-glow">What They Say</h2>
              <p className="text-gray-500 tracking-[0.3em] uppercase text-[10px] font-bold">Testimoni nyata dari pelanggan setia kami</p>
            </div>
          </AOS>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <AOS key={t.name} animation="fade-up" delay={i * 200}>
                <div className="glass p-10 rounded-[40px] border-blue-500/10 hover:border-blue-500/30 transition-all duration-700 group">
                  <div className="flex gap-1 text-yellow-500 mb-8 group-hover:scale-110 transition-transform origin-left">
                    <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
                  </div>
                  <p className="text-gray-400 italic mb-10 leading-relaxed text-sm">{t.text}</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${t.gradient} flex items-center justify-center font-bold text-white shadow-lg`}>
                      {t.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-32 bg-[#050505]">
        <div className="max-w-4xl mx-auto">
          <AOS animation="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">Common Questions</h2>
              <p className="text-gray-500 tracking-[0.3em] uppercase text-[10px] font-bold">Hal-hal yang sering ditanyakan pelanggan kami</p>
            </div>
          </AOS>

          <div className="space-y-6">
            {FAQ.map((item, i) => (
              <AOS key={i} animation="fade-up" delay={i * 100}>
                <details className="glass p-8 rounded-[30px] border-white/5 cursor-pointer group transition-all duration-500">
                  <summary className="font-bold text-lg flex justify-between items-center outline-none list-none uppercase tracking-tighter italic">
                    {item.q}
                    <span className="text-blue-500 transition-transform duration-500 group-open:rotate-180">&darr;</span>
                  </summary>
                  <div className="text-gray-400 mt-6 text-sm leading-relaxed border-t border-white/10 pt-6">
                    {item.a}
                  </div>
                </details>
              </AOS>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-40 bg-mesh relative">
        <div className="absolute inset-0 bg-black/60" />
        <AOS animation="flip-up">
          <div className="relative z-10 max-w-4xl mx-auto glass p-16 md:p-24 rounded-[50px] text-center border-blue-500/20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase italic">
              READY TO WEAR<br /><span className="text-blue-500">YOUR SUCCESS?</span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg tracking-wide">Dapatkan penawaran eksklusif dan konsultasi gratis setiap pembelian pertama.</p>
            <a
              href="https://wa.me/6282164605637"
              className="inline-block px-14 py-6 bg-green-500 text-black font-black text-[12px] tracking-[0.2em] uppercase rounded-2xl hover:bg-green-400 hover:scale-105 transition-all shadow-2xl shadow-green-500/20"
            >
              Claim Discount via WhatsApp
            </a>
          </div>
        </AOS>
      </section>
    </>
  );
}
