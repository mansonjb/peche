# Wild Carp Chaser

Refonte du blog éditorial de pêche à la carpe **Wild Carp Chaser** (à l'origine sur Wix).
Design clair et éditorial (papier chaud + ocre), photos plein cadre, architecture statique
ultra-rapide, pensée pour grossir récit après récit.

## Stack

- **Next.js 16** (App Router, sortie 100 % statique / SSG)
- **React 19** · **TypeScript**
- **Tailwind CSS v4** (design system dans `app/globals.css`)
- **MDX** via `next-mdx-remote/rsc` — un récit = un fichier `.mdx`
- Polices **Fraunces** (titres) + **Inter** (texte) via `next/font`
- Icônes `lucide-react` (+ icônes de marque maison dans `components/social-icons.tsx`)

Chaque page est pré-rendue en HTML statique → chargement quasi instantané, SEO solide
(`sitemap.xml`, `robots.txt`, Open Graph, JSON-LD `BlogPosting`).

## Démarrer

```bash
pnpm install
pnpm dev      # http://localhost:3000 (dev, Turbopack)
pnpm build    # build de production
pnpm start    # sert le build statique
```

## ✍️ Ajouter un récit (le point clé)

1. Créer un fichier dans `content/recits/`, par ex. `mon-nouveau-recit.mdx`.
2. Renseigner le frontmatter :

```mdx
---
title: "Titre du récit"
slug: "mon-nouveau-recit"        # = nom du fichier, devient l'URL /recits/mon-nouveau-recit
date: "2026-06-05"               # ISO, sert au tri et au sitemap
readingMinutes: 8                # optionnel (sinon calculé automatiquement)
category: "Récits de pêche"
location: "Seine · Paris"        # affiché en chip sur les cartes
excerpt: "Une phrase d'accroche qui donne envie de lire."
tags: ["carpe", "seine", "nuit"]
featured: false                  # true = mis « à la une » sur l'accueil
---

Le texte du récit, en **markdown**…

<Figure seed="mon-recit-1" caption="Une légende de photo." />

<Pull>Une phrase forte mise en exergue.</Pull>
```

3. C'est tout. Le récit apparaît automatiquement sur l'accueil, dans `/recits`, le sitemap
   et la navigation précédent/suivant. Aucune autre modif de code.

### Composants MDX dispo
- `<Figure seed="…" caption="…" />` — visuel de couverture généré (remplaçable par une vraie
  photo plus tard) + légende.
- `<Pull>…</Pull>` — citation/phrase en grand format.
- Markdown standard : titres, listes, **gras**, *italique*, `> citations`, liens, `---`.

### Mettre de vraies photos
Dépose l'image dans `public/` et renseigne `cover: "/ma-photo.jpg"` dans le frontmatter
(les cartes et l'en-tête l'utiliseront à la place du visuel généré). Pour une figure dans
le corps, on peut aussi remplacer `<Figure>` par une `<Image>` Next.

## Structure

```
app/
  layout.tsx              shell + polices + SEO global
  page.tsx                accueil (hero, à la une, derniers récits, l'esprit)
  recits/page.tsx         liste de tous les récits
  recits/[slug]/page.tsx  page récit (rendu MDX, JSON-LD, préc./suiv.)
  a-propos/page.tsx       page à propos
  sitemap.ts / robots.ts  SEO
components/               header, footer, cartes, visuels, icônes, MDX
content/recits/*.mdx      LES RÉCITS — c'est ici qu'on écrit
lib/recits.ts            chargement + tri des récits
lib/site.ts             config centrale (nom, réseaux, nav)
```

## À personnaliser

- `lib/site.ts` : l'URL YouTube est un placeholder — remplace-la par la vraie chaîne.
- `public/recits/<slug>/` : les photos d'origine (récupérées du Wix) sont déjà là —
  `cover.jpg` + `01.jpg…` ; remplace-les ou ajoute-en pour de nouveaux récits.
- Couleurs / typo : tout est centralisé dans le `@theme` de `app/globals.css`
  (thème clair ; repasser en sombre = changer ~10 variables).
