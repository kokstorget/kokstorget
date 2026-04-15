import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SiteHeader from "@/components/SiteHeader";
import { Building2, Users, TrendingUp, CheckCircle2, Loader2 } from "lucide-react";

const PARTNER_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_PARTNER_KEY;

const benefits = [
  {
    icon: Users,
    title: "Kvalificerade leads",
    description: "Få förfrågningar från kunder som redan specificerat sina behov, budget och tidsplan.",
  },
  {
    icon: TrendingUp,
    title: "Ökad synlighet",
    description: "Visa upp ert varumärke och era referensprojekt för tusentals potentiella kunder.",
  },
  {
    icon: Building2,
    title: "Ingen anslutningsavgift",
    description: "Det kostar inget att ansluta sig. Ni betalar bara när ni får kvalificerade leads.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const Connect = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.contact || !form.email || !form.phone) {
      toast({
        title: "Fyll i alla obligatoriska fält",
        description: "Företagsnamn, kontaktperson, e-post och telefon krävs.",
        variant: "destructive",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      toast({
        title: "Ogiltig e-postadress",
        description: "Ange en giltig e-postadress.",
        variant: "destructive",
      });
      return;
    }
    const phoneDigits = form.phone.trim().replace(/[\s\-()]/g, "").replace(/^\+/, "");
    if (!/^\d+$/.test(phoneDigits) || phoneDigits.length < 8 || phoneDigits.length > 13) {
      toast({
        title: "Ogiltigt telefonnummer",
        description: "Ange ett giltigt telefonnummer (8–13 siffror).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        access_key: PARTNER_ACCESS_KEY,
        subject: `Ny partneranmälan från ${form.company}`,
        from_name: "Kokstorget — Partneranmälan",
        Företag: form.company,
        Kontaktperson: form.contact,
        "E-post": form.email,
        Telefon: form.phone,
        "Ort / Region": form.city || "—",
        Meddelande: form.message || "—",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message || "Submit failed");

      setSubmitted(true);
      toast({ title: "Tack för ert intresse!", description: "Vi återkommer inom kort." });
    } catch (err) {
      console.error(err);
      toast({
        title: "Något gick fel",
        description: "Försök igen om en stund eller kontakta oss direkt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader variant="solid" />
        <div className="pt-32 pb-24 flex flex-col items-center justify-center text-center px-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
              Tack för er anmälan
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto text-lg">
              Vi har mottagit ert intresse och återkommer inom kort med mer information om hur vi kan samarbeta.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader variant="solid" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-display text-4xl md:text-6xl font-light text-foreground leading-tight mb-8"
            {...fadeUp}
          >
            Anslut ert köksföretag
          </motion.h1>
          <motion.p
            className="text-muted-foreground font-light text-lg max-w-2xl mx-auto leading-relaxed"
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Bli en del av Kökstorget och få tillgång till kvalificerade leads från kunder som aktivt
            söker nya kök. Vi matchar rätt kund med rätt köksföretag.
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className="bg-card rounded-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <b.icon className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-display text-xl font-light text-foreground mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="pb-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="bg-card rounded-lg p-8 md:p-12"
            {...fadeUp}
          >
            <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mb-2 text-center">
              Anmäl ert intresse
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Fyll i formuläret nedan så kontaktar vi er inom kort.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                    Företagsnamn *
                  </label>
                  <Input name="company" value={form.company} onChange={handleChange} placeholder="Ert företagsnamn" />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                    Kontaktperson *
                  </label>
                  <Input name="contact" value={form.contact} onChange={handleChange} placeholder="Förnamn Efternamn" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                    E-post *
                  </label>
                  <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="er@foretag.se" />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                    Telefon *
                  </label>
                  <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="070-123 45 67" />
                </div>
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                  Ort / Region
                </label>
                <Input name="city" value={form.city} onChange={handleChange} placeholder="Var är ni verksamma?" />
              </div>

              <div>
                <label className="text-xs tracking-widest uppercase text-muted-foreground mb-1.5 block">
                  Meddelande
                </label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Berätta gärna kort om ert företag och varför ni vill bli partner..."
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-sm tracking-widest uppercase"
              >
                {isSubmitting ? (
                  <>
                    Skickar...
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Skicka intresseanmälan"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground text-xs tracking-widest">
          © {new Date().getFullYear()} Kökstorget
        </div>
      </footer>
    </div>
  );
};

export default Connect;
