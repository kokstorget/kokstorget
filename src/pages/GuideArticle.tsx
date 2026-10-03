import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import Seo from "@/components/Seo";
import GuideBody from "@/components/GuideBody";
import { useGuides } from "@/hooks/useSanityData";
import { fallbackGuides, formatDate, fromSanity, readingTime } from "@/lib/guides";

const SITE_URL = "https://kokstorget.se";

const GuideArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: sanityGuides, isLoading } = useGuides();
  const guides = sanityGuides?.length ? sanityGuides.map(fromSanity) : fallbackGuides;
  const guide = guides.find((g) => g.slug === slug);
  const moreGuides = guides.filter((g) => g.slug !== slug).slice(0, 3);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader variant="solid" />
        {!isLoading && (
          <section className="pt-40 pb-32 px-3 sm:px-6 text-center">
            <Seo
              title="Guiden hittades inte"
              description="Guiden du letar efter finns inte längre."
              path={`/guider/${slug}`}
              noindex
            />
            <h1 className="font-display text-3xl md:text-5xl font-light mb-6">
              Guiden hittades inte
            </h1>
            <p className="text-muted-foreground font-light mb-10">
              Den kan ha flyttats eller tagits bort.
            </p>
            <Link
              to="/guider"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Alla guider
            </Link>
          </section>
        )}
      </div>
    );
  }

  const minutes = readingTime(guide.body);
  const absoluteImage = guide.image.startsWith("http") ? guide.image : `${SITE_URL}${guide.image}`;

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={guide.title}
        description={guide.excerpt}
        path={`/guider/${guide.slug}`}
        image={absoluteImage}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.excerpt,
          image: absoluteImage,
          datePublished: guide.publishedAt,
          author: { "@type": guide.author && guide.author !== "Kökstorget" ? "Person" : "Organization", name: guide.author || "Kökstorget" },
          publisher: { "@type": "Organization", name: "Kökstorget", url: SITE_URL },
          mainEntityOfPage: `${SITE_URL}/guider/${guide.slug}`,
        }}
      />
      <SiteHeader variant="solid" />

      {/* Header */}
      <section className="pt-32 pb-12 px-3 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/guider"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Alla guider
            </Link>
          </motion.div>

          {guide.category && (
            <motion.p
              className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.05 }}
            >
              {guide.category}
            </motion.p>
          )}
          <motion.h1
            className="font-display text-4xl md:text-6xl font-light leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {guide.title}
          </motion.h1>
          <motion.p
            className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {[guide.author, formatDate(guide.publishedAt), `${minutes} min läsning`]
              .filter(Boolean)
              .join(" · ")}
          </motion.p>
        </div>
      </section>

      {/* Main image */}
      {guide.image && (
        <motion.div
          className="px-3 sm:px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <img
            src={guide.image}
            alt={guide.imageAlt}
            className="mx-auto max-w-5xl w-full aspect-[16/10] object-cover"
            width={1600}
            height={1000}
          />
        </motion.div>
      )}

      {/* Body */}
      <article className="px-3 sm:px-6 pb-24">
        <div className="container mx-auto max-w-2xl">
          <p className="font-display text-xl md:text-2xl font-light leading-relaxed text-foreground mb-12">
            {guide.excerpt}
          </p>
          <GuideBody value={guide.body} />
        </div>
      </article>

      {/* More guides */}
      {moreGuides.length > 0 && (
        <section className="py-24 px-3 sm:px-6 border-t border-border/50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl font-light text-center mb-14">
              Fler guider
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {moreGuides.map((g, i) => (
                <motion.article
                  key={g.id}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Link to={`/guider/${g.slug}`} className="block">
                    <div className="overflow-hidden mb-5">
                      <img
                        src={g.image}
                        alt={g.imageAlt}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        width={1200}
                        height={900}
                      />
                    </div>
                    <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">
                      {[g.category, `${readingTime(g.body)} min läsning`].filter(Boolean).join(" · ")}
                    </p>
                    <h3 className="font-display text-lg md:text-xl font-light group-hover:text-accent transition-colors">
                      {g.title}
                    </h3>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

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

export default GuideArticle;
