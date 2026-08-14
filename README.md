# 🚀 Muhammad Rakha Syamputra - Interactive Gen-Z Web Portfolio

Web Portofolio interaktif dan modern yang dirancang khusus untuk memamerkan keahlian, proyek, sertifikasi, kompetisi, dan pengalaman profesional **Muhammad Rakha Syamputra** sebagai IT Project Manager, Product Manager, Software Developer, dan Tech Leader. 

Aplikasi ini dibangun menggunakan stack modern berbasis **React (Vite)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, dan terintegrasi penuh dengan **Supabase Database** untuk manajemen data dinamis serta sistem logging aktivitas pengunjung yang *real-time*.

---

## 🌟 Fitur Utama (Key Features)

### 1. 🤖 Coura AI Chatbot (Groq API Integrated)
* **Asisten AI Interaktif**: Pengunjung dapat bertanya langsung kepada asisten AI bernama **Coura** seputar profil, proyek, keahlian, dan riwayat profesional Rakha.
* **LLM Modern**: Didukung oleh model `llama-3.3-70b-versatile` melalui integrasi **Groq API**.
* **Anti-Hallucination & System Prompt**: Dilengkapi dengan basis data pengetahuan internal yang ketat, aturan pendeteksi *prompt injection*, serta petunjuk respon percakapan natural maksimal 3 paragraf.
* **UI Menarik**: Menampilkan video avatar asisten `/Coura-Gif.mp4` dengan mikro-animasi cincin aura yang halus di pojok layar.

### 2. 🎮 Terminal Cyber Decryptor (RobCo retro hacking game)
* **Mini Game Retro**: Terinspirasi dari terminal hacking mini game *Fallout (RobCo Termlink)*.
* **Web Audio API Synth**: Dilengkapi dengan synthesizer suara retro dinamis langsung dari kode browser (tanpa aset file audio eksternal) untuk efek suara hover, klik, kesalahan, dan keberhasilan.
* **Hacking Mechanics**: Pengunjung menebak kata sandi 7 karakter dengan petunjuk "Likeness Score" (kesamaan posisi huruf) dan bypass kelompok tanda kurung (`[...]`, `<...>`, dll.) untuk memulihkan kesempatan atau menghapus kata salah (*duds*).
* **Clearance Reward**: Berhasil menyelesaikan dekripsi terminal memberikan akses clearance khusus untuk mengunduh dokumen CV/Resume terbaru.

### 3. 🛡️ Portal Admin & Activity Logger
* **Dashboard Admin Terproteksi**: Guard Route khusus yang membatasi akses ke folder dashboard admin.
* **CRUD Dinamis**: CRUD penuh secara real-time untuk data Projects, Project Categories, Experiences, Competitions, Education, Achievements, dan Dokumen CV.
* **Website Logs Monitor**: Log internal melacak navigasi rute pengunjung (*public pageviews*) dan aksi perubahan database oleh sistem (*system-level logs*).
* **Supabase Storage Integration**: Mengunggah gambar/logo proyek atau file CV secara langsung ke bucket penyimpanan Supabase.

### 4. 💫 Gen-Z Custom Avatars
* **Guestbook Feed**: Pengunjung dapat meninggalkan pesan di buku tamu dengan memilih avatar bertema Gen-Z (seperti *Cyberpunk Hacker, Tech Geek, Lofi Chill, Vaporwave Dreamer, Skater Kid, Y2K Pop, Retro Pixel, Astro Explorer*, serta avatar kustom eksklusif *King Rakha*).
* **Deterministic Fallback**: Sistem menggunakan algoritma hashing teks untuk memberikan avatar default yang konsisten bagi komentar-komentar lama berdasarkan ID pesan.

### 5. 📊 Social Feed & Contribution Sync
* **LinkedIn & Instagram Carousel**: Integrasi *embed frame* LinkedIn dan Instagram dengan kontrol embla-carousel modern untuk sinkronisasi aktivitas terbaru.
* **GitHub Stats Integration**: Integrasi kartu ringkasan kontribusi GitHub yang dinamis secara real-time.

