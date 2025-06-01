import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useGameLogic } from '../hooks/useGameLogic';
import ClickButton from '../components/ClickButton';
import Generator from '../components/Generator';
import ClickUpgrade from '../components/ClickUpgrade';
import GameIcon from '../components/icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency, formatPerSecond } from '../utils/gameUtils';

const { width, height } = Dimensions.get('window');

/**
 * 🎮 GameScreen - Beautiful, modern idle game interface
 */
const GameScreen = () => {
  const [activeTab, setActiveTab] = useState('generators');
  
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
      <View style={styles.loadingContainer}>
        <GameIcon type="factory" size={64} color={COLORS.primary} />
        <Text style={styles.loadingText}>Chargement d'Idle Empire...</Text>
      </View>
    );
  }

  const handleBuyClickUpgrade = (upgradeId) => {
    const upgrade = clickUpgrades.find(u => u.id === upgradeId);
    if (upgrade && currency >= upgrade.cost) {
      buyClickUpgrade(upgradeId);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
          <View style={styles.titleContainer}>
            <GameIcon type="factory" size={32} color={COLORS.primary} />
            <Text style={styles.title}>Idle Empire</Text>
          </View>
          
          <View style={styles.currencyCard}>
            <GameIcon type="currency" size={24} color={COLORS.currencyGold} />
            <Text style={styles.currency}>{formatCurrency(currency)}</Text>
          </View>
        </View>
        
        {/* Stats Row */}
        <View style={styles.statsRow}>
          {totalIncome > 0 && (
            <View style={styles.statCard}>
              <GameIcon type="income" size={16} color={COLORS.success} />
              <Text style={styles.statText}>{formatPerSecond(totalIncome)}</Text>
            </View>
          )}
          
          {getTotalClickMultiplier() > 1 && (
            <View style={styles.statCard}>
              <GameIcon type="click" size={16} color={COLORS.accent} />
              <Text style={styles.statText}>{getTotalClickMultiplier().toFixed(1)}x clic</Text>
            </View>
          )}
          
          {prestigeMultiplier > 1 && (
            <View style={styles.statCard}>
              <GameIcon type="prestige" size={16} color={COLORS.accent} />
              <Text style={styles.statText}>{prestigeMultiplier.toFixed(1)}x prestige</Text>
            </View>
          )}
        </View>
      </View>

      {/* Click Section */}
      <View style={styles.clickSection}>
        <ClickButton 
          onPress={handleClick}
          clickValue={clickPower * prestigeMultiplier}
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'generators' && styles.activeTab]}
            onPress={() => setActiveTab('generators')}
          >
            <GameIcon 
              type="generator" 
              size={20} 
              color={activeTab === 'generators' ? COLORS.background : COLORS.textSecondary} 
            />
            <Text style={[styles.tabText, activeTab === 'generators' && styles.activeTabText]}>
              Générateurs
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'upgrades' && styles.activeTab]}
            onPress={() => setActiveTab('upgrades')}
          >
            <GameIcon 
              type="upgrade" 
              size={20} 
              color={activeTab === 'upgrades' ? COLORS.background : COLORS.textSecondary} 
            />
            <Text style={[styles.tabText, activeTab === 'upgrades' && styles.activeTabText]}>
              Améliorations
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {activeTab === 'generators' ? (
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
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
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
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
                <GameIcon type="upgrade" size={48} color={COLORS.textSecondary} />
                <Text style={styles.emptyText}>Aucune amélioration disponible</Text>
                <Text style={styles.emptySubtext}>Continuez à cliquer pour débloquer des améliorations !</Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: '600',
    marginTop: SPACING.md,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  currency: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statText: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  clickSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  tabWrapper: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default GameScreen;