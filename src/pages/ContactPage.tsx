import Contact from "@/components/Contact";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Muhammad Rakha Syamputra - Hire IT Project Manager & Developer</title>
        <meta name="description" content="Get in touch with Muhammad Rakha Syamputra. Hire an experienced IT Project Manager, Product Manager, and Software Developer in Indonesia. Let's discuss your next project." />
        <meta name="keywords" content="Contact Muhammad Rakha Syamputra, Hubungi Muhammad Rakha Syamputra, Kontak Muhammad Rakha Syamputra, Hire IT Project Manager, Pekerjakan Manajer Proyek IT, Hire Software Developer, Jasa Pembuatan Website, Jasa Web Developer, Hire Product Manager, IT Consultant Indonesia, Konsultan IT Indonesia, Freelance Web Developer" />
        <meta property="og:title" content="Contact Muhammad Rakha Syamputra - Let's Work Together" />
        <meta property="og:description" content="Get in touch for IT Project Management, Software Development, and Product Management opportunities." />
        <meta property="og:url" content="https://mrakha.my.id/contact" />
        <link rel="canonical" href="https://mrakha.my.id/contact" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Muhammad Rakha Syamputra",
              "description": "Get in touch with Muhammad Rakha Syamputra for IT Project Management and Software Development opportunities.",
              "url": "https://mrakha.my.id/contact",
              "mainEntity": {
                "@type": "Person",
                "name": "Muhammad Rakha Syamputra",
                "email": "muhammadrakhasyamputra@gmail.com",
                "url": "https://mrakha.my.id/",
                "jobTitle": "IT Project Manager & Software Developer",
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
      <div className="page-enter">
        <Contact />
      </div>
    </>
  );
};

export default ContactPage;
