import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import ClickUpgrade from '../components/ClickUpgrade';
import GameIcon from '../components/icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency } from '../utils/gameUtils';

/**
 * 🚀 UpgradesScreen - Écran des améliorateurs
 * Interface dédiée aux upgrades de clic et de générateurs
 */
const UpgradesScreen = ({ 
  currency, 
  clickUpgrades, 
  onBuyClickUpgrade, 
  getTotalClickMultiplier,
  onClose 
}) => {
  const totalClickMultiplier = getTotalClickMultiplier();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <GameIcon type="upgrade" size={28} color={COLORS.primary} />
          <Text style={styles.title}>Améliorateurs</Text>
        </View>
        
        <View style={styles.rightContainer}>
          <Text style={styles.currency}>{formatCurrency(currency)}</Text>
          {onClose && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Améliorateurs de Clic */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <GameIcon type="click" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Améliorateurs de Clic</Text>
          </View>
          
          <View style={styles.multiplierInfo}>
            <Text style={styles.multiplierText}>
              Multiplicateur total: <Text style={styles.multiplierValue}>
                {totalClickMultiplier.toFixed(2)}x
              </Text>
            </Text>
          </View>

          {clickUpgrades && clickUpgrades.length > 0 ? (
            clickUpgrades.map((upgrade) => (
              <ClickUpgrade
                key={upgrade.id}
                upgrade={upgrade}
                onBuy={onBuyClickUpgrade}
                canAfford={currency >= upgrade.cost}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Aucun améliorateur disponible</Text>
            </View>
          )}
        </View>

        {/* Conseils Stratégiques */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Conseils Stratégiques</Text>
          
          <View style={styles.tip}>
            <Text style={styles.tipText}>
              • Commencez par les améliorateurs de clic pour booster vos gains initiaux
            </Text>
          </View>
          
          <View style={styles.tip}>
            <Text style={styles.tipText}>
              • Équilibrez entre améliorateurs de clic et de générateurs selon votre style
            </Text>
          </View>
          
          <View style={styles.tip}>
            <Text style={styles.tipText}>
              • Les améliorateurs deviennent plus chers à chaque achat
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currency: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: SPACING.md,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  multiplierInfo: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: SPACING.md,
  },
  tip: {
    marginBottom: SPACING.sm,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
});

export default UpgradesScreen;