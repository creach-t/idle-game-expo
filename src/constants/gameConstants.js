/**
 * 🎨 gameConstants - Beautiful modern color palette and design system
 */

// Palette de couleurs moderne et attrayante
export const COLORS = {
  // Couleurs principales - Palette moderne avec gradients
  primary: '#6366F1',        // Indigo moderne
  secondary: '#8B5CF6',      // Violet élégant
  accent: '#F59E0B',         // Ambre lumineux
  
  // Couleurs d'état avec style
  success: '#10B981',        // Emeraude
  warning: '#F59E0B',        // Ambre
  error: '#EF4444',          // Rouge moderne
  info: '#3B82F6',           // Bleu ciel
  
  // Couleurs de background - Dark theme moderne
  background: '#0F172A',     // Slate 900 - Dark moderne
  surface: '#1E293B',        // Slate 800 - Cartes
  card: '#334155',           // Slate 700 - Éléments
  
  // Couleurs de texte optimisées
  text: '#F8FAFC',           // Slate 50 - Texte principal
  textSecondary: '#CBD5E1',  // Slate 300 - Texte secondaire
  textMuted: '#94A3B8',      // Slate 400 - Texte discret
  
  // Couleurs d'interface raffinées
  border: '#475569',         // Slate 600 - Bordures
  divider: '#374151',        // Gray 700 - Séparateurs
  shadow: '#000000',         // Ombres
  
  // Couleurs de jeu spécifiques avec éclat
  currencyGold: '#FBBF24',   // Amber 400 - Or brillant
  prestigeStar: '#A78BFA',   // Violet 400 - Prestige
  upgradeGlow: '#34D399',    // Emerald 400 - Upgrades
  
  // Couleurs d'accent supplémentaires
  pink: '#EC4899',           // Pink 500
  cyan: '#06B6D4',           // Cyan 500
  emerald: '#10B981',        // Emerald 500
  orange: '#F97316',         // Orange 500
};

// Espacements harmonieux
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tailles de police modernes
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

// Rayons de bordure modernes
export const BORDER_RADIUS = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  round: 50,
};

// Ombres élégantes
export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
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

// Durées d'animation fluides
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

// Configuration des effets visuels
export const VISUAL_EFFECTS = {
  particles: {
    maxCount: 30,
    lifetime: 2000,
    colors: [COLORS.primary, COLORS.accent, COLORS.success],
  },
  glow: {
    intensity: 0.8,
    radius: 12,
  },
  pulse: {
    duration: 1500,
    scale: 1.05,
  },
};