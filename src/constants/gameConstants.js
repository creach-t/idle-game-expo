// 🎨 Design System Constants
export const COLORS = {
  primary: '#ff6b35',
  secondary: '#004e92', 
  background: '#1a1a1a',
  surface: '#2d2d2d',
  accent: '#ffd23f',
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
};

// 📏 Spacing & Layout
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

// 🎮 Game Balance Constants
export const GAME_CONFIG = {
  CLICK_BASE_POWER: 1,
  GENERATOR_COST_MULTIPLIER: 1.15,
  PRESTIGE_REQUIREMENT: 1000000,
  PRESTIGE_MULTIPLIER_BASE: 0.1,
  OFFLINE_EFFICIENCY: 0.5,
  SAVE_INTERVAL: 5000, // 5 seconds
  GAME_TICK_RATE: 100, // 10 FPS
};

// 🏭 Generator Data
export const GENERATORS = [
  {
    id: 1,
    name: 'Miner',
    description: 'Basic resource extractor',
    baseCost: 10,
    baseIncome: 1,
    icon: '⛏️',
  },
  {
    id: 2,
    name: 'Factory',
    description: 'Automated production line',
    baseCost: 100,
    baseIncome: 10,
    icon: '🏭',
  },
  {
    id: 3,
    name: 'Laboratory',
    description: 'Advanced research facility',
    baseCost: 1000,
    baseIncome: 100,
    icon: '🔬',
  },
  {
    id: 4,
    name: 'Quantum Core',
    description: 'Quantum-powered generator',
    baseCost: 10000,
    baseIncome: 1000,
    icon: '⚛️',
  },
  {
    id: 5,
    name: 'AI Network',
    description: 'Self-improving AI system',
    baseCost: 100000,
    baseIncome: 10000,
    icon: '🤖',
  },
];

// 🎯 Achievements Configuration
export const ACHIEVEMENTS = [
  {
    id: 1,
    name: 'First Click',
    description: 'Click your first coin',
    requirement: { type: 'clicks', value: 1 },
    reward: { type: 'multiplier', value: 1.1 },
  },
  {
    id: 2,
    name: 'Millionaire',
    description: 'Earn 1 million coins',
    requirement: { type: 'totalEarned', value: 1000000 },
    reward: { type: 'prestigePoints', value: 1 },
  },
];

// 📱 Screen Dimensions
export const SCREEN = {
  CLICK_BUTTON_SIZE: 120,
  GENERATOR_HEIGHT: 80,
  HEADER_HEIGHT: 60,
  BOTTOM_TAB_HEIGHT: 80,
};