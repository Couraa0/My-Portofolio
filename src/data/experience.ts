export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  logo?: string;
  description: string[];
  tools?: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Citiasia Internasional",
    role: "IT Project Manager Intern",
    period: "Agustus – Desember 2025",
    location: "Jakarta, Indonesia",
    logo: "/Citiasia.png",
    description: [
      "Mengelola perencanaan dan eksekusi proyek teknologi dari tahap inisiasi hingga evaluasi.",
      "Mengkoordinasikan tim lintas fungsi (analyst, developer, UI/UX) agar sesuai timeline.",
      "Menjadi penghubung antara tim teknis dan stakeholder.",
      "Monitoring progres, risiko, dan kualitas deliverables proyek.",
      "Menyusun laporan perkembangan dan evaluasi kinerja proyek.",
    ],
    tools: [
      "Project Management",
      "Software Development Life Cycle (SDLC)",
      "Product Management",
      "Agile Methodologies",
      "Sprint Planning",
    ],
  },
  {
    id: 2,
    company: "Tixchain.id",
    role: "Co-Founder",
    period: "2023 – Sekarang",
    location: "Karawang, Indonesia",
    logo: "/Tix-Logo.png",
    description: [
      "Menginisiasi dan mengembangkan konsep platform ticketing digital.",
      "Menyusun strategi bisnis, roadmap produk, dan model monetisasi.",
      "Mengelola kolaborasi tim teknologi dan bisnis.",
      "Membangun kemitraan strategis dengan event organizer dan komunitas.",
      "Mengawasi pengembangan fitur dan pertumbuhan pengguna.",
    ],
    tools: ["Business Development", "Product Management", "Business Analysis"],
  },
  {
    id: 3,
    company: "HIMSIKA",
    role: "Ketua Divisi Edukasi",
    period: "2023 – 2025",
    location: "Karawang, Indonesia",
    logo: "/Himsika-Logo.png",
    description: [
      "Mengelola dan membimbing anggota divisi edukasi.",
      "Merancang serta mengeksekusi program kerja berbasis akademik.",
      "Menjadi Ketua Pelaksana EDUFAIR dan berhasil meraih 3.500+ partisipan dari kalangan mahasiswa, pelajar, dan masyarakat umum.",
      "Berkoordinasi dengan sponsor, pemateri, dan mitra eksternal.",
      "Mengawasi perencanaan hingga evaluasi kegiatan.",
    ],
    tools: ["Education", "Leadership", "Team Management", "Event Organization"],
  },
  {
    id: 4,
    company: "Ekstrakurikuler IT",
    role: "Ketua Angkatan",
    period: "2020 – 2022",
    location: "Cikarang, Indonesia",
    logo: "/IT-Logo.png",
    description: [
      "Mengkoordinasikan program dan kegiatan teknologi siswa.",
      "Membina anggota dalam pengembangan skill IT.",
      "Mengawasi pelaksanaan proyek dan inovasi teknologi.",
      "Menginisiasi workshop dan pelatihan internal.",
      "Menjali komunikasi dengan pihak sekolah terkait kegiatan.",
    ],
    tools: ["Leadership", "Education", "Communication"],
  },
  {
    id: 5,
    company: "Ekstrakurikuler KIR",
    role: "Wakil Ketua Umum",
    period: "2018 – 2019",
    location: "Cikarang, Indonesia",
    logo: "/KIR-Logo.png",
    description: [
      "Mendampingi ketua dalam pengambilan keputusan organisasi.",
      "Mengorganisir rapat dan koordinasi internal tim.",
      "Mengawasi pelaksanaan penelitian ilmiah anggota.",
      "Memberikan dukungan teknis dalam penyusunan karya ilmiah.",
      "Membantu perencanaan dan evaluasi program kerja.",
    ],
    tools: ["Leadership", "Education", "Communication"],
  },
];
