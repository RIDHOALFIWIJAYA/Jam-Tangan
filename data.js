const produkData = [
  { 
    id: "jam1", 
    nama: "Digital X-Pro", 
    gambar: "j1.png", 
    harga: "Rp120.000", 
    kategori: "Sport", 
    deskripsi: "Jam tangan digital dengan fitur water resistant dan strap silikon yang nyaman untuk olahraga berat." 
  },
  { 
    id: "jam2", 
    nama: "Classic Silver", 
    gambar: "j2.png", 
    harga: "Rp150.000", 
    kategori: "Elegant", 
    deskripsi: "Desain timeless dengan bahan stainless steel premium. Cocok untuk meeting atau acara formal." 
  },
  { 
    id: "jam3", 
    nama: "Sport Navigator", 
    gambar: "j3.jpg", 
    harga: "Rp180.000", 
    kategori: "Sport", 
    deskripsi: "Dilengkapi dengan fitur kompas dan dual-time zone. Sahabat terbaik untuk para petualang." 
  },
  { 
    id: "jam4", 
    nama: "Midnight Casual", 
    gambar: "j4.jpg", 
    harga: "Rp130.000", 
    kategori: "Casual", 
    deskripsi: "Tampilan minimalis dengan warna hitam doff yang memberikan kesan misterius namun tetap stylish." 
  }
];

// Fungsi helper buat bikin URL detail (biar rapi)
function getDetailUrl(p) {
  return `detail.html?id=${p.id}&nama=${encodeURIComponent(p.nama)}&gambar=${p.gambar}&harga=${p.harga}&deskripsi=${encodeURIComponent(p.deskripsi)}`;
}