import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import GameIcon from './icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency } from '../utils/gameUtils';

/**
 * 🚀 ClickUpgrade - Composant pour les améliorateurs de clic
 * Permet d'augmenter l'efficacité des clics manuels
 */
const ClickUpgrade = ({ upgrade, onBuy, canAfford }) => {
  const handlePress = () => {
    if (canAfford) {
      onBuy(upgrade.id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        canAfford ? styles.affordable : styles.notAffordable
      ]}
      onPress={handlePress}
      disabled={!canAfford}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <GameIcon 
          type="upgrade" 
          size={32} 
          color={canAfford ? COLORS.primary : COLORS.textSecondary}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={[
          styles.name,
          canAfford ? styles.nameAffordable : styles.nameNotAffordable
        ]}>
          {upgrade.name}
        </Text>
        
        <Text style={styles.description}>
          {upgrade.description}
        </Text>
        
        <View style={styles.statsRow}>
          <Text style={styles.level}>
            Niveau {upgrade.level}
          </Text>
          
          <Text style={styles.multiplier}>
            +{((upgrade.multiplier - 1) * 100).toFixed(0)}% par clic
          </Text>
        </View>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={[
          styles.price,
          canAfford ? styles.priceAffordable : styles.priceNotAffordable
        ]}>
          {formatCurrency(upgrade.cost)}
        </Text>
        
        {upgrade.level > 0 && (
          <Text style={styles.totalBonus}>
            Total: +{((Math.pow(upgrade.multiplier, upgrade.level) - 1) * 100).toFixed(0)}%
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 2,
  },
  affordable: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  notAffordable: {
    borderColor: COLORS.border,
    opacity: 0.6,
  },
  iconContainer: {
    marginRight: SPACING.md,
    padding: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    marginRight: SPACING.md,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  nameAffordable: {
    color: COLORS.text,
  },
  nameNotAffordable: {
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  level: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
  multiplier: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  priceAffordable: {
    color: COLORS.success,
  },
  priceNotAffordable: {
    color: COLORS.warning,
  },
  totalBonus: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: '600',
  },
});

export default ClickUpgrade;