### 6. 🌐 Multilingual (i18n Localization)
* Dukungan translasi bahasa lengkap antara **Bahasa Indonesia (ID)** dan **English (EN)** dengan tombol peralihan instan di navbar.

---

## 🛠️ Stack Teknologi (Tech Stack)

| Kategori | Teknologi | Deskripsi |
|---|---|---|
| **Core Framework** | React 18 & TypeScript | Struktur dasar komponen interaktif & type safety |
| **Build Tool** | Vite | Akselerasi bundling & hot module replacement |
| **Styling** | Tailwind CSS & Tailwind Animate | Desain responsif, modern, dan transisi layout |
| **Animation** | Framer Motion | Animasi interaktif, spring physics, & exit-transitions |
| **Database & Auth** | Supabase JS client | Database PostgreSQL cloud, Authentication, & Storage |
| **AI Integration** | Groq API Cloud | Inference model Llama 3.3 untuk asisten virtual |
| **Notification** | EmailJS Browser | Pengiriman email otomatis notifikasi pengisian Guestbook & Contact |
| **Routing** | React Router DOM v6 | Single Page App Routing dengan Lazy Loading |
| **State & Fetching**| Tanstack React Query v5 | Sinkronisasi data server, caching otomatis, & status CRUD |
| **UI Components** | Radix UI & Lucide React | Library komponen aksibilitas tinggi dan ikon vektor premium |

---

## 📁 Struktur Direktori (Project Layout)

```text
My-Portofolio/
├── src/
│   ├── components/
│   │   ├── ui/                       # Shadcn UI primitives (accordion, dialog, dll.)
│   │   ├── About.tsx                 # Informasi biografi detail
│   │   ├── Chatbot.tsx               # Komponen asisten AI Coura
│   │   ├── DecryptionGame.tsx        # Game hacking retro RobCo
│   │   ├── GenzAvatars.tsx           # Kumpulan avatar SVG Gen-Z
│   │   ├── GuestbookFeed.tsx         # Komponen daftar komentar pengunjung
│   │   ├── Hero.tsx                  # Landing hero utama
│   │   ├── SocialFeed.tsx            # Carousel postingan LinkedIn & Instagram
│   │   └── ...
│   ├── data/                         # Berkas fallback data lokal
│   ├── hooks/                        # Custom React Hooks (misalnya useCVLink)
│   ├── lib/
│   │   ├── chatbot-knowledge.ts      # Basis pengetahuan & system prompt Coura
│   │   ├── logger.ts                 # Sistem log pengunjung & DB activities
│   │   ├── supabase.ts               # Klien Supabase & fungsi CRUD database
│   │   └── emailjs.ts                # Integrasi push notifikasi email
│   ├── pages/
│   │   ├── admin/                    # Kumpulan halaman Dashboard Admin
│   │   │   ├── AdminDashboard.tsx    # Statistik umum portfolio
│   │   │   ├── AdminLogs.tsx         # Real-time monitoring website_logs
│   │   │   ├── AdminGuestbook.tsx    # Moderasi komentar buku tamu
│   │   │   ├── admin.css             # Tema styling gelap premium admin panel
│   │   │   └── ...
│   │   ├── Index.tsx                 # Root Landing Page
│   │   ├── AboutPage.tsx             # Halaman detail biografi
│   │   ├── ProjectsPage.tsx          # Halaman filter portofolio project
│   │   └── ...
│   ├── App.tsx                       # React Router & Providers setup
│   ├── index.css                     # Custom styling & setup utility classes
│   └── main.tsx                      # Entry point React
├── index.html                        # Base template HTML
├── package.json                      # Konfigurasi dependensi project
├── tailwind.config.ts                # Kustomisasi tema & warna Tailwind
└── vite.config.ts                    # Konfigurasi bundler Vite
```

---

## ⚙️ Konfigurasi Environment (`.env`)

Buat sebuah berkas `.env` di dalam folder root `My-Portofolio/` dan lengkapi variabel berikut untuk mengaktifkan semua modul interaktif:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anonymous-key

