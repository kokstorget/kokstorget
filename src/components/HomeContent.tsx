import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGuides } from "@/hooks/useSanityData";
import { fallbackGuides, fromSanity } from "@/lib/guides";

const STEPS = [
  {
    title: "Berätta om ditt kök",
    text: "Svara på några frågor om stil, storlek, budget och tidsplan. Det tar bara några minuter.",
  },
  {
    title: "Vi matchar dig med köksföretag",
    text: "Din förfrågan går till utvalda köksföretag som passar ditt projekt, från platsbyggda kök till kompletta köksrenoveringar.",
  },
  {
    title: "Jämför offerter och välj",
    text: "Du får skräddarsydda offerter att jämföra sida vid sida. Kostnadsfritt och utan förpliktelser.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

interface HomeContentProps {
  onStartQuiz: () => void;
}

const HomeContent = ({ onStartQuiz }: HomeContentProps) => {
  const { data: sanityGuides } = useGuides();
  const guides = (sanityGuides?.length ? sanityGuides.map(fromSanity) : fallbackGuides).slice(0, 3);

  return (
    <>
      {/* How it works */}
      <section className="py-24 md:py-32 px-3 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="text-center mb-16" {...fadeUp}>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight">
              Så fungerar det
            </h2>
          </motion.div>
          <ol className="grid md:grid-cols-3 gap-12">
            {STEPS.map((step, i) => (
              <motion.li key={step.title} {...fadeUp} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <h3 className="font-display text-xl md:text-2xl font-light mb-3">{step.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Renovation vs new kitchen */}
      <section className="py-24 md:py-32 px-3 sm:px-6 bg-secondary/40">
        <div className="container mx-auto max-w-3xl">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-3xl md:text-4xl font-light leading-tight mb-8">
              Köksrenovering eller nytt kök – hitta rätt köksföretag från början
            </h2>
            <div className="space-y-5 text-muted-foreground font-light leading-relaxed text-lg">
              <p>
                Oavsett om du ska renovera köket, byta luckor eller bygga ett helt nytt kök är det
                svårt att veta vilka köksföretag som passar ditt projekt och din budget. Kökstorget
                samlar kvalitetssäkrade köksföretag, så att du kan jämföra offerter utan att själv
                ringa runt.
              </p>
              <p>
                Du beskriver ditt kök en gång och får offerter från företag som arbetar med just
                den typ av kök du vill ha, oavsett om det är ett tidlöst shakerkök, ett modernt kök
                med släta fronter eller ett platsbyggt kök.
              </p>
            </div>
            <button
              type="button"
              onClick={onStartQuiz}
              className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary/90 transition-colors group"
            >
              Få offerter
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-24 md:py-32 px-3 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div className="flex items-end justify-between gap-6 mb-12" {...fadeUp}>
            <h2 className="font-display text-3xl md:text-4xl font-light leading-tight">
              Guider inför ditt nya kök
            </h2>
            <Link
              to="/guider"
              className="shrink-0 text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Alla guider
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {guides.map((guide, i) => (
              <motion.article
                key={guide.id}
                className="group"
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link to={`/guider/${guide.slug}`} className="block">
                  <div className="overflow-hidden mb-5">
                    <img
                      src={guide.image}
                      alt={guide.imageAlt}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={1200}
                      height={900}
                    />
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-light mb-2 group-hover:text-accent transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light">
                    {guide.excerpt}
                  </p>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeContent;
