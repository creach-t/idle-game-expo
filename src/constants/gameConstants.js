/**
 * 🎨 gameConstants - Constantes de design et configuration du jeu
 * Valeurs centralisées pour maintenir la cohérence visuelle
 */

// Palette de couleurs
export const COLORS = {
  // Couleurs principales
  primary: '#ff6b35',        // Orange énergique
  secondary: '#004e92',      // Bleu profond
  accent: '#ffd23f',         // Jaune doré
  
  // Couleurs d'état
  success: '#4caf50',        // Vert succès
  warning: '#ff9800',        // Orange attention
  error: '#f44336',          // Rouge erreur
  info: '#2196f3',           // Bleu information
  
  // Couleurs de background
  background: '#1a1a1a',     // Noir moderne
  surface: '#2d2d2d',        // Gris foncé
  card: '#3d3d3d',           // Gris carte
  
  // Couleurs de texte
  text: '#ffffff',           // Blanc principal
  textSecondary: '#b0b0b0',  // Gris secondaire
  textMuted: '#888888',      // Gris discret
  
  // Couleurs d'interface
  border: '#444444',         // Bordures
  divider: '#333333',        // Séparateurs
  shadow: '#000000',         // Ombres
  
  // Couleurs de jeu spécifiques
  currencyGold: '#ffd700',   // Or pour la monnaie
  prestigeStar: '#e6e6fa',   // Lavande pour prestige
  upgradeGlow: '#00ff88',    // Vert néon pour upgrades
};

// Espacements
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tailles de police
export const FONT_SIZES = {
  tiny: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  huge: 24,
  massive: 32,
};

// Configuration des générateurs par défaut
export const GENERATOR_CONFIG = {
  basePrice: 10,
  priceMultiplier: 1.15,
  baseIncome: 1,
  incomeMultiplier: 1.07,
  unlockThreshold: 0,
};

// Configuration du prestige
export const PRESTIGE_CONFIG = {
  threshold: 1000000,        // Seuil minimum pour prestige
  baseMultiplier: 1.5,       // Multiplicateur de base
  scalingFactor: 0.1,        // Facteur d'évolution
  maxMultiplier: 10.0,       // Multiplicateur maximum
};

// Durées d'animation
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 1000,
};

// Seuils de formatage des nombres
export const NUMBER_FORMAT = {
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
  maxDecimals: 2,
};

// Configuration de sauvegarde
export const SAVE_CONFIG = {
  autoSaveInterval: 10000,   // 10 secondes
  maxBackups: 5,
  compressionLevel: 6,
};

// Types d'icônes disponibles
export const ICON_TYPES = [
  'currency',
  'click',
  'factory',
  'upgrade',
  'generator',
  'income',
  'prestige',
  'settings',
];