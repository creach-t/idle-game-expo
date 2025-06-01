import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import ClickButton from '../components/ClickButton';
import Generator from '../components/Generator';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency, formatPerSecond } from '../utils/gameUtils';

/**
 * 🎮 GameScreen - Main game interface
 * Simple, focused layout with all essential elements
 */
const GameScreen = () => {
  const {
    currency,
    totalIncome,
    clickPower,
    prestigeMultiplier,
    generators,
    handleClick,
    buyGenerator,
    isLoaded,
  } = useGameLogic();

  if (!isLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading Idle Empire...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header with currency display */}
      <View style={styles.header}>
        <Text style={styles.title}>💰 Idle Empire</Text>
        <Text style={styles.currency}>{formatCurrency(currency)}</Text>
        
        {totalIncome > 0 && (
          <Text style={styles.income}>
            📈 {formatPerSecond(totalIncome)}
          </Text>
        )}
        
        {prestigeMultiplier > 1 && (
          <Text style={styles.prestige}>
            ⭐ {prestigeMultiplier.toFixed(1)}x Prestige Bonus
          </Text>
        )}
      </View>

      {/* Click section */}
      <View style={styles.clickSection}>
        <ClickButton 
          onPress={handleClick}
          clickValue={clickPower * prestigeMultiplier}
        />
      </View>

      {/* Generators section */}
      <View style={styles.generatorsSection}>
        <Text style={styles.sectionTitle}>🏭 Generators</Text>
        
        <ScrollView 
          style={styles.generatorsList}
          showsVerticalScrollIndicator={false}
        >
          {generators.map((generator) => (
            <Generator
              key={generator.id}
              generator={generator}
              onBuy={buyGenerator}
              canAfford={currency >= generator.cost}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  currency: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  income: {
    fontSize: 16,
    color: COLORS.success,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  prestige: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
  },
  clickSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  generatorsSection: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.md,
  },
  generatorsList: {
    flex: 1,
  },
});

export default GameScreen;