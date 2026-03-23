import { motion } from "framer-motion";

const SiteHeader = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-display text-xl font-bold tracking-tight">
          Köks<span className="text-primary">torget</span>
        </a>
        <span className="text-sm text-muted-foreground hidden sm:block">
          Kostnadsfritt · Utan förpliktelser
        </span>
      </div>
    </motion.header>
  );
};

export default SiteHeader;
