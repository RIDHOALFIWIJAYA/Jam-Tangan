import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">&#8986;</div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-3">Ups, Ada Masalah</h1>
            <p className="text-gray-500 text-sm mb-10 tracking-wide">
              Terjadi kesalahan tak terduga pada halaman ini. Silakan muat ulang untuk melanjutkan.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
