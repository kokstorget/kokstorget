import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import caseKitchen1 from "@/assets/case-kitchen-1.jpg";
import caseKitchen2 from "@/assets/case-kitchen-2.jpg";
import caseKitchen3 from "@/assets/case-kitchen-3.jpg";

const cases = [
  {
    id: 1,
    image: caseKitchen1,
    title: "Familjen Lindström",
    location: "Östermalm, Stockholm",
    style: "Modern valnöt med marmor",
    quote: "Kökstorget gjorde hela processen så enkel. Vi fick tre offerter inom en vecka och hittade vårt drömkök.",
    details: {
      budget: "250 000 – 350 000 kr",
      tid: "8 veckor",
      leverantör: "Nordiska Kök",
      typ: "Totalrenovering",
    },
  },
  {
    id: 2,
    image: caseKitchen2,
    title: "Anna & Erik Bergman",
    location: "Hovås, Göteborg",
    style: "Minimalistiskt vitt med ekdetaljer",
    quote: "Vi visste inte var vi skulle börja – Kökstorget matchade oss med rätt företag direkt.",
    details: {
      budget: "180 000 – 250 000 kr",
      tid: "6 veckor",
      leverantör: "Ballingslöv",
      typ: "Nytt kök i nybygge",
    },
  },
  {
    id: 3,
    image: caseKitchen3,
    title: "Familjen Johansson",
    location: "Lund, Skåne",
    style: "Lantligt med moderna inslag",
    quote: "Från första förfrågan till färdigt kök – en fantastisk upplevelse. Rekommenderar varmt!",
    details: {
      budget: "150 000 – 200 000 kr",
      tid: "10 veckor",
      leverantör: "Marbodal",
      typ: "Totalrenovering",
    },
  },
];

const Cases = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p
            className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Referenskunder
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-light text-foreground leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Kök vi hjälpt till att förverkliga
          </motion.h1>
          <motion.p
            className="text-muted-foreground font-light text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Varje kök berättar en historia. Här delar våra kunder sina upplevelser
            av att hitta och skapa sitt drömkök genom Kökstorget.
          </motion.p>
        </div>
      </section>

      {/* Cases */}
      <section className="pb-32">
        <div className="container mx-auto max-w-6xl px-6">
          {cases.map((item, index) => (
            <motion.article
              key={item.id}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-32 last:mb-0 ${
                index % 2 === 1 ? "md:direction-rtl" : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={item.image}
                  alt={`Kök hos ${item.title}`}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  width={1024}
                  height={768}
                />
              </div>

              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
                  {item.location}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3">
                  {item.title}
                </h2>
                <p className="text-muted-foreground font-light mb-8">
                  {item.style}
                </p>

                <blockquote className="border-l-2 border-primary/30 pl-6 mb-10">
                  <p className="text-foreground/80 font-light italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </blockquote>

                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(item.details).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
                        {key}
                      </p>
                      <p className="text-sm text-foreground font-light">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto max-w-2xl text-center px-6">
          <motion.h2
            className="font-display text-3xl md:text-4xl font-light text-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Redo att skapa ditt drömkök?
          </motion.h2>
          <motion.p
            className="text-muted-foreground font-light mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Svara på några enkla frågor så matchar vi dig med de bästa
            köksföretagen – helt kostnadsfritt.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/?start=quiz"
              className="inline-block border border-foreground px-10 py-4 text-[11px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              Kom igång
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            © 2026 Kökstorget — Alla rättigheter förbehållna
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Cases;
