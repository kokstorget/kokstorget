import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Seo from "@/components/Seo";
import aboutTeam from "@/assets/about_kitchen.png";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const faqs = [
  {
    question: "Kostar det något att använda Kökstorget?",
    answer: "Nej, vår tjänst är helt kostnadsfri för dig som privatperson. Vi finansieras av våra partnerföretag som betalar för att få kontakt med motiverade köksköpare.",
  },
  {
    question: "Hur fungerar matchningen med köksföretag?",
    answer: "Du svarar på några enkla frågor om ditt drömkök — stil, budget, tidsplan och önskemål. Baserat på dina svar matchar vi dig med upp till tre kvalitetssäkrade köksföretag i ditt område som passar just ditt projekt.",
  },
  {
    question: "Är jag bunden att anlita något av köksföretagen?",
    answer: "Absolut inte. Du får offerter och kan jämföra i lugn och ro utan någon som helst förpliktelse. Det är helt upp till dig om och när du vill gå vidare med ett av företagen.",
  },
  {
    question: "Hur vet jag att köksföretagen håller hög kvalitet?",
    answer: "Alla köksföretag i vårt nätverk genomgår en noggrann granskning. Vi kontrollerar referenser, certifieringar och kundomdömen innan de blir en del av Kökstorget. Vi samarbetar bara med företag vi själva skulle anlita.",
  },
  {
    question: "Hur lång tid tar det att få offerter?",
    answer: "Normalt får du dina första offerter inom 1–3 arbetsdagar efter att du skickat in din förfrågan. Tiden kan variera beroende på projektets omfattning och säsong.",
  },
  {
    question: "Kan jag använda tjänsten för både renovering och nybygge?",
    answer: "Ja, Kökstorget passar oavsett om du renoverar ditt befintliga kök eller planerar kök i ett nybygge. Våra partners hanterar alla typer av köksprojekt.",
  },
  {
    question: "Vilka områden täcker ni?",
    answer: "Vi har partners över hela Sverige, med extra stark närvaro i storstadsregionerna. Om det inte finns en partner i just ditt område meddelar vi dig direkt och jobbar på att utöka nätverket.",
  },
  {
    question: "Vad händer efter att jag skickat in min förfrågan?",
    answer: "Våra matchade köksföretag kontaktar dig direkt med skräddarsydda förslag och offerter. Du bestämmer sedan i din egen takt om du vill boka ett möte, be om fler detaljer eller gå vidare.",
  },
];

const values = [
  {
    number: "01",
    title: "Kostnadsfritt & oberoende",
    text: "Vi tar aldrig betalt av dig som kund. Vår tjänst finansieras av köksföretagen som vill nå motiverade köksköpare. Det innebär att vi alltid kan ge dig opartiska rekommendationer.",
  },
  {
    number: "02",
    title: "Kvalitetssäkrade partners",
    text: "Varje köksföretag i vårt nätverk har granskats noggrant. Vi kontrollerar referenser, certifieringar och kundnöjdhet för att säkerställa att du bara möter de bästa.",
  },
  {
    number: "03",
    title: "Personlig matchning",
    text: "Baserat på dina önskemål, budget och geografiska läge matchar vi dig med de köksföretag som passar just ditt projekt. Inga generiska listor — bara relevanta kontakter.",
  },
  {
    number: "04",
    title: "Trygghet genom hela processen",
    text: "Från första förfrågan till färdigt kök finns vi tillgängliga för frågor och vägledning. Vi vill att din köksresa ska vara lika inspirerande som slutresultatet.",
  },
];

const stats = [
  { value: "2 500+", label: "Nöjda kunder" },
  { value: "150+", label: "Partners i nätverket" },
  { value: "98%", label: "Rekommenderar oss" },
  { value: "0 kr", label: "Kostar för dig" },
];

const About = () => {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Om oss — Vi gör det enklare att hitta rätt kök"
        description="Kökstorget är Sveriges oberoende plattform som kopplar samman köksdrömmare med kvalitetssäkrade köksföretag — helt kostnadsfritt."
        path="/om-oss"
        jsonLd={faqLd}
      />
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-3 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.p
            className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Om oss
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-6xl font-light text-foreground leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Vi gör det enklare att hitta <em className="font-normal">rätt kök</em>
          </motion.h1>
          <motion.p
            className="text-muted-foreground font-light text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Kökstorget är Sveriges oberoende plattform som kopplar samman
            köksdrömmare med kvalitetssäkrade köksföretag — helt kostnadsfritt.
          </motion.p>
        </div>
      </section>

      {/* Image + story */}
      <section className="pb-32 px-3 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fadeUp}>
            <img
              src={aboutTeam}
              alt="Modernt skandinaviskt kök med ljust trä och industriell takbelysning"
              className="w-full aspect-[3/2] object-cover mb-16"
              width={1200}
              height={800}
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <motion.div {...fadeUp}>
              <h2 className="font-display text-2xl md:text-3xl font-light mb-6 leading-tight">
                Vår historia
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-4">
                Kökstorget grundades med en enkel insikt: att köpa nytt kök
                är en av hemmets största investeringar, men processen är ofta
                förvirrande och tidskrävande. Vem ska man välja? Vad kostar
                det egentligen? Vilka frågor borde man ställa?
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                Vi skapade en plattform där du som köksköpare svarar på några
                enkla frågor och sedan blir matchad med handplockade
                köksföretag som passar just ditt projekt. Inga kalla samtal,
                inga oändliga Google-sökningar — bara relevanta offerter från
                proffs som kan leverera.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <h2 className="font-display text-2xl md:text-3xl font-light mb-6 leading-tight">
                Hur det fungerar
              </h2>
              <div className="space-y-6">
                {[
                  "Du svarar på frågor om ditt drömkök — stil, budget, tidsplan och behov.",
                  "Vi matchar dig med upp till tre kvalitetssäkrade köksföretag i ditt område.",
                  "Du får skräddarsydda offerter och kan jämföra i lugn och ro — helt utan kostnad.",
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="font-display text-2xl text-muted-foreground/40 font-light shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-muted-foreground font-light leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-3 sm:px-6 border-y border-border">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-display text-3xl md:text-4xl font-light text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-3 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div className="mb-16" {...fadeUp}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Våra värderingar
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
              Varför välja <em className="font-normal">Kökstorget</em>
            </h2>
          </motion.div>

          <div className="grid gap-0">
            {values.map((item, i) => (
              <motion.div
                key={i}
                className="grid md:grid-cols-[80px_1fr] gap-4 md:gap-8 py-8 border-t border-border last:border-b"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <span className="font-display text-3xl text-muted-foreground/40 font-light">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light max-w-2xl">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-3 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <motion.div className="mb-16 text-center" {...fadeUp}>
            <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Vanliga frågor
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
              Har du frågor? Vi har <em className="font-normal">svaren</em>
            </h2>
          </motion.div>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="border-t border-border last:border-b"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <details className="group py-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-base md:text-lg font-medium pr-4">{faq.question}</h3>
                    <span className="text-muted-foreground text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
                  </summary>
                  <p className="text-muted-foreground font-light leading-relaxed mt-4 max-w-2xl">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-3 sm:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Redo att hitta ditt <em className="font-normal">drömkök</em>?
            </h2>
            <p className="text-primary-foreground/70 mb-10 font-light max-w-xl mx-auto">
              Svara på några enkla frågor och få skräddarsydda offerter från
              utvalda köksföretag — helt kostnadsfritt.
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

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-3 sm:px-6 text-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            © {new Date().getFullYear()} Kökstorget — Alla rättigheter förbehållna
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
