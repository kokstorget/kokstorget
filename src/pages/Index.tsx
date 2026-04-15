import { useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import KitchenQuestionnaire from "@/components/KitchenQuestionnaire";
import ThankYouSection from "@/components/ThankYouSection";
import Seo from "@/components/Seo";

type View = "hero" | "quiz" | "thankyou";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kökstorget",
  url: "https://kokstorget.se",
  logo: "https://kokstorget.se/favicon.svg",
  description:
    "Sveriges smartaste köksförmedling. Vi kopplar samman köksdrömmare med kvalitetssäkrade köksföretag — helt kostnadsfritt.",
  areaServed: { "@type": "Country", name: "Sverige" },
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");
  const view: View = start === "quiz" ? "quiz" : start === "thankyou" ? "thankyou" : "hero";

  return (
    <div className="min-h-screen">
      <Seo
        title="Kökstorget — Hitta ditt drömkök"
        description="Sveriges smartaste köksförmedling. Svara på några frågor och få skräddarsydda offerter från utvalda köksföretag — helt kostnadsfritt."
        path="/"
        jsonLd={organizationLd}
      />
      <SiteHeader variant={view === "hero" ? "transparent" : "solid"} />
      {view === "hero" && (
        <HeroSection onStartQuiz={() => setSearchParams({ start: "quiz" })} />
      )}
      {view === "quiz" && (
        <KitchenQuestionnaire onComplete={() => setSearchParams({ start: "thankyou" })} />
      )}
      {view === "thankyou" && <ThankYouSection />}
    </div>
  );
};

export default Index;
