import { toPlainText, type PortableTextBlock } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";
import type { SanityGuide } from "@/hooks/useSanityData";

import trendRenovation from "@/assets/trend-renovation.jpg";
import trendNatural from "@/assets/trend-natural.jpg";
import caseKitchen2 from "@/assets/case-kitchen-2.jpg";

export interface Guide {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  body: PortableTextBlock[];
}

let keyCounter = 0;
const block = (style: string, text: string, listItem?: "bullet" | "number"): PortableTextBlock => {
  const key = `fb${keyCounter++}`;
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
    ...(listItem ? { listItem, level: 1 } : {}),
  };
};
const p = (text: string) => block("normal", text);
const h2 = (text: string) => block("h2", text);
const li = (text: string) => block("normal", text, "bullet");

export const fallbackGuides: Guide[] = [
  {
    id: "fallback-planera",
    slug: "sa-planerar-du-ditt-nya-kok",
    title: "Så planerar du ditt nya kök",
    category: "Planering",
    author: "Kökstorget",
    publishedAt: "2026-09-15",
    excerpt:
      "Ett välplanerat kök börjar långt innan du väljer luckor. Här går vi igenom stegen som gör skillnad — från behov och flöden till mått och tidsplan.",
    image: trendRenovation,
    imageAlt: "Kök under planering",
    body: [
      p("Ett nytt kök är en av de största investeringarna i hemmet, och det är också ett av de rum som används mest. Därför lönar det sig att lägga tid på planeringen innan du börjar titta på färger och material."),
      h2("Börja med hur du använder köket"),
      p("Fundera på hur många som lagar mat samtidigt, om köket också ska fungera som samlingsplats och hur mycket förvaring ni faktiskt behöver. Svaren styr både planlösning och val av skåp."),
      h2("Tänk på arbetstriangeln"),
      p("Avståndet mellan spis, diskho och kyl avgör hur smidigt köket känns i vardagen. Placera dem så att du kan röra dig fritt mellan zonerna utan att korsa genomgångar."),
      li("Håll gärna 120 cm fritt framför bänkskåpen"),
      li("Planera avställningsytor bredvid spis och ugn"),
      li("Placera diskmaskinen nära diskhon och porslinsskåpen"),
      h2("Sätt en realistisk tidsplan"),
      p("Räkna med att leveranstiden för ett platsbyggt eller måttanpassat kök kan vara flera veckor. Lägg till tid för rivning, el och VVS, så blir det lättare att undvika stress på slutet."),
    ],
  },
  {
    id: "fallback-kostnad",
    slug: "vad-kostar-ett-nytt-kok",
    title: "Vad kostar ett nytt kök?",
    category: "Budget",
    author: "Kökstorget",
    publishedAt: "2026-09-01",
    excerpt:
      "Priset på ett nytt kök varierar stort. Vi förklarar vad som påverkar kostnaden och hur du får en budget som håller hela vägen.",
    image: caseKitchen2,
    imageAlt: "Ljust modernt kök",
    body: [
      p("Ett nytt kök kan kosta allt från under 100 000 kronor till långt över en halv miljon. Skillnaden ligger i storlek, material, vitvaror och hur mycket som behöver göras i rummet."),
      h2("Det här påverkar priset mest"),
      li("Luckor och stommar — massivt trä och platsbyggt kostar mer än standardmoduler"),
      li("Bänkskiva — natursten och komposit ligger högre än laminat"),
      li("Vitvaror — integrerade och premiummärken drar upp totalen"),
      li("Installation — el, VVS och eventuella ytskikt"),
      h2("Glöm inte ROT-avdraget"),
      p("Arbetskostnaden för montering och installation ger rätt till ROT-avdrag, vilket kan sänka den totala kostnaden rejält. Be om offerter där arbete och material är tydligt separerade."),
      h2("Jämför offerter på rätt sätt"),
      p("Den billigaste offerten är inte alltid den bästa. Jämför vad som ingår, vilka garantier som gäller och hur leveransen och monteringen går till. Genom Kökstorget får du offerter från flera utvalda köksföretag att jämföra sida vid sida."),
    ],
  },
  {
    id: "fallback-bankskiva",
    slug: "valj-ratt-bankskiva",
    title: "Välj rätt bänkskiva",
    category: "Material",
    author: "Kökstorget",
    publishedAt: "2026-08-20",
    excerpt:
      "Sten, trä, komposit eller laminat? Bänkskivan sätter tonen för hela köket. Här är för- och nackdelarna med de vanligaste materialen.",
    image: trendNatural,
    imageAlt: "Kök med bänkskiva i natursten",
    body: [
      p("Bänkskivan är den yta i köket som slits mest, och samtidigt en av de mest synliga detaljerna. Rätt material handlar om både utseende och hur du lagar mat."),
      h2("Natursten"),
      p("Marmor, granit och kalksten ger ett exklusivt och tidlöst intryck. Granit är tålig, medan marmor och kalksten får patina och kräver lite mer omsorg."),
      h2("Komposit och kvarts"),
      p("Kompositskivor är täta, lättskötta och finns i många utföranden. Ett bra val för den som vill ha stenkänsla utan att behöva impregnera."),
      h2("Trä"),
      p("En massiv träskiva ger värme och går att slipa om när den blivit sliten. Den behöver oljas regelbundet, särskilt runt diskhon."),
      h2("Laminat"),
      p("Laminat är prisvärt och finns i många mönster. Moderna laminatskivor är betydligt tåligare än förr, men tål inte heta kastruller direkt på ytan."),
    ],
  },
];

export function fromSanity(g: SanityGuide): Guide {
  return {
    id: g._id,
    slug: g.slug,
    title: g.title,
    category: g.category || "",
    author: g.author || "",
    publishedAt: g.publishedAt,
    excerpt: g.excerpt || "",
    image: g.mainImage ? urlFor(g.mainImage).width(1600).height(1000).url() : "",
    imageAlt: g.mainImage?.alt || g.title,
    body: g.body || [],
  };
}

export function readingTime(body: PortableTextBlock[]): number {
  const words = toPlainText(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
