/**
 * TUMBUH — Utility Functions & Shared Helpers
 */

// ─── Auth State ──────────────────────────────────────────────────────────────
const AUTH_KEY = 'tumbuh_session';

const Auth = {
  getUser() {
    const raw = sessionStorage.getItem(AUTH_KEY) || localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setUser(user, persist = false) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
    if (persist) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
  },
  logout() {
    sessionStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_KEY);
    showToast('Berhasil keluar. Mengalihkan ke halaman masuk...', 'info', 1500);
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 350);
  },
  require(roles = []) {
    const user = this.getUser();
    if (!user) { window.location.href = 'login.html'; return null; }
    if (roles.length && !roles.includes(user.role)) {
      window.location.href = '403.html';
      return null;
    }
    return user;
  }
};
window.Auth = Auth;
window.logout = () => Auth.logout();

// ─── Toast Notifications ─────────────────────────────────────────────────────
function showToast(message, type = 'success', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span style="font-size:1.1em;font-weight:bold">${icons[type]||'•'}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove());
  }, duration);
}

// ─── Modal Helper ─────────────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('hidden'); document.body.style.overflow = ''; }
}
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
  document.body.style.overflow = '';
}
// Close on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) closeAllModals();
});
// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});

// ─── Format Helpers ───────────────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatTime(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}
function formatDateTime(dateStr) {
  if (!dateStr) return '-';
  return formatDateShort(dateStr) + ' ' + formatTime(dateStr);
}
function timeAgo(dateStr) {
  const now = new Date();
  const d = new Date(dateStr);
  const diff = (now - d) / 1000;
  if (diff < 60) return 'baru saja';
  if (diff < 3600) return `${Math.floor(diff/60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff/3600)} jam lalu`;
  if (diff < 604800) return `${Math.floor(diff/86400)} hari lalu`;
  return formatDateShort(dateStr);
}
function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

// ─── Avatar Initials ──────────────────────────────────────────────────────────
function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
const AVATAR_COLORS = ['#086B50','#15966F','#1E5FAD','#5B3FBF','#D69A24','#D95757','#17865D'];
function getAvatarColor(str) {
  let hash = 0;
  for (let i = 0; i < (str||'').length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function avatarHTML(user, size = 'md') {
  const initials = getInitials(user.full_name);
  const color = getAvatarColor(user.id || user.full_name);
  return `<div class="avatar avatar-${size}" style="background:${color}20;color:${color}">${initials}</div>`;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function statusBadge(status) {
  const map = {
    'Aktif':       'badge-green',
    'Selesai':     'badge-blue',
    'Akan Datang': 'badge-yellow',
    'Tidak Aktif': 'badge-gray',
    'Cuti':        'badge-lavender',
    'Arsip':       'badge-gray',
    'Pending':     'badge-yellow',
  };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

function roleBadge(role) {
  const map = {
    admin:    { label: 'Admin',    cls: 'badge-green' },
    employee: { label: 'Pegawai',  cls: 'badge-blue' },
    manager:  { label: 'Pimpinan', cls: 'badge-lavender' },
    learner:  { label: 'Peserta',  cls: 'badge-yellow' },
  };
  const m = map[role] || { label: role, cls: 'badge-gray' };
  return `<span class="badge ${m.cls}">${m.label}</span>`;
}

function categoryBadge(cat) {
  const map = {
    'Data Analytics':          'badge-blue',
    'Leadership Development':  'badge-lavender',
    'Digital Literacy':        'badge-green',
    'Professional Skills':     'badge-yellow',
    'Sertifikasi':             'badge-red',
    'Pengembangan Kompetensi': 'badge-green',
  };
  return `<span class="badge ${map[cat] || 'badge-gray'}">${cat}</span>`;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function progressBarHTML(value, color = '') {
  const cls = value >= 75 ? '' : value >= 40 ? '' : 'danger';
  return `<div class="progress-bar" title="${value}% selesai">
    <div class="progress-fill ${color || cls}" style="width:${value}%"></div>
  </div>`;
}

// ─── Confirm Dialog ───────────────────────────────────────────────────────────
function confirmDialog(message, onConfirm, options = {}) {
  const existing = document.getElementById('global-confirm-modal');
  if (existing) existing.remove();

  const title = options.title || 'Konfirmasi';
  const confirmText = options.confirmText || 'Ya, Lanjutkan';
  const confirmClass = options.danger ? 'btn-danger-outline' : 'btn-primary';

  const modal = document.createElement('div');
  modal.id = 'global-confirm-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal modal-sm">
      <div class="modal-header">
        <h3 class="text-lg font-bold">${title}</h3>
        <button class="btn btn-ghost btn-icon btn-close-confirm" onclick="document.getElementById('global-confirm-modal').remove(); document.body.style.overflow=''">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="modal-body">
        <p class="text-sm" style="line-height:1.6">${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="document.getElementById('global-confirm-modal').remove(); document.body.style.overflow=''">Batal</button>
        <button class="btn ${confirmClass}" id="confirm-ok-btn">${confirmText}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  document.getElementById('confirm-ok-btn').addEventListener('click', () => {
    modal.remove();
    document.body.style.overflow = '';
    onConfirm();
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) { modal.remove(); document.body.style.overflow = ''; }
  });
}

// ─── Table Helpers ────────────────────────────────────────────────────────────
function setupSortableTable(tableId, data, renderFn) {
  const table = document.getElementById(tableId);
  if (!table) return;
  table.querySelectorAll('th.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.col;
      const asc = th.dataset.asc !== 'true';
      th.dataset.asc = asc;
      table.querySelectorAll('th.sortable').forEach(h => h.removeAttribute('data-asc'));
      th.dataset.asc = asc;
      const sorted = [...data].sort((a, b) => {
        if (a[col] < b[col]) return asc ? -1 : 1;
        if (a[col] > b[col]) return asc ? 1 : -1;
        return 0;
      });
      renderFn(sorted);
    });
  });
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function createPagination(total, page, perPage, onChange) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return '';
  let html = `<div class="pagination">`;
  html += `<button class="page-btn" ${page<=1?'disabled':''} onclick="(${onChange})(${page-1})">‹</button>`;
  for (let i = 1; i <= pages; i++) {
    if (pages > 7 && Math.abs(i - page) > 2 && i !== 1 && i !== pages) {
      if (Math.abs(i - page) === 3) html += `<span class="page-btn">…</span>`;
      continue;
    }
    html += `<button class="page-btn ${i===page?'active':''}" onclick="(${onChange})(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" ${page>=pages?'disabled':''} onclick="(${onChange})(${page+1})">›</button>`;
  html += `</div>`;
  return html;
}

// ─── Export CSV ───────────────────────────────────────────────────────────────
function exportCSV(data, filename, columns) {
  if (!data || data.length === 0) { showToast('Tidak ada data untuk diekspor.', 'warning'); return; }
  const headers = columns.map(c => c.label).join(',');
  const rows = data.map(row => columns.map(c => {
    const val = c.key.split('.').reduce((o, k) => o?.[k], row) ?? '';
    return `"${String(val).replace(/"/g, '""')}"`;
  }).join(','));
  const csv = [headers, ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  showToast(`File ${filename} berhasil diunduh.`, 'success');
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────
let _dropdownDelegationInitialized = false;
function setupDropdowns() {
  if (_dropdownDelegationInitialized) return;
  _dropdownDelegationInitialized = true;

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-dropdown-toggle]');
    if (trigger) {
      e.stopPropagation();
      const menuId = trigger.dataset.dropdownToggle;
      const menu = document.getElementById(menuId);
      if (!menu) return;
      const isOpen = !menu.classList.contains('hidden');
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
      if (!isOpen) {
        menu.classList.remove('hidden');
      }
      return;
    }

    const insideMenu = e.target.closest('.dropdown-menu');
    const clickedItem = e.target.closest('.dropdown-item');
    if (!insideMenu || clickedItem) {
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
    }
  });
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function setupTabs(containerSelector) {
  document.querySelectorAll(containerSelector + ' .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      const container = btn.closest(containerSelector) || document;
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const content = document.getElementById(tabId);
      if (content) content.classList.add('active');
    });
  });
}

// ─── Lucide Icons (inline svg helper) ────────────────────────────────────────
// We reference lucide via CDN; this is a tiny fallback wrapper
function icon(name, size = 18, extra = '') {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px" ${extra}></i>`;
}

