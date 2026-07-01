import Achievements from "@/components/Achievements";
import { Helmet } from "react-helmet-async";

const AchievementPage = () => {
  return (
    <>
      <Helmet>
        <title>Achievements & Awards - Muhammad Rakha Syamputra</title>
        <meta name="description" content="Discover the awards, certifications, and achievements of Muhammad Rakha Syamputra in the field of IT, software development, and product management." />
        <meta name="keywords" content="Muhammad Rakha Syamputra Achievements, Sertfikasi Muhammad Rakha Syamputra, Prestasi Muhammad Rakha Syamputra, Penghargaan Muhammad Rakha Syamputra, IT Certifications, Sertifikasi IT, Software Developer Awards, Penghargaan Pengembang Perangkat Lunak, Product Manager Certifications, Sertifikasi Manajer Produk, Tech Accomplishments, Prestasi Teknologi" />
        <meta property="og:title" content="Achievements & Awards - Muhammad Rakha Syamputra" />
        <meta property="og:description" content="Check out my professional certifications, honors, and awards in the technology industry." />
        <meta property="og:url" content="https://www.mrakha.my.id/achievements" />
        <link rel="canonical" href="https://www.mrakha.my.id/achievements" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "name": "Achievements of Muhammad Rakha Syamputra",
              "description": "Awards and certifications of Muhammad Rakha Syamputra.",
              "url": "https://www.mrakha.my.id/achievements",
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
        <Achievements />
      </div>
    </>
  );
};

export default AchievementPage;
