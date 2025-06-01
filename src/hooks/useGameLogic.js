import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState } from 'react-native';
import { GENERATOR_CONFIG, PRESTIGE_CONFIG, SAVE_CONFIG } from '../constants/gameConstants';
import { useUpgrades } from './useUpgrades';
import { saveGameState, loadGameState } from '../services/storageService';

/**
 * 🎮 useGameLogic - Hook principal pour la logique de jeu
 * Gère l'état global, les calculs et les interactions avec les upgrades
 */
export const useGameLogic = () => {
  // États principaux
  const [currency, setCurrency] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [prestigeLevel, setPrestigeLevel] = useState(0);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(1);
  const [generators, setGenerators] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  
  // Configuration de base
  const BASE_CLICK_POWER = 1;
  
  // Référence pour les intervalles
  const gameLoopRef = useRef(null);
  const saveIntervalRef = useRef(null);
  
  // Hook des upgrades
  const {
    clickUpgrades,
    generatorUpgrades,
    getTotalClickMultiplier,
    getGeneratorMultiplier,
    buyClickUpgrade,
    buyGeneratorUpgrade,
    resetUpgrades,
    isLoaded: upgradesLoaded,
  } = useUpgrades();

  // Calculer le pouvoir de clic actuel
  const clickPower = BASE_CLICK_POWER * getTotalClickMultiplier();

  // Initialisation des générateurs
  const initializeGenerators = useCallback(() => {
    return [
      {
        id: 1,
        name: 'Générateur Basic',
        count: 0,
        baseCost: 10,
        baseIncome: 1,
        costMultiplier: 1.15,
        unlocked: true,
        cost: 10,
      },
      {
        id: 2,
        name: 'Usine Avancée',
        count: 0,
        baseCost: 100,
        baseIncome: 8,
        costMultiplier: 1.20,
        unlocked: false,
        unlockThreshold: 50,
        cost: 100,
      },
      {
        id: 3,
        name: 'Complexe Industriel',
        count: 0,
        baseCost: 1000,
        baseIncome: 50,
        costMultiplier: 1.25,
        unlocked: false,
        unlockThreshold: 500,
        cost: 1000,
      },
      {
        id: 4,
        name: 'Méga Corporation',
        count: 0,
        baseCost: 10000,
        baseIncome: 300,
        costMultiplier: 1.30,
        unlocked: false,
        unlockThreshold: 5000,
        cost: 10000,
      },
      {
        id: 5,
        name: 'Empire Galactique',
        count: 0,
        baseCost: 100000,
        baseIncome: 2000,
        costMultiplier: 1.35,
        unlocked: false,
        unlockThreshold: 50000,
        cost: 100000,
      },
    ];
  }, []);

  // Charger l'état du jeu
  useEffect(() => {
    const loadGame = async () => {
      try {
        const savedState = await loadGameState();
        
        if (savedState) {
          setCurrency(savedState.currency || 0);
          setTotalClicks(savedState.totalClicks || 0);
          setTotalEarnings(savedState.totalEarnings || 0);
          setPrestigeLevel(savedState.prestigeLevel || 0);
          setPrestigeMultiplier(savedState.prestigeMultiplier || 1);
          setGenerators(savedState.generators || initializeGenerators());
          setLastSaveTime(savedState.lastSaveTime || Date.now());
          
          // Calculer les gains hors-ligne
          const offlineTime = Date.now() - (savedState.lastSaveTime || Date.now());
          if (offlineTime > 60000) { // Plus d'1 minute
            const offlineEarnings = calculateOfflineEarnings(savedState.generators || [], offlineTime);
            if (offlineEarnings > 0) {
              setCurrency(prev => prev + offlineEarnings);
              setTotalEarnings(prev => prev + offlineEarnings);
            }
          }
        } else {
          setGenerators(initializeGenerators());
        }
        
        setIsLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setGenerators(initializeGenerators());
        setIsLoaded(true);
      }
    };

    if (upgradesLoaded) {
      loadGame();
    }
  }, [upgradesLoaded, initializeGenerators]);

  // Calcul des gains hors-ligne
  const calculateOfflineEarnings = useCallback((savedGenerators, offlineTime) => {
    const maxOfflineTime = 24 * 60 * 60 * 1000; // 24 heures max
    const effectiveTime = Math.min(offlineTime, maxOfflineTime);
    const secondsOffline = effectiveTime / 1000;
    
    return savedGenerators.reduce((total, generator) => {
      if (generator.count > 0) {
        const generatorMultiplier = getGeneratorMultiplier(generator.id);
        const income = generator.count * generator.baseIncome * generatorMultiplier * prestigeMultiplier;
        return total + (income * secondsOffline);
      }
      return total;
    }, 0);
  }, [getGeneratorMultiplier, prestigeMultiplier]);

  // Calculer le revenu total
  const totalIncome = generators.reduce((total, generator) => {
    if (generator.count > 0) {
      const generatorMultiplier = getGeneratorMultiplier(generator.id);
      return total + (generator.count * generator.baseIncome * generatorMultiplier * prestigeMultiplier);
    }
    return total;
  }, 0);

  // Gestion du clic
  const handleClick = useCallback(() => {
    const clickValue = clickPower * prestigeMultiplier;
    setCurrency(prev => prev + clickValue);
    setTotalEarnings(prev => prev + clickValue);
    setTotalClicks(prev => prev + 1);
  }, [clickPower, prestigeMultiplier]);

  // Achat de générateur
  const buyGenerator = useCallback((generatorId) => {
    const generator = generators.find(g => g.id === generatorId);
    if (!generator || currency < generator.cost) {
      return false;
    }

    setCurrency(prev => prev - generator.cost);
    
    setGenerators(prev => prev.map(g => {
      if (g.id === generatorId) {
        const newCount = g.count + 1;
        const newCost = Math.floor(g.baseCost * Math.pow(g.costMultiplier, newCount));
        return {
          ...g,
          count: newCount,
          cost: newCost,
        };
      }
      return g;
    }));

    return true;
  }, [generators, currency]);

  // Boucle de jeu principale
  useEffect(() => {
    if (isLoaded) {
      gameLoopRef.current = setInterval(() => {
        setGenerators(currentGenerators => {
          let passiveIncome = 0;
          
          const updatedGenerators = currentGenerators.map(generator => {
            if (generator.count > 0) {
              const generatorMultiplier = getGeneratorMultiplier(generator.id);
              const income = generator.count * generator.baseIncome * generatorMultiplier * prestigeMultiplier;
              passiveIncome += income;
            }
            
            // Débloquer les générateurs
            const shouldUnlock = !generator.unlocked && 
              generator.unlockThreshold && 
              currency >= generator.unlockThreshold;
            
            return {
              ...generator,
              unlocked: generator.unlocked || shouldUnlock,
            };
          });
          
          if (passiveIncome > 0) {
            setCurrency(prev => prev + passiveIncome);
            setTotalEarnings(prev => prev + passiveIncome);
          }
          
          return updatedGenerators;
        });
      }, 1000); // Mise à jour chaque seconde
      
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [isLoaded, currency, getGeneratorMultiplier, prestigeMultiplier]);

  // Sauvegarde automatique
  useEffect(() => {
    if (isLoaded) {
      saveIntervalRef.current = setInterval(async () => {
        try {
          const gameState = {
            currency,
            totalClicks,
            totalEarnings,
            prestigeLevel,
            prestigeMultiplier,
            generators,
            lastSaveTime: Date.now(),
          };
          await saveGameState(gameState);
          setLastSaveTime(Date.now());
        } catch (error) {
          console.error('Erreur lors de la sauvegarde:', error);
        }
      }, SAVE_CONFIG.autoSaveInterval);

      return () => {
        if (saveIntervalRef.current) {
          clearInterval(saveIntervalRef.current);
        }
      };
    }
  }, [isLoaded, currency, totalClicks, totalEarnings, prestigeLevel, prestigeMultiplier, generators]);

  return {
    // État
    currency,
    totalClicks,
    totalEarnings,
    prestigeLevel,
    prestigeMultiplier,
    generators,
    isLoaded,
    clickPower,
    totalIncome,
    
    // Upgrades
    clickUpgrades,
    generatorUpgrades,
    getTotalClickMultiplier,
    getGeneratorMultiplier,
    
    // Actions
    handleClick,
    buyGenerator,
    buyClickUpgrade,
    buyGeneratorUpgrade,
    
    // Utilitaires
    resetUpgrades,
  };
};