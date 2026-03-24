import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SiteHeaderProps {
  variant?: "transparent" | "solid";
}

const SiteHeader = ({ variant = "transparent" }: SiteHeaderProps) => {
  const isTransparent = variant === "transparent";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isTransparent ? "" : "bg-background/95 backdrop-blur-md border-b border-border/50"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className={isTransparent ? "text-white" : "text-foreground"}>
          <span className="font-display text-2xl font-light tracking-wide">
            Kökstorget
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            to="/inspiration"
            className={`text-[11px] tracking-[0.25em] uppercase font-light transition-colors ${
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Inspiration
          </Link>
          <Link
            to="/kundcase"
            className={`text-[11px] tracking-[0.25em] uppercase font-light transition-colors ${
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Kundcase
          </Link>
          <Link
            to="/om-oss"
            className={`text-[11px] tracking-[0.25em] uppercase font-light transition-colors ${
              isTransparent
                ? "text-white/70 hover:text-white"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Om oss
          </Link>
          <span
            className={`text-[11px] tracking-[0.25em] uppercase hidden sm:block font-light ${
              isTransparent ? "text-white/50" : "text-muted-foreground"
            }`}
          >
            Kostnadsfritt
          </span>
        </nav>
      </div>
    </motion.header>
  );
};

export default SiteHeader;
