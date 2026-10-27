import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/SiteFooter";
import { useInspirationProjects } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import { SITE_URL, WEBSITE_ID, absoluteUrl } from "@/lib/seo";

import inspoShaker from "@/assets/inspo-shaker.jpg";
import inspoRetro from "@/assets/inspo-retro-50tal.jpg";
import inspoSpegel from "@/assets/inspo-spegel.jpg";
import inspoModern from "@/assets/inspo-modern-slata.jpg";
import inspoBeige from "@/assets/inspo-beige-fluted.jpg";

interface InspirationProject {
  image: string;
  title: string;
  imageAlt: string;
  description: string;
}

const projects: InspirationProject[] = [
  {
    image: inspoShaker,
    title: "Tidlöst Shakerkök",
    imageAlt: "Shakerkök med klassiska ramluckor i mjuk färgsättning",
    description:
      "Ett harmoniskt shakerkök där klassiska ramluckor möter ett modernt och avskalat uttryck. Den mjuka färgsättningen tillsammans med de traditionella snickeridetaljerna skapar en varm och ombonad miljö. Ett kök som känns gediget och tidlöst, med en design som passar lika naturligt i sekelskifteshem som i moderna bostäder.",
  },
  {
    image: inspoRetro,
    title: "Retro & 50-talsfunkis",
    imageAlt: "Kök i retrostil med influenser från svensk 50-talsfunkis",
    description:
      "Ett lekfullt kök med tydliga influenser från svensk 50-talsdesign. Rundade former, karaktäristiska luckor och tidstypiska detaljer ger köket en nostalgisk känsla utan att det upplevs gammaldags. Kombinationen av funktionella lösningar och personlig färgsättning skapar ett charmigt kök där den svenska funkistraditionen får nytt liv.",
  },
  {
    image: inspoSpegel,
    title: "Klassiskt spegelkök",
    imageAlt: "Kök med profilerade spegelluckor i klassisk stil",
    description:
      "Ett elegant kök där profilerade spegelluckor och genomtänkta detaljer skapar en tydlig känsla av traditionellt snickeri. De klassiska fronterna ger rummet djup och karaktär samtidigt som den balanserade färgsättningen håller helheten lugn. Resultatet är ett sofistikerat kök med ett uttryck som står sig långt bortom tillfälliga trender.",
  },
  {
    image: inspoModern,
    title: "Modernt kök med släta fronter",
    imageAlt: "Modernt kök med släta fronter och diskreta grepp",
    description:
      "Rena linjer och släta fronter ger köket ett modernt och arkitektoniskt uttryck. Avsaknaden av onödiga detaljer låter proportioner, material och färgsättning stå i centrum. De diskreta greppen förstärker den minimalistiska känslan och skapar en sammanhängande köksmiljö som känns både rymlig, elegant och funktionell.",
  },
  {
    image: inspoBeige,
    title: "Skräddarsytt kök",
    imageAlt: "Skräddarsytt kök med måttanpassade fronter",
    description:
      "Ett personligt kök där måttanpassade fronter skapar känslan av platsbyggd inredning. Genomtänkta linjer och noggrant anpassade detaljer gör att köket harmonierar med rummets arkitektur. Kombinationen av individuell färgsättning, specialanpassade fronter och smart förvaring ger ett kök som känns unikt utformat för bostaden.",
  },
];

const Inspiration = () => {
  const { data: sanityProjects } = useInspirationProjects();
  const activeProjects = sanityProjects?.length
    ? sanityProjects.map((p) => ({
        image: urlFor(p.image).width(800).height(600).url(),
        title: p.title,
        imageAlt: p.image?.alt || p.title,
        description: p.description,
      }))
    : projects;
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Köksinspiration: shakerkök, funkis & moderna kök"
        description="Inspiration för ditt nya kök: tidlösa shakerkök, retro 50-talsfunkis, spegelkök och moderna släta fronter. Hitta stilen och få offert."
        path="/inspiration"
        breadcrumbs={[{ name: "Inspiration", path: "/inspiration" }]}
        jsonLd={{
          "@type": "CollectionPage",
          name: "Köksinspiration och köksstilar",
          url: `${SITE_URL}/inspiration`,
          isPartOf: { "@id": WEBSITE_ID },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: activeProjects.map((project, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: project.title,
              description: project.description,
              image: absoluteUrl(project.image),
            })),
          },
        }}
      />
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-3 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Tillbaka
            </Link>
          </motion.div>

          <motion.h1
            className="font-display text-4xl md:text-6xl font-light leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Köksinspiration
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light text-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Inspireras av kvalitetskök i skandinavisk design. Här nedan hittar
            du köksinspiration från våra mest populära projekt och partners.
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Se{" "}
            <Link
              to="/partners"
              className="underline underline-offset-4 hover:text-foreground transition-colors font-medium"
            >
              pris via våra partners
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Gallery grid — 3 columns like Nordiska Kök */}
      <section className="pb-32 px-3 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            {activeProjects.map((project, i) => (
              <motion.article
                key={i}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <div className="overflow-hidden mb-5">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i < 3 ? undefined : "lazy"}
                    width={1200}
                    height={800}
                  />
                </div>
                <h3 className="font-display text-lg md:text-xl font-light mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {project.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-5xl px-3 sm:px-6">
        <hr className="border-border" />
      </div>

      {/* CTA */}
      <section className="py-24 px-3 sm:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-light mb-6">
              Redo att förverkliga ditt{" "}
              <em className="font-normal">drömkök</em>?
            </h2>
            <p className="text-primary-foreground/70 mb-10 font-light max-w-xl mx-auto">
              Svara på några enkla frågor och få skräddarsydda offerter från
              utvalda köksföretag.
            </p>
            <Link
              to="/?start=quiz"
              className="inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary-foreground/90 transition-colors group"
            >
              Kom igång nu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Inspiration;
