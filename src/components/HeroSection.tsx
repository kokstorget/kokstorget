import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import kitchenHero from "@/assets/kitchen-hero.jpg";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src={kitchenHero}
          alt="Modernt skandinaviskt kök"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pb-20 md:pb-28">
        <div className="max-w-2xl">
          <motion.p
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/70 mb-6 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sveriges smartaste köksförmedling
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Hitta ditt{" "}
            <em className="font-normal">drömkök</em>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-white/75 max-w-lg mb-10 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Svara på några frågor och få skräddarsydda offerter
            från utvalda köksföretag. Kostnadsfritt och utan förpliktelser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <Button
              size="lg"
              onClick={onStartQuiz}
              className="bg-white text-foreground hover:bg-white/90 text-sm tracking-[0.15em] uppercase px-8 py-6 rounded-none font-medium group"
            >
              Kom igång
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Minimal trust bar */}
        <motion.div
          className="mt-16 flex flex-wrap gap-x-10 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {["Utvalda köksföretag", "Helt kostnadsfritt", "Jämför offerter"].map((text, i) => (
            <span key={i} className="text-xs tracking-[0.2em] uppercase text-white/50 font-light">
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
