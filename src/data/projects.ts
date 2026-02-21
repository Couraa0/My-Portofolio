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
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Smart Village Ecosystem (SVE)",
    category: "Professional",
    description: "Platform ekosistem digital terintegrasi untuk modernisasi administrasi desa — Website, Dashboard, dan Mobile App",
    role: "IT Project Manager",
    tech: ["Agile Scrum", "Trello", "Web Dev"],
    liveUrl: "https://smart-village-web.citiasiainc.id/",
    featured: true,
  },
  {
    id: 2,
    title: "AI For All (AIFA)",
    category: "Professional",
    description: "Aplikasi AI on-premise berbasis open-source LLM dengan fokus pada privasi data dan keamanan internal",
    role: "IT Project Manager",
    tech: ["AI/LLM", "Agile Scrum", "QA Testing"],
    liveUrl: "https://s.id/AI-FOR-ALL",
    featured: true,
  },
  {
    id: 3,
    title: "City Super App (CSA)",
    category: "Professional",
    description: "Platform Smart City end-to-end (Mobile + Dashboard) untuk koneksi real-time antara warga dan pemerintah",
    role: "IT Project Manager",
    tech: ["Smart City", "Agile Scrum", "Mobile Dev"],
    liveUrl: "https://smart-city-mobile.citiasiainc.id/",
    featured: true,
  },
  {
    id: 4,
    title: "Ark Sentient",
    category: "Personal",
    description: "Aplikasi AI untuk manajemen peternakan — diagnosis penyakit, smart feeding, marketplace ternak terintegrasi Midtrans",
    tech: ["Python", "AI/ML", "Laravel", "Midtrans"],
    githubUrl: "https://github.com/Couraa0/Ark_Sentient",
  },
  {
    id: 5,
    title: "E-Commerce Perfume Lab",
    category: "Personal",
    description: "Platform e-commerce parfum dengan pencarian berbasis notes aroma, rekomendasi kombinasi, dan chatbot AI",
    tech: ["React", "PHP", "MySQL", "AI Chatbot"],
    githubUrl: "https://github.com/Couraa0/Perfume-Lab",
  },
  {
    id: 6,
    title: "Bookkost",
    category: "Personal",
    description: "Sistem booking kost online dengan fitur pencarian, detail kamar, dan pemesanan yang user-friendly",
    tech: ["HTML", "CSS", "PHP", "MySQL"],
    githubUrl: "https://github.com/Couraa0/Bookkost",
  },
  {
    id: 7,
    title: "Sistem Informasi Akademik",
    category: "Personal",
    description: "Website manajemen akademik sekolah — data mahasiswa, nilai, dan jadwal perkuliahan",
    tech: ["PHP", "Laravel", "MySQL"],
    githubUrl: "https://github.com/Couraa0/Sistem-Informasi-Akademik-Sekolah",
  },
  {
    id: 8,
    title: "Sistem Absensi & Rekap",
    category: "Personal",
    description: "Sistem absensi berbasis web dengan pencatatan kehadiran, rekap otomatis, dan dashboard interaktif",
    tech: ["PHP", "MySQL", "Bootstrap"],
    githubUrl: "https://github.com/Couraa0/Sistem-Absensi",
  },
];
