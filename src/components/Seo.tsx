import { Helmet } from "react-helmet-async";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  breadcrumbLd,
  organizationLd,
  websiteLd,
  type Crumb,
} from "@/lib/seo";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  /** Crumbs after "Start", e.g. [{ name: "Guider", path: "/guider" }] */
  breadcrumbs?: Crumb[];
  jsonLd?: object | object[];
  noindex?: boolean;
}

const Seo = ({ title, description, path, image, type = "website", breadcrumbs, jsonLd, noindex }: SeoProps) => {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const pageLd = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const graph = [
    organizationLd,
    websiteLd,
    ...(breadcrumbs?.length ? [breadcrumbLd(breadcrumbs)] : []),
    ...pageLd,
  ];

  return (
    <Helmet>
      <html lang="sv" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!noindex && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex,follow" />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {!noindex && (
        <script type="application/ld+json">
          {JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
