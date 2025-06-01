import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS, SPACING, SCREEN, BORDER_RADIUS } from '../constants/gameConstants';
import { formatNumber, formatPerSecond } from '../utils/gameUtils';

/**
 * 🏭 Generator Component
 * Displays a single generator with purchase option
 * Simple, focused, and reusable
 */
const Generator = ({ 
  generator, 
  onBuy, 
  canAfford = false,
  disabled = false 
}) => {
  const { id, name, icon, description, cost, owned, income } = generator;

  const handlePress = () => {
    if (canAfford && !disabled) {
      onBuy(id);
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
        <Text style={styles.icon}>{icon}</Text>
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        
        {owned > 0 && (
          <Text style={styles.income}>
            {formatPerSecond(income)} per generator
          </Text>
        )}
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.owned}>Owned: {owned}</Text>
        <Text style={[styles.cost, canAfford ? styles.affordableCost : styles.unaffordableCost]}>
          💰 {formatNumber(cost)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SCREEN.GENERATOR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginVertical: SPACING.xs,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
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
    borderRadius: BORDER_RADIUS.sm,
    marginRight: SPACING.md,
  },
  icon: {
    fontSize: 20,
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
    color: COLORS.accent,
    fontWeight: '600',
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  owned: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs / 2,
  },
  cost: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  affordableCost: {
    color: COLORS.success,
  },
  unaffordableCost: {
    color: COLORS.error,
  },
});

export default Generator;