// ─── App Shell Builder ────────────────────────────────────────────────────────
function buildAppShell(activeNav, user) {
  const navItems = getNavItems(user.role);
  const unreadCount = DB.getUnreadCount(user.id);

  const navHTML = navItems.map(item => `
    <li>
      <div class="nav-item ${activeNav === item.id ? 'active' : ''}" onclick="navigate('${item.url}')">
        <span class="nav-item-icon">${icon(item.icon, 18)}</span>
        <span class="nav-item-text">${item.label}</span>
        ${item.id === 'notifications' && unreadCount > 0 ? `<span class="nav-item-badge">${unreadCount}</span>` : ''}
      </div>
    </li>
  `).join('');

  // Bottom nav (top 5 items)
  const bottomItems = navItems.slice(0, 5);
  const bottomHTML = bottomItems.map(item => `
    <div class="bottom-nav-item ${activeNav === item.id ? 'active' : ''}" onclick="navigate('${item.url}')">
      <div class="bottom-nav-indicator"></div>
      ${icon(item.icon, 22)}
      <span class="bottom-nav-label">${item.label.split(' ')[0]}</span>
      ${item.id === 'notifications' && unreadCount > 0 ? `<span class="notif-badge" style="position:absolute;top:4px;right:6px;font-size:9px;min-width:14px;height:14px">${unreadCount}</span>` : ''}
    </div>
  `).join('');

  return `
    <div class="app-shell" id="app-shell">
      <!-- Sidebar overlay (mobile) -->
      <div class="sidebar-overlay" id="sidebar-overlay" onclick="toggleSidebar()"></div>

      <!-- Sidebar -->
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-brand">
          ${logoSVG(32, 'white')}
          <div class="sidebar-brand-text">
            <div class="brand-name">TUMBUH</div>
            <div class="brand-tagline">Belajar. Berkembang. Berdampak.</div>
          </div>
        </div>

        <nav class="sidebar-nav">
          <ul>${navHTML}</ul>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-footer-inner">
            <div class="sidebar-user" onclick="navigate('profile.html')" title="Lihat Profil (${user.full_name})">
              ${avatarHTML(user, 'sm')}
              <div class="sidebar-user-info">
                <div class="sidebar-user-name">${user.full_name}</div>
                <div class="sidebar-user-role">${getRoleLabel(user.role)}</div>
              </div>
            </div>
            <div class="sidebar-footer-actions">
              <button class="sidebar-footer-btn danger" onclick="Auth.logout()" title="Keluar dari Akun (Logout)" aria-label="Keluar dari akun">
                ${icon('log-out', 18)}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Wrapper -->
      <div class="main-wrapper">
        <!-- Topbar -->
        <header class="topbar">
          <div class="topbar-left">
            <button class="topbar-mobile-toggle btn btn-ghost btn-icon" onclick="toggleSidebar()">
              ${icon('menu', 20)}
            </button>
            <div class="topbar-search search-box">
              ${icon('search', 16)}
              <input type="text" placeholder="Cari nama, program, atau menu..." id="global-search" onkeyup="handleGlobalSearch(this.value)">
            </div>
          </div>
          <div class="topbar-right">
            <button class="topbar-icon-btn" onclick="navigate('notifications.html')" title="Notifikasi" style="position:relative">
              ${icon('bell', 20)}
              ${unreadCount > 0 ? `<span class="notif-badge" style="position:absolute;top:4px;right:4px">${unreadCount}</span>` : ''}
            </button>
            <div class="dropdown">
              <div class="topbar-user" data-dropdown-toggle="user-dropdown">
                ${avatarHTML(user, 'sm')}
                <div class="topbar-user-info">
                  <div class="topbar-user-name">${user.full_name}</div>
                  <div class="topbar-user-role">${getRoleLabel(user.role)}</div>
                </div>
                ${icon('chevron-down', 16)}
              </div>
              <div class="dropdown-menu hidden" id="user-dropdown">
                <div class="dropdown-item" onclick="navigate('profile.html')">
                  ${icon('user', 16)} Profil Saya
                </div>
                <div class="dropdown-item" onclick="navigate('settings.html')">
                  ${icon('settings', 16)} Pengaturan
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item danger" onclick="Auth.logout()">
                  ${icon('log-out', 16)} Keluar
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content Slot -->
        <main class="main-content" id="main-content">
          <!-- Content injected here -->
        </main>
      </div>

      <!-- Bottom Navigation (Mobile) -->
      <nav class="bottom-nav">
        <div class="bottom-nav-inner">${bottomHTML}</div>
      </nav>
    </div>
  `;
}

function getNavItems(role) {
  const allItems = {
    admin: [
      { id: 'dashboard',  label: 'Beranda',         icon: 'layout-dashboard', url: 'dashboard.html' },
      { id: 'sdm',        label: 'Manajemen SDM',   icon: 'users',            url: 'sdm.html' },
      { id: 'programs',   label: 'Pendidikan & Pelatihan', icon: 'book-open', url: 'programs.html' },
      { id: 'competencies',label:'Kompetensi',       icon: 'star',             url: 'competencies.html' },
      { id: 'calendar',   label: 'Kalender',         icon: 'calendar',         url: 'calendar.html' },
      { id: 'reports',    label: 'Laporan & Analitik',icon:'bar-chart-2',      url: 'reports.html' },
      { id: 'notifications',label:'Notifikasi',       icon: 'bell',             url: 'notifications.html' },
      { id: 'settings',   label: 'Pengaturan',       icon: 'settings',         url: 'settings.html' },
    ],
    employee: [
      { id: 'dashboard',     label: 'Beranda',          icon: 'layout-dashboard', url: 'dashboard.html' },
      { id: 'programs',      label: 'Program Saya',     icon: 'book-open',        url: 'programs.html' },
      { id: 'competencies',  label: 'Kompetensi Saya',  icon: 'star',             url: 'competencies.html' },
      { id: 'calendar',      label: 'Jadwal',           icon: 'calendar',         url: 'calendar.html' },
      { id: 'notifications', label: 'Notifikasi',       icon: 'bell',             url: 'notifications.html' },
      { id: 'profile',       label: 'Profil Saya',      icon: 'user',             url: 'profile.html' },
    ],
    manager: [
      { id: 'dashboard',     label: 'Beranda',          icon: 'layout-dashboard', url: 'dashboard.html' },
      { id: 'sdm',           label: 'Tim Saya',         icon: 'users',            url: 'sdm.html' },
      { id: 'reports',       label: 'Laporan',          icon: 'bar-chart-2',      url: 'reports.html' },
      { id: 'competencies',  label: 'Kompetensi',       icon: 'star',             url: 'competencies.html' },
      { id: 'calendar',      label: 'Kalender',         icon: 'calendar',         url: 'calendar.html' },
      { id: 'notifications', label: 'Notifikasi',       icon: 'bell',             url: 'notifications.html' },
    ],
    learner: [
      { id: 'dashboard',     label: 'Beranda',          icon: 'layout-dashboard', url: 'dashboard.html' },
      { id: 'programs',      label: 'Program Belajar',  icon: 'book-open',        url: 'programs.html' },
      { id: 'calendar',      label: 'Jadwal',           icon: 'calendar',         url: 'calendar.html' },
      { id: 'notifications', label: 'Notifikasi',       icon: 'bell',             url: 'notifications.html' },
      { id: 'profile',       label: 'Profil Saya',      icon: 'user',             url: 'profile.html' },
    ],
  };
  return allItems[role] || allItems.employee;
}

