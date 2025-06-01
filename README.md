# 🏭 Idle Empire - Jeu Idle Addictif

Un jeu idle simple mais addictif développé avec Expo React Native, basé sur une architecture modulaire et des mécaniques psychologiquement engageantes.

## 🎮 Concept

Empire industriel où le joueur génère des ressources par clics et automatisation, avec un système de prestige pour relancer l'engagement. Le jeu propose une progression exponentielle avec des générateurs automatiques et des améliorateurs qui boostent l'efficacité du clic.

## ✨ Fonctionnalités Principales

### 🎯 Mécaniques de Jeu
- **Système de clic** avec feedback visuel et haptic
- **Générateurs automatiques** avec revenus passifs
- **Améliorateurs de clic** pour booster l'efficacité des clics manuels
- **Progression exponentielle** avec difficulté croissante
- **Système de prestige** pour recommencer avec des bonus
- **Sauvegarde automatique** en temps réel

### 🎨 Interface Utilisateur
- **Icônes vectorielles** remplaçant les emojis pour une expérience plus professionnelle
- **Design responsive** adapté à tous les écrans
- **Animations fluides** avec feedback immédiat
- **Thème sombre** optimisé pour le gaming

## 🏗️ Architecture Modulaire

### Structure du Projet
```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base
│   ├── game/           # Composants spécifiques au jeu
│   ├── icons/          # Icônes SVG personnalisées
│   └── animations/     # Composants d'animation
├── screens/            # Écrans principaux
├── hooks/              # Hooks personnalisés
├── utils/              # Fonctions utilitaires
├── services/           # Services externes (notifications, storage)
├── store/              # Gestion d'état
└── constants/          # Constantes et configuration
```

### Principes de Modularité

1. **Séparation des responsabilités** : Chaque fichier a un rôle unique
2. **Composants réutilisables** : UI modulaire et configurable  
3. **Hooks personnalisés** : Logique métier isolée
4. **Services découplés** : APIs et services externes séparés
5. **Configuration centralisée** : Constantes et paramètres regroupés

## 🚀 Installation

```bash
# Cloner le repo
git clone https://github.com/creach-t/idle-game-expo.git
cd idle-game-expo

# Installer les dépendances
npm install

# Lancer le projet
npm start
```

## 📱 Fonctionnalités

### ✅ Core Features
- [x] Système de clic avec feedback visuel
- [x] Générateurs automatiques
- [x] Améliorateurs de clic (nouveauté !)
- [x] Progression exponentielle
- [x] Icônes vectorielles (nouveauté !)
- [x] Sauvegarde automatique
- [x] Interface responsive

### 🔄 En Cours
- [ ] Système de prestige avancé
- [ ] Notifications hors-ligne
- [ ] Animations avancées
- [ ] Système d'achievements
- [ ] Multiplicateurs temporaires

### 🎯 Roadmap
- [ ] Événements temporaires
- [ ] Système de quêtes
- [ ] Thèmes visuels multiples
- [ ] Optimisations performances
- [ ] Mode multijoueur

## 🎨 Design System

### Couleurs
```javascript
primary: '#ff6b35'      // Orange énergique
secondary: '#004e92'    // Bleu profond  
background: '#1a1a1a'   // Noir moderne
surface: '#2d2d2d'      // Gris foncé
accent: '#ffd23f'       // Jaune doré
success: '#4caf50'      // Vert succès
warning: '#ff9800'      // Orange attention
```

### Icônes
- **Système vectoriel** : Icônes SVG scalables
- **Cohérence visuelle** : Style uniforme dans tout le jeu
- **Performance** : Rendu optimisé sans dépendances externes
- **Thématique** : Icônes adaptées au thème industriel

### Animations
- **Micro-interactions** : Feedback immédiat sur chaque action
- **Transitions fluides** : 60fps garantis
- **Effets de "juice"** : Particules et vibrations
- **Performance** : Animations optimisées avec Reanimated 3

## 🎯 Mécaniques de Progression

### Système de Clic
1. **Clic de base** : Gain initial de 1 unité
2. **Améliorateurs** : Multiplicateurs pour augmenter l'efficacité
3. **Prestige** : Bonus permanent après reset

### Générateurs Automatiques
1. **Production passive** : Revenus sans interaction
2. **Niveaux multiples** : Efficacité croissante
3. **Coûts exponentiels** : Difficulté progressive

### Progression Exponentielle
```javascript
// Coût des améliorateurs
cost = baseCost * Math.pow(multiplier, level)

// Production des générateurs  
production = baseProduction * level * prestigeBonus

// Difficulté adaptative
difficulty = Math.pow(1.15, totalUpgrades)
```

