import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 💾 Game Storage Service
 * Handles saving and loading game state with error handling
 */

const STORAGE_KEY = '@IdleGame:SaveData';
const BACKUP_KEY = '@IdleGame:BackupData';

/**
 * Save game state to AsyncStorage
 */
export const saveGame = async (gameState) => {
  try {
    // Add timestamp to save data
    const saveData = {
      ...gameState,
      lastSaveTime: Date.now(),
      version: '1.0.0', // For future migration handling
    };

    const jsonValue = JSON.stringify(saveData);
    
    // Save main data
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    
    // Create backup (previous save)
    const existingData = await AsyncStorage.getItem(STORAGE_KEY);
    if (existingData) {
      await AsyncStorage.setItem(BACKUP_KEY, existingData);
    }

    console.log('Game saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving game:', error);
    return false;
  }
};

/**
 * Load game state from AsyncStorage
 */
export const loadGame = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    
    if (jsonValue != null) {
      const gameData = JSON.parse(jsonValue);
      console.log('Game loaded successfully');
      return gameData;
    }
    
    console.log('No save data found');
    return null;
  } catch (error) {
    console.error('Error loading game:', error);
    
    // Try to load backup if main save fails
    try {
      const backupValue = await AsyncStorage.getItem(BACKUP_KEY);
      if (backupValue != null) {
        const backupData = JSON.parse(backupValue);
        console.log('Loaded backup save data');
        return backupData;
      }
    } catch (backupError) {
      console.error('Error loading backup:', backupError);
    }
    
    return null;
  }
};

/**
 * Clear all game data (for reset)
 */
export const clearGameData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    await AsyncStorage.removeItem(BACKUP_KEY);
    console.log('Game data cleared');
    return true;
  } catch (error) {
    console.error('Error clearing game data:', error);
    return false;
  }
};

/**
 * Export save data as string (for sharing/backup)
 */
export const exportSaveData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue;
  } catch (error) {
    console.error('Error exporting save data:', error);
    return null;
  }
};

/**
 * Import save data from string
 */
export const importSaveData = async (saveString) => {
  try {
    // Validate the save data first
    const gameData = JSON.parse(saveString);
    
    // Basic validation - check for required fields
    if (!gameData.currency && gameData.currency !== 0) {
      throw new Error('Invalid save data format');
    }

    await AsyncStorage.setItem(STORAGE_KEY, saveString);
    console.log('Save data imported successfully');
    return gameData;
  } catch (error) {
    console.error('Error importing save data:', error);
    return null;
  }
};

/**
 * Get storage info (for debugging)
 */
export const getStorageInfo = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const gameKeys = keys.filter(key => key.startsWith('@IdleGame:'));
    
    const info = {
      totalKeys: keys.length,
      gameKeys: gameKeys.length,
      keys: gameKeys,
    };

    console.log('Storage info:', info);
    return info;
  } catch (error) {
    console.error('Error getting storage info:', error);
    return null;
  }
};