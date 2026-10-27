import { Link } from "react-router-dom";
import { useGuides } from "@/hooks/useSanityData";
import { fallbackGuides, fromSanity } from "@/lib/guides";

const FOOTER_COLUMNS = [
  {
    heading: "Ditt kök",
    links: [
      { to: "/?start=quiz", label: "Få offerter" },
      { to: "/inspiration", label: "Köksinspiration" },
      { to: "/kundcase", label: "Kundcase" },
      { to: "/partners", label: "Våra köksföretag" },
    ],
  },
  {
    heading: "Kökstorget",
    links: [
      { to: "/om-oss", label: "Om oss" },
      { to: "/anslut", label: "Anslut ert köksföretag" },
    ],
  },
];

const SiteFooter = () => {
  const { data: sanityGuides } = useGuides();
  const guides = sanityGuides?.length ? sanityGuides.map(fromSanity) : fallbackGuides;
  const columns = [
    FOOTER_COLUMNS[0],
    {
      heading: "Guider",
      links: [
        ...guides.slice(0, 3).map((g) => ({ to: `/guider/${g.slug}`, label: g.title })),
        { to: "/guider", label: "Alla guider" },
      ],
    },
    FOOTER_COLUMNS[1],
  ];

  return (
    <footer className="py-16 px-3 sm:px-6 border-t border-border">
      <div className="container mx-auto grid gap-12 md:grid-cols-4">
        <div>
          <Link to="/" className="font-display text-xl font-light">
            Kökstorget
          </Link>
          <p className="mt-3 text-sm text-muted-foreground font-light leading-relaxed max-w-xs">
            Jämför offerter på nytt kök och köksrenovering från kvalitetssäkrade köksföretag.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              {col.heading}
            </p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-light text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="container mx-auto mt-12 text-xs text-muted-foreground tracking-wide">
        © {new Date().getFullYear()} Kökstorget. Alla rättigheter förbehållna.
      </p>
    </footer>
  );
};

export default SiteFooter;