# AI Chatbot Configuration (Groq Cloud)
VITE_GROQ_API_KEY=gsk_your-groq-cloud-api-key

# EmailJS Service Configuration
VITE_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
VITE_EMAILJS_SERVICE_ID=your-emailjs-service-id
VITE_EMAILJS_TEMPLATE_ID=your-contact-form-template-id
VITE_EMAILJS_GUESTBOOK_TEMPLATE_ID=your-guestbook-notification-template-id

# Google Analytics Setup
VITE_GA_MEASUREMENT_ID=G-your-google-analytics-id
```

---

## 🗄️ Skema Database Supabase

Untuk menjalankan aplikasi ini secara sempurna dengan Supabase, berikut adalah daftar tabel yang perlu Anda buat di editor SQL Supabase:

### 1. `projects`
* **Kolom**: `id` (UUID), `title` (text), `category` (text[]), `description` (text), `role` (text), `tech` (text[]), `live_url` (text), `github_url` (text), `featured` (boolean), `color` (text), `image_url` (text), `live_url_label` (text), `additional_desc` (text), `project_output` (text[]), `created_at` (timestamptz).

### 2. `project_categories`
* **Kolom**: `id` (UUID), `name` (text), `created_at` (timestamptz).

### 3. `achievements`
* **Kolom**: `id` (UUID), `title` (text), `issuer` (text), `issue_date` (text), `credential_id` (text), `credential_url` (text), `images` (text[]), `type` (text), `category` (text), `created_at` (timestamptz).

### 4. `experiences`
* **Kolom**: `id` (UUID), `company` (text), `role` (text), `period` (text), `location` (text), `logo_url` (text), `description` (text[]), `tools` (text[]), `sort_order` (integer), `created_at` (timestamptz).

### 5. `competitions`
* **Kolom**: `id` (UUID), `title` (text), `role` (text), `award` (text), `project` (text), `skills` (text[]), `what_was_built` (text), `impact_achievements` (text[]), `period` (text), `sort_order` (integer), `logo_url` (text), `created_at` (timestamptz).

### 6. `education`
* **Kolom**: `id` (UUID), `degree` (text), `school` (text), `location` (text), `period` (text), `gpa` (text), `logo_url` (text), `description` (text), `sort_order` (integer), `created_at` (timestamptz).

### 7. `cv_settings`
* **Kolom**: `id` (UUID), `url` (text), `description` (text), `updated_at` (timestamptz).

### 8. `guestbook`
* **Kolom**: `id` (UUID), `name` (text), `message` (text), `is_visible` (boolean), `created_at` (timestamptz).

### 9. `website_logs`
* **Kolom**: `id` (UUID), `category` (text - VISITOR/SYSTEM/DB), `level` (text - INFO/SUCCESS/WARNING/ERROR), `action` (text), `details` (text), `page_url` (text), `ip_address` (text), `created_at` (timestamptz).

---

## 🚀 Langkah Instalasi & Menjalankan Lokal

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda. Ikuti perintah berikut di terminal:

### 1. Kloning Repositori & Masuk ke Folder Project
```bash
cd My-Portofolio
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Development
```bash
npm run dev
```
Setelah berjalan, buka browser di alamat [http://localhost:5173](http://localhost:5173).

### 4. Linting Kode
```bash
npm run lint
```

### 5. Build untuk Produksi
```bash
npm run build
```

---

## 👨‍💻 Profil Pembuat

**Muhammad Rakha Syamputra**  
🎓 Mahasiswa Sistem Informasi - Universitas Singaperbangsa Karawang  
📧 [muhammadrakhasyamputra@gmail.com](mailto:muhammadrakhasyamputra@gmail.com)  
🌐 Website Resmi: [www.mrakha.my.id](http://www.mrakha.my.id)  
🔗 LinkedIn: [rakha05](https://www.linkedin.com/in/rakha05/)  
🐙 GitHub: [Couraa0](https://github.com/Couraa0)  
📸 Instagram: [@couraa0](https://www.instagram.com/couraa0)
