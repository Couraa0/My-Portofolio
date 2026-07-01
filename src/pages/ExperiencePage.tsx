import Experience from "@/components/Experience";
import { Helmet } from "react-helmet-async";

const ExperiencePage = () => {
  return (
    <>
      <Helmet>
        <title>Experience & Work History - Muhammad Rakha Syamputra</title>
        <meta name="description" content="Explore the professional experience of Muhammad Rakha Syamputra. Proven track record as an IT Project Manager, Product Manager, and Software Developer." />
        <meta name="keywords" content="Muhammad Rakha Syamputra Experience, Pengalaman Kerja Muhammad Rakha Syamputra, Pengalaman IT Project Manager, Software Developer Experience, Pengalaman Pengembang Perangkat Lunak, Tech Leader Career, Karir Pemimpin Teknologi, Product Manager History, Riwayat Manajer Produk" />
        <meta property="og:title" content="Experience & Work History - Muhammad Rakha Syamputra" />
        <meta property="og:description" content="Discover my professional journey, roles, and responsibilities in the tech industry." />
        <meta property="og:url" content="https://www.mrakha.my.id/experience" />
        <link rel="canonical" href="https://www.mrakha.my.id/experience" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "name": "Professional Experience of Muhammad Rakha Syamputra",
              "description": "Work history and professional experience in IT Project Management and Software Development.",
              "url": "https://www.mrakha.my.id/experience",
              "mainEntity": {
                "@type": "Person",
                "name": "Muhammad Rakha Syamputra",
                "jobTitle": "IT Project Manager & Software Developer"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="page-enter">
        <Experience />
      </div>
    </>
  );
};

export default ExperiencePage;