## 🔧 Développement

### Scripts Disponibles
```bash
npm start          # Démarre Expo
npm run android    # Lance sur Android
npm run ios        # Lance sur iOS  
npm run web        # Lance sur navigateur
```

### Structure des Composants
```javascript
// Exemple de composant modulaire avec icônes
const UpgradeButton = ({ onPress, upgrade, canAfford }) => {
  return (
    <TouchableOpacity style={styles.upgradeButton}>
      <UpgradeIcon type={upgrade.type} />
      <Text>{upgrade.name}</Text>
      <Text>{formatCurrency(upgrade.cost)}</Text>
    </TouchableOpacity>
  );
};
```

### Hooks Personnalisés
```javascript
// Logique des améliorateurs
const useUpgrades = () => {
  const [clickUpgrades, setClickUpgrades] = useState([]);
  const [generatorUpgrades, setGeneratorUpgrades] = useState([]);
  
  const buyUpgrade = (upgradeId) => {
    // Logique d'achat
  };
  
  return { clickUpgrades, generatorUpgrades, buyUpgrade };
};
```

## 📊 État du Jeu

### Données Centralisées
```javascript
gameState = {
  currency: number,
  clickPower: number,
  clickUpgrades: Upgrade[],      // Nouveau !
  generators: Generator[],
  generatorUpgrades: Upgrade[],   // Nouveau !
  prestige: PrestigeData,
  settings: UserSettings,
  statistics: GameStats          // Nouveau !
}
```

### Actions Disponibles
```javascript
dispatch({ type: 'CLICK' })
dispatch({ type: 'BUY_GENERATOR', id: 1 })
dispatch({ type: 'BUY_CLICK_UPGRADE', id: 1 })     // Nouveau !
dispatch({ type: 'BUY_GENERATOR_UPGRADE', id: 1 }) // Nouveau !
dispatch({ type: 'PRESTIGE' })
```

## 🎯 Mécaniques Addictives

1. **Progression rapide** : Gains exponentiels au début
2. **Feedback constant** : Animations et sons satisfaisants
3. **Objectifs à court terme** : Déblocages fréquents
4. **Choix stratégiques** : Optimisation entre clics et générateurs
5. **Système de prestige** : Recommencer avec des bonus
6. **Récompenses hors-ligne** : Gains même en fermant l'app
7. **Progression visible** : Statistiques et graphiques

## 🛠️ Technologies

- **Expo SDK 53** : Framework React Native
- **React Native 0.79** : Framework mobile cross-platform
- **React 19** : Bibliothèque UI moderne
- **Reanimated 3** : Animations performantes
- **AsyncStorage** : Sauvegarde locale
- **Expo Notifications** : Notifications push
- **SVG Support** : Icônes vectorielles natives

## 📈 Performance

- **Optimisations calculs** : Worker threads pour les gros calculs
- **Mémorisation** : Components et calculs mis en cache
- **Lazy Loading** : Chargement différé des écrans
- **Bundle Size** : Minimisation des dépendances
- **Memory Management** : Gestion optimisée de la mémoire
- **60fps garantis** : Animations fluides sur tous les appareils

## 🎮 Guide de Jeu

### Pour Commencer
1. **Cliquez** sur le bouton central pour gagner de l'argent
2. **Achetez** votre premier générateur pour automatiser les gains
3. **Investissez** dans des améliorateurs de clic pour plus d'efficacité
4. **Équilibrez** entre améliorer les clics et acheter des générateurs

### Stratégies Avancées
- **Early Game** : Focus sur les améliorateurs de clic
- **Mid Game** : Équilibre entre clics et générateurs
- **Late Game** : Maximiser les générateurs haute production
- **Prestige** : Reset stratégique pour débloquer des bonus permanents

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-feature`)
3. Commit les changements (`git commit -m 'Add nouvelle feature'`)
4. Push vers la branche (`git push origin feature/nouvelle-feature`)
5. Ouvrir une Pull Request

### Guidelines de Contribution
- **Code Style** : Suivre les conventions ESLint
- **Tests** : Ajouter des tests pour les nouvelles fonctionnalités
- **Documentation** : Mettre à jour la documentation si nécessaire
- **Performance** : Vérifier l'impact sur les performances

## 📄 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Communauté Expo pour les outils excellents
- Joueurs beta-testeurs pour leurs retours
- Contributeurs open-source

---

**Made with ❤️ and ☕ - Happy Idling! 🎮**

> "The best idle game is the one you can't stop playing, even when you're not playing."