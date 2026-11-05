let mutasi = JSON.parse(localStorage.getItem('mutasi_kas_logistik')) || [];

const form = document.getElementById('mutasi-form');
const inputKet = document.getElementById('keterangan');
const inputNom = document.getElementById('nominal');
const selectJenis = document.getElementById('jenis');
const inputEditId = document.getElementById('edit-id');
const btnSubmit = document.getElementById('btn-submit');
const btnBatal = document.getElementById('btn-batal');
const saldoEl = document.getElementById('total-saldo');
const debitEl = document.getElementById('total-debit');
const kreditEl = document.getElementById('total-kredit');
const countEl = document.getElementById('total-transaksi');
const tabelList = document.getElementById('mutasi-list');
const sortSelect = document.getElementById('sort-select');

const formatAngka = (val) => Number(val).toLocaleString('id-ID');
const formatRupiah = (val) => 'Rp ' + formatAngka(val);

inputNom.addEventListener('input', function () {
  const clean = this.value.replace(/\D/g, '');
  this.value = clean ? formatAngka(clean) : '';
});

function hitungSaldo(excludeId = null) {
  return mutasi.reduce((tot, m) => m.id === excludeId ? tot : tot + (m.jenis === 'debit' ? m.nominal : -m.nominal), 0);
}

function renderApp() {
  const totalSaldo = hitungSaldo();
  const totalDebit = mutasi.filter(m => m.jenis === 'debit').reduce((acc, m) => acc + m.nominal, 0);
  const totalKredit = mutasi.filter(m => m.jenis === 'kredit').reduce((acc, m) => acc + m.nominal, 0);

  saldoEl.textContent = formatRupiah(totalSaldo);
  saldoEl.className = totalSaldo <= 0 ? 'saldo-negatif' : 'saldo-positif';
  if (debitEl) debitEl.textContent = formatRupiah(totalDebit);
  if (kreditEl) kreditEl.textContent = formatRupiah(totalKredit);
  if (countEl) countEl.textContent = `${mutasi.length} Transaksi`;

  localStorage.setItem('mutasi_kas_logistik', JSON.stringify(mutasi));
  localStorage.setItem('saldo_kas_logistik', totalSaldo);

  const sortBy = sortSelect ? sortSelect.value : 'default';
  let dataRender = [...mutasi];

  if (sortBy === 'ket-asc') dataRender.sort((a, b) => a.keterangan.localeCompare(b.keterangan));
  else if (sortBy === 'jenis') dataRender.sort((a, b) => a.jenis.localeCompare(b.jenis));
  else if (sortBy === 'nom-desc') dataRender.sort((a, b) => b.nominal - a.nominal);
  else if (sortBy === 'nom-asc') dataRender.sort((a, b) => a.nominal - b.nominal);

  if (dataRender.length === 0) {
    tabelList.innerHTML = '<tr><td colspan="5" class="empty-msg">Belum ada riwayat mutasi kas logistik.</td></tr>';
    return;
  }

  tabelList.innerHTML = dataRender.map((item, index) => {
    const isDebit = item.jenis === 'debit';
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(item.keterangan)}</td>
        <td><span class="badge ${isDebit ? 'badge-debit' : 'badge-kredit'}">${isDebit ? 'DEBIT' : 'KREDIT'}</span></td>
        <td>${formatRupiah(item.nominal)}</td>
        <td>
          <button type="button" class="btn-sm btn-edit" onclick="mulaiEdit('${item.id}')">Edit</button>
          <button type="button" class="btn-sm btn-hapus" onclick="hapusMutasi('${item.id}')">Hapus</button>
        </td>
      </tr>`;
  }).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const ket = inputKet.value.trim();
  const nom = Number(inputNom.value.replace(/\./g, ''));
  const jenis = selectJenis.value;
  const id = inputEditId.value;

  if (ket.length < 3) {
    alert('Validasi Gagal: Keterangan minimal harus 3 karakter!');
    inputKet.focus();
    return;
  }
  if (!nom || nom <= 0) {
    alert('Validasi Gagal: Nominal harus berupa angka lebih dari 0!');
    inputNom.focus();
    return;
  }

  const saldoTersedia = hitungSaldo(id || null);
  if (jenis === 'kredit' && nom > saldoTersedia) {
    alert(`Transaksi Kredit Ditolak! Nominal (${formatRupiah(nom)}) melebihi total saldo kas (${formatRupiah(saldoTersedia)}).`);
    inputNom.focus();
    return;
  }

  if (id) {
    const target = mutasi.find(m => m.id === id);
    if (target) { target.keterangan = ket; target.nominal = nom; target.jenis = jenis; }
  } else {
    mutasi.unshift({ id: Date.now().toString(), keterangan: ket, nominal: nom, jenis: jenis });
  }

  resetForm();
  renderApp();
});

function mulaiEdit(id) {
  const item = mutasi.find(m => m.id === id);
  if (!item) return;
  inputEditId.value = item.id;
  inputKet.value = item.keterangan;
  inputNom.value = formatAngka(item.nominal);
  selectJenis.value = item.jenis;
  btnSubmit.textContent = 'Simpan Perubahan';
  btnBatal.style.display = 'inline-block';
  inputKet.focus();
}

function resetForm() {
  form.reset();
  inputEditId.value = '';
  btnSubmit.textContent = 'Tambah Mutasi';
  btnBatal.style.display = 'none';
}

function hapusMutasi(id) {
  if (confirm('Konfirmasi Hapus: Apakah Anda yakin ingin menghapus transaksi ini?')) {
    mutasi = mutasi.filter(m => m.id !== id);
    if (inputEditId.value === id) resetForm();
    renderApp();
  }
}

renderApp();