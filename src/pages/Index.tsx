import { useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import KitchenQuestionnaire from "@/components/KitchenQuestionnaire";
import ThankYouSection from "@/components/ThankYouSection";
import Seo from "@/components/Seo";
import HomeContent from "@/components/HomeContent";
import SiteFooter from "@/components/SiteFooter";
import { ORGANIZATION_ID, SITE_URL } from "@/lib/seo";

type View = "hero" | "quiz" | "thankyou";

const serviceLd = {
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  name: "Jämför offerter på nytt kök och köksrenovering",
  serviceType: "Köksförmedling",
  description:
    "Svara på några frågor om ditt kök och få offerter från kvalitetssäkrade köksföretag. Kostnadsfritt och utan förpliktelser.",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: { "@type": "Country", name: "Sverige" },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "SEK",
    description: "Kostnadsfri offertförfrågan",
  },
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");
  const view: View = start === "quiz" ? "quiz" : start === "thankyou" ? "thankyou" : "hero";
  const startQuiz = () => setSearchParams({ start: "quiz" });

  return (
    <div className="min-h-screen">
      <Seo
        title="Köksrenovering & nytt kök – jämför offerter | Kökstorget"
        description="Ska du renovera eller köpa nytt kök? Svara på några frågor och få offerter från kvalitetssäkrade köksföretag. Helt kostnadsfritt."
        path="/"
        jsonLd={serviceLd}
      />
      <SiteHeader variant={view === "hero" ? "transparent" : "solid"} />
      {view === "hero" && (
        <>
          <HeroSection onStartQuiz={startQuiz} />
          <HomeContent onStartQuiz={startQuiz} />
          <SiteFooter />
        </>
      )}
      {view === "quiz" && (
        <KitchenQuestionnaire onComplete={() => setSearchParams({ start: "thankyou" })} />
      )}
      {view === "thankyou" && <ThankYouSection />}
    </div>
  );
};

export default Index;
