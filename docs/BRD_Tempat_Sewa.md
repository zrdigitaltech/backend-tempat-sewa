# Business Requirements Document (BRD) — Backend Admin Sewa

Proyek: backend-admin-sewa
Versi: 0.1
Tanggal: 2026-07-06
Penulis: Tim Pengembangan

---

## 1. Ringkasan Proyek

`backend-admin-sewa` adalah layanan backend yang menyediakan API dan panel admin untuk mengelola seluruh operasi platform sewa: manajemen pengguna dan peran, moderasi listing, rekonsiliasi transaksi, pembuatan laporan, pengaturan sistem, dan audit/security. Fokusnya adalah pada kebutuhan tim operasional dan akuntansi untuk memastikan data konsisten, aman, dan mudah diaudit.

## 2. Pemangku Kepentingan

- Product Owner: (ditentukan)
- Tim Operasional / Finance
- Tim Support / Customer Service
- Tim Backend (Laravel)
- Tim DevOps
- Tim QA

## 3. Tujuan Bisnis

1. Memberikan alat kontrol pusat (admin) untuk mengelola listing, transaksi, dan pengguna.
2. Mempermudah rekonsiliasi pembayaran dan pelaporan keuangan bulanan.
3. Menjamin kepatuhan keamanan dan audit terhadap perubahan data sensitif.

## 4. Ruang Lingkup (MVP)

In-scope:

- Autentikasi admin + role-based access control (RBAC)
- Manajemen user (view, edit, suspend, roles)
- Moderasi listing (approve/reject, edit metadata, set featured)
- Lihat/manajemen transaksi & invoice (filter, export, manual adjust)
- Dashboard KPI & laporan (pendapatan, booking, masalah open)
- Audit log untuk operasi sensitif (user, transaksi, pengaturan)
- Notifikasi untuk tim (email/slack) saat kejadian kritikal
- Integrasi basic dengan gateway pembayaran untuk status rekonsiliasi

Out-of-scope (MVP):

- Modul akuntansi lengkap (integrasi ERP)
- Sistem dispute automation kompleks

## 5. Persyaratan Fungsional Utama

- FR-ADM-01: Admin Authentication & Authorization
  - Login SSO/Email, 2FA optional, session management, RBAC.

- FR-ADM-02: User Management
  - Cari, filter, edit profil, suspend/reactivate, assign roles and permissions.

- FR-ADM-03: Listing Moderation
  - Lihat pending listing, approve/reject, edit konten, menandai listing bermasalah.

- FR-ADM-04: Transaction & Invoice Management
  - Sinkron status pembayaran, mark as paid/refund, create manual invoice adjustments, export CSV.

- FR-ADM-05: Dashboard & Reports
  - KPI overview (daily/weekly/monthly), revenue report, reconciliation report, export PDF/CSV.

- FR-ADM-06: Audit & Compliance
  - Simpan audit trail untuk perubahan kritikal, pencarian audit, retention policy.

- FR-ADM-07: System Settings
  - Konfigurasi fee, tax, operational limits, maintenance mode.

## 6. Persyaratan Non-Fungsional

- NFR-ADM-SEC: Semua tindakan sensitif harus tercatat di audit log; akses terbatas berdasarkan role.
- NFR-ADM-PERF: Endpoint admin read harus merespons < 500ms pada beban normal.
- NFR-ADM-SCAL: Backend dapat diskalakan secara horizontal; job batch untuk laporan dijalankan asinkron.
- NFR-ADM-AVAIL: High availability untuk API admin (SLA internal 99.5%).

## 7. Use Cases & User Flows (Ringkas)

- UC-ADM-01: Admin login → dashboard → lihat notifikasi rekonsiliasi → telusuri transaksi.
- UC-ADM-02: Moderator melihat listing baru → memeriksa dokumen/foto → approve/reject → notifikasi ke owner.
- UC-ADM-03: Finance membuka laporan pendapatan bulanan → ekspor CSV → rekonsiliasi dengan bank.

## 8. User Stories (Contoh)

- US-ADM-01: Sebagai admin, saya ingin login dan melihat ringkasan KPI sehingga saya dapat memantau kesehatan platform.
- US-ADM-02: Sebagai moderator, saya ingin melihat daftar listing yang menunggu moderasi agar memastikan kualitas konten.
- US-ADM-03: Sebagai staff finance, saya ingin menandai transaksi sebagai reconciled agar laporan akurat.

## 9. Acceptance Criteria (Contoh)

- AC-ADM-LOGIN-1: Admin yang valid dapat login; percobaan login gagal lebih dari N kali mengunci akun sementara.
- AC-ADM-LISTING-1: Saat moderator menekan Approve, status listing berubah menjadi `published` dan owner diberi notifikasi.
- AC-ADM-TRANS-1: Finance dapat menandai invoice sebagai `reconciled`; perubahan tercatat di audit log.

## 10. Data & Integrasi

- Sumber data: database utama (MySQL), payment gateway webhook, storage untuk file upload.
- Integrasi: payment gateway (status webhook), email provider, optional Slack webhook untuk notifikasi kritikal.

## 11. API Endpoints (Admin-focused)

- Auth
  - POST /api/admin/login
  - POST /api/admin/logout
  - POST /api/admin/2fa/verify

- Users
  - GET /api/admin/users
  - GET /api/admin/users/{id}
  - PUT /api/admin/users/{id}
  - POST /api/admin/users/{id}/suspend

- Listings
  - GET /api/admin/listings?status=pending
  - POST /api/admin/listings/{id}/approve
  - POST /api/admin/listings/{id}/reject
  - PUT /api/admin/listings/{id}

- Transactions
  - GET /api/admin/transactions
  - GET /api/admin/transactions/{id}
  - POST /api/admin/transactions/{id}/reconcile
  - POST /api/admin/transactions/{id}/refund

- Reports
  - GET /api/admin/reports/revenue?from=...&to=...
  - GET /api/admin/reports/reconciliation?from=...&to=...

## 12. Operational Concerns

- Audit retention: simpan log selama minimal 1 tahun.
- Backup & restore for financial tables: daily backup, point-in-time restore.
- Monitoring: metrics (Prometheus), alerts (PagerDuty/Slack) pada error rate dan latency.

## 13. Risks & Mitigations

- Risiko: Kesalahan manual pada adjustment transaksi → Mitigasi: require 2nd-level approval untuk manual adjustments.
- Risiko: Data inconsistency antara gateway & DB → Mitigasi: proses rekonsiliasi batch + webhook retry.

## 14. Timeline (Estimasi)

- Week 0: Kickoff, infra & access setup, BRD approval
- Week 1-2: Auth, RBAC, basic Users API
- Week 3-4: Listings moderation, Transactions view
- Week 5: Reports, reconciliation flows, audit logs
- Week 6: QA, hardening, deployment & runbook

## 15. Deliverables

1. BRD (dokumen ini)
2. OpenAPI spec (skeleton) untuk endpoint admin
3. Backoffice UI wireframes (opsional)
4. Runbook & SOP untuk proses rekonsiliasi

---

Catatan: Jika Anda ingin saya mengadaptasi BRD ini menjadi PDF, menambahkan ERD atau membuat OpenAPI skeleton, sebutkan pilihan Anda dan saya akan lanjutkan.
