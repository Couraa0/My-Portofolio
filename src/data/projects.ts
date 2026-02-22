export interface Project {
  id: number;
  title: string;
  category: "Professional" | "Personal";
  description: string;
  role?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  color?: "violet" | "rose" | "emerald" | "amber" | "cyan" | "indigo";
  image?: string;
  liveUrlLabel?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Smart Village Ecosystem (SVE)",
    category: "Professional",
    description: "Smart Village Ecosystem adalah platform digital terpadu dengan website profil desa, dashboard data, serta aplikasi komunitas desa dan marketplace ekonomi lokal.",
    role: "IT Project Manager",
    tech: ["Agile Scrum", "Trello", "Blade", "Laravel", "Flutter", "MySQL", "Tailwind CSS",],
    liveUrl: "https://smart-village-web.citiasiainc.id/",
    featured: true,
    color: "emerald",
    image: "/Smart-Village.png",
  },
  {
    id: 2,
    title: "AI For All (AIFA)",
    category: "Professional",
    description: "Aplikasi desktop AI on-premise berbasis open-source LLM dengan knowledge base terkelola untuk analisis data internal, berfokus pada privasi dan keamanan perusahaan.",
    role: "IT Project Manager",
    tech: ["Agile Scrum", "Trello", "React", "Java-Script", "Tailwind CSS", "Ollama", "Docker"],
    liveUrl: "https://s.id/AI-FOR-ALL",
    liveUrlLabel: "Live Prototype",
    featured: true,
    image: "/Aifa.png",
  },
  {
    id: 3,
    title: "City Super App (CSA)",
    category: "Professional",
    description: "Aplikasi Smart City yang menghubungkan warga dan pemerintah melalui pelaporan digital serta integrasi layanan publik dalam satu sistem.",
    role: "IT Project Manager",
    tech: ["Agile Scrum", "Trello", "Laravel", "Vue.js", "MySQL", "Flutter", "Tailwind CSS",],
    liveUrl: "https://smart-city-mobile.citiasiainc.id/",
    featured: true,
    color: "cyan",
    image: "/Smart-City.png",
  },
  {
    id: 4,
    title: "Tixchain",
    category: "Professional",
    description: "Platform ticketing konser berbasis teknologi yang menjadikan tiket sebagai aset digital unik (NFT), aman, transparan, dan dapat diperdagangkan.",
    role: "Co Founder",
    tech: ["Next.js", "React", "Tailwind CSS", "Go", "NFT"],
    liveUrl: "https://tixchain.id",
    featured: true,
    color: "violet",
    image: "/Tixchain.png",
  },
  {
    id: 5,
    title: "E-Commerce Perfume Lab",
    category: "Personal",
    description: "Platform jual beli parfum dengan pencarian berbasis notes aroma, rekomendasi racikan, dan sistem transaksi online terintegrasi.",
    tech: ["React", "Vite", "Tailwind CSS", "Nest.js", "PostgreSQL", "AI Chatbot"],
    githubUrl: "https://github.com/Couraa0/Perfume-Lab",
    color: "amber",
    image: "/Perfume.png",
  },
  {
    id: 6,
    title: "Ark Sentient",
    category: "Personal",
    description: "Aplikasi AI untuk manajemen peternakan — diagnosis penyakit, smart feeding, marketplace ternak terintegrasi Midtrans",
    tech: ["PHP", "CSS", "Bootstrap", "MySQL", "Midtrans", "API AI"],
    githubUrl: "https://github.com/Couraa0/Ark_Sentient",
    color: "emerald",
    image: "/Ark-Sentient.png",
  },
  {
    id: 7,
    title: "Bookkost",
    category: "Personal",
    description: "Website pencarian dan pemesanan kamar kost secara online dengan fitur detail properti dan proses reservasi yang mudah dan cepat.",
    tech: ["HTML", "CSS", "PHP", "Bootstrap", "MySQL"],
    githubUrl: "https://github.com/Couraa0/Bookkost",
    color: "amber",
    image: "/Bookkost.png",
  },
  {
    id: 8,
    title: "Sistem Absensi & Rekap",
    category: "Personal",
    description: "Sistem absensi berbasis web dengan pencatatan kehadiran dan rekap otomatis untuk mempermudah monitoring.",
    tech: ["HTML", "CSS", "PHP", "Bootstrap", "MySQL"],
    githubUrl: "https://github.com/Couraa0/Sistem-Absensi",
    color: "violet",
    image: "/Absen.png",
  },
  {
    id: 9,
    title: "Sistem Informasi Akademik",
    category: "Personal",
    description: "Website pengelolaan data akademik meliputi mahasiswa, nilai, dan jadwal perkuliahan dalam satu sistem terpusat.",
    tech: ["HTML", "CSS", "PHP", "Bootstrap", "MySQL"],
    githubUrl: "https://github.com/Couraa0/Sistem-Informasi-Akademik-Sekolah",
    color: "cyan",
    image: "/Siska.png",
  },
  {
    id: 10,
    title: "Sistem Parkir GUI",
    category: "Personal",
    description: "Aplikasi desktop untuk manajemen parkir kendaraan dengan pencatatan waktu masuk, perhitungan tarif, dan cetak struk otomatis.",
    tech: ["Java", "Java Swing", "iText PDF", "MySQL"],
    githubUrl: "https://github.com/Couraa0/GUI-Parkir",
    color: "indigo",
    image: "/Parkir.png",
  },
  {
    id: 11,
    title: "DuaDompet – Fintech Hybrid",
    category: "Personal",
    description: "Perencanaan aplikasi e-wallet hybrid yang mengintegrasikan dompet fiat dan kripto dalam satu platform aman dan edukatif.",
    tech: ["Business Plan", "Fintech", "Web3"],
    liveUrl: "https://drive.google.com/file/d/1z75Ehu-vxqH0RWNe5hIFdgaxxQNLS61e/view",
    liveUrlLabel: "Pitch Deck",
    color: "amber",
    image: "/Duadompet.png",
  },
];
