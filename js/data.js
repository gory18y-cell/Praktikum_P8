/**
 * TUMBUH — Data Layer (seed data & localStorage persistence)
 * "Belajar. Berkembang. Berdampak."
 */

const TUMBUH_DB_KEY = 'tumbuh_db_v1';

// ─── Seed Data ─────────────────────────────────────────────────────────────

const SEED_DATA = {

  users: [
    { id: 'u001', email: 'admin@tumbuh.id',    password: 'demo1234', role: 'admin',    full_name: 'Rina Hartati',       unit_id: 'unit001', position: 'Administrator', avatar: null, phone: '081234567890', employment_status: 'Aktif', joined_at: '2022-01-15', created_at: '2022-01-15' },
    { id: 'u002', email: 'pegawai@tumbuh.id',  password: 'demo1234', role: 'employee', full_name: 'Andi Pratama',       unit_id: 'unit002', position: 'Pengembang Frontend', avatar: null, phone: '081234567891', employment_status: 'Aktif', joined_at: '2022-03-10', created_at: '2022-03-10' },
    { id: 'u003', email: 'pimpinan@tumbuh.id', password: 'demo1234', role: 'manager',  full_name: 'Budi Santoso',       unit_id: 'unit001', position: 'Kepala Divisi', avatar: null, phone: '081234567892', employment_status: 'Aktif', joined_at: '2021-06-01', created_at: '2021-06-01' },
    { id: 'u004', email: 'peserta@tumbuh.id',  password: 'demo1234', role: 'learner',  full_name: 'Citra Lestari',      unit_id: 'unit003', position: 'Mahasiswa', avatar: null, phone: '081234567893', employment_status: 'Aktif', joined_at: '2023-09-01', created_at: '2023-09-01' },
    { id: 'u005', email: 'rini@tumbuh.id',     password: 'demo1234', role: 'employee', full_name: 'Rini Saputra',       unit_id: 'unit002', position: 'Analis Data', avatar: null, phone: '081234567894', employment_status: 'Aktif', joined_at: '2022-07-20', created_at: '2022-07-20' },
    { id: 'u006', email: 'doni@tumbuh.id',     password: 'demo1234', role: 'employee', full_name: 'Doni Setiawan',      unit_id: 'unit003', position: 'Manajer Proyek', avatar: null, phone: '081234567895', employment_status: 'Aktif', joined_at: '2021-11-05', created_at: '2021-11-05' },
    { id: 'u007', email: 'maya@tumbuh.id',     password: 'demo1234', role: 'employee', full_name: 'Maya Wijaya',        unit_id: 'unit004', position: 'Desainer UI/UX', avatar: null, phone: '081234567896', employment_status: 'Aktif', joined_at: '2023-01-12', created_at: '2023-01-12' },
    { id: 'u008', email: 'fajar@tumbuh.id',    password: 'demo1234', role: 'employee', full_name: 'Fajar Nugraha',      unit_id: 'unit002', position: 'Pengembang Backend', avatar: null, phone: '081234567897', employment_status: 'Cuti', joined_at: '2022-04-18', created_at: '2022-04-18' },
    { id: 'u009', email: 'sari@tumbuh.id',     password: 'demo1234', role: 'employee', full_name: 'Sari Dewi',          unit_id: 'unit004', position: 'HR Specialist', avatar: null, phone: '081234567898', employment_status: 'Aktif', joined_at: '2022-09-25', created_at: '2022-09-25' },
    { id: 'u010', email: 'irwan@tumbuh.id',    password: 'demo1234', role: 'employee', full_name: 'Irwan Kusuma',       unit_id: 'unit003', position: 'Pengajar Senior', avatar: null, phone: '081234567899', employment_status: 'Aktif', joined_at: '2020-08-01', created_at: '2020-08-01' },
    { id: 'u011', email: 'laras@tumbuh.id',    password: 'demo1234', role: 'learner',  full_name: 'Larasati Puspita',   unit_id: 'unit003', position: 'Mahasiswa', avatar: null, phone: '081234567800', employment_status: 'Aktif', joined_at: '2023-09-01', created_at: '2023-09-01' },
    { id: 'u012', email: 'bagus@tumbuh.id',    password: 'demo1234', role: 'learner',  full_name: 'Bagus Prasetyo',     unit_id: 'unit003', position: 'Mahasiswa', avatar: null, phone: '081234567801', employment_status: 'Aktif', joined_at: '2023-09-01', created_at: '2023-09-01' },
    { id: 'u013', email: 'nina@tumbuh.id',     password: 'demo1234', role: 'employee', full_name: 'Nina Rahmawati',     unit_id: 'unit004', position: 'Koordinator Pelatihan', avatar: null, phone: '081234567802', employment_status: 'Aktif', joined_at: '2023-02-14', created_at: '2023-02-14' },
    { id: 'u014', email: 'eko@tumbuh.id',      password: 'demo1234', role: 'employee', full_name: 'Eko Prasetyo',       unit_id: 'unit001', position: 'Staff IT', avatar: null, phone: '081234567803', employment_status: 'Tidak Aktif', joined_at: '2021-03-08', created_at: '2021-03-08' },
    { id: 'u015', email: 'fitri@tumbuh.id',    password: 'demo1234', role: 'employee', full_name: 'Fitri Handayani',    unit_id: 'unit002', position: 'Data Scientist', avatar: null, phone: '081234567804', employment_status: 'Aktif', joined_at: '2022-11-30', created_at: '2022-11-30' },
  ],

  organizational_units: [
    { id: 'unit001', name: 'Divisi Teknologi Informasi', description: 'Mengelola infrastruktur dan pengembangan teknologi', created_at: '2020-01-01' },
    { id: 'unit002', name: 'Divisi Pengembangan Produk', description: 'Riset dan pengembangan produk inovatif', created_at: '2020-01-01' },
    { id: 'unit003', name: 'Divisi Pendidikan', description: 'Mengelola program pendidikan dan pelatihan', created_at: '2020-01-01' },
    { id: 'unit004', name: 'Divisi SDM', description: 'Sumber daya manusia dan pengembangan organisasi', created_at: '2020-01-01' },
  ],

  programs: [
    { id: 'p001', title: 'Data Analytics for Business', slug: 'data-analytics-business', description: 'Pelajari cara menganalisis data bisnis menggunakan tools modern seperti Python, SQL, dan Power BI untuk mengambil keputusan berbasis data.', category: 'Data Analytics', instructor_id: 'u010', start_date: '2024-01-15', end_date: '2024-03-15', quota: 30, enrolled: 24, status: 'Aktif', cover_color: '#DDF4E9', cover_icon: '📊', duration: '8 Minggu', created_at: '2023-12-01' },
    { id: 'p002', title: 'Leadership Development Program', slug: 'leadership-development', description: 'Program komprehensif untuk mengembangkan keterampilan kepemimpinan, komunikasi strategis, dan manajemen tim yang efektif.', category: 'Leadership Development', instructor_id: 'u006', start_date: '2024-02-01', end_date: '2024-04-30', quota: 20, enrolled: 18, status: 'Aktif', cover_color: '#EAE3FA', cover_icon: '🎯', duration: '12 Minggu', created_at: '2023-12-15' },
    { id: 'p003', title: 'Digital Literacy Essentials', slug: 'digital-literacy', description: 'Membangun fondasi literasi digital yang kuat untuk era modern, mencakup keamanan siber, produktivitas digital, dan kolaborasi online.', category: 'Digital Literacy', instructor_id: 'u002', start_date: '2024-01-08', end_date: '2024-02-08', quota: 40, enrolled: 38, status: 'Selesai', cover_color: '#DCEBFC', cover_icon: '💻', duration: '4 Minggu', created_at: '2023-11-20' },
    { id: 'p004', title: 'Project Management Professional', slug: 'project-management', description: 'Persiapan sertifikasi PMP dengan metode Agile dan Waterfall, manajemen risiko, dan perencanaan proyek skala besar.', category: 'Sertifikasi', instructor_id: 'u006', start_date: '2024-03-01', end_date: '2024-06-30', quota: 25, enrolled: 12, status: 'Aktif', cover_color: '#FFF0C9', cover_icon: '📋', duration: '16 Minggu', created_at: '2024-01-10' },
    { id: 'p005', title: 'Komunikasi Efektif di Tempat Kerja', slug: 'komunikasi-efektif', description: 'Tingkatkan kemampuan komunikasi verbal, nonverbal, presentasi, dan negosiasi untuk lingkungan profesional.', category: 'Professional Skills', instructor_id: 'u013', start_date: '2024-02-15', end_date: '2024-03-30', quota: 35, enrolled: 28, status: 'Aktif', cover_color: '#DDF4E9', cover_icon: '💬', duration: '6 Minggu', created_at: '2024-01-05' },
    { id: 'p006', title: 'Machine Learning Dasar', slug: 'machine-learning-dasar', description: 'Pengantar machine learning menggunakan Python dan scikit-learn, mencakup supervised dan unsupervised learning.', category: 'Data Analytics', instructor_id: 'u015', start_date: '2024-04-01', end_date: '2024-07-01', quota: 20, enrolled: 8, status: 'Akan Datang', cover_color: '#EAE3FA', cover_icon: '🤖', duration: '12 Minggu', created_at: '2024-02-01' },
    { id: 'p007', title: 'Design Thinking & Innovation', slug: 'design-thinking', description: 'Metodologi design thinking untuk memecahkan masalah secara kreatif, inovatif, dan berpusat pada pengguna.', category: 'Pengembangan Kompetensi', instructor_id: 'u007', start_date: '2024-03-15', end_date: '2024-05-15', quota: 30, enrolled: 20, status: 'Aktif', cover_color: '#DCEBFC', cover_icon: '💡', duration: '8 Minggu', created_at: '2024-01-20' },
    { id: 'p008', title: 'Microsoft Excel Advanced', slug: 'excel-advanced', description: 'Kuasai Excel tingkat lanjut: pivot table, macro VBA, dashboard, dan analisis data keuangan.', category: 'Professional Skills', instructor_id: 'u005', start_date: '2023-11-01', end_date: '2023-12-15', quota: 50, enrolled: 45, status: 'Selesai', cover_color: '#FFF0C9', cover_icon: '📈', duration: '6 Minggu', created_at: '2023-10-01' },
  ],

  learning_modules: [
    // p001
    { id: 'm001', program_id: 'p001', title: 'Pengantar Data Analytics', description: 'Memahami konsep dasar dan ekosistem analitik data', content_type: 'text', sort_order: 1 },
    { id: 'm002', program_id: 'p001', title: 'SQL untuk Analisis Data', description: 'Query database dengan SQL', content_type: 'video', sort_order: 2 },
    { id: 'm003', program_id: 'p001', title: 'Python untuk Data Science', description: 'Pandas, NumPy, dan visualisasi data', content_type: 'text', sort_order: 3 },
    { id: 'm004', program_id: 'p001', title: 'Visualisasi dengan Power BI', description: 'Dashboard interaktif dan laporan bisnis', content_type: 'video', sort_order: 4 },
    { id: 'm005', program_id: 'p001', title: 'Studi Kasus & Proyek Akhir', description: 'Analisis dataset nyata dan presentasi hasil', content_type: 'assignment', sort_order: 5 },
    // p002
    { id: 'm006', program_id: 'p002', title: 'Fondasi Kepemimpinan Modern', description: 'Gaya kepemimpinan dan adaptasi situasional', content_type: 'text', sort_order: 1 },
    { id: 'm007', program_id: 'p002', title: 'Komunikasi Strategis', description: 'Presentasi persuasif dan pesan yang berdampak', content_type: 'video', sort_order: 2 },
    { id: 'm008', program_id: 'p002', title: 'Manajemen Tim Lintas Fungsi', description: 'Koordinasi dan kolaborasi antar divisi', content_type: 'text', sort_order: 3 },
    { id: 'm009', program_id: 'p002', title: 'Pengambilan Keputusan Berbasis Data', description: 'Framework dan metode keputusan strategis', content_type: 'text', sort_order: 4 },
    // p005
    { id: 'm010', program_id: 'p005', title: 'Komunikasi Verbal & Nonverbal', description: 'Bahasa tubuh, intonasi, dan kejelasan pesan', content_type: 'text', sort_order: 1 },
    { id: 'm011', program_id: 'p005', title: 'Teknik Presentasi Profesional', description: 'Storytelling, slide design, dan public speaking', content_type: 'video', sort_order: 2 },
    { id: 'm012', program_id: 'p005', title: 'Negosiasi Win-Win', description: 'Prinsip dan strategi negosiasi kolaboratif', content_type: 'text', sort_order: 3 },
    // p007
    { id: 'm013', program_id: 'p007', title: 'Empati dan Observasi Pengguna', description: 'User research methods and techniques', content_type: 'text', sort_order: 1 },
    { id: 'm014', program_id: 'p007', title: 'Define dan Ideation', description: 'Problem framing dan brainstorming', content_type: 'text', sort_order: 2 },
    { id: 'm015', program_id: 'p007', title: 'Prototyping & Testing', description: 'Rapid prototyping dan user testing', content_type: 'assignment', sort_order: 3 },
  ],

  enrollments: [
    { id: 'e001', user_id: 'u002', program_id: 'p001', enrollment_date: '2024-01-16', status: 'Aktif', progress: 60, completed_at: null },
    { id: 'e002', user_id: 'u002', program_id: 'p005', enrollment_date: '2024-02-16', status: 'Aktif', progress: 33, completed_at: null },
    { id: 'e003', user_id: 'u002', program_id: 'p003', enrollment_date: '2024-01-09', status: 'Selesai', progress: 100, completed_at: '2024-02-08' },
    { id: 'e004', user_id: 'u004', program_id: 'p001', enrollment_date: '2024-01-17', status: 'Aktif', progress: 40, completed_at: null },
    { id: 'e005', user_id: 'u004', program_id: 'p002', enrollment_date: '2024-02-02', status: 'Aktif', progress: 25, completed_at: null },
    { id: 'e006', user_id: 'u004', program_id: 'p003', enrollment_date: '2024-01-10', status: 'Selesai', progress: 100, completed_at: '2024-02-08' },
    { id: 'e007', user_id: 'u005', program_id: 'p001', enrollment_date: '2024-01-15', status: 'Aktif', progress: 80, completed_at: null },
    { id: 'e008', user_id: 'u005', program_id: 'p008', enrollment_date: '2023-11-02', status: 'Selesai', progress: 100, completed_at: '2023-12-15' },
    { id: 'e009', user_id: 'u006', program_id: 'p004', enrollment_date: '2024-03-02', status: 'Aktif', progress: 20, completed_at: null },
    { id: 'e010', user_id: 'u007', program_id: 'p007', enrollment_date: '2024-03-16', status: 'Aktif', progress: 50, completed_at: null },
    { id: 'e011', user_id: 'u007', program_id: 'p005', enrollment_date: '2024-02-17', status: 'Aktif', progress: 66, completed_at: null },
    { id: 'e012', user_id: 'u008', program_id: 'p003', enrollment_date: '2024-01-08', status: 'Selesai', progress: 100, completed_at: '2024-02-08' },
    { id: 'e013', user_id: 'u009', program_id: 'p005', enrollment_date: '2024-02-15', status: 'Aktif', progress: 10, completed_at: null },
    { id: 'e014', user_id: 'u010', program_id: 'p002', enrollment_date: '2024-02-01', status: 'Aktif', progress: 50, completed_at: null },
    { id: 'e015', user_id: 'u011', program_id: 'p001', enrollment_date: '2024-01-20', status: 'Aktif', progress: 20, completed_at: null },
    { id: 'e016', user_id: 'u011', program_id: 'p003', enrollment_date: '2024-01-09', status: 'Selesai', progress: 100, completed_at: '2024-02-08' },
    { id: 'e017', user_id: 'u012', program_id: 'p007', enrollment_date: '2024-03-16', status: 'Aktif', progress: 33, completed_at: null },
    { id: 'e018', user_id: 'u013', program_id: 'p005', enrollment_date: '2024-02-16', status: 'Aktif', progress: 100, completed_at: null },
    { id: 'e019', user_id: 'u014', program_id: 'p008', enrollment_date: '2023-11-01', status: 'Selesai', progress: 100, completed_at: '2023-12-15' },
    { id: 'e020', user_id: 'u015', program_id: 'p006', enrollment_date: '2024-04-01', status: 'Aktif', progress: 0, completed_at: null },
  ],

  module_progress: [
    { id: 'mp001', user_id: 'u002', module_id: 'm001', status: 'selesai', completed_at: '2024-01-20' },
    { id: 'mp002', user_id: 'u002', module_id: 'm002', status: 'selesai', completed_at: '2024-01-27' },
    { id: 'mp003', user_id: 'u002', module_id: 'm003', status: 'selesai', completed_at: '2024-02-03' },
    { id: 'mp004', user_id: 'u002', module_id: 'm004', status: 'belum', completed_at: null },
    { id: 'mp005', user_id: 'u002', module_id: 'm005', status: 'belum', completed_at: null },
    { id: 'mp006', user_id: 'u002', module_id: 'm010', status: 'selesai', completed_at: '2024-02-20' },
    { id: 'mp007', user_id: 'u004', module_id: 'm001', status: 'selesai', completed_at: '2024-01-22' },
    { id: 'mp008', user_id: 'u004', module_id: 'm002', status: 'selesai', completed_at: '2024-02-01' },
    { id: 'mp009', user_id: 'u005', module_id: 'm001', status: 'selesai', completed_at: '2024-01-18' },
    { id: 'mp010', user_id: 'u005', module_id: 'm002', status: 'selesai', completed_at: '2024-01-25' },
    { id: 'mp011', user_id: 'u005', module_id: 'm003', status: 'selesai', completed_at: '2024-02-01' },
    { id: 'mp012', user_id: 'u005', module_id: 'm004', status: 'selesai', completed_at: '2024-02-10' },
  ],

  competencies: [
    { id: 'c001', name: 'Analisis Data', category: 'Teknikal', description: 'Kemampuan mengolah dan menginterpretasikan data untuk pengambilan keputusan' },
    { id: 'c002', name: 'Komunikasi', category: 'Soft Skill', description: 'Kemampuan menyampaikan pesan secara efektif secara verbal maupun tertulis' },
    { id: 'c003', name: 'Kepemimpinan', category: 'Manajerial', description: 'Kemampuan memimpin, memotivasi, dan mengarahkan tim menuju tujuan bersama' },
    { id: 'c004', name: 'Literasi Digital', category: 'Teknikal', description: 'Pemahaman dan kemahiran menggunakan teknologi digital secara produktif' },
    { id: 'c005', name: 'Kolaborasi', category: 'Soft Skill', description: 'Kemampuan bekerja sama dalam tim lintas fungsi dan latar belakang' },
    { id: 'c006', name: 'Manajemen Proyek', category: 'Manajerial', description: 'Kemampuan merencanakan, melaksanakan, dan mengendalikan proyek secara efisien' },
    { id: 'c007', name: 'Problem Solving', category: 'Soft Skill', description: 'Kemampuan mengidentifikasi masalah dan menemukan solusi kreatif yang efektif' },
  ],

  competency_assessments: [
    { id: 'ca001', user_id: 'u002', competency_id: 'c001', score: 4, target_score: 5, evaluator_id: 'u003', notes: 'Penguasaan Python dan SQL sangat baik. Perlu pengembangan pada storytelling data.', assessed_at: '2024-01-10' },
    { id: 'ca002', user_id: 'u002', competency_id: 'c002', score: 3, target_score: 4, evaluator_id: 'u003', notes: 'Komunikasi teknis sudah baik. Perlu ditingkatkan komunikasi dengan non-technical stakeholder.', assessed_at: '2024-01-10' },
    { id: 'ca003', user_id: 'u002', competency_id: 'c004', score: 5, target_score: 5, evaluator_id: 'u003', notes: 'Literasi digital sangat kuat. Selalu update dengan teknologi terbaru.', assessed_at: '2024-01-10' },
    { id: 'ca004', user_id: 'u002', competency_id: 'c005', score: 4, target_score: 4, evaluator_id: 'u003', notes: 'Tim player yang baik, aktif berkontribusi dalam sprint review.', assessed_at: '2024-01-10' },
    { id: 'ca005', user_id: 'u002', competency_id: 'c007', score: 3, target_score: 4, evaluator_id: 'u003', notes: 'Problem solving masih perlu diperdalam terutama untuk masalah sistem yang kompleks.', assessed_at: '2024-01-10' },
    { id: 'ca006', user_id: 'u005', competency_id: 'c001', score: 5, target_score: 5, evaluator_id: 'u003', notes: 'Sangat mahir dalam analisis statistik dan machine learning.', assessed_at: '2024-01-15' },
    { id: 'ca007', user_id: 'u005', competency_id: 'c002', score: 4, target_score: 4, evaluator_id: 'u003', notes: 'Komunikasi laporan data sangat jelas dan terstruktur.', assessed_at: '2024-01-15' },
    { id: 'ca008', user_id: 'u006', competency_id: 'c003', score: 4, target_score: 5, evaluator_id: 'u003', notes: 'Kepemimpinan sudah bagus, perlu mengembangkan gaya coaching.', assessed_at: '2024-01-12' },
    { id: 'ca009', user_id: 'u006', competency_id: 'c006', score: 5, target_score: 5, evaluator_id: 'u003', notes: 'Manajemen proyek sangat terstruktur dengan track record yang baik.', assessed_at: '2024-01-12' },
    { id: 'ca010', user_id: 'u007', competency_id: 'c007', score: 4, target_score: 5, evaluator_id: 'u003', notes: 'Kreatif dalam ideasi, perlu diperkuat pendekatan sistematis.', assessed_at: '2024-01-20' },
    { id: 'ca011', user_id: 'u004', competency_id: 'c001', score: 2, target_score: 4, evaluator_id: 'u003', notes: 'Masih dalam tahap belajar dasar-dasar analitik data.', assessed_at: '2024-02-01' },
    { id: 'ca012', user_id: 'u004', competency_id: 'c004', score: 3, target_score: 4, evaluator_id: 'u003', notes: 'Memahami tool-tool digital dasar, perlu pengembangan lebih lanjut.', assessed_at: '2024-02-01' },
  ],

  events: [
    { id: 'ev001', title: 'Pelatihan Data Analytics Sesi 1', description: 'Sesi pembuka program Data Analytics for Business', category: 'training', start_at: '2024-10-21T09:00:00', end_at: '2024-10-21T12:00:00', location: 'Ruang Pelatihan A', created_by: 'u001' },
    { id: 'ev002', title: 'Evaluasi Kompetensi Kuartal 4', description: 'Evaluasi kompetensi seluruh pegawai divisi teknologi', category: 'eval', start_at: '2024-10-23T13:00:00', end_at: '2024-10-23T17:00:00', location: 'Aula Utama', created_by: 'u001' },
    { id: 'ev003', title: 'Town Hall Meeting Oktober', description: 'Pertemuan seluruh karyawan bersama pimpinan', category: 'meeting', start_at: '2024-10-25T10:00:00', end_at: '2024-10-25T11:30:00', location: 'Aula Utama', created_by: 'u001' },
    { id: 'ev004', title: 'Workshop Komunikasi Efektif', description: 'Workshop intensif komunikasi dan presentasi profesional', category: 'training', start_at: '2024-10-28T08:30:00', end_at: '2024-10-28T16:00:00', location: 'Ruang Pelatihan B', created_by: 'u001' },
    { id: 'ev005', title: 'Submission Proyek Akhir Data Analytics', description: 'Batas akhir pengumpulan proyek program Data Analytics', category: 'deadline', start_at: '2024-11-01T23:59:00', end_at: '2024-11-01T23:59:00', location: 'Online', created_by: 'u001' },
    { id: 'ev006', title: 'Orientasi Peserta Baru', description: 'Pengenalan platform dan program untuk peserta baru', category: 'training', start_at: '2024-11-04T08:00:00', end_at: '2024-11-04T10:00:00', location: 'Ruang Meeting 1', created_by: 'u001' },
    { id: 'ev007', title: 'Webinar Machine Learning Dasar', description: 'Preview program Machine Learning yang akan dimulai', category: 'training', start_at: '2024-11-06T14:00:00', end_at: '2024-11-06T15:30:00', location: 'Online (Zoom)', created_by: 'u001' },
    { id: 'ev008', title: 'Rapat Pengembangan Kurikulum', description: 'Review dan update kurikulum program pelatihan 2025', category: 'meeting', start_at: '2024-11-08T09:00:00', end_at: '2024-11-08T11:00:00', location: 'Ruang Rapat Direksi', created_by: 'u001' },
    { id: 'ev009', title: 'Sidang Evaluasi Sertifikasi PMP', description: 'Evaluasi akhir peserta program sertifikasi PMP', category: 'eval', start_at: '2024-11-12T09:00:00', end_at: '2024-11-12T16:00:00', location: 'Ruang Ujian', created_by: 'u001' },
    { id: 'ev010', title: 'Pelatihan Leadership Modul 3', description: 'Manajemen Tim Lintas Fungsi', category: 'training', start_at: '2024-10-22T13:00:00', end_at: '2024-10-22T16:00:00', location: 'Ruang Pelatihan A', created_by: 'u001' },
    { id: 'ev011', title: 'Design Thinking Sprint', description: 'Sesi intensif ideasi dan prototyping', category: 'training', start_at: '2024-10-29T08:00:00', end_at: '2024-10-29T17:00:00', location: 'Creative Lab', created_by: 'u001' },
    { id: 'ev012', title: 'Ulasan Kinerja Semester', description: 'Review pencapaian dan target semester', category: 'eval', start_at: '2024-11-15T09:00:00', end_at: '2024-11-15T12:00:00', location: 'Ruang Meeting 2', created_by: 'u001' },
    { id: 'ev013', title: 'Workshop Excel Advanced', description: 'Lanjutan materi Excel tingkat mahir', category: 'training', start_at: '2024-10-24T09:00:00', end_at: '2024-10-24T12:00:00', location: 'Lab Komputer', created_by: 'u001' },
    { id: 'ev014', title: 'Penyerahan Sertifikat Digital Literacy', description: 'Seremoni penyerahan sertifikat peserta program Digital Literacy', category: 'training', start_at: '2024-10-30T14:00:00', end_at: '2024-10-30T15:00:00', location: 'Aula Utama', created_by: 'u001' },
    { id: 'ev015', title: 'Batas Registrasi Program ML Dasar', description: 'Pendaftaran terakhir untuk program Machine Learning', category: 'deadline', start_at: '2024-10-31T23:59:00', end_at: '2024-10-31T23:59:00', location: 'Online', created_by: 'u001' },
  ],

  notifications: [
    { id: 'n001', user_id: 'u002', title: 'Selamat Datang di TUMBUH!', message: 'Akun Anda telah berhasil dibuat. Mulai jelajahi program pelatihan yang tersedia.', category: 'sistem', related_url: '/programs', read_at: '2024-01-16T10:00:00', created_at: '2024-01-16T09:00:00' },
    { id: 'n002', user_id: 'u002', title: 'Pendaftaran Program Berhasil', message: 'Anda berhasil mendaftar ke program Data Analytics for Business. Program dimulai 15 Januari 2024.', category: 'program', related_url: '/programs/p001', read_at: null, created_at: '2024-01-16T09:30:00' },
    { id: 'n003', user_id: 'u002', title: 'Modul Baru Tersedia', message: 'Modul 4: Visualisasi dengan Power BI sudah dapat diakses di program Data Analytics for Business.', category: 'program', related_url: '/programs/p001', read_at: null, created_at: '2024-02-05T08:00:00' },
    { id: 'n004', user_id: 'u002', title: 'Pengingat: Tenggat Proyek Akhir', message: 'Proyek akhir program Data Analytics for Business harus dikumpulkan pada 1 November 2024.', category: 'pengingat', related_url: '/programs/p001', read_at: null, created_at: '2024-10-18T07:00:00' },
    { id: 'n005', user_id: 'u002', title: 'Evaluasi Kompetensi Selesai', message: 'Hasil evaluasi kompetensi Anda sudah tersedia. Skor Anda meningkat di beberapa area.', category: 'evaluasi', related_url: '/competencies', read_at: '2024-01-11T12:00:00', created_at: '2024-01-10T17:00:00' },
    { id: 'n006', user_id: 'u002', title: 'Program Baru: Machine Learning Dasar', message: 'Program Machine Learning Dasar akan dimulai 1 April 2024. Daftarkan diri sekarang!', category: 'program', related_url: '/programs/p006', read_at: null, created_at: '2024-02-01T09:00:00' },
    { id: 'n007', user_id: 'u002', title: 'Jadwal Pelatihan Besok', message: 'Mengingatkan: Pelatihan Data Analytics Sesi 1 dijadwalkan besok pukul 09.00 WIB di Ruang Pelatihan A.', category: 'pengingat', related_url: '/calendar', read_at: null, created_at: '2024-10-20T18:00:00' },
    { id: 'n008', user_id: 'u004', title: 'Selamat Datang di TUMBUH!', message: 'Akun Anda telah berhasil dibuat sebagai Peserta Belajar.', category: 'sistem', related_url: '/dashboard', read_at: '2024-09-02T10:00:00', created_at: '2024-09-01T09:00:00' },
    { id: 'n009', user_id: 'u004', title: 'Sertifikat Digital Literacy Tersedia', message: 'Selamat! Anda telah menyelesaikan program Digital Literacy Essentials. Sertifikat siap diunduh.', category: 'sertifikat', related_url: '/certificates', read_at: null, created_at: '2024-02-09T08:00:00' },
    { id: 'n010', user_id: 'u004', title: 'Pengingat: Tugas Modul 2', message: 'Jangan lupa kumpulkan tugas Modul 2 program Data Analytics sebelum 5 Februari 2024.', category: 'pengingat', related_url: '/programs/p001', read_at: null, created_at: '2024-02-01T08:00:00' },
    { id: 'n011', user_id: 'u001', title: 'Pegawai Baru Terdaftar', message: '3 pegawai baru telah bergabung bulan ini. Lengkapi data profil mereka.', category: 'sistem', related_url: '/sdm', read_at: null, created_at: '2024-10-01T09:00:00' },
    { id: 'n012', user_id: 'u001', title: 'Program Hampir Penuh: Leadership Dev', message: 'Program Leadership Development Program hampir mencapai kuota (18/20 peserta).', category: 'program', related_url: '/programs/p002', read_at: null, created_at: '2024-02-20T10:00:00' },
    { id: 'n013', user_id: 'u001', title: 'Laporan Bulanan Siap', message: 'Laporan partisipasi program bulan September 2024 sudah dapat diunduh.', category: 'laporan', related_url: '/reports', read_at: '2024-10-01T11:00:00', created_at: '2024-10-01T10:30:00' },
    { id: 'n014', user_id: 'u001', title: '5 Profil Pegawai Belum Lengkap', message: 'Terdapat 5 profil pegawai yang belum dilengkapi. Segera lengkapi data untuk keperluan administrasi.', category: 'sistem', related_url: '/sdm', read_at: null, created_at: '2024-10-15T09:00:00' },
    { id: 'n015', user_id: 'u003', title: 'Ringkasan Tim Tersedia', message: 'Laporan perkembangan tim bulan Oktober sudah siap untuk ditinjau.', category: 'laporan', related_url: '/reports', read_at: null, created_at: '2024-10-17T09:00:00' },
    { id: 'n016', user_id: 'u003', title: 'Evaluasi Kompetensi Tim Selesai', message: '12 dari 15 anggota tim telah menyelesaikan evaluasi kompetensi kuartal ini.', category: 'evaluasi', related_url: '/competencies', read_at: null, created_at: '2024-10-10T14:00:00' },
    { id: 'n017', user_id: 'u002', title: 'Sertifikat Digital Literacy Anda', message: 'Sertifikat penyelesaian Digital Literacy Essentials siap diunduh.', category: 'sertifikat', related_url: '/certificates', read_at: '2024-02-10T09:00:00', created_at: '2024-02-09T10:00:00' },
    { id: 'n018', user_id: 'u004', title: 'Rekomendasi Program Baru', message: 'Berdasarkan profil belajar Anda, kami merekomendasikan program Leadership Development Program.', category: 'rekomendasi', related_url: '/programs/p002', read_at: null, created_at: '2024-03-01T09:00:00' },
    { id: 'n019', user_id: 'u002', title: 'Pengumuman: Town Hall Oktober', message: 'Town Hall Meeting akan diselenggarakan 25 Oktober 2024 pukul 10.00 WIB di Aula Utama.', category: 'pengumuman', related_url: '/calendar', read_at: null, created_at: '2024-10-17T10:00:00' },
    { id: 'n020', user_id: 'u001', title: 'Evaluasi Baru Diterima', message: 'Evaluasi kompetensi untuk 3 pegawai telah diterima dan sedang diproses.', category: 'evaluasi', related_url: '/competencies', read_at: null, created_at: '2024-10-17T11:00:00' },
  ],

  certificates: [
    { id: 'cert001', user_id: 'u002', program_id: 'p003', certificate_number: 'CERT-DL-2024-002', issued_at: '2024-02-09' },
    { id: 'cert002', user_id: 'u004', program_id: 'p003', certificate_number: 'CERT-DL-2024-004', issued_at: '2024-02-09' },
    { id: 'cert003', user_id: 'u008', program_id: 'p003', certificate_number: 'CERT-DL-2024-008', issued_at: '2024-02-09' },
    { id: 'cert004', user_id: 'u011', program_id: 'p003', certificate_number: 'CERT-DL-2024-011', issued_at: '2024-02-09' },
    { id: 'cert005', user_id: 'u005', program_id: 'p008', certificate_number: 'CERT-XL-2023-005', issued_at: '2023-12-16' },
    { id: 'cert006', user_id: 'u014', program_id: 'p008', certificate_number: 'CERT-XL-2023-014', issued_at: '2023-12-16' },
  ],

  tasks: [
    { id: 't001', program_id: 'p001', module_id: 'm005', title: 'Proyek Analisis Dataset Penjualan', description: 'Analisis dataset penjualan e-commerce dan buat laporan komprehensif menggunakan Python dan Power BI.', deadline: '2024-11-01', max_score: 100 },
    { id: 't002', program_id: 'p005', module_id: 'm011', title: 'Presentasi Persuasif 5 Menit', description: 'Siapkan dan rekam presentasi 5 menit tentang topik pilihan menggunakan teknik yang dipelajari.', deadline: '2024-03-20', max_score: 100 },
    { id: 't003', program_id: 'p007', module_id: 'm015', title: 'Prototype Solusi Design Thinking', description: 'Buat prototype solusi untuk masalah yang diidentifikasi menggunakan metode design thinking.', deadline: '2024-05-10', max_score: 100 },
  ],

  quiz_attempts: [
    { id: 'qa001', user_id: 'u002', task_id: 't002', score: 85, submitted_at: '2024-03-18', status: 'dinilai' },
    { id: 'qa002', user_id: 'u004', task_id: 't002', score: null, submitted_at: null, status: 'belum' },
    { id: 'qa003', user_id: 'u007', task_id: 't002', score: 90, submitted_at: '2024-03-17', status: 'dinilai' },
  ],

  participation_trend: [
    { month: 'Apr', value: 45 }, { month: 'Mei', value: 62 }, { month: 'Jun', value: 58 },
    { month: 'Jul', value: 74 }, { month: 'Agu', value: 80 }, { month: 'Sep', value: 95 },
    { month: 'Okt', value: 88 },
  ],

  completion_trend: [
    { month: 'Apr', value: 60 }, { month: 'Mei', value: 65 }, { month: 'Jun', value: 70 },
    { month: 'Jul', value: 72 }, { month: 'Agu', value: 75 }, { month: 'Sep', value: 78 },
    { month: 'Okt', value: 81 },
  ],
};

// ─── DB Engine ─────────────────────────────────────────────────────────────

class TumbuhDB {
  constructor() {
    this._load();
  }

  _load() {
    const raw = localStorage.getItem(TUMBUH_DB_KEY);
    if (raw) {
      try {
        this.data = JSON.parse(raw);
        // Merge any missing seed tables (forward compat)
        for (const key of Object.keys(SEED_DATA)) {
          if (!this.data[key]) this.data[key] = SEED_DATA[key];
        }
      } catch(e) {
        this.data = JSON.parse(JSON.stringify(SEED_DATA));
      }
    } else {
      this.data = JSON.parse(JSON.stringify(SEED_DATA));
      this._save();
    }
  }

  _save() {
    localStorage.setItem(TUMBUH_DB_KEY, JSON.stringify(this.data));
  }

  reset() {
    this.data = JSON.parse(JSON.stringify(SEED_DATA));
    this._save();
  }

  // ── Generic helpers ─────────────────────────────────────────
  getAll(table) { return [...(this.data[table] || [])]; }

  getById(table, id) { return this.data[table]?.find(r => r.id === id) || null; }

  insert(table, record) {
    if (!this.data[table]) this.data[table] = [];
    this.data[table].push(record);
    this._save();
    return record;
  }

  update(table, id, changes) {
    const idx = this.data[table]?.findIndex(r => r.id === id);
    if (idx === -1 || idx === undefined) return null;
    this.data[table][idx] = { ...this.data[table][idx], ...changes, updated_at: new Date().toISOString() };
    this._save();
    return this.data[table][idx];
  }

  delete(table, id) {
    const before = this.data[table]?.length || 0;
    this.data[table] = this.data[table]?.filter(r => r.id !== id) || [];
    this._save();
    return this.data[table].length < before;
  }

  generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`;
  }

  // ── Auth ────────────────────────────────────────────────────
  login(email, password) {
    const user = this.data.users.find(u => u.email === email && u.password === password);
    if (!user) return null;
    const { password: _, ...safeUser } = user;
    return safeUser;
  }

  // ── SDM ─────────────────────────────────────────────────────
  getUsers(filters = {}) {
    let users = this.data.users.map(u => ({ ...u }));
    if (filters.role)   users = users.filter(u => u.role === filters.role);
    if (filters.unit_id) users = users.filter(u => u.unit_id === filters.unit_id);
    if (filters.status) users = users.filter(u => u.employment_status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      users = users.filter(u => u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q));
    }
    return users;
  }

  getUserWithDetails(userId) {
    const user = this.getById('users', userId);
    if (!user) return null;
    const unit = this.getById('organizational_units', user.unit_id);
    const enrollments = this.data.enrollments.filter(e => e.user_id === userId);
    const assessments = this.data.competency_assessments.filter(a => a.user_id === userId);
    const certificates = this.data.certificates.filter(c => c.user_id === userId);
    const programs = enrollments.map(e => {
      const p = this.getById('programs', e.program_id);
      return p ? { ...e, program: p } : null;
    }).filter(Boolean);
    const competencies = assessments.map(a => {
      const c = this.getById('competencies', a.competency_id);
      return c ? { ...a, competency: c } : null;
    }).filter(Boolean);
    return { ...user, unit, programs, competencies, certificates };
  }

  // ── Programs ─────────────────────────────────────────────────
  getPrograms(filters = {}) {
    let programs = this.data.programs.map(p => ({ ...p }));
    if (filters.category) programs = programs.filter(p => p.category === filters.category);
    if (filters.status)   programs = programs.filter(p => p.status === filters.status);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      programs = programs.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return programs;
  }

  getProgramWithDetails(programId) {
    const program = this.getById('programs', programId);
    if (!program) return null;
    const instructor = this.getById('users', program.instructor_id);
    const modules = this.data.learning_modules.filter(m => m.program_id === programId).sort((a,b) => a.sort_order - b.sort_order);
    const enrollments = this.data.enrollments.filter(e => e.program_id === programId);
    return { ...program, instructor, modules, enrollments };
  }

  getUserEnrollment(userId, programId) {
    return this.data.enrollments.find(e => e.user_id === userId && e.program_id === programId) || null;
  }

  enroll(userId, programId) {
    const existing = this.getUserEnrollment(userId, programId);
    if (existing) return { error: 'Anda sudah terdaftar pada program ini.' };
    const program = this.getById('programs', programId);
    if (!program) return { error: 'Program tidak ditemukan.' };
    if (program.enrolled >= program.quota) return { error: 'Kuota program sudah penuh.' };
    const enrollment = {
      id: this.generateId('e'),
      user_id: userId,
      program_id: programId,
      enrollment_date: new Date().toISOString().split('T')[0],
      status: 'Aktif',
      progress: 0,
      completed_at: null,
    };
    this.insert('enrollments', enrollment);
    // increment enrolled count
    this.update('programs', programId, { enrolled: program.enrolled + 1 });
    // Add notification
    this.insert('notifications', {
      id: this.generateId('n'),
      user_id: userId,
      title: 'Pendaftaran Program Berhasil',
      message: `Anda berhasil mendaftar ke program ${program.title}.`,
      category: 'program',
      related_url: `/programs/${programId}`,
      read_at: null,
      created_at: new Date().toISOString(),
    });
    return { enrollment };
  }

  completeModule(userId, moduleId) {
    const existing = this.data.module_progress.find(mp => mp.user_id === userId && mp.module_id === moduleId);
    if (existing && existing.status === 'selesai') return existing;
    const module = this.getById('learning_modules', moduleId);
    if (!module) return null;

    if (existing) {
      this.update('module_progress', existing.id, { status: 'selesai', completed_at: new Date().toISOString() });
    } else {
      this.insert('module_progress', {
        id: this.generateId('mp'),
        user_id: userId,
        module_id: moduleId,
        status: 'selesai',
        completed_at: new Date().toISOString(),
      });
    }
    // Recalculate enrollment progress
    const modules = this.data.learning_modules.filter(m => m.program_id === module.program_id);
    const completedModules = modules.filter(m => {
      return this.data.module_progress.some(mp => mp.user_id === userId && mp.module_id === m.id && mp.status === 'selesai');
    });
    const progress = Math.round((completedModules.length / modules.length) * 100);
    const enrollment = this.getUserEnrollment(userId, module.program_id);
    if (enrollment) {
      const updates = { progress };
      if (progress === 100) {
        updates.status = 'Selesai';
        updates.completed_at = new Date().toISOString().split('T')[0];
        // Issue certificate
        this.insert('certificates', {
          id: this.generateId('cert'),
          user_id: userId,
          program_id: module.program_id,
          certificate_number: `CERT-${Date.now()}`,
          issued_at: new Date().toISOString().split('T')[0],
        });
        this.insert('notifications', {
          id: this.generateId('n'),
          user_id: userId,
          title: 'Sertifikat Tersedia',
          message: `Selamat! Anda telah menyelesaikan program dan sertifikat siap diunduh.`,
          category: 'sertifikat',
          related_url: '/certificates',
          read_at: null,
          created_at: new Date().toISOString(),
        });
      }
      this.update('enrollments', enrollment.id, updates);
    }
    return true;
  }

  // ── Competencies ─────────────────────────────────────────────
  getCompetencyData(userId) {
    const assessments = this.data.competency_assessments.filter(a => a.user_id === userId);
    return assessments.map(a => {
      const comp = this.getById('competencies', a.competency_id);
      const evaluator = this.getById('users', a.evaluator_id);
      return { ...a, competency: comp, evaluator };
    });
  }

  saveAssessment(data) {
    const existing = this.data.competency_assessments.find(
      a => a.user_id === data.user_id && a.competency_id === data.competency_id
    );
    if (existing) {
      return this.update('competency_assessments', existing.id, data);
    } else {
      return this.insert('competency_assessments', { id: this.generateId('ca'), ...data, assessed_at: new Date().toISOString().split('T')[0] });
    }
  }

  // ── Notifications ─────────────────────────────────────────────
  getUserNotifications(userId) {
    return this.data.notifications
      .filter(n => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  getUnreadCount(userId) {
    return this.data.notifications.filter(n => n.user_id === userId && !n.read_at).length;
  }

  markNotifRead(notifId) {
    this.update('notifications', notifId, { read_at: new Date().toISOString() });
  }

  markAllRead(userId) {
    this.data.notifications.forEach(n => {
      if (n.user_id === userId && !n.read_at) {
        n.read_at = new Date().toISOString();
      }
    });
    this._save();
  }

  // ── Dashboard stats ───────────────────────────────────────────
  getAdminStats() {
    const totalSDM = this.data.users.filter(u => u.role !== 'admin').length;
    const activePrograms = this.data.programs.filter(p => p.status === 'Aktif').length;
    const totalLearners = this.data.users.filter(u => u.role === 'learner').length;
    const completed = this.data.enrollments.filter(e => e.status === 'Selesai').length;
    const total = this.data.enrollments.length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalSDM, activePrograms, totalLearners, completionRate };
  }

  getManagerStats() {
    const totalSDM = this.data.users.filter(u => ['employee','manager'].includes(u.role)).length;
    const activeEnrollments = this.data.enrollments.filter(e => e.status === 'Aktif').length;
    const participationRate = Math.round((activeEnrollments / this.data.users.length) * 100);
    const completed = this.data.enrollments.filter(e => e.status === 'Selesai').length;
    const total = this.data.enrollments.length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalSDM, activeEnrollments, participationRate, completionRate };
  }

  getLearnerStats(userId) {
    const myEnrollments = this.data.enrollments.filter(e => e.user_id === userId);
    const activePrograms = myEnrollments.filter(e => e.status === 'Aktif').length;
    const completedPrograms = myEnrollments.filter(e => e.status === 'Selesai').length;
    const myCerts = this.data.certificates.filter(c => c.user_id === userId).length;
    const avgProgress = myEnrollments.length > 0
      ? Math.round(myEnrollments.reduce((s, e) => s + e.progress, 0) / myEnrollments.length)
      : 0;
    return { activePrograms, completedPrograms, myCerts, avgProgress };
  }

  // ── Events / Calendar ─────────────────────────────────────────
  getEventsForMonth(year, month) {
    return this.data.events.filter(ev => {
      const d = new Date(ev.start_at);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  }

  getUpcomingEvents(limit = 5) {
    const now = new Date();
    return this.data.events
      .filter(ev => new Date(ev.start_at) >= now)
      .sort((a, b) => new Date(a.start_at) - new Date(b.start_at))
      .slice(0, limit);
  }
}

// Singleton
window.DB = new TumbuhDB();
