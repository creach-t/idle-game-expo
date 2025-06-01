import { useState, useEffect, useCallback } from 'react';
import { UPGRADE_CONFIGS } from '../constants/upgradeConstants';
import { saveUpgrades, loadUpgrades } from '../services/storageService';

/**
 * 🚀 useUpgrades - Hook pour gérer les améliorateurs
 * Gère les upgrades de clic et de générateurs avec progression exponentielle
 */
export const useUpgrades = () => {
  const [clickUpgrades, setClickUpgrades] = useState([]);
  const [generatorUpgrades, setGeneratorUpgrades] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les upgrades depuis le stockage
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUpgrades = await loadUpgrades();
        
        if (savedUpgrades) {
          setClickUpgrades(savedUpgrades.clickUpgrades || initializeClickUpgrades());
          setGeneratorUpgrades(savedUpgrades.generatorUpgrades || initializeGeneratorUpgrades());
        } else {
          setClickUpgrades(initializeClickUpgrades());
          setGeneratorUpgrades(initializeGeneratorUpgrades());
        }
        
        setIsLoaded(true);
      } catch (error) {
        console.error('Erreur lors du chargement des upgrades:', error);
        setClickUpgrades(initializeClickUpgrades());
        setGeneratorUpgrades(initializeGeneratorUpgrades());
        setIsLoaded(true);
      }
    };

    loadData();
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    if (isLoaded) {
      const saveData = async () => {
        try {
          await saveUpgrades({ clickUpgrades, generatorUpgrades });
        } catch (error) {
          console.error('Erreur lors de la sauvegarde des upgrades:', error);
        }
      };
      
      saveData();
    }
  }, [clickUpgrades, generatorUpgrades, isLoaded]);

  // Initialiser les upgrades de clic
  const initializeClickUpgrades = () => {
    return UPGRADE_CONFIGS.clickUpgrades.map(config => ({
      ...config,
      level: 0,
      cost: config.baseCost,
    }));
  };

  // Initialiser les upgrades de générateurs
  const initializeGeneratorUpgrades = () => {
    return UPGRADE_CONFIGS.generatorUpgrades.map(config => ({
      ...config,
      level: 0,
      cost: config.baseCost,
    }));
  };

  // Acheter un upgrade de clic
  const buyClickUpgrade = useCallback((upgradeId) => {
    setClickUpgrades(current => 
      current.map(upgrade => {
        if (upgrade.id === upgradeId) {
          return {
            ...upgrade,
            level: upgrade.level + 1,
            cost: Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level + 1)),
          };
        }
        return upgrade;
      })
    );
  }, []);

  // Acheter un upgrade de générateur
  const buyGeneratorUpgrade = useCallback((upgradeId) => {
    setGeneratorUpgrades(current => 
      current.map(upgrade => {
        if (upgrade.id === upgradeId) {
          return {
            ...upgrade,
            level: upgrade.level + 1,
            cost: Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level + 1)),
          };
        }
        return upgrade;
      })
    );
  }, []);

  // Calculer le multiplicateur total de clic
  const getTotalClickMultiplier = useCallback(() => {
    return clickUpgrades.reduce((total, upgrade) => {
      return total * Math.pow(upgrade.multiplier, upgrade.level);
    }, 1);
  }, [clickUpgrades]);

  // Calculer le multiplicateur pour un générateur spécifique
  const getGeneratorMultiplier = useCallback((generatorId) => {
    return generatorUpgrades
      .filter(upgrade => upgrade.targetGeneratorId === generatorId || upgrade.targetGeneratorId === 'all')
      .reduce((total, upgrade) => {
        return total * Math.pow(upgrade.multiplier, upgrade.level);
      }, 1);
  }, [generatorUpgrades]);

  // Reset pour le prestige
  const resetUpgrades = useCallback(() => {
    setClickUpgrades(initializeClickUpgrades());
    setGeneratorUpgrades(initializeGeneratorUpgrades());
  }, []);

  return {
    clickUpgrades,
    generatorUpgrades,
    isLoaded,
    buyClickUpgrade,
    buyGeneratorUpgrade,
    getTotalClickMultiplier,
    getGeneratorMultiplier,
    resetUpgrades,
  };
};