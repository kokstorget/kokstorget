import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail } from "lucide-react";

const ThankYouSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-6 pt-32 pb-16 overflow-hidden">
      {/* Premium layered background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-secondary/40 to-background" />
      <div className="hidden md:block absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] -z-10 rounded-full bg-accent/10 blur-[120px]" />
      <div className="hidden md:block absolute -bottom-40 -right-40 w-[600px] h-[600px] -z-10 rounded-full bg-primary/[0.06] blur-[100px]" />

      <motion.div
        className="max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
        >
          <CheckCircle2 className="h-10 w-10 text-accent" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">Tack för din förfrågan!</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Vi har skickat dina önskemål till våra utvalda köksföretag. 
          De återkommer till dig med skräddarsydda förslag.
        </p>

        <div className="grid gap-4 text-left">
          {[
            { icon: Mail, title: "Kolla din inbox", desc: "Du får en bekräftelse via e-post" },
            { icon: Clock, title: "Inom 1–3 arbetsdagar", desc: "Köksföretagen kontaktar dig med offerter" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl bg-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold font-display">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ThankYouSection;
