let keranjang = {};
let semuaProduk = [];

// Ambil data produk dari produk.json
fetch('produk.json')
  .then(response => response.json())
  .then(data => {
    semuaProduk = data;
    tampilkanProduk(data);
    loadKeranjang();
  })
  .catch(error => {
    console.error('Gagal memuat produk:', error);
  });

// Tampilkan daftar produk
function tampilkanProduk(data) {
  const container = document.getElementById('produk-container');
  if (!container) return;

  container.innerHTML = '';
  data.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'produk-item';
    div.innerHTML = `
      <h4>${item.nama}</h4>
      <p>Rp ${item.harga.toLocaleString()}</p>
      <button onclick="tambahKeKeranjang(${index})">Tambah</button>
    `;
    container.appendChild(div);
  });
}

// Tambahkan ke keranjang
function tambahKeKeranjang(index) {
  const produk = semuaProduk[index];
  if (keranjang[produk.nama]) {
    keranjang[produk.nama].jumlah += 1;
  } else {
    keranjang[produk.nama] = { ...produk, jumlah: 1 };
  }
  simpanKeranjang();
  updateKeranjangTampilan();
}

// Simpan keranjang ke localStorage
function simpanKeranjang() {
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
}

// Ambil keranjang dari localStorage
function loadKeranjang() {
  const data = localStorage.getItem('keranjang');
  if (data) {
    keranjang = JSON.parse(data);
    updateKeranjangTampilan();
  }
}

// Update tampilan keranjang
function updateKeranjangTampilan() {
  const tempat = document.getElementById('keranjang-isi');
  const total = document.getElementById('total-bayar');
  if (!tempat || !total) return;

  tempat.innerHTML = '';
  let totalHarga = 0;

  Object.values(keranjang).forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nama} x ${item.jumlah} = Rp ${(item.harga * item.jumlah).toLocaleString()}`;
    tempat.appendChild(li);
    totalHarga += item.harga * item.jumlah;
  });

  total.textContent = 'Rp ' + totalHarga.toLocaleString();
}
