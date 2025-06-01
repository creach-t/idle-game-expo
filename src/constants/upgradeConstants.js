/**
 * 🔧 upgradeConstants - Configuration des améliorateurs
 * Définit tous les types d'upgrades disponibles dans le jeu
 */

export const UPGRADE_CONFIGS = {
  clickUpgrades: [
    {
      id: 'click_power_1',
      name: 'Gants Renforcés',
      description: 'Améliore la force de vos clics',
      baseCost: 100,
      costMultiplier: 1.5,
      multiplier: 1.2,
      maxLevel: 50,
      unlockCondition: () => true,
    },
    {
      id: 'click_power_2',
      name: 'Poings Mécaniques',
      description: 'Mécanismes hydrauliques pour plus de puissance',
      baseCost: 1000,
      costMultiplier: 1.6,
      multiplier: 1.5,
      maxLevel: 30,
      unlockCondition: (gameState) => gameState.currency >= 500,
    },
    {
      id: 'click_power_3',
      name: 'Exosquelette',
      description: 'Technologie avancée pour des clics surhumains',
      baseCost: 10000,
      costMultiplier: 1.7,
      multiplier: 2.0,
      maxLevel: 20,
      unlockCondition: (gameState) => gameState.totalClicks >= 1000,
    },
    {
      id: 'click_speed_1',
      name: 'Café Premium',
      description: 'Augmente la vitesse de clic',
      baseCost: 500,
      costMultiplier: 1.4,
      multiplier: 1.15,
      maxLevel: 25,
      unlockCondition: (gameState) => gameState.currency >= 250,
    },
    {
      id: 'click_efficiency_1',
      name: 'Formation Pro',
      description: 'Technique optimisée pour des clics plus efficaces',
      baseCost: 2500,
      costMultiplier: 1.8,
      multiplier: 1.25,
      maxLevel: 15,
      unlockCondition: (gameState) => gameState.currency >= 1000,
    },
  ],
  
  generatorUpgrades: [
    {
      id: 'generator_efficiency_1',
      name: 'Huile de Qualité',
      description: 'Améliore l\'efficacité de tous les générateurs',
      baseCost: 1000,
      costMultiplier: 2.0,
      multiplier: 1.5,
      maxLevel: 20,
      targetGeneratorId: 'all',
      unlockCondition: (gameState) => gameState.generators?.some(g => g.count > 0),
    },
    {
      id: 'generator_speed_1',
      name: 'Overclock Léger',
      description: 'Accélère la production des générateurs de base',
      baseCost: 5000,
      costMultiplier: 2.2,
      multiplier: 1.3,
      maxLevel: 15,
      targetGeneratorId: 1,
      unlockCondition: (gameState) => gameState.generators?.[0]?.count >= 5,
    },
    {
      id: 'generator_speed_2',
      name: 'Turbine Avancée',
      description: 'Booster pour générateurs intermédiaires',
      baseCost: 25000,
      costMultiplier: 2.5,
      multiplier: 1.4,
      maxLevel: 12,
      targetGeneratorId: 2,
      unlockCondition: (gameState) => gameState.generators?.[1]?.count >= 3,
    },
    {
      id: 'automation_1',
      name: 'IA de Gestion',
      description: 'Intelligence artificielle pour optimiser tous les générateurs',
      baseCost: 100000,
      costMultiplier: 3.0,
      multiplier: 2.0,
      maxLevel: 10,
      targetGeneratorId: 'all',
      unlockCondition: (gameState) => gameState.totalIncome >= 1000,
    },
    {
      id: 'quantum_boost',
      name: 'Amplificateur Quantique',
      description: 'Technologie futuriste pour une production exponentielle',
      baseCost: 1000000,
      costMultiplier: 4.0,
      multiplier: 3.0,
      maxLevel: 5,
      targetGeneratorId: 'all',
      unlockCondition: (gameState) => gameState.prestigeLevel >= 1,
    },
  ],
};

// Coefficients de difficulté pour équilibrer la progression
export const DIFFICULTY_SCALING = {
  // Augmentation globale de difficulté basée sur le niveau total d'upgrades
  globalDifficultyMultiplier: (totalUpgradeLevel) => Math.pow(1.05, totalUpgradeLevel / 10),
  
  // Scaling exponentiel pour les coûts en fin de jeu
  lateGameCostMultiplier: (level) => {
    if (level > 100) {
      return Math.pow(1.1, level - 100);
    }
    return 1;
  },
  
  // Bonus de prestige pour réduire les coûts
  prestigeCostReduction: (prestigeLevel) => Math.pow(0.95, prestigeLevel),
};

// Configuration des paliers de déblocage
export const UNLOCK_THRESHOLDS = {
  firstClickUpgrade: 50,
  firstGeneratorUpgrade: 500,
  advancedUpgrades: 5000,
  endGameUpgrades: 100000,
};