import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import GameIcon from './icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency, formatPerSecond } from '../utils/gameUtils';

/**
 * 🏭 Generator Component - Beautiful card design
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
      {/* Glow effect for affordable items */}
      {canAfford && <View style={styles.glow} />}
      
      <View style={styles.content}>
        {/* Icon Section */}
        <View style={[
          styles.iconContainer,
          canAfford ? styles.iconAffordable : styles.iconNotAffordable
        ]}>
          <GameIcon 
            type="factory" 
            size={28} 
            color={canAfford ? COLORS.background : COLORS.textSecondary}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoContainer}>
          <Text style={[
            styles.name,
            canAfford ? styles.nameAffordable : styles.nameNotAffordable
          ]}>
            {generator.name}
          </Text>
          
          <Text style={styles.description}>
            Production automatique de revenus
          </Text>
          
          {generator.count > 0 && (
            <View style={styles.productionInfo}>
              <GameIcon type="income" size={14} color={COLORS.success} />
              <Text style={styles.productionText}>
                {formatPerSecond(generator.baseIncome * generator.count)}
              </Text>
            </View>
          )}
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.ownedBadge}>
            <Text style={styles.ownedText}>{generator.count}</Text>
          </View>
          
          <View style={styles.costContainer}>
            <GameIcon 
              type="currency" 
              size={16} 
              color={canAfford ? COLORS.success : COLORS.warning} 
            />
            <Text style={[
              styles.cost, 
              canAfford ? styles.costAffordable : styles.costNotAffordable
            ]}>
              {formatCurrency(generator.cost)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.xs,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  canAfford: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cantAfford: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
  glow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    opacity: 0.2,
    zIndex: -1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  iconAffordable: {
    backgroundColor: COLORS.primary,
  },
  iconNotAffordable: {
    backgroundColor: COLORS.border,
  },
  infoContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nameAffordable: {
    color: COLORS.text,
  },
  nameNotAffordable: {
    color: COLORS.textSecondary,
  },
  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  productionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productionText: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '600',
    marginLeft: 4,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  ownedBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  ownedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cost: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  costAffordable: {
    color: COLORS.success,
  },
  costNotAffordable: {
    color: COLORS.warning,
  },
});

export default Generator;