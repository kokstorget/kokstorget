import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import KitchenQuestionnaire from "@/components/KitchenQuestionnaire";
import ThankYouSection from "@/components/ThankYouSection";

type View = "hero" | "quiz" | "thankyou";

const Index = () => {
  const [view, setView] = useState<View>("hero");

  return (
    <div className="min-h-screen">
      <SiteHeader />
      {view === "hero" && <HeroSection onStartQuiz={() => setView("quiz")} />}
      {view === "quiz" && <KitchenQuestionnaire onComplete={() => setView("thankyou")} />}
      {view === "thankyou" && <ThankYouSection />}
    </div>
  );
};

export default Index;
