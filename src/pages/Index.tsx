import { useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import KitchenQuestionnaire from "@/components/KitchenQuestionnaire";
import ThankYouSection from "@/components/ThankYouSection";

type View = "hero" | "quiz" | "thankyou";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get("start");
  const view: View = start === "quiz" ? "quiz" : start === "thankyou" ? "thankyou" : "hero";

  return (
    <div className="min-h-screen">
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
