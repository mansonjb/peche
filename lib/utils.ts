import { clsx, type ClassValue } from "clsx";

/** Fusionne des classes conditionnelles. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Formate une date ISO (YYYY-MM-DD) en français : « 5 février 2021 ». */
export function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Version courte d'une date : « févr. 2021 ». */
export function formatDateShort(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("fr-FR", {
    month: "short",
    year: "numeric",
  }).format(d);
}
