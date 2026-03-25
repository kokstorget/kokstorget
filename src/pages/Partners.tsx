import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";

interface Partner {
  id: number;
  name: string;
  description: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Marbodal Göteborg",
    description:
      "Marbodal är ett av Sveriges mest anrika köksmärken med rötter sedan 1924. Från fabriken i Tidaholm levererar de kök som kombinerar svensk hantverkstradition med modern design. Marbodal Göteborg erbjuder ett brett sortiment – från tidlösa klassiker till samtida, minimalistiska kök – alltid med fokus på hållbarhet och kvalitet.",
  },
  {
    id: 2,
    name: "Lucks by Robo",
    description:
      "Lucks by Robo representerar nästa generation av köksdesign där innovation möter funktion. Med smarta förvaringslösningar och modern skandinavisk estetik skapar de kök som är lika vackra som praktiska. Deras fokus på hållbara material och energieffektiva lösningar gör dem till ett framtidssäkrat val.",
  },
  {
    id: 3,
    name: "Ballingslöv Kungsbacka",
    description:
      "Ballingslöv har sedan 1929 varit synonymt med svenska kvalitetskök. Med ett imponerande utbud av stilar, material och färger erbjuder Ballingslöv Kungsbacka skräddarsydda kökslösningar för alla smaker. Varje kök tillverkas med omsorg i Sverige och kombinerar tidlös elegans med modern funktionalitet.",
  },
  {
    id: 4,
    name: "Nordiska Kök",
    description:
      "Nordiska Kök är kända för sina handbyggda, unika kök som blandar traditionellt hantverk med samtida design. Varje kök är ett konstverk – skräddarsytt efter kundens önskemål med naturliga material som massivt trä, natursten och mässing. Perfekt för den som söker ett kök med karaktär och själ.",
  },
  {
    id: 5,
    name: "Himle Kök",
    description:
      "Himle Kök erbjuder exklusiva kökslösningar med fokus på hantverk och personlig service. Med bas i Västsverige skapar de kök som speglar den skandinaviska livsstilen – rena linjer, naturliga material och genomtänkta detaljer. Från första skiss till färdig installation följer Himle Kök med hela vägen.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p
            className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6"
            {...fadeUp}
          >
            Våra samarbetspartners
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-light text-foreground leading-tight mb-8"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 } as const}
          >
            Noggrant utvalda köksföretag
          </motion.h1>
          <motion.p
            className="text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 } as const}
          >
            Vi samarbetar med Sveriges främsta köksföretag för att kunna erbjuda
            dig de bästa alternativen. Varje partner är handplockad utifrån
            kvalitet, service och kundnöjdhet.
          </motion.p>
        </div>
      </section>

      {/* Partners list */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-16">
            {partners.map((partner, index) => (
              <motion.article
                key={partner.id}
                className="border-t border-border pt-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                  <div>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                      Partner {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-light text-foreground">
                      {partner.name}
                    </h2>
                  </div>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                    {partner.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Redo att komma igång?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
              Få offerter från våra partners
            </h2>
            <Link
              to="/"
              className="inline-block border border-foreground text-foreground px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-light hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Starta din köksresa
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            © {new Date().getFullYear()} Kökstorget
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Partners;
