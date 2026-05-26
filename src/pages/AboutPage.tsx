import About from "@/components/About";
import Stats from "@/components/Stats";
import GithubStats from "@/components/GithubStats";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Muhammad Rakha Syamputra - IT Project Manager & Developer</title>
        <meta name="description" content="Learn more about Muhammad Rakha Syamputra, his background, education, and passion for IT Project Management, Product Management, and Software Development." />
        <meta name="keywords" content="About Muhammad Rakha Syamputra, Who Is Muhammad Rakha Syamputra, Siapa Muhammad Rakha Syamputra, Tentang Muhammad Rakha Syamputra, Profil Rakha Syamputra, Latar Belakang Muhammad Rakha Syamputra, IT Project Manager Background, Latar Belakang Manajer Proyek IT, Software Developer Bio, Biodata Pengembang Perangkat Lunak, Product Manager Profile, Profil Manajer Produk" />
        <meta property="og:title" content="About Muhammad Rakha Syamputra" />
        <meta property="og:description" content="Get to know the person behind the projects. Discover my journey and background in technology." />
        <meta property="og:url" content="https://mrakha.my.id/about" />
        <link rel="canonical" href="https://mrakha.my.id/about" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "About Muhammad Rakha Syamputra",
              "description": "Biography and background of Muhammad Rakha Syamputra.",
              "url": "https://mrakha.my.id/about",
              "mainEntity": {
                "@type": "Person",
                "name": "Muhammad Rakha Syamputra",
                "jobTitle": "IT Project Manager & Software Developer",
                "url": "https://mrakha.my.id/",
                "sameAs": [
                  "https://www.linkedin.com/in/rakha05/",
                  "https://github.com/Couraa0",
                  "https://www.instagram.com/couraa0"
                ]
              }
            }
          `}
        </script>
      </Helmet>
      <div className="page-enter bg-background pb-16">
        <About />
        <Stats />
        {/* <GithubStats /> */}
      </div>
    </>
  );
};

export default AboutPage;
