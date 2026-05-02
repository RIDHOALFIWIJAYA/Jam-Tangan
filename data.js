const produkData = [
  { 
    id: "jam1", 
    nama: "Seiko", 
    gambar: "j1.png", 
    harga: "Rp35.000", 
    kategori: "Casual", 
    deskripsi: "Jam tangan analog yang bagus dan keren cocok untuk suatu acara atau keperluan yang butuh gaya serius." 
  },
  { 
    id: "jam2", 
    nama: "Seiko", 
    gambar: "j2.png", 
    harga: "Rp35.000", 
    kategori: "Casual", 
    deskripsi: "Desain timeless dengan bahan stainless steel. Cocok untuk meeting atau acara formal." 
  },
  { 
    id: "jam3", 
    nama: "Alba Quartz Hitam", 
    gambar: "j3.jpg", 
    harga: "Rp35.000", 
    kategori: "Casual", 
    deskripsi: "Dilengkapi dengan fitur kompas dan dual-time zone. Sahabat terbaik untuk para petualang." 
  },
  { 
    id: "jam4", 
    nama: "Hush Puppies", 
    gambar: "j4.jpg", 
    harga: "Rp35.000", 
    kategori: "Casual", 
    deskripsi: "Tampilan minimalis dengan warna hitam doff yang memberikan kesan misterius namun tetap stylish." 
  },
  {
    id: "jam5",
    nama: "Swiss Army",
    gambar: "../src/analog/analog1.jpg",
    harga: "Rp35.000",
    kategori: "Casual",
    deskripsi: "Tampilan bagus dengan warna coklat glosy yang keren yang ngebuat jam inituh ada feelnya tersendiri"
  },
  {
    id: "jam6",
    nama: "Hush puppies",
    gambar: "../src/analog/analog2.jpg",
    harga: "Rp35.000",
    kategori: "Casual",
    deskripsi: "Tampilan bagus dengan warna hitam yang elegant dan minimalis cocok untuk kamu yang suka dengan gaya minimalis"
  },
    {
    id: "jam7",
    nama: "Swiss Army",
    gambar: "../src/analog/analog3.jpg",
    harga: "Rp35.000",
    kategori: "Casual",
    deskripsi: "Tampilan bagus dengan warna hitam yang elegant dan minimalis cocok untuk kamu yang suka dengan gaya minimalis"
  }
];

// Fungsi helper buat bikin URL detail (biar rapi)
function getDetailUrl(p) {
  return `detail.html?id=${p.id}&nama=${encodeURIComponent(p.nama)}&gambar=${p.gambar}&harga=${p.harga}&deskripsi=${encodeURIComponent(p.deskripsi)}`;
}