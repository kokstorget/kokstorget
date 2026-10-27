import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Sidan finns inte"
        description="Sidan du letar efter finns inte längre eller har flyttats."
        path={location.pathname}
        noindex
      />
      <SiteHeader variant="solid" />
      <section className="pt-40 pb-32 px-3 sm:px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground mb-6">404</p>
          <h1 className="font-display text-4xl md:text-6xl font-light leading-[1.1] mb-6">
            Sidan finns inte
          </h1>
          <p className="text-muted-foreground font-light text-lg mb-10">
            Sidan du letar efter finns inte längre eller har flyttats. Börja om från startsidan eller
            läs våra guider om nytt kök.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium hover:bg-primary/90 transition-colors group"
            >
              Till startsidan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/guider"
              className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Läs guiderna
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default NotFound;
