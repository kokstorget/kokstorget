import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

import inspoRustic from "@/assets/inspo-rustic-classic.jpg";
import inspoDarkGreen from "@/assets/inspo-dark-green.jpg";
import inspoShaker from "@/assets/inspo-shaker-white.jpg";
import inspoJapandi from "@/assets/inspo-japandi.jpg";
import inspoNavy from "@/assets/inspo-navy.jpg";
import inspoCottage from "@/assets/inspo-cottage.jpg";
import inspoBeige from "@/assets/inspo-beige-fluted.jpg";
import inspoIndustrial from "@/assets/inspo-industrial.jpg";
import inspoTerracotta from "@/assets/inspo-terracotta.jpg";

interface InspirationProject {
  image: string;
  title: string;
  description: string;
}

const projects: InspirationProject[] = [
  {
    image: inspoRustic,
    title: "Det klassiska köket med rustik elegans",
    description:
      "Traditionell charm möter skandinavisk design — ett tidlöst kök i varm ek med marmorbänkskiva och mässingsdetaljer som skapar en elegant och inbjudande helhet.",
  },
  {
    image: inspoJapandi,
    title: "Det ljusa Japandi-köket",
    description:
      "Minimalistiskt kök i ljus ek där naturlig värme möter arkitektonisk precision. Betongbänkskiva och rena linjer skapar ett balanserat, harmoniskt uttryck.",
  },
  {
    image: inspoDarkGreen,
    title: "Moderna köket i djupgrönt",
    description:
      "Handtagslösa luckor i matt mörkgrönt kombinerat med terrazzobänkskiva och skandinavisk minimalism — ett modigt val som ger köket stark personlighet.",
  },
  {
    image: inspoShaker,
    title: "Det ljusa shakerköket",
    description:
      "Klassiskt shakerkök i ljusa toner med marmorstänkskydd, generös köksö och varma trägolv. En tidlös design som aldrig går ur mode.",
  },
  {
    image: inspoNavy,
    title: "Eleganta köket i marinblått",
    description:
      "Djupblå luckor med mässingsbeslag, Calcatta-marmor och fiskbensgolv i ek skapar ett dramatiskt och lyxigt kök med stark karaktär.",
  },
  {
    image: inspoBeige,
    title: "Raffinerade köket med räfflade fronter",
    description:
      "Eleganta räfflade fronter i sandbeige, kvartsitbänkskiva och integrerade vitvaror. Mjuk belysning och rena ytor för en sofistikerad känsla.",
  },
  {
    image: inspoCottage,
    title: "Träköket i fjällstugan",
    description:
      "Rustikt kök med synliga bjälkar, natursten och massiv träbänk som smälter samman med den omgivande naturen. Värme och autenticitet i varje detalj.",
  },
  {
    image: inspoIndustrial,
    title: "Det industriella köket",
    description:
      "Rostfria ytor, betongväggar och öppna hyllor i stål och trä. Professionell spis och loftkänsla för den som älskar rå, urban design.",
  },
  {
    image: inspoTerracotta,
    title: "Medelhavsinspirerade köket",
    description:
      "Varma terrakottatoner, valvbågar och naturstengolv skapar en unik fusion av skandinavisk minimalism och medelhavets värme.",
  },
];

const Inspiration = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
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
              to="/"
              className="underline underline-offset-4 hover:text-foreground transition-colors font-medium"
            >
              pris via våra partners
            </Link>
          </motion.p>
        </div>
      </section>

      {/* Gallery grid — 3 columns like Nordiska Kök */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, i) => (
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
                    alt={project.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i < 3 ? undefined : "lazy"}
                    width={1200}
                    height={800}
                  />
                </div>
                <h3 className="font-display text-lg md:text-xl font-light mb-2 group-hover:underline underline-offset-4 transition-all">
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
      <div className="container mx-auto max-w-6xl px-6">
        <hr className="border-border" />
      </div>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
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
              to="/"
              className="inline-flex items-center gap-3 bg-primary-foreground text-primary px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary-foreground/90 transition-colors group"
            >
              Kom igång nu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-xl font-light">Kökstorget</span>
          <span className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Kökstorget. Alla rättigheter
            förbehållna.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Inspiration;
