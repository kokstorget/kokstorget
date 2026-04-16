import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanity";

export interface SanityPartner {
  _id: string;
  name: string;
  description: string;
  image: object;
  order: number;
}

export interface SanityInspirationProject {
  _id: string;
  title: string;
  style: string;
  description: string;
  image: object;
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
  image: object;
  order: number;
}

export interface SanityFaq {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

export function usePartners() {
  return useQuery<SanityPartner[]>({
    queryKey: ["sanity", "partners"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "partner"] | order(order asc) { _id, name, description, image, order }`
      ),
    staleTime: 1000 * 60 * 5,
  });
}

export function useInspirationProjects() {
  return useQuery<SanityInspirationProject[]>({
    queryKey: ["sanity", "inspirationProjects"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "inspirationProject"] | order(order asc) { _id, title, style, description, image, order }`
      ),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCaseStudies() {
  return useQuery<SanityCaseStudy[]>({
    queryKey: ["sanity", "caseStudies"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "caseStudy"] | order(order asc) { _id, title, location, style, quote, description, budget, duration, supplier, projectType, image, order }`
      ),
    staleTime: 1000 * 60 * 5,
  });
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

export function useAboutPage() {
  return useQuery<SanityAboutPage | null>({
    queryKey: ["sanity", "aboutPage"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "aboutPage" && _id == "aboutPage"][0] { heroTitle, heroSubtitle, image, storyLeft, storyRight, values, stats }`
      ),
    staleTime: 1000 * 60 * 5,
  });
}

export function useFaqs() {
  return useQuery<SanityFaq[]>({
    queryKey: ["sanity", "faqs"],
    queryFn: () =>
      sanityClient.fetch(
        `*[_type == "faq"] | order(order asc) { _id, question, answer, order }`
      ),
    staleTime: 1000 * 60 * 5,
  });
}
