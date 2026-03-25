import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import trendBogarden from "@/assets/trend-bogarden.jpg";
import trendHimlekok from "@/assets/trend-himlekok.jpg";
import trendMarbodal from "@/assets/trend-marbodal.jpg";
import trendLucks from "@/assets/trend-lucks.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const trends = [
  {
    image: trendBogarden,
    tag: "Bogården Kök",
    title: "Naturliga material & tidlös värme",
    body: "Bogården Kök är kända för sina handplockade naturmaterial — massiv ek, natursten och handgjord keramik. Resultatet blir kök som åldras vackert och känns genuina. Öppna hyllor och mjuka trädetaljer skapar en ombonad skandinavisk känsla.",
  },
  {
    image: trendHimlekok,
    tag: "Himlekök",
    title: "Ljust, rent & modernt",
    body: "Himlekök levererar den skandinaviska drömmen med rena linjer, greeppfria luckor och ljusa marmorytor. Deras kök andas luft och ljus — perfekt för dig som vill ha ett minimalistiskt uttryck utan att tumma på kvaliteten.",
  },
  {
    image: trendMarbodal,
    tag: "Marbodal Kök",
    title: "Klassisk elegans med moderna detaljer",
    body: "Marbodal kombinerar svenskt kökstradition med moderna trender. Deras mörkgröna luckor med mässingshandtag och massiva träbänkskivor skapar kök med karaktär — en tidlös investering som aldrig går ur stil.",
  },
  {
    image: trendLucks,
    tag: "Lucks by Robo",
    title: "Djärvt & industriellt",
    body: "Lucks by Robo vågar där andra inte gör det — djupblå fronter, betongbänkskivor och industriella belysningsdetaljer. För dig som vill ha ett kök som sticker ut och gör ett statement. Modernt, unikt och fullt av personlighet.",
  },
];

const tips = [
  {
    number: "01",
    title: "Sätt budget innan du drömmer",
    text: "Bestäm en realistisk budget tidigt. Ett kök kan kosta allt från 80 000 till 500 000+ kronor. Inkludera installation, el, VVS och oförutsedda kostnader — lägg alltid till 10–15% marginal.",
  },
  {
    number: "02",
    title: "Prioritera arbetsytan",
    text: "Tänk i 'arbetstriangeln' mellan spis, diskho och kyl. Avstånden ska vara effektiva men inte trånga. Minst 60 cm fritt utrymme på vardera sidan om spisen gör stor skillnad i vardagen.",
  },
  {
    number: "03",
    title: "Välj hållbara material",
    text: "Bänkskivor i kvarts eller granit håller i decennier. Massivt trä kräver underhåll men åldras vackert. Undvik billiga lösningar som ser bra ut i butik men slits snabbt — köket ska hålla i 20+ år.",
  },
  {
    number: "04",
    title: "Anlita rätt köksföretag",
    text: "Jämför alltid minst tre offerter. Kontrollera referenser, se om de erbjuder garanti och fråga exakt vad som ingår. Genom Kökstorget matchar vi dig med kvalitetssäkrade partners kostnadsfritt.",
  },
  {
    number: "05",
    title: "Planera belysningen noggrant",
    text: "Bra belysning förvandlar ett kök. Använd spotlights under överskåp för arbetsytor, en vacker taklampa över matplatsen och dimbar allmänbelysning. LED-lister i socklar ger en modern touch.",
  },
  {
    number: "06",
    title: "Tänk på förvaring",
    text: "Utdragslådor istället för vanliga skåp, hörnkaruseller, kryddhyllor i lådfronter — smart förvaring gör vardagen enklare. Räkna ut hur mycket förvaring ni faktiskt behöver innan ni bestämmer layout.",
  },
];

const Inspiration = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div {...fadeUp}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Tillbaka
            </Link>
          </motion.div>

          <motion.p
            className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light"
            {...fadeUp}
          >
            Inspiration & tips
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-light leading-[1.1] mb-6"
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Kökstrender <em className="font-normal">2026</em>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-light"
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Utforska årets hetaste kökstrender och få praktiska tips inför din
            köksrenovering. Kunskap som hjälper dig fatta smartare beslut.
          </motion.p>
        </div>
      </section>

      {/* Trend articles */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-5xl space-y-24">
          {trends.map((trend, i) => (
            <motion.article
              key={i}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:direction-rtl" : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <img
                  src={trend.image}
                  alt={trend.title}
                  className="w-full aspect-[3/2] object-cover"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground font-light">
                  {trend.tag}
                </span>
                <h2 className="text-2xl md:text-3xl font-light mt-3 mb-5 leading-tight">
                  {trend.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed font-light">
                  {trend.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto max-w-5xl px-6">
        <hr className="border-border" />
      </div>

      {/* Renovation tips */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="mb-16" {...fadeUp}>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
              Guide
            </p>
            <h2 className="text-3xl md:text-5xl font-light leading-tight">
              Att tänka på vid <em className="font-normal">köksrenovering</em>
            </h2>
          </motion.div>

          <div className="grid gap-0">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-8 border-t border-border last:border-b"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <span className="font-display text-3xl text-muted-foreground/40 font-light">
                  {tip.number}
                </span>
                <div>
                  <h3 className="text-lg font-medium mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light max-w-2xl">
                    {tip.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Redo att förverkliga ditt <em className="font-normal">drömkök</em>?
            </h2>
            <p className="text-primary-foreground/70 mb-10 font-light max-w-xl mx-auto">
              Svara på några enkla frågor och få skräddarsydda offerter från
              utvalda köksföretag — helt kostnadsfritt.
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
            © {new Date().getFullYear()} Kökstorget. Alla rättigheter förbehållna.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Inspiration;
