import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import ClickButton from '../components/ClickButton';
import Generator from '../components/Generator';
import UpgradesScreen from './UpgradesScreen';
import GameIcon from '../components/icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency, formatPerSecond } from '../utils/gameUtils';

/**
 * 🎮 GameScreen - Main game interface with upgrades integration
 * Simple, focused layout with all essential elements
 */
const GameScreen = () => {
  const [showUpgrades, setShowUpgrades] = useState(false);
  
  const {
    currency,
    totalIncome,
    clickPower,
    prestigeMultiplier,
    generators,
    clickUpgrades,
    handleClick,
    buyGenerator,
    buyClickUpgrade,
    getTotalClickMultiplier,
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

  const handleBuyClickUpgrade = (upgradeId) => {
    const upgrade = clickUpgrades.find(u => u.id === upgradeId);
    if (upgrade && currency >= upgrade.cost) {
      buyClickUpgrade(upgradeId);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header with currency display */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <GameIcon type="factory" size={24} color={COLORS.primary} />
          <Text style={styles.title}>Idle Empire</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.upgradesButton}
          onPress={() => setShowUpgrades(true)}
        >
          <GameIcon type="upgrade" size={20} color={COLORS.background} />
          <Text style={styles.upgradesButtonText}>Upgrades</Text>
        </TouchableOpacity>
      </View>
      
      {/* Currency Display */}
      <View style={styles.currencySection}>
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
        
        {getTotalClickMultiplier() > 1 && (
          <Text style={styles.clickMultiplier}>
            Multiplicateur de clic: {getTotalClickMultiplier().toFixed(2)}x
          </Text>
        )}
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

      {/* Upgrades Modal */}
      <Modal
        visible={showUpgrades}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <UpgradesScreen
          currency={currency}
          clickUpgrades={clickUpgrades}
          onBuyClickUpgrade={handleBuyClickUpgrade}
          getTotalClickMultiplier={getTotalClickMultiplier}
          onClose={() => setShowUpgrades(false)}
        />
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  upgradesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  upgradesButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.background,
    marginLeft: SPACING.xs,
  },
  currencySection: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
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
    paddingVertical: SPACING.lg,
  },
  clickMultiplier: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: SPACING.sm,
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