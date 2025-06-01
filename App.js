import React from 'react';
import { StatusBar } from 'expo-status-bar';
import GameScreen from './src/screens/GameScreen';

/**
 * 🚀 Main App Component
 * Keeps it simple - just render the game screen
 * All complexity is handled by the useGameLogic hook
 */
export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1a1a1a" />
      <GameScreen />
    </>
  );
}