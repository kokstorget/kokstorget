import { motion } from "framer-motion";
import { ArrowRight, ChefHat, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import kitchenHero from "@/assets/kitchen-hero.jpg";

interface HeroSectionProps {
  onStartQuiz: () => void;
}

const HeroSection = ({ onStartQuiz }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <img src={kitchenHero} alt="Modernt skandinaviskt kök" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 tracking-wide">
              Sveriges smartaste köksförmedling
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Hitta ditt{" "}
            <span className="text-primary italic">drömkök</span>
            <br />
            — helt enkelt
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Svara på några frågor om ditt nya kök och få skräddarsydda offerter 
            från utvalda köksföretag. Kostnadsfritt och utan förpliktelser.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <Button
              size="lg"
              onClick={onStartQuiz}
              className="text-lg px-8 py-6 rounded-full font-medium group"
            >
              Kom igång
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: ChefHat, title: "Utvalda köksföretag", desc: "Noggrant utvalda partners" },
              { icon: Users, title: "Helt kostnadsfritt", desc: "Du betalar ingenting" },
              { icon: Building2, title: "Jämför offerter", desc: "Få flera förslag att välja mellan" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
