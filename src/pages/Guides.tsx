import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Seo from "@/components/Seo";
import { useGuides } from "@/hooks/useSanityData";
import { fallbackGuides, fromSanity, readingTime } from "@/lib/guides";

const ALL = "Alla";

const Guides = () => {
  const { data: sanityGuides } = useGuides();
  const guides = sanityGuides?.length ? sanityGuides.map(fromSanity) : fallbackGuides;
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(guides.map((g) => g.category).filter(Boolean)))],
    [guides]
  );
  const visibleGuides =
    activeCategory === ALL ? guides : guides.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Guider & Tips — Allt om att planera ditt kök"
        description="Praktiska guider och tips om köksrenovering: planering, budget, material och design. Kunskap som hjälper dig att skapa ditt drömkök."
        path="/guider"
      />
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-3 sm:px-6">
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
            Guider & Tips
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Kunskap och råd från köksbranschen — allt du behöver veta för att
            planera, budgetera och välja rätt till ditt nya kök.
          </motion.p>
        </div>
      </section>

      {/* Category filter */}
      {categories.length > 2 && (
        <motion.div
          className="px-3 sm:px-6 pb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="container mx-auto max-w-5xl flex flex-wrap justify-center gap-x-8 gap-y-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`text-[11px] tracking-[0.25em] uppercase font-light pb-1 border-b transition-colors ${
                  activeCategory === category
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Guide grid */}
      <section className="pb-32 px-3 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
            {visibleGuides.map((guide, i) => (
              <motion.article
                key={guide.id}
                className="group h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              >
                <Link to={`/guider/${guide.slug}`} className="flex flex-col h-full">
                  <div className="overflow-hidden mb-5">
                    <img
                      src={guide.image}
                      alt={guide.imageAlt}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={i < 3 ? undefined : "lazy"}
                      width={1200}
                      height={900}
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                    {[guide.category, `${readingTime(guide.body)} min läsning`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <h2 className="font-display text-lg md:text-xl font-light mb-2 group-hover:text-accent transition-colors">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light mb-4">
                    {guide.excerpt}
                  </p>
                  <span className="mt-auto self-start inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-foreground">
                    Läs guiden
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

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

      {/* Footer */}
      <footer className="py-12 px-3 sm:px-6 border-t border-border">
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

export default Guides;
