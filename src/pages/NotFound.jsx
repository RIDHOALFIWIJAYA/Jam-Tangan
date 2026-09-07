import { Link } from "react-router-dom";
import AOS from "../components/AOS";

export default function NotFound() {
  return (
    <div className="overflow-hidden bg-mesh min-h-screen flex items-center justify-center px-6 py-20">
      <AOS animation="zoom-out-up">
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter italic opacity-10 absolute -top-20 md:-top-32 left-1/2 -translate-x-1/2 select-none">
            404
          </h1>

          <div className="glass p-10 md:p-16 rounded-[40px] border-blue-500/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full" />

            <div className="mb-8">
              <span className="text-6xl md:text-8xl mb-6 block">&#9203;</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 glitch">Waktu Terhenti.</h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Sepertinya Anda tersesat di dimensi lain. Halaman yang Anda cari tidak ada di garis waktu ini.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Kembali ke Beranda
              </Link>
              <Link
                to="/produk"
                className="px-8 py-4 glass border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all"
              >
                Lihat Koleksi
              </Link>
            </div>
          </div>

          <p className="mt-10 text-gray-600 text-xs tracking-[0.3em] uppercase">
            JAM35 PREMIUM WATCHES &bull; ERROR_TIME_NOT_FOUND
          </p>
        </div>
      </AOS>
    </div>
  );
}
