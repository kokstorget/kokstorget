import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/SiteFooter";
import { usePartners } from "@/hooks/useSanityData";
import { urlFor } from "@/lib/sanity";
import { SITE_URL, WEBSITE_ID, absoluteUrl } from "@/lib/seo";
import partnerMarbodal from "@/assets/partner-marbodal.jpg";
import partnerLucks from "@/assets/partner-lucks.jpg";
import partnerBallingslov from "@/assets/partner-ballingslov.jpg";
import partnerNordiska from "@/assets/partner-nordiska.jpg";
import partnerHimle from "@/assets/partner-himle.jpg";

interface PartnerItem {
  id: string;
  name: string;
  image: string;
  imageAlt?: string;
  description: string;
}

const staticPartners: PartnerItem[] = [
  { id: "1", name: "Marbodal Göteborg", image: partnerMarbodal, description: "Marbodal är ett av Sveriges mest anrika köksmärken med rötter sedan 1924. Från fabriken i Tidaholm levererar de kök som kombinerar svensk hantverkstradition med modern design. Marbodal Göteborg erbjuder ett brett sortiment – från tidlösa klassiker till samtida, minimalistiska kök – alltid med fokus på hållbarhet och kvalitet." },
  { id: "2", name: "Lucks by Robo", image: partnerLucks, description: "Lucks by Robo representerar nästa generation av köksdesign där innovation möter funktion. Med smarta förvaringslösningar och modern skandinavisk estetik skapar de kök som är lika vackra som praktiska. Deras fokus på hållbara material och energieffektiva lösningar gör dem till ett framtidssäkrat val." },
  { id: "3", name: "Ballingslöv Kungsbacka", image: partnerBallingslov, description: "Ballingslöv har sedan 1929 varit synonymt med svenska kvalitetskök. Med ett imponerande utbud av stilar, material och färger erbjuder Ballingslöv Kungsbacka skräddarsydda kökslösningar för alla smaker. Varje kök tillverkas med omsorg i Sverige och kombinerar tidlös elegans med modern funktionalitet." },
  { id: "4", name: "Nordiska Kök", image: partnerNordiska, description: "Nordiska Kök är kända för sina handbyggda, unika kök som blandar traditionellt hantverk med samtida design. Varje kök är ett konstverk – skräddarsytt efter kundens önskemål med naturliga material som massivt trä, natursten och mässing. Perfekt för den som söker ett kök med karaktär och själ." },
  { id: "5", name: "Himle Kök", image: partnerHimle, description: "Himle Kök erbjuder exklusiva kökslösningar med fokus på hantverk och personlig service. Med bas i Västsverige skapar de kök som speglar den skandinaviska livsstilen – rena linjer, naturliga material och genomtänkta detaljer. Från första skiss till färdig installation följer Himle Kök med hela vägen." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

const Partners = () => {
  const { data: sanityPartners } = usePartners();
  const partners: PartnerItem[] = sanityPartners?.length
    ? sanityPartners.map((p) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        image: urlFor(p.image).width(1024).height(768).url(),
        imageAlt: p.image?.alt,
      }))
    : staticPartners;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Köksföretag – våra kvalitetssäkrade partners"
        description="Möt köksföretagen i vårt nätverk, från platsbyggda kök till kompletta köksrenoveringar. Jämför och få offert från flera samtidigt."
        path="/partners"
        breadcrumbs={[{ name: "Partners", path: "/partners" }]}
        jsonLd={{
          "@type": "CollectionPage",
          name: "Köksföretag i Kökstorgets nätverk",
          url: `${SITE_URL}/partners`,
          isPartOf: { "@id": WEBSITE_ID },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: partners.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "HomeAndConstructionBusiness",
                name: p.name,
                description: p.description,
                image: absoluteUrl(p.image),
              },
            })),
          },
        }}
      />
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-3 sm:px-6">
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
      <section className="pb-32 px-3 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-16">
            {partners.map((p, index) => (
              <motion.article
                key={p.id}
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
                <div className={`grid md:grid-cols-2 gap-10 items-start ${index % 2 === 1 ? "md:direction-rtl" : ""}`}>
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={p.image}
                      alt={p.imageAlt || `Kök från ${p.name}`}
                      loading="lazy"
                      width={1024}
                      height={768}
                      className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                      Partner {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-4">
                      {p.name}
                    </h2>
                    <p className="text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                      {p.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-3 sm:px-6 bg-secondary/30">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Redo att komma igång?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-8">
              Få offerter från våra partners
            </h2>
            <Link
              to="/?start=quiz"
              className="inline-block border border-foreground text-foreground px-10 py-4 text-[11px] tracking-[0.25em] uppercase font-light hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Starta din köksresa
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Partners;
