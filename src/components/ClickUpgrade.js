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
 * 🚀 ClickUpgrade - Beautiful upgrade card design
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
      activeOpacity={0.8}
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
            type="upgrade" 
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
            {upgrade.name}
          </Text>
          
          <Text style={styles.description}>
            {upgrade.description}
          </Text>
          
          <View style={styles.bonusInfo}>
            <View style={styles.bonusItem}>
              <Text style={styles.bonusLabel}>Niveau</Text>
              <Text style={styles.bonusValue}>{upgrade.level}</Text>
            </View>
            
            <View style={styles.bonusItem}>
              <Text style={styles.bonusLabel}>Bonus</Text>
              <Text style={styles.bonusValue}>
                +{((upgrade.multiplier - 1) * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
          
          {upgrade.level > 0 && (
            <View style={styles.totalBonusContainer}>
              <GameIcon type="click" size={12} color={COLORS.accent} />
              <Text style={styles.totalBonus}>
                Total: +{((Math.pow(upgrade.multiplier, upgrade.level) - 1) * 100).toFixed(0)}%
              </Text>
            </View>
          )}
        </View>
        
        {/* Price Section */}
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <GameIcon 
              type="currency" 
              size={18} 
              color={canAfford ? COLORS.success : COLORS.warning} 
            />
            <Text style={[
              styles.price,
              canAfford ? styles.priceAffordable : styles.priceNotAffordable
            ]}>
              {formatCurrency(upgrade.cost)}
            </Text>
          </View>
          
          {canAfford && (
            <View style={styles.buyButton}>
              <Text style={styles.buyButtonText}>ACHETER</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
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
  affordable: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  notAffordable: {
    opacity: 0.7,
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
    marginBottom: 8,
    lineHeight: 16,
  },
  bonusInfo: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: 6,
  },
  bonusItem: {
    alignItems: 'center',
  },
  bonusLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  bonusValue: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  totalBonusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalBonus: {
    fontSize: 11,
    color: COLORS.accent,
    fontWeight: '600',
    marginLeft: 4,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  priceAffordable: {
    color: COLORS.success,
  },
  priceNotAffordable: {
    color: COLORS.warning,
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  buyButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.background,
    letterSpacing: 0.5,
  },
});

export default ClickUpgrade;