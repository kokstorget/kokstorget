import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-muted-foreground font-light leading-relaxed text-base md:text-lg mb-6">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-2xl md:text-3xl font-light text-foreground mt-14 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-xl md:text-2xl font-light text-foreground mt-10 mb-4">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/30 pl-6 my-10">
        <p className="text-foreground/80 font-light italic leading-relaxed text-lg">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 marker:text-muted-foreground/60">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 marker:text-muted-foreground/60">
        {children}
      </ol>
    ),
  },
  listItem: ({ children }) => (
    <li className="text-muted-foreground font-light leading-relaxed text-base md:text-lg pl-1">
      {children}
    </li>
  ),
  marks: {
    strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href: string = value?.href || "";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="underline underline-offset-4 text-foreground hover:text-accent transition-colors"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-12">
          <img
            src={urlFor(value).width(1400).fit("max").auto("format").url()}
            alt={value.alt || ""}
            className="w-full"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-xs tracking-wide text-muted-foreground mt-3 font-light">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const GuideBody = ({ value }: { value: PortableTextBlock[] }) => (
  <PortableText value={value} components={components} />
);

export default GuideBody;
