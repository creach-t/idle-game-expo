import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import GameIcon from './icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency, formatPerSecond } from '../utils/gameUtils';

/**
 * 🏭 Generator Component
 * Displays a single generator with purchase option using custom icons
 * Simple, focused, and reusable
 */
const Generator = ({ 
  generator, 
  onBuy, 
  canAfford = false,
  disabled = false 
}) => {
  const handlePress = () => {
    if (canAfford && !disabled) {
      onBuy(generator.id);
    }
  };

  return (
    <Pressable 
      style={[
        styles.container, 
        canAfford ? styles.canAfford : styles.cantAfford,
        disabled && styles.disabled
      ]}
      onPress={handlePress}
      disabled={disabled || !canAfford}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <GameIcon 
          type="factory" 
          size={24} 
          color={canAfford ? COLORS.background : COLORS.textSecondary}
        />
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{generator.name}</Text>
        <Text style={styles.description}>Génère des revenus automatiques</Text>
        
        {generator.count > 0 && (
          <Text style={styles.income}>
            <GameIcon type="income" size={12} color={COLORS.success} style={{ marginRight: 4 }} />
            {formatPerSecond(generator.baseIncome * generator.count)} par seconde
          </Text>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.owned}>Possédé: {generator.count}</Text>
        <View style={styles.costContainer}>
          <GameIcon type="currency" size={16} color={canAfford ? COLORS.success : COLORS.warning} />
          <Text style={[styles.cost, canAfford ? styles.affordableCost : styles.unaffordableCost]}>
            {formatCurrency(generator.cost)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.md,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  canAfford: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cantAfford: {
    opacity: 0.6,
  },
  disabled: {
    opacity: 0.4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs / 2,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs / 2,
  },
  income: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  owned: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs / 2,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cost: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  affordableCost: {
    color: COLORS.success,
  },
  unaffordableCost: {
    color: COLORS.warning,
  },
});

export default Generator;