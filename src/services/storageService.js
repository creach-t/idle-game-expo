import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 💾 storageService - Service de sauvegarde pour le jeu
 * Gère la persistance des données de jeu avec AsyncStorage
 */

const STORAGE_KEYS = {
  GAME_STATE: '@idle_empire_game_state',
  UPGRADES: '@idle_empire_upgrades',
  SETTINGS: '@idle_empire_settings',
  STATISTICS: '@idle_empire_statistics',
};

// Sauvegarde de l'état du jeu
export const saveGameState = async (gameState) => {
  try {
    const jsonValue = JSON.stringify(gameState);
    await AsyncStorage.setItem(STORAGE_KEYS.GAME_STATE, jsonValue);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'état du jeu:', error);
    throw error;
  }
};

// Chargement de l'état du jeu
export const loadGameState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.GAME_STATE);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Erreur lors du chargement de l\'état du jeu:', error);
    return null;
  }
};

// Sauvegarde des upgrades
export const saveUpgrades = async (upgrades) => {
  try {
    const jsonValue = JSON.stringify(upgrades);
    await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, jsonValue);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des upgrades:', error);
    throw error;
  }
};

// Chargement des upgrades
export const loadUpgrades = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.UPGRADES);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Erreur lors du chargement des upgrades:', error);
    return null;
  }
};

// Réinitialisation complète des données
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Erreur lors de la suppression des données:', error);
    throw error;
  }
};

// Exportation des données pour sauvegarde externe
export const exportGameData = async () => {
  try {
    const gameState = await loadGameState();
    const upgrades = await loadUpgrades();
    
    return {
      gameState,
      upgrades,
      exportDate: new Date().toISOString(),
      version: '1.0.0',
    };
  } catch (error) {
    console.error('Erreur lors de l\'exportation des données:', error);
    throw error;
  }
};