import Projects from "@/components/Projects";
import { Helmet } from "react-helmet-async";

const ProjectsPage = () => {
  return (
    <>
      <Helmet>
        <title>Projects & Portfolio - Muhammad Rakha Syamputra</title>
        <meta name="description" content="View the portfolio and tech projects by Muhammad Rakha Syamputra. Featuring web applications, software solutions, and IT management case studies." />
        <meta name="keywords" content="Muhammad Rakha Syamputra Projects, Proyek Muhammad Rakha Syamputra, IT Portfolio, Portofolio IT, Software Developer Portfolio, Portofolio Pengembang Perangkat Lunak, Web Development Projects, Proyek Pembuatan Website, IT Project Manager Case Studies, Studi Kasus Manajer Proyek IT" />
        <meta property="og:title" content="Projects & Portfolio - Muhammad Rakha Syamputra" />
        <meta property="og:description" content="Explore a collection of my recent IT projects, software development work, and product management showcases." />
        <meta property="og:url" content="https://www.mrakha.my.id/projects" />
        <link rel="canonical" href="https://www.mrakha.my.id/projects" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Projects Portfolio of Muhammad Rakha Syamputra",
              "description": "A collection of software development and IT projects.",
              "url": "https://www.mrakha.my.id/projects",
              "author": {
                "@type": "Person",
                "name": "Muhammad Rakha Syamputra"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="page-enter">
        <Projects />
      </div>
    </>
  );
};

export default ProjectsPage;
