# Contribuer : le nouveau site Nafuu

On cherche **un nouveau site web** pour Nafuu. Pas une petite retouche : une nouvelle interface.

Le [README](README.md) décrit Nafuu, les pages à garder, et le site actuel. Ici : ce qu’on attend de vous, ce que vous devez garder, et comment envoyer votre proposition.

## L’objectif

Proposer le prochain site vitrine de Nafuu.

Vous êtes libre de tout revoir : design, mise en page, animations, organisation des pages, textes (en restant en français), même l’outil pour construire le site.

Le nouveau site doit rester un **site vitrine statique** : des pages HTML, pas une application. Il doit faire télécharger l’app, expliquer le service, recruter restaurants et livreurs, et garder les pages légales.

Vous ne construisez pas l’app de livraison. Vous ne construisez pas l’espace restaurant ni l’admin. Ces apps existent déjà. Le site doit seulement y faire des liens.

Les adresses des pages, `/delete-account`, et l’absence de secrets restent obligatoires. Le reste, vous pouvez le réinventer.

## Ce qui ne doit pas changer

1. **Le site reste statique.** Pas d’API, pas de base de données, pas de connexion, pas de formulaire qui envoie des données vers un serveur à vous. Le contact passe par WhatsApp et email, déjà dans [`src/data/site.ts`](src/data/site.ts).
2. **Aucun secret.** Pas de clés, de tokens, de fichier `.env` avec des mots de passe, ni d’outil de suivi (analytics) sans accord de l’équipe Nafuu.
3. **Les textes du site sont en français.** Sur l’accueil, quelques phrases dans d’autres langues (« Tu as faim ? », « Uko njala ? », etc.) sont voulues. Le reste reste en français.
4. **Les adresses des pages ne bougent pas**, surtout `/delete-account`. L’App Store et Google Play y pointent. Si vous déplacez une page, ajoutez une redirection dans `vercel.json`.
5. **La marque.** Le nom Nafuu, les logos et les photos appartiennent à Nafuu / GSWORLD. Ne les utilisez pas ailleurs. Sur le nouveau site, gardez l’orange (`#ff6b00`) et les logos du dépôt, sauf si l’équipe vous donne un nouveau kit.
6. **Les liens** (stores, WhatsApp, email, réseaux, `app.` / `admin.`) sont dans `src/data/site.ts` aujourd’hui. Gardez une seule liste de liens, pas les mêmes URL copiées partout.

## Comment travailler

1. Lisez le [README](README.md). Lancez le site actuel et ouvrez chaque page : accueil, livreur, restaurant, à propos, contact, pages légales. C’est le contenu à couvrir, pas le design à copier.
2. Forkez le dépôt et créez une branche avec un nom clair (`nouveau-site`, `rebuild/accueil`…).
3. `npm install && npm run dev` (Node 20+, 22 LTS recommandé) si vous partez de ce projet. Pas de `.env`.
4. Construisez le nouveau site. Pour un lien, un téléphone ou un store, partez de `src/data/site.ts`.
5. `npm run build` (ou l’équivalent) doit marcher. Testez aussi en local le site fini, pas seulement le mode développement.
6. Ouvrez une pull request.

## Ce qu’on veut dans la pull request

- **Votre intention.** En une phrase : ce que le nouveau site fait mieux.
- **Des images.** Accueil et une ou deux autres pages, sur téléphone et sur ordinateur.
- **Les pages que vous avez refaites.** Dites si toutes les pages du README sont encore là, aux mêmes adresses.
- **Ce que vous n’avez pas touché** si c’est important (`/delete-account`, par exemple).

Une idée partielle (une page, un nouveau hero) est acceptée. L’idéal, c’est une proposition de site complet.

## Qualité minimale

- Ça se lit bien sur un téléphone. Beaucoup de gens n’ont qu’un mobile, parfois un réseau lent. Gardez les pages légères. Ne chargez pas de polices ou de scripts inutiles depuis Internet.
- Ça se lit sans JavaScript. Les menus et les liens doivent être dans le HTML.
- Chaque page a son titre et sa description. Si vous enlevez les données structurées de l’accueil (JSON-LD), remettez l’équivalent.
- L’orange et le texte doivent rester lisibles. Les logos et les photos sont à Nafuu / GSWORLD.

Si une règle vous bloque, ouvrez une issue et demandez **avant** de changer une adresse de page ou d’ajouter un service extérieur.
