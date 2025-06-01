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
import GameIcon from '../components/icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency, formatPerSecond } from '../utils/gameUtils';

/**
 * 🎮 GameScreen - Main game interface with custom icons
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
        <View style={styles.titleContainer}>
          <GameIcon type="factory" size={24} color={COLORS.primary} />
          <Text style={styles.title}>Idle Empire</Text>
        </View>
        
        <View style={styles.currencyContainer}>
          <GameIcon type="currency" size={28} color={COLORS.currencyGold} />
          <Text style={styles.currency}>{formatCurrency(currency)}</Text>
        </View>
        
        {totalIncome > 0 && (
          <View style={styles.incomeContainer}>
            <GameIcon type="income" size={16} color={COLORS.success} />
            <Text style={styles.income}>
              {formatPerSecond(totalIncome)}
            </Text>
          </View>
        )}
        
        {prestigeMultiplier > 1 && (
          <View style={styles.prestigeContainer}>
            <GameIcon type="prestige" size={16} color={COLORS.accent} />
            <Text style={styles.prestige}>
              {prestigeMultiplier.toFixed(1)}x Prestige Bonus
            </Text>
          </View>
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
        <View style={styles.sectionHeader}>
          <GameIcon type="generator" size={20} color={COLORS.secondary} />
          <Text style={styles.sectionTitle}>Générateurs</Text>
        </View>
        
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  currencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  currency: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  incomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  income: {
    fontSize: 16,
    color: COLORS.success,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  prestigeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prestige: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  clickSection: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  generatorsSection: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    marginHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  generatorsList: {
    flex: 1,
  },
});

export default GameScreen;