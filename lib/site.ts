/** Configuration centrale du site — modifie ici, ça se propage partout. */
export const site = {
  name: "Wild Carp Chaser",
  wordmark: "Wild Carp Chaser",
  tagline: "Récits de pêche de carpes sauvages",
  description:
    "Le carnet de bord d'un carpiste qui se livre sans concession. Des récits 100 % authentiques, de la Seine en plein Paris aux petites rivières sauvages.",
  url: "https://www.wildcarpchaser.com",
  locale: "fr_FR",
  author: {
    name: "Nolan",
    email: "nolan1593@hotmail.fr",
  },
  social: {
    instagram: "https://www.instagram.com/wild_carp_chaser/",
    instagramHandle: "@wild_carp_chaser",
    // ⚠️ à confirmer : remplace par l'URL exacte de ta chaîne
    youtube: "https://www.youtube.com/@wildcarpchaser",
  },
  nav: [
    { href: "/", label: "Accueil" },
    { href: "/recits", label: "Récits" },
    { href: "/a-propos", label: "À propos" },
  ],
} as const;

export type Site = typeof site;
