import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, Check, Camera, X, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface StepConfig {
  id: string;
  question: string;
  subtitle: string;
  type: "single" | "multi" | "text" | "contact" | "images";
  options?: string[];
}

const steps: StepConfig[] = [
  {
    id: "type",
    question: "Vilken typ av kök söker du?",
    subtitle: "Välj det alternativ som passar bäst",
    type: "single",
    options: ["Helt nytt kök", "Renovering av befintligt", "Köksö / tillbyggnad", "Vet inte ännu"],
  },
  {
    id: "style",
    question: "Vilken stil tilltalar dig?",
    subtitle: "Du kan välja flera alternativ",
    type: "multi",
    options: ["Modern & minimalistisk", "Klassisk & tidlös", "Lantlig & rustik", "Skandinavisk", "Industriell"],
  },
  {
    id: "budget",
    question: "Vad är din ungefärliga budget?",
    subtitle: "Detta hjälper oss matcha rätt leverantör",
    type: "single",
    options: ["Under 50 000 kr", "50 000 – 100 000 kr", "100 000 – 200 000 kr", "200 000 – 400 000 kr", "Över 400 000 kr"],
  },
  {
    id: "timeline",
    question: "När vill du ha ditt nya kök klart?",
    subtitle: "Ungefärlig tidsram",
    type: "single",
    options: ["Inom 3 månader", "3–6 månader", "6–12 månader", "Mer än 12 månader", "Bara kollar runt"],
  },
  {
    id: "details",
    question: "Finns det något mer vi bör veta?",
    subtitle: "Beskriv gärna dina önskemål (valfritt)",
    type: "text",
  },
  {
    id: "images",
    question: "Bifoga bilder på ditt nuvarande kök",
    subtitle: "Hjälper köksföretagen ge bättre offerter (valfritt)",
    type: "images",
  },
  {
    id: "contact",
    question: "Dina kontaktuppgifter",
    subtitle: "Så att köksföretagen kan kontakta dig",
    type: "contact",
  },
];

const KitchenQuestionnaire = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "", city: "" });
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string }[]>([]);
  const [direction, setDirection] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (option: string) => {
    if (step.type === "single") {
      setAnswers({ ...answers, [step.id]: option });
    } else if (step.type === "multi") {
      const current = (answers[step.id] as string[]) || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];
      setAnswers({ ...answers, [step.id]: updated });
    }
  };

  const isSelected = (option: string) => {
    const answer = answers[step.id];
    if (Array.isArray(answer)) return answer.includes(option);
    return answer === option;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).slice(0, 5 - uploadedImages.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    if (uploadedImages.length + newImages.length > 5) {
      toast.error("Du kan ladda upp max 5 bilder");
      return;
    }

    setUploadedImages((prev) => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const canProceed = () => {
    if (step.type === "contact") {
      return contactInfo.name && contactInfo.email && contactInfo.phone && contactInfo.city;
    }
    if (step.type === "text" || step.type === "images") return true;
    const answer = answers[step.id];
    if (Array.isArray(answer)) return answer.length > 0;
    return !!answer;
  };

  const goNext = () => {
    if (currentStep === steps.length - 1) {
      toast.success("Tack! Dina uppgifter har skickats till våra köksföretag.");
      onComplete();
      return;
    }
    setDirection(1);
    setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep((s) => s - 1);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Progress bar */}
      <div className="w-full max-w-xl mb-12">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground font-medium">
            Steg {currentStep + 1} av {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{step.question}</h2>
            <p className="text-muted-foreground mb-8">{step.subtitle}</p>

            {(step.type === "single" || step.type === "multi") && step.options && (
              <div className="grid gap-3">
                {step.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium ${
                      isSelected(option)
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card hover:border-primary/40 text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isSelected(option) && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step.type === "text" && (
              <Textarea
                placeholder="T.ex. önskar inbyggd ugn, vill ha bardisk, specifika mått..."
                className="min-h-[140px] text-base rounded-xl"
                value={(answers[step.id] as string) || ""}
                onChange={(e) => setAnswers({ ...answers, [step.id]: e.target.value })}
              />
            )}

            {step.type === "images" && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />

                {/* Upload area */}
                {uploadedImages.length < 5 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
                  >
                    <ImagePlus className="h-10 w-10" />
                    <span className="text-sm font-medium">Klicka för att ladda upp bilder</span>
                    <span className="text-xs text-muted-foreground">Max 5 bilder · JPG, PNG</span>
                  </button>
                )}

                {/* Preview grid */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {uploadedImages.map((img, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border group">
                        <img
                          src={img.preview}
                          alt={`Köksbild ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-foreground" />
                        </button>
                      </div>
                    ))}
                    {uploadedImages.length < 5 && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary/40 transition-colors"
                      >
                        <Camera className="h-6 w-6" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {step.type === "contact" && (
              <div className="grid gap-4">
                <Input
                  placeholder="Namn *"
                  className="text-base rounded-xl py-5"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                />
                <Input
                  placeholder="E-post *"
                  type="email"
                  className="text-base rounded-xl py-5"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                />
                <Input
                  placeholder="Telefon *"
                  type="tel"
                  className="text-base rounded-xl py-5"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
                <Input
                  placeholder="Stad / Ort *"
                  className="text-base rounded-xl py-5"
                  value={contactInfo.city}
                  onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={currentStep === 0}
            className="rounded-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tillbaka
          </Button>

          <Button
            onClick={goNext}
            disabled={!canProceed()}
            className="rounded-full px-6"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Skicka förfrågan
                <Send className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Nästa
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KitchenQuestionnaire;
