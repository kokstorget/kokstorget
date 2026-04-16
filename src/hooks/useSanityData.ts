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
  family: string;
  location: string;
  description: string;
  budget: string;
  duration: string;
  style: string;
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
        `*[_type == "caseStudy"] | order(order asc) { _id, title, family, location, description, budget, duration, style, image, order }`
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