function getRoleLabel(role) {
  const map = { admin: 'Admin / Operator', employee: 'Pegawai / Pendidik', manager: 'Pimpinan / Manajer', learner: 'Peserta Belajar' };
  return map[role] || role;
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function navigate(url) {
  window.location.href = url;
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar) return;
  if (window.innerWidth > 1024) {
    sidebar.classList.toggle('collapsed');
  } else {
    sidebar.classList.toggle('mobile-open');
    overlay?.classList.toggle('visible');
  }
}

function toggleUserMenu() {
  // handled by setupDropdowns
}

function handleGlobalSearch(q) {
  if (!q || q.length < 2) return;
  // In a real app, this would be more sophisticated
}

// ─── Logo SVG ─────────────────────────────────────────────────────────────────
function logoSVG(size = 40, variant = 'color') {
  const primary = variant === 'white' ? '#ffffff' : '#086B50';
  const secondary = variant === 'white' ? 'rgba(255,255,255,0.7)' : '#15966F';
  const bg = variant === 'white' ? 'rgba(255,255,255,0.15)' : '#DDF4E9';
  return `<svg width="${size}" height="${size}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="TUMBUH Logo">
    <rect width="40" height="40" rx="10" fill="${bg}"/>
    <!-- Book -->
    <path d="M8 28V14C8 13.4 8.4 13 9 13H19C19.6 13 20 13.4 20 14V28H8Z" fill="${primary}" opacity="0.85"/>
    <path d="M20 28V14C20 13.4 20.4 13 21 13H31C31.6 13 32 13.4 32 14V28H20Z" fill="${secondary}"/>
    <path d="M7 28H33" stroke="${primary}" stroke-width="2" stroke-linecap="round"/>
    <!-- Sprout -->
    <path d="M20 13C20 13 20 9 17 7C17 7 20 7 20 10" fill="${primary}" opacity="0.9"/>
    <path d="M20 13C20 13 20 8 23 6C23 6 20 7 20 10" fill="${secondary}"/>
    <path d="M20 13V7" stroke="${primary}" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`;
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function breadcrumbHTML(items) {
  return `<div class="breadcrumb">
    ${items.map((item, i) => {
      if (i === items.length - 1) return `<span>${item.label}</span>`;
      return `<a href="${item.url || '#'}">${item.label}</a><span class="breadcrumb-sep">/</span>`;
    }).join('')}
  </div>`;
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function emptyStateHTML(iconName, title, description, ctaLabel = '', ctaFn = '') {
  return `<div class="empty-state">
    <div class="empty-icon">${icon(iconName, 32)}</div>
    <div>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    ${ctaLabel ? `<button class="btn btn-primary" onclick="${ctaFn}">${icon('plus',16)} ${ctaLabel}</button>` : ''}
  </div>`;
}

// ─── Chart Wrapper ────────────────────────────────────────────────────────────
// Simple bar chart using pure CSS/HTML since Chart.js CDN may be slow
// Also integrates with Chart.js if available
function renderBarChart(canvasId, labels, values, color = '#086B50', label = '') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (window.Chart) {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: label || 'Nilai',
          data: values,
          backgroundColor: color + '99',
          borderColor: color,
          borderWidth: 2,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: !!label } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#DFE9E2' } },
          x: { grid: { display: false } },
        }
      }
    });
  }
}

