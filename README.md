# Site web Nafuu

Code source de [nafuudelivery.com](https://nafuudelivery.com), le site vitrine actuel de **Nafuu**.

**L’objectif de ce dépôt : un nouveau site web.** Celui-ci sert de base. On cherche une nouvelle interface, plus claire et plus agréable. Voir [CONTRIBUTING.md](CONTRIBUTING.md).

## Qu’est-ce que Nafuu ?

**Nafuu** (« abordable » en swahili) est une application de livraison de repas. Elle relie trois groupes de personnes :

- les **clients**, qui commandent un plat et le suivent jusqu’à chez eux ;
- les **restaurants**, qui reçoivent des commandes et suivent leurs ventes ;
- les **livreurs**, qui récupèrent les commandes et les portent.

L’application est sur [l’App Store](https://apps.apple.com/app/nafuu-livraison-des-repas/id6781988366) et [Google Play](https://play.google.com/store/apps/details?id=com.nafuu.nafuu). Nafuu est un projet de **GSWORLD**.

Ce dépôt n’est **pas** l’application. C’est seulement le site web : expliquer le service, faire télécharger l’app, recruter des partenaires, et montrer les pages légales.

## Qu’est-ce que ce site ?

Un site **statique** en français, fait avec [Astro](https://astro.build). Chaque page est déjà du HTML. Il n’y a pas de compte, pas d’API, pas de base de données et **aucun mot de passe ni clé à cacher**.

Le JavaScript est léger : menus, animations au scroll, et un petit composant React sur la page d’accueil (une démo de suivi de livraison, sans GPS réel).

> **Les tableaux de bord ne sont pas ici.** Les restaurants et les livreurs se connectent sur [app.nafuudelivery.com](https://app.nafuudelivery.com). L’équipe interne utilise admin.nafuudelivery.com. Ces apps sont dans un autre dépôt, privé. Ce site n’a aucune clé API. Il fait seulement des liens vers ces apps.

Le nouveau site doit faire la même chose : un site vitrine, pas une app.

### Qui vient sur le site ?

Le nouveau site doit parler à ces mêmes personnes :

| Public | Ce qu’il cherche | Pages aujourd’hui |
| --- | --- | --- |
| Clients | Télécharger l’app, comprendre le service | `/`, `/talk-to-us` |
| Restaurants | S’inscrire, ouvrir l’espace partenaire | `/restaurant` → `app.nafuudelivery.com` |
| Livreurs | Devenir livreur | `/rider` → `app.nafuudelivery.com` |
| Entreprises | Offre repas d’équipe (pas encore lancée) | `/entreprises` |
| Presse, candidats, partenaires | Histoire, valeurs, contact | `/about`, `/careers`, `/talk-to-us` |
| Utilisateurs de l’app | Règles, vie privée, suppression de compte | `/terms`, `/privacy`, `/delete-account` |

### Pages à garder (le contenu, pas le design)

Vous pouvez tout redessiner. Ces pages (ou leur équivalent) doivent rester, avec les **mêmes adresses** :

| URL | Rôle |
| --- | --- |
| `/` | Accueil : donner envie, expliquer le service, boutons pour télécharger l’app, partenaires |
| `/rider` | Devenir livreur |
| `/restaurant` | Inscrire un restaurant |
| `/entreprises` | Nafuu Entreprises — pour l’instant une page « bientôt » |
| `/about` | Histoire de Nafuu / GSWORLD, clients, restaurants, livreurs, tech, valeurs |
| `/careers` | Carrières — pour l’instant une page « bientôt » |
| `/talk-to-us` | Contact : WhatsApp, email, adresse |
| `/terms` | Conditions d’utilisation |
| `/privacy` | Politique de confidentialité |
| `/delete-account` | Demande de suppression de compte. **L’App Store et Google Play pointent vers cette adresse exacte. Ne la changez pas.** |
| `/404` | Page introuvable |

Les liens (stores, réseaux, WhatsApp, tableaux de bord) sont dans [`src/data/site.ts`](src/data/site.ts). Changez une URL là, pas dans chaque page.

## Démarrage

Il faut Node.js 20+ (22 LTS recommandé).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # crée le site dans dist/
npm run preview   # montre dist/ en local
```

Pas de fichier `.env`. Si `npm run build` échoue, le travail n’est pas fini.

## Structure du projet actuel

Ceci décrit le site d’aujourd’hui. Le nouveau site n’est pas obligé de garder les mêmes fichiers.

```
src/
  pages/            une page = un fichier .astro (voir le tableau ci-dessus)
  layouts/          BaseLayout (titre, image de partage, polices) et LegalLayout
  components/
    layout/         barre du haut (Navbar), pied de page (Footer)
    sections/       blocs de la page d’accueil
    ui/             petits éléments (boutons stores, icônes, ComingSoon, ...)
  data/site.ts      liens et coordonnées
  scripts/ui.ts     animations au scroll et menu
  styles/global.css couleurs et styles (Tailwind)
  assets/images/    photos (converties en WebP au build)
public/             logos, favicon, image de partage, robots.txt
vercel.json         déploiement Vercel
```

- **Couleurs actuelles :** Tailwind CSS v4. Orange de marque : `orange-600` et `.gradient-primary` (`#ff6b00` → `#ff8f00`). Police : Inter, déjà dans le projet (pas Google Fonts).
- **Icônes :** Font Awesome 6, en SVG. Pour en ajouter une sur ce site-ci, mettez son nom dans `astro.config.mjs` puis `<Icon name="fa6-solid:name" />`.
- **Référencement :** chaque page a son propre titre et sa description. Un sitemap est créé au build. La page d’accueil décrit l’entreprise et l’app pour Google. Langue : français. Le nouveau site doit aussi avoir un titre et une description par page.
- **Sans JavaScript :** le site doit encore se lire. Les liens et les menus importants doivent être dans le HTML. Si quelqu’un a demandé moins d’animation (`prefers-reduced-motion`), respectez-le.

## Mise en ligne

Le site part sur Vercel. C’est un site HTML, pas un serveur. La page `/delete-account` doit rester à cette adresse.

## Licence

Le code est sous [licence MIT](LICENSE).

Le nom Nafuu, le logo, la marque, et les photos dans `src/assets/images` et `public/images` **ne sont pas** sous MIT. Ils appartiennent à Nafuu / GSWORLD. Il faut une autorisation pour les réutiliser.
