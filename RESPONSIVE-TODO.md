# Responsive — état & pistes pour plus tard

Travail réalisé lors de la session "responsive mobile". Le site est
désormais utilisable et propre sur téléphone (testé à 375px). Ce fichier
liste ce qui a été fait et ce qu'on garde sous le coude pour plus tard
(non vital).

## ✅ Fait

- **Menu burger mobile** : navigation accessible < 960px (avant : aucun
  lien visible sur mobile). Panneau déroulant Accueil/Catalogue/Boutique/
  Contact, fermeture sur clic/route/extérieur/Échap.
- **Filtres catalogue repliables** sur mobile (< 880px) : les produits
  sont visibles dès l'arrivée au lieu d'être poussés sous tous les filtres.
- **Sidebar compte non-sticky** sur mobile (évite qu'elle flotte sur le
  contenu au scroll).
- **Audit complet** des pages à 375px : aucun overflow horizontal. Tous
  les layouts s'empilent correctement (hero, grilles produit 2 colonnes,
  fiche produit, panier, formulaires pleine largeur, footer 1 colonne,
  drawer panier pleine largeur).

## 🔜 Pistes pour plus tard (non vital)

- [ ] **Tablette (≈768px)** : l'audit s'est concentré sur le téléphone
      (375px). Vérifier les états intermédiaires à ~768px (entre mobile et
      le breakpoint desktop 880px) — pas de souci détecté mais pas audité
      en profondeur.
- [ ] **Orientation paysage** mobile non testée.
- [ ] **Filtres en bottom-sheet/modal** : actuellement un accordéon
      repliable (fonctionnel et propre). Une version "tiroir filtres" facon
      app mobile serait plus léchée si on veut pousser l'UX plus loin.
- [ ] **Touch targets** : quelques liens texte sont un peu petits pour le
      doigt (< 44px) : le "Réinitialiser" des filtres, le "Retirer" du
      panier, les liens du footer. À agrandir pour l'accessibilité tactile
      si on veut être nickel sur les recommandations WCAG.
- [ ] **Images produit responsives** : on sert des placeholders (placehold.co)
      en 600x600. Quand on aura les vraies images, prévoir des tailles
      adaptées au mobile (srcset / formats modernes) pour la performance.
- [ ] **AdminView** : pas testé visuellement sur mobile (page placeholder,
      grille auto-fill responsive a priori OK). À revoir quand on
      développera les vrais modules admin.
- [ ] **Dark mode** : retiré (essais non concluants), à reprendre plus tard
      avec une référence visuelle.

## 🧪 Note technique

L'outil de capture d'écran du preview timeoute sur les écrans contenant
l'animation infinie du ticker franchises ou le drawer panier (overlay) —
ce ne sont PAS des bugs du site, juste une limite de l'outil qui attend
une "stabilité" que les animations infinies empêchent. Ces zones ont été
validées par mesures (overflow, largeurs, colonnes) à défaut de capture.
