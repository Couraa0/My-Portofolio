export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string[];
  tools?: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Citiasia Internasional",
    role: "IT Project Manager Intern",
    period: "Agustus – Desember 2025",
    description: [
      "Memimpin perencanaan, pelaksanaan, dan pengawasan proyek IT",
      "Mengelola tim lintas divisi (System Analyst, UI/UX, Frontend & Backend) dengan Agile Scrum",
      "Penghubung antara tim teknis dan stakeholder",
    ],
    tools: ["Trello", "Jira"],
  },
  {
    id: 2,
    company: "Tixchain.id",
    role: "Co-Founder",
    period: "2023 – Sekarang",
    description: [
      "Menginisiasi platform tiket digital dari ide hingga operasional",
      "Mengelola strategi bisnis, pengembangan produk, dan pemasaran",
      "Membangun tim lintas divisi yang kolaboratif",
    ],
  },
  {
    id: 3,
    company: "HIMSIKA UNSIKA",
    role: "Ketua Divisi Edukasi",
    period: "2023 – 2025",
    description: [
      "Ketua Pelaksana EDUFAIR: seminar, workshop, lomba, pameran, talkshow",
      "Menarik 3.500+ peserta dari kalangan mahasiswa, pelajar, dan masyarakat umum",
    ],
  },
  {
    id: 4,
    company: "Ekskul IT",
    role: "Ketua Angkatan",
    period: "2020 – 2022",
    description: [
      "Koordinasi kegiatan teknologi dan inovasi",
      "Workshop dan pelatihan untuk meningkatkan skill anggota",
    ],
  },
  {
    id: 5,
    company: "KIR",
    role: "Wakil Ketua Umum",
    period: "2018 – 2019",
    description: [
      "Memimpin dan mengorganisir riset ilmiah",
    ],
  },
];
