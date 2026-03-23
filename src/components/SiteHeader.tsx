import { motion } from "framer-motion";

const SiteHeader = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="/" className="text-white">
          <span className="font-display text-2xl font-light tracking-wide">
            Kökstorget
          </span>
        </a>
        <span className="text-[11px] tracking-[0.25em] uppercase text-white/60 hidden sm:block font-light">
          Kostnadsfritt · Utan förpliktelser
        </span>
      </div>
    </motion.header>
  );
};

export default SiteHeader;
