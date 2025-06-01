/**
 * 🔢 Number Formatting Utilities
 * Formats large numbers for display (1000 -> 1K, 1000000 -> 1M, etc.)
 */

const SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];

export const formatNumber = (num) => {
  if (num < 1000) {
    return Math.floor(num).toString();
  }

  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  if (tier >= SUFFIXES.length) {
    return 'Infinity';
  }

  const suffix = SUFFIXES[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;

  return scaled.toFixed(scaled < 10 ? 1 : 0) + suffix;
};

export const formatCurrency = (num) => {
  return `💰 ${formatNumber(num)}`;
};

export const formatPerSecond = (num) => {
  return `${formatNumber(num)}/s`;
};

/**
 * ⏱️ Time Formatting Utilities
 */
export const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

export const getTimeSinceLastSave = (lastSaveTime) => {
  return Date.now() - lastSaveTime;
};

/**
 * 📊 Game Calculation Utilities
 */
export const calculateGeneratorCost = (baseCost, owned, costMultiplier = 1.15) => {
  return Math.floor(baseCost * Math.pow(costMultiplier, owned));
};

export const calculateTotalIncome = (generators) => {
  return generators.reduce((total, generator) => {
    return total + (generator.baseIncome * generator.owned);
  }, 0);
};

export const calculatePrestigePoints = (totalEarned, requirement = 1000000) => {
  if (totalEarned < requirement) return 0;
  return Math.floor(Math.sqrt(totalEarned / requirement));
};

export const calculatePrestigeMultiplier = (prestigePoints, baseMultiplier = 0.1) => {
  return 1 + (prestigePoints * baseMultiplier);
};

/**
 * 🎯 Achievement Utilities
 */
export const checkAchievement = (achievement, gameState) => {
  const { requirement } = achievement;
  
  switch (requirement.type) {
    case 'clicks':
      return gameState.totalClicks >= requirement.value;
    case 'totalEarned':
      return gameState.totalEarned >= requirement.value;
    case 'generators':
      return gameState.generators.some(g => g.owned >= requirement.value);
    default:
      return false;
  }
};

/**
 * 🔄 Animation Utilities
 */
export const lerp = (start, end, progress) => {
  return start + (end - start) * progress;
};

export const easeOutCubic = (t) => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * 🎲 Random Utilities
 */
export const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomInt = (min, max) => {
  return Math.floor(randomBetween(min, max + 1));
};

/**
 * 📱 Platform Utilities
 */
export const isWeb = () => {
  return typeof window !== 'undefined';
};

export const vibrate = (duration = 50) => {
  if (!isWeb() && navigator.vibrate) {
    navigator.vibrate(duration);
  }
};