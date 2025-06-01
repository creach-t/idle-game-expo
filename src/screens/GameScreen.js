import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import ClickButton from '../components/ClickButton';
import Generator from '../components/Generator';
import ClickUpgrade from '../components/ClickUpgrade';
import GameIcon from '../components/icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency, formatPerSecond } from '../utils/gameUtils';

/**
 * 🎮 GameScreen - Main game interface with tab-based navigation
 * Generators and Upgrades in separate tabs
 */
const GameScreen = () => {
  const [activeTab, setActiveTab] = useState('generators'); // 'generators' or 'upgrades'
  
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

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'generators' && styles.activeTab
          ]}
          onPress={() => setActiveTab('generators')}
        >
          <GameIcon 
            type="generator" 
            size={20} 
            color={activeTab === 'generators' ? COLORS.background : COLORS.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'generators' && styles.activeTabText
          ]}>
            Générateurs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upgrades' && styles.activeTab
          ]}
          onPress={() => setActiveTab('upgrades')}
        >
          <GameIcon 
            type="upgrade" 
            size={20} 
            color={activeTab === 'upgrades' ? COLORS.background : COLORS.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'upgrades' && styles.activeTabText
          ]}>
            Améliorations
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {activeTab === 'generators' ? (
          // Generators Tab
          <ScrollView 
            style={styles.scrollView}
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
        ) : (
          // Upgrades Tab
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Multiplicateur info */}
            <View style={styles.multiplierInfo}>
              <Text style={styles.multiplierText}>
                Multiplicateur total: <Text style={styles.multiplierValue}>
                  {getTotalClickMultiplier().toFixed(2)}x
                </Text>
              </Text>
            </View>

            {clickUpgrades && clickUpgrades.length > 0 ? (
              clickUpgrades.map((upgrade) => (
                <ClickUpgrade
                  key={upgrade.id}
                  upgrade={upgrade}
                  onBuy={handleBuyClickUpgrade}
                  canAfford={currency >= upgrade.cost}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Aucun améliorateur disponible</Text>
              </View>
            )}

            {/* Conseils */}
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>💡 Conseils</Text>
              <Text style={styles.tipText}>
                • Les améliorations augmentent de façon exponentielle{'\n'}
                • Équilibrez entre clics et générateurs{'\n'}
                • Les premiers niveaux sont les plus rentables
              </Text>
            </View>
          </ScrollView>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 28,
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
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  prestigeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prestige: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  clickSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  clickMultiplier: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
    marginTop: SPACING.sm,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  activeTabText: {
    color: COLORS.background,
  },
  contentSection: {
    flex: 1,
    paddingTop: SPACING.md,
  },
  scrollView: {
    flex: 1,
  },
  multiplierInfo: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  multiplierText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
  },
  multiplierValue: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: SPACING.lg,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: COLORS.surface,
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: SPACING.sm,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});

export default GameScreen;