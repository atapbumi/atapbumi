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

function renderProduk(produkList) {
  const produkContainer = document.getElementById('produk-container'); // div di HTML
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
