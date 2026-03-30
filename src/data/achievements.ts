export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  type: string;
  category: string;
}

export const achievementsData: Achievement[] = [
  {
    id: "cert-1",
    title: "Belajar Membuat Aplikasi Android dengan Jetpack Compose",
    issuer: "Dicoding Indonesia",
    issueDate: "January 2025",
    credentialId: "81P2LGL38ZOY",
    credentialUrl: "https://www.dicoding.com/certificates/81P2LGL38ZOY",
    image: "https://dicoding-web-img.sgp1.cdn.digitaloceanspaces.com/original/academy/dos:belajar_membuat_aplikasi_android_dengan_jetpack_compose_logo_121022170308.png", // Dummy image
    type: "Course",
    category: "Mobile",
  },
  {
    id: "cert-2",
    title: "Backend Developer Internship",
    issuer: "Parto.id - Affan Technology Indonesia",
    issueDate: "July 2025",
    credentialId: "196/EKS/HCLGA/ATI/VIII/2025",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=800&auto=format&fit=crop", // Dummy image
    type: "Profesional",
    category: "Backend",
  },
  {
    id: "cert-3",
    title: "Best Team Bangkit Company Track Capstone Project",
    issuer: "Bangkit Academy",
    issueDate: "January 2025",
    credentialId: "BANGKIT-2025-01",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=800&auto=format&fit=crop", // Dummy image
    type: "Award",
    category: "Mobile",
  },
  {
    id: "cert-4",
    title: "E-book Petunjuk Pro: Freelance Web Developer",
    issuer: "Build With Angga",
    issueDate: "September 2024",
    credentialId: "BWA-EBK-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop", // Dummy image
    type: "Course",
    category: "Freelance",
  }
];
