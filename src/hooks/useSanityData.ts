import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";
import type { PortableTextBlock } from "@portabletext/react";

const STALE_TIME = 1000 * 60 * 5;

export type SanityImage = object & { alt?: string };

export interface SanityPartner {
  _id: string;
  name: string;
  description: string;
  image: SanityImage;
  order: number;
}

export interface SanityInspirationProject {
  _id: string;
  title: string;
  style: string;
  description: string;
  image: SanityImage;
  order: number;
}

export interface SanityCaseStudy {
  _id: string;
  title: string;
  location: string;
  style: string;
  quote: string;
  description: string;
  budget: string;
  duration: string;
  supplier: string;
  projectType: string;
  image: SanityImage;
  order: number;
}

export interface SanityFaq {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export const partnersQuery = {
  queryKey: ["sanity", "partners"],
  queryFn: (): Promise<SanityPartner[]> => sanityClient.fetch(`*[_type == "partner"] | order(order asc) { _id, name, description, image, order }`),
};

export function usePartners() {
  return useQuery({ ...partnersQuery, staleTime: STALE_TIME });
}

export const inspirationProjectsQuery = {
  queryKey: ["sanity", "inspirationProjects"],
  queryFn: (): Promise<SanityInspirationProject[]> => sanityClient.fetch(`*[_type == "inspirationProject"] | order(order asc) { _id, title, style, description, image, order }`),
};

export function useInspirationProjects() {
  return useQuery({ ...inspirationProjectsQuery, staleTime: STALE_TIME });
}

export const caseStudiesQuery = {
  queryKey: ["sanity", "caseStudies"],
  queryFn: (): Promise<SanityCaseStudy[]> => sanityClient.fetch(`*[_type == "caseStudy"] | order(order asc) { _id, title, location, style, quote, description, budget, duration, supplier, projectType, image, order }`),
};

export function useCaseStudies() {
  return useQuery({ ...caseStudiesQuery, staleTime: STALE_TIME });
}

export interface SanityAboutPage {
  heroTitle: string;
  heroSubtitle: string;
  image: object | null;
  storyLeft: string;
  storyRight: string;
  values: { title: string; text: string }[];
  stats: { value: string; label: string }[];
}

export const aboutPageQuery = {
  queryKey: ["sanity", "aboutPage"],
  queryFn: (): Promise<SanityAboutPage | null> => sanityClient.fetch(`*[_type == "aboutPage" && _id == "aboutPage"][0] { heroTitle, heroSubtitle, image, storyLeft, storyRight, values, stats }`),
};

export function useAboutPage() {
  return useQuery({ ...aboutPageQuery, staleTime: STALE_TIME });
}

export const faqsQuery = {
  queryKey: ["sanity", "faqs"],
  queryFn: (): Promise<SanityFaq[]> => sanityClient.fetch(`*[_type == "faq"] | order(order asc) { _id, question, answer, order }`),
};

export function useFaqs() {
  return useQuery({ ...faqsQuery, staleTime: STALE_TIME });
}

export interface SanityGuide {
  _id: string;
  title: string;
  slug: string;
  category: string | null;
  author: string | null;
  publishedAt: string;
  excerpt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  _updatedAt: string;
  mainImage: { alt?: string } | null;
  body: PortableTextBlock[];
}

const GUIDE_FIELDS = `_id, title, "slug": slug.current, category, author, publishedAt, excerpt, seoTitle, seoDescription, _updatedAt, mainImage, body`;

export const guidesQuery = {
  queryKey: ["sanity", "guides"],
  queryFn: (): Promise<SanityGuide[]> => sanityClient.fetch(`*[_type == "guide" && defined(slug.current)] | order(publishedAt desc) { ${GUIDE_FIELDS} }`),
};

export function useGuides() {
  return useQuery({ ...guidesQuery, staleTime: STALE_TIME });
}
