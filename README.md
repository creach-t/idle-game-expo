# 🏭 Idle Empire - Jeu Idle Addictif

Un jeu idle simple mais addictif développé avec Expo React Native, basé sur une architecture modulaire et des mécaniques psychologiquement engageantes.

## 🎮 Concept

Empire industriel où le joueur génère des ressources par clics et automatisation, avec un système de prestige pour relancer l'engagement.

## 🏗️ Architecture Modulaire

### Structure du Projet
```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base
│   ├── game/           # Composants spécifiques au jeu
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
- [x] Sauvegarde automatique
- [x] Interface responsive

### 🔄 En Cours
- [ ] Système de prestige
- [ ] Notifications hors-ligne
- [ ] Animations avancées
- [ ] Système d'achievements

### 🎯 Roadmap
- [ ] Événements temporaires
- [ ] Système de quêtes
- [ ] Thèmes visuels
- [ ] Optimisations performances

## 🎨 Design System

### Couleurs
```javascript
primary: '#ff6b35'      // Orange énergique
secondary: '#004e92'    // Bleu profond  
background: '#1a1a1a'   // Noir moderne
surface: '#2d2d2d'      // Gris foncé
accent: '#ffd23f'       // Jaune doré
```

### Animations
- **Micro-interactions** : Feedback immédiat sur chaque action
- **Transitions fluides** : 60fps garantis
- **Effets de "juice"** : Particules et vibrations

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
// Exemple de composant modulaire
const ClickButton = ({ onPress, value, disabled }) => {
  // Logique isolée
  // Props claires
  // Rendu simple
}
```

### Hooks Personnalisés
```javascript
// Logique métier réutilisable
const useGameLogic = () => {
  const [currency, setCurrency] = useState(0);
  const handleClick = () => { /* ... */ };
  return { currency, handleClick };
}
```

## 📊 État du Jeu

### Données Centralisées
```javascript
gameState = {
  currency: number,
  clickPower: number,
  generators: Generator[],
  prestige: PrestigeData,
  settings: UserSettings
}
```

### Actions Simples
```javascript
dispatch({ type: 'CLICK' })
dispatch({ type: 'BUY_GENERATOR', id: 1 })
dispatch({ type: 'PRESTIGE' })
```

## 🎯 Mécaniques Addictives

1. **Progression rapide** : Gains exponentiels au début
2. **Feedback constant** : Animations et sons satisfaisants
3. **Objectifs à court terme** : Déblocages fréquents
4. **Système de prestige** : Recommencer avec des bonus
5. **Récompenses hors-ligne** : Gains même en fermant l'app

## 🛠️ Technologies

- **Expo SDK** : Framework React Native
- **React Navigation** : Navigation entre écrans
- **Reanimated 3** : Animations performantes
- **AsyncStorage** : Sauvegarde locale
- **Expo Notifications** : Notifications push

## 📈 Performance

- **Optimisations** : Calculs en arrière-plan
- **Mémorisation** : Components et calculs mis en cache
- **Lazy Loading** : Chargement différé des écrans
- **Bundle Size** : Minimisation des dépendances

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-feature`)
3. Commit les changements (`git commit -m 'Add nouvelle feature'`)
4. Push vers la branche (`git push origin feature/nouvelle-feature`)
5. Ouvrir une Pull Request

## 📄 License

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Made with ❤️ and ☕ - Happy Idling! 🎮**