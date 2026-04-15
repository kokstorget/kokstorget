import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface SiteHeaderProps {
  variant?: "transparent" | "solid";
}

const NAV_LINKS = [
  { to: "/inspiration", label: "Inspiration" },
  { to: "/kundcase", label: "Kundcase" },
  { to: "/partners", label: "Partners" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/anslut", label: "Anslut Företag" },
];

const SiteHeader = ({ variant = "transparent" }: SiteHeaderProps) => {
  const isTransparent = variant === "transparent";
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" && window.scrollY > 16
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const showChrome = !isTransparent || scrolled || menuOpen;
  const useLightText = isTransparent && !scrolled && !menuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-out ${
          showChrome
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_20px_-10px_rgba(60,45,30,0.25)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            to="/"
            className={`flex flex-col ${useLightText ? "text-white" : "text-foreground"}`}
          >
            <span className="font-display text-xl md:text-2xl font-light tracking-wide">
              Kökstorget
            </span>
            <span
              className={`text-[7px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light ${
                useLightText ? "text-white/50" : "text-muted-foreground"
              }`}
            >
              Sveriges smartaste köksförmedling
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] tracking-[0.25em] uppercase font-light transition-colors ${
                  useLightText
                    ? "text-white/70 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className={`lg:hidden p-2 -mr-2 transition-colors ${
              useLightText ? "text-white" : "text-foreground"
            }`}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center gap-8 px-6 pt-20"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="text-foreground text-sm tracking-[0.3em] uppercase font-light hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
