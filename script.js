// 1. Muat data dari produk.json
document.addEventListener('DOMContentLoaded', () => {
  fetch('produk.json')
    .then(response => response.json())
    .then(data => {
      renderProduk(data);
    })
    .catch(error => {
      console.error('Gagal memuat produk:', error);
    });
});

// 2. Render produk ke halaman
function renderProduk(produkList) {
  const produkContainer = document.getElementById('produk-container');
  produkList.forEach(produk => {
    const item = document.createElement('div');
    item.className = 'produk-item';
    item.innerHTML = `
      <h3>${produk.nama}</h3>
      <p>Rp ${produk.harga.toLocaleString('id-ID')}</p>
      <button onclick="kurangi(${produk.id})">-</button>
      <span id="qty-${produk.id}">0</span>
      <button onclick="tambah(${produk.id})">+</button>
    `;
    produkContainer.appendChild(item);
  });
}

// 3. Fungsi tambah dan kurangi
function tambah(id) {
  const qtyElement = document.getElementById(`qty-${id}`);
  let jumlah = parseInt(qtyElement.textContent);
  jumlah++;
  qtyElement.textContent = jumlah;
  // Tambahkan logika subtotal di sini kalau mau
}

function kurangi(id) {
  const qtyElement = document.getElementById(`qty-${id}`);
  let jumlah = parseInt(qtyElement.textContent);
  if (jumlah > 0) jumlah--;
  qtyElement.textContent = jumlah;
  // Tambahkan logika subtotal di sini kalau mau
}