function renderLineChart(canvasId, labels, datasets) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  new Chart(canvas, {
    type: 'line',
    data: {
      labels,
      datasets: datasets.map((ds, i) => ({
        ...ds,
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: ds.fill !== undefined ? ds.fill : false,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#DFE9E2' } },
        x: { grid: { display: false } },
      },
      interaction: { intersect: false, mode: 'index' }
    }
  });
}

function renderDoughnutChart(canvasId, labels, values, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'right', labels: { padding: 16, font: { size: 12 } } },
        tooltip: { callbacks: { label: (c) => ` ${c.label}: ${c.raw}%` } }
      },
      cutout: '65%'
    }
  });
}

function renderRadarChart(canvasId, labels, datasets) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !window.Chart) return;
  new Chart(canvas, {
    type: 'radar',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          ticks: { stepSize: 1, font: { size: 10 } },
          grid: { color: '#DFE9E2' },
          pointLabels: { font: { size: 11, weight: '600' } }
        }
      },
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// ─── Form Validation ──────────────────────────────────────────────────────────
function validateForm(formId, rules) {
  const form = document.getElementById(formId);
  if (!form) return false;
  let valid = true;

  // Clear previous errors
  form.querySelectorAll('.form-error').forEach(el => el.remove());
  form.querySelectorAll('.form-input.error, .form-select.error').forEach(el => el.classList.remove('error'));

  for (const [fieldId, fieldRules] of Object.entries(rules)) {
    const field = document.getElementById(fieldId);
    if (!field) continue;
    const value = field.value.trim();

    for (const rule of fieldRules) {
      let error = null;
      if (rule.required && !value) error = rule.message || 'Field ini wajib diisi.';
      else if (rule.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = rule.message || 'Format email tidak valid.';
      else if (rule.minLength && value.length < rule.minLength) error = rule.message || `Minimal ${rule.minLength} karakter.`;
      else if (rule.pattern && value && !rule.pattern.test(value)) error = rule.message || 'Format tidak valid.';

      if (error) {
        valid = false;
        field.classList.add('error');
        const errEl = document.createElement('span');
        errEl.className = 'form-error';
        errEl.textContent = error;
        field.parentNode.appendChild(errEl);
        break;
      }
    }
  }
  return valid;
}

// ─── Certificate Generator & Downloader ───────────────────────────────────────
function downloadCertificate(certId) {
  if (typeof DB === 'undefined') return;
  const cert = DB.getById('certificates', certId);
  if (!cert) {
    if (typeof showToast === 'function') showToast('Sertifikat tidak ditemukan', 'error');
    return;
  }
  const program = DB.getById('programs', cert.program_id);
  const user = DB.getById('users', cert.user_id);
  const recipientName = user ? user.full_name : 'Peserta Program';
  const programTitle = program ? program.title : 'Program Pelatihan';
  const certNumber = cert.certificate_number || `CERT-TMB-${Date.now()}`;
  const issueDate = typeof formatDate === 'function' ? formatDate(cert.issued_at) : (cert.issued_at || '-');

  if (typeof showToast === 'function') {
    showToast(`Membuka sertifikat ${programTitle}...`, 'info');
  }

  const certWindow = window.open('', '_blank');
  if (!certWindow) {
    if (typeof showToast === 'function') {
      showToast('Popup diblokir browser. Izinkan popup untuk mengunduh sertifikat.', 'warning');
    }
    return;
  }

  const certHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sertifikat ${programTitle} - ${recipientName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #F5F8F3;
      color: #193A32;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* Top Sticky Action Bar */
    .cert-toolbar {
      position: sticky;
      top: 0;
      z-index: 999;
      background: #064E3B;
      color: #FFFFFF;
      padding: 12px 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
    }
    .toolbar-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .toolbar-icon {
      font-size: 26px;
      line-height: 1;
    }
    .toolbar-title {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .toolbar-sub {
      font-size: 11px;
      color: #A7F3D0;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .toolbar-badge {
      background: rgba(16, 185, 129, 0.25);
      border: 1px solid #10B981;
      padding: 1px 7px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 700;
      color: #D1FAE5;
    }
    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .cert-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      text-decoration: none;
    }
    .cert-btn-primary {
      background: #10B981;
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.35);
    }
    .cert-btn-primary:hover {
      background: #059669;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.45);
    }
    .cert-btn-secondary {
      background: rgba(255, 255, 255, 0.12);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.25);
    }
    .cert-btn-secondary:hover {
      background: rgba(255, 255, 255, 0.22);
      transform: translateY(-1px);
    }
    .cert-btn-close {
      background: transparent;
      color: #D1FAE5;
      padding: 9px 12px;
    }
    .cert-btn-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
    }

    /* Notification Tip */
    .download-tip {
      background: #ECFDF5;
      border-bottom: 1px solid #A7F3D0;
      color: #065F46;
      font-size: 12.5px;
      text-align: center;
      padding: 9px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    /* Viewport Container */
    .cert-viewport {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 35px 20px;
    }

    /* Certificate Box */
    .cert {
      background: #FFFFFF;
      width: 860px;
      min-height: 580px;
      padding: 48px 56px 42px;
      text-align: center;
      border: 3px solid #086B50;
      position: relative;
      box-shadow: 0 14px 40px rgba(0, 0, 0, 0.09);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cert-border {
      position: absolute;
      inset: 12px;
      border: 1px solid #DDF4E9;
      pointer-events: none;
    }
    .cert-corner {
      position: absolute;
      width: 22px;
      height: 22px;
      border-color: #086B50;
      border-style: solid;
      pointer-events: none;
    }
    .cert-corner-tl { top: 16px; left: 16px; border-width: 3px 0 0 3px; }
    .cert-corner-tr { top: 16px; right: 16px; border-width: 3px 3px 0 0; }
    .cert-corner-bl { bottom: 16px; left: 16px; border-width: 0 0 3px 3px; }
    .cert-corner-br { bottom: 16px; right: 16px; border-width: 0 3px 3px 0; }

    .cert-logo {
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #086B50;
      font-weight: 700;
      margin-bottom: 12px;
    }
    h1 {
      color: #086B50;
      font-size: 2.35rem;
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 700;
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }
    .cert-given-to {
      font-size: 1rem;
      color: #667770;
      margin: 14px 0 4px;
    }
    h2 {
      color: #193A32;
      font-size: 1.85rem;
      font-weight: 800;
      margin: 6px 0;
    }
    .name-line {
      width: 140px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #2D9F75, transparent);
      margin: 0 auto 14px;
    }
    .cert-reason {
      color: #667770;
      font-size: 0.95rem;
    }
    h3 {
      color: #086B50;
      font-size: 1.35rem;
      font-weight: 700;
      margin: 10px 0;
    }
    .cert-event {
      color: #667770;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    /* Signatures & Seal section */
    .cert-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 28px;
      padding-top: 10px;
    }
    .signature-box {
      width: 190px;
      text-align: center;
    }
    .sig-svg {
      width: 130px;
      height: 40px;
      margin: 0 auto 4px;
      display: block;
    }
    .sig-name {
      font-size: 11.5px;
      font-weight: 700;
      color: #193A32;
      border-top: 1px solid #C4D6CD;
      padding-top: 5px;
    }
    .sig-title {
      font-size: 10px;
      color: #667770;
    }

    .seal-box {
      text-align: center;
      width: 110px;
    }
    .seal-badge {
      width: 68px;
      height: 68px;
      margin: 0 auto;
    }

    .cert-num {
      font-size: 11px;
      color: #9BAAA3;
      margin-top: 24px;
      letter-spacing: 0.5px;
    }

    /* Print Styles */
    @media print {
      @page {
        size: A4 landscape;
        margin: 0;
      }
      html, body {
        background: #FFFFFF !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .cert-toolbar, .download-tip, .no-print {
        display: none !important;
      }
      .cert-viewport {
        padding: 0 !important;
        margin: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 100vh !important;
      }
      .cert {
        width: 275mm !important;
        height: 185mm !important;
        box-shadow: none !important;
        border: 3px solid #086B50 !important;
        margin: auto !important;
        page-break-inside: avoid !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        padding: 14mm 18mm !important;
      }
      .cert-footer-row {
        flex-direction: row !important;
      }
    }
  </style>
</head>
<body>
  <!-- Action Toolbar -->
  <header class="cert-toolbar no-print">
    <div class="toolbar-info">
      <span class="toolbar-icon">🌱</span>
      <div>
        <div class="toolbar-title">Sertifikat Digital Resmi TUMBUH</div>
        <div class="toolbar-sub">
          <span>No: ${certNumber}</span>
          <span class="toolbar-badge">✓ Terverifikasi</span>
        </div>
      </div>
    </div>
    <div class="toolbar-actions">
      <button class="cert-btn cert-btn-secondary" id="btn-png" onclick="downloadAsPNG()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        Unduh Gambar (PNG)
      </button>
      <button class="cert-btn cert-btn-primary" onclick="window.print()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        Cetak / Simpan PDF
      </button>
      <button class="cert-btn cert-btn-close" onclick="window.close()" title="Tutup pratinjau">✕ Tutup</button>
    </div>
  </header>

  <!-- Download Tips Banner -->
  <div class="download-tip no-print">
    <span>💡 <strong>Fitur Unduh Aktif:</strong> Klik <strong>Unduh Gambar (PNG)</strong> untuk mengunduh gambar sertifikat langsung ke perangkat, atau klik <strong>Cetak / Simpan PDF</strong> untuk menyimpan dokumen PDF resmi.</span>
  </div>

  <!-- Certificate Viewport -->
  <main class="cert-viewport">
    <div class="cert">
      <div class="cert-border"></div>
      <div class="cert-corner cert-corner-tl"></div>
      <div class="cert-corner cert-corner-tr"></div>
      <div class="cert-corner cert-corner-bl"></div>
      <div class="cert-corner cert-corner-br"></div>

      <div class="cert-header">
        <p class="cert-logo">🌱 TUMBUH — LEARNING & TALENT ECOSYSTEM</p>
        <h1>Sertifikat Penyelesaian</h1>
        <p class="cert-given-to">Diberikan kepada</p>
        <h2>${recipientName}</h2>
        <div class="name-line"></div>
        <p class="cert-reason">telah berhasil menyelesaikan program</p>
        <h3>${programTitle}</h3>
        <p class="cert-event">yang diselenggarakan oleh platform TUMBUH pada ${issueDate}</p>
      </div>

      <div class="cert-footer">
        <div class="cert-footer-row">
          <div class="signature-box">
            <svg class="sig-svg" viewBox="0 0 160 50" fill="none" stroke="#086B50" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 35 C25 15, 35 10, 45 30 C50 40, 60 42, 70 20 C75 10, 85 15, 95 32 C105 45, 115 15, 135 25 Q145 30 150 15" />
              <path d="M40 32 L140 28" stroke-width="1.2" opacity="0.6"/>
            </svg>
            <div class="sig-name">Dr. Ir. Hendra Wijaya, M.Sc.</div>
            <div class="sig-title">Direktur Eksekutif TUMBUH</div>
          </div>

          <div class="seal-box">
            <svg class="seal-badge" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="46" fill="#F0FDF4" stroke="#086B50" stroke-width="3"/>
              <circle cx="50" cy="50" r="39" stroke="#2D9F75" stroke-width="1.5" stroke-dasharray="4 3"/>
              <circle cx="50" cy="50" r="31" fill="#086B50" fill-opacity="0.08"/>
              <path d="M50 20 L53 28 L62 29 L55 35 L57 44 L50 39 L43 44 L45 35 L38 29 L47 28 Z" fill="#D97706"/>
              <path d="M38 52 L46 60 L64 42" stroke="#086B50" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="50" y="73" font-size="7.5" font-weight="bold" fill="#086B50" text-anchor="middle" font-family="sans-serif" letter-spacing="1">VERIFIED</text>
              <text x="50" y="81" font-size="6" fill="#667770" text-anchor="middle" font-family="sans-serif" letter-spacing="0.5">TUMBUH</text>
            </svg>
          </div>

          <div class="signature-box">
            <svg class="sig-svg" viewBox="0 0 160 50" fill="none" stroke="#086B50" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 28 C30 10, 40 45, 55 20 C65 5, 80 40, 95 18 C110 32, 125 12, 145 22" />
              <path d="M30 40 Q85 30 140 38" stroke-width="1.2" opacity="0.6"/>
            </svg>
            <div class="sig-name">Rina Marlina, M.Kom.</div>
            <div class="sig-title">Head of Curriculum & Talent</div>
          </div>
        </div>

        <div class="cert-num">No. Sertifikat: ${certNumber}</div>
      </div>
    </div>
  </main>

  <script>
  function downloadAsPNG() {
    const btn = document.getElementById('btn-png');
    const origHtml = btn ? btn.innerHTML : '';
    if (btn) btn.innerHTML = '⏳ Menyiapkan...';

    try {
      const canvas = document.createElement('canvas');
      const dpr = 2; // High-res 2x scale
      const width = 860;
      const height = 580;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      // Background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Outer border
      ctx.strokeStyle = '#086B50';
      ctx.lineWidth = 3;
      ctx.strokeRect(1.5, 1.5, width - 3, height - 3);

      // Inner border
      ctx.strokeStyle = '#DDF4E9';
      ctx.lineWidth = 1;
      ctx.strokeRect(12, 12, width - 24, height - 24);

      // Corner brackets
      ctx.strokeStyle = '#086B50';
      ctx.lineWidth = 3;
      const cLen = 22;
      // TL
      ctx.beginPath(); ctx.moveTo(16, 16 + cLen); ctx.lineTo(16, 16); ctx.lineTo(16 + cLen, 16); ctx.stroke();
      // TR
      ctx.beginPath(); ctx.moveTo(width - 16 - cLen, 16); ctx.lineTo(width - 16, 16); ctx.lineTo(width - 16, 16 + cLen); ctx.stroke();
      // BL
      ctx.beginPath(); ctx.moveTo(16, height - 16 - cLen); ctx.lineTo(16, height - 16); ctx.lineTo(16 + cLen, height - 16); ctx.stroke();
      // BR
      ctx.beginPath(); ctx.moveTo(width - 16 - cLen, height - 16); ctx.lineTo(width - 16, height - 16); ctx.lineTo(width - 16, height - 16 - cLen); ctx.stroke();

      // Top Tagline
      ctx.fillStyle = '#086B50';
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🌱 TUMBUH — LEARNING & TALENT ECOSYSTEM', width / 2, 54);

      // Main Title
      ctx.font = 'bold 32px Georgia, "Times New Roman", serif';
      ctx.fillText('Sertifikat Penyelesaian', width / 2, 102);

      // Diberikan kepada
      ctx.fillStyle = '#667770';
      ctx.font = '15px Arial, sans-serif';
      ctx.fillText('Diberikan kepada', width / 2, 138);

      // Recipient Name
      ctx.fillStyle = '#193A32';
      ctx.font = 'bold 28px Arial, sans-serif';
      ctx.fillText(${JSON.stringify(recipientName)}, width / 2, 178);

      // Name underline
      ctx.strokeStyle = '#2D9F75';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 70, 192);
      ctx.lineTo(width / 2 + 70, 192);
      ctx.stroke();

      // Reason
      ctx.fillStyle = '#667770';
      ctx.font = '14px Arial, sans-serif';
      ctx.fillText('telah berhasil menyelesaikan program', width / 2, 222);

      // Program Title
      ctx.fillStyle = '#086B50';
      ctx.font = 'bold 20px Arial, sans-serif';
      ctx.fillText(${JSON.stringify(programTitle)}, width / 2, 254);

      // Event & Date
      ctx.fillStyle = '#667770';
      ctx.font = '13px Arial, sans-serif';
      ctx.fillText('yang diselenggarakan oleh platform TUMBUH pada ' + ${JSON.stringify(issueDate)}, width / 2, 284);

      // Signatures
      // Left Signature: Dr. Ir. Hendra Wijaya
      ctx.strokeStyle = '#086B50';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(90, 420);
      ctx.bezierCurveTo(110, 395, 130, 390, 150, 415);
      ctx.bezierCurveTo(160, 425, 175, 425, 190, 400);
      ctx.bezierCurveTo(195, 390, 205, 395, 215, 412);
      ctx.stroke();

      ctx.strokeStyle = '#C4D6CD';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(80, 435); ctx.lineTo(240, 435); ctx.stroke();
      ctx.fillStyle = '#193A32';
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillText('Dr. Ir. Hendra Wijaya, M.Sc.', 160, 452);
      ctx.fillStyle = '#667770';
      ctx.font = '10px Arial, sans-serif';
      ctx.fillText('Direktur Eksekutif TUMBUH', 160, 467);

      // Center Official Seal
      const cx = width / 2;
      const cy = 430;
      ctx.beginPath();
      ctx.arc(cx, cy, 34, 0, Math.PI * 2);
      ctx.fillStyle = '#F0FDF4';
      ctx.fill();
      ctx.strokeStyle = '#086B50';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.setLineDash([3, 2]);
      ctx.strokeStyle = '#2D9F75';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#086B50';
      ctx.font = 'bold 9px Arial, sans-serif';
      ctx.fillText('VERIFIED', cx, cy - 2);
      ctx.font = '7px Arial, sans-serif';
      ctx.fillStyle = '#667770';
      ctx.fillText('TUMBUH ECOSYSTEM', cx, cy + 10);
      ctx.fillText('OFFICIAL CREDENTIAL', cx, cy + 20);

      // Right Signature: Rina Marlina
      ctx.strokeStyle = '#086B50';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width - 230, 415);
      ctx.bezierCurveTo(width - 210, 395, width - 195, 435, width - 175, 405);
      ctx.bezierCurveTo(width - 160, 390, width - 140, 430, width - 120, 402);
      ctx.stroke();

      ctx.strokeStyle = '#C4D6CD';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(width - 240, 435); ctx.lineTo(width - 80, 435); ctx.stroke();
      ctx.fillStyle = '#193A32';
      ctx.font = 'bold 11px Arial, sans-serif';
      ctx.fillText('Rina Marlina, M.Kom.', width - 160, 452);
      ctx.fillStyle = '#667770';
      ctx.font = '10px Arial, sans-serif';
      ctx.fillText('Head of Curriculum & Talent', width - 160, 467);

      // Certificate Number
      ctx.fillStyle = '#9BAAA3';
      ctx.font = '11px Arial, sans-serif';
      ctx.fillText('No. Sertifikat: ' + ${JSON.stringify(certNumber)}, width / 2, 532);

      canvas.toBlob(function(blob) {
        if (btn) btn.innerHTML = origHtml;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const safeName = ('Sertifikat_' + ${JSON.stringify(recipientName)} + '_' + ${JSON.stringify(programTitle)}).replace(/[^a-zA-Z0-9_\\-]/g, '_');
        a.href = url;
        a.download = safeName + '.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(url); }, 2000);
      }, 'image/png');
    } catch (err) {
      console.error(err);
      if (btn) btn.innerHTML = origHtml;
      alert('Gagal membuat file gambar. Gunakan tombol Cetak / Simpan PDF sebagai alternatif.');
    }
  }
  </script>
</body>
</html>`;

  certWindow.document.open();
  certWindow.document.write(certHtml);
  certWindow.document.close();
}
window.downloadCertificate = downloadCertificate;

// ─── DOM Ready ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupDropdowns();
  // Re-init lucide icons if available
  if (window.lucide) window.lucide.createIcons();
});
