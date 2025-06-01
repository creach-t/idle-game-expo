import { useState, useEffect, useCallback, useRef } from 'react';
import { saveGame, loadGame } from '../services/storageService';
import { 
  calculateGeneratorCost, 
  calculateTotalIncome,
  calculatePrestigePoints,
  calculatePrestigeMultiplier 
} from '../utils/gameUtils';
import { GENERATORS, GAME_CONFIG } from '../constants/gameConstants';

/**
 * 🎮 Custom Hook for Game Logic
 * Encapsulates all game state and business logic
 */
export const useGameLogic = () => {
  // Core game state
  const [currency, setCurrency] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [clickPower, setClickPower] = useState(GAME_CONFIG.CLICK_BASE_POWER);
  const [generators, setGenerators] = useState(
    GENERATORS.map(gen => ({
      ...gen,
      owned: 0,
      cost: gen.baseCost,
      income: 0,
    }))
  );
  const [prestigePoints, setPrestigePoints] = useState(0);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(1);
  const [totalClicks, setTotalClicks] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for intervals
  const gameLoopRef = useRef(null);
  const saveIntervalRef = useRef(null);

  // Calculate total income
  const totalIncome = calculateTotalIncome(generators) * prestigeMultiplier;

  /**
   * Handle click action
   */
  const handleClick = useCallback(() => {
    const clickValue = clickPower * prestigeMultiplier;
    setCurrency(prev => prev + clickValue);
    setTotalEarned(prev => prev + clickValue);
    setTotalClicks(prev => prev + 1);
  }, [clickPower, prestigeMultiplier]);

  /**
   * Buy a generator
   */
  const buyGenerator = useCallback((generatorId) => {
    const generator = generators.find(g => g.id === generatorId);
    if (!generator || currency < generator.cost) {
      return false;
    }

    setCurrency(prev => prev - generator.cost);
    
    setGenerators(prev => prev.map(g => {
      if (g.id === generatorId) {
        const newOwned = g.owned + 1;
        return {
          ...g,
          owned: newOwned,
          cost: calculateGeneratorCost(g.baseCost, newOwned),
          income: g.baseIncome * newOwned,
        };
      }
      return g;
    }));

    return true;
  }, [generators, currency]);

  /**
   * Prestige reset
   */
  const prestige = useCallback(() => {
    if (totalEarned < GAME_CONFIG.PRESTIGE_REQUIREMENT) {
      return false;
    }

    const newPrestigePoints = calculatePrestigePoints(totalEarned);
    const newMultiplier = calculatePrestigeMultiplier(prestigePoints + newPrestigePoints);

    // Reset everything except prestige data
    setCurrency(0);
    setTotalEarned(0);
    setClickPower(GAME_CONFIG.CLICK_BASE_POWER);
    setGenerators(GENERATORS.map(gen => ({
      ...gen,
      owned: 0,
      cost: gen.baseCost,
      income: 0,
    })));
    setPrestigePoints(prev => prev + newPrestigePoints);
    setPrestigeMultiplier(newMultiplier);

    return true;
  }, [totalEarned, prestigePoints]);

  /**
   * Game loop for passive income
   */
  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) return;

    gameLoopRef.current = setInterval(() => {
      if (totalIncome > 0) {
        const passiveIncome = totalIncome / 10; // 10 FPS
        setCurrency(prev => prev + passiveIncome);
        setTotalEarned(prev => prev + passiveIncome);
      }
    }, GAME_CONFIG.GAME_TICK_RATE);
  }, [totalIncome]);

  /**
   * Stop game loop
   */
  const stopGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
      gameLoopRef.current = null;
    }
  }, []);

  /**
   * Auto-save functionality
   */
  const startAutoSave = useCallback(() => {
    if (saveIntervalRef.current) return;

    saveIntervalRef.current = setInterval(() => {
      const gameState = {
        currency,
        totalEarned,
        clickPower,
        generators,
        prestigePoints,
        prestigeMultiplier,
        totalClicks,
      };
      saveGame(gameState);
    }, GAME_CONFIG.SAVE_INTERVAL);
  }, [currency, totalEarned, clickPower, generators, prestigePoints, prestigeMultiplier, totalClicks]);

  /**
   * Load game data
   */
  const loadGameData = useCallback(async () => {
    try {
      const savedData = await loadGame();
      if (savedData) {
        setCurrency(savedData.currency || 0);
        setTotalEarned(savedData.totalEarned || 0);
        setClickPower(savedData.clickPower || GAME_CONFIG.CLICK_BASE_POWER);
        setGenerators(savedData.generators || GENERATORS.map(gen => ({
          ...gen,
          owned: 0,
          cost: gen.baseCost,
          income: 0,
        })));
        setPrestigePoints(savedData.prestigePoints || 0);
        setPrestigeMultiplier(savedData.prestigeMultiplier || 1);
        setTotalClicks(savedData.totalClicks || 0);
      }
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /**
   * Reset game completely
   */
  const resetGame = useCallback(() => {
    setCurrency(0);
    setTotalEarned(0);
    setClickPower(GAME_CONFIG.CLICK_BASE_POWER);
    setGenerators(GENERATORS.map(gen => ({
      ...gen,
      owned: 0,
      cost: gen.baseCost,
      income: 0,
    })));
    setPrestigePoints(0);
    setPrestigeMultiplier(1);
    setTotalClicks(0);
  }, []);

  // Initialize game on mount
  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  // Start game loop when loaded
  useEffect(() => {
    if (isLoaded) {
      startGameLoop();
      startAutoSave();
    }

    return () => {
      stopGameLoop();
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
      }
    };
  }, [isLoaded, startGameLoop, startAutoSave, stopGameLoop]);

  // Check if prestige is available
  const canPrestige = totalEarned >= GAME_CONFIG.PRESTIGE_REQUIREMENT;
  const prestigePointsGain = canPrestige ? calculatePrestigePoints(totalEarned) : 0;

  return {
    // State
    currency,
    totalEarned,
    clickPower,
    generators,
    prestigePoints,
    prestigeMultiplier,
    totalClicks,
    totalIncome,
    isLoaded,
    canPrestige,
    prestigePointsGain,

    // Actions
    handleClick,
    buyGenerator,
    prestige,
    resetGame,
  };
};