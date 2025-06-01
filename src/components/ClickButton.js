import React from 'react';
import { Pressable, Text, StyleSheet, View, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withSequence,
  runOnJS
} from 'react-native-reanimated';
import GameIcon from './icons/GameIcon';
import { COLORS, SPACING } from '../constants/gameConstants';
import { formatCurrency } from '../utils/gameUtils';

const { width } = Dimensions.get('window');

/**
 * 🎯 ClickButton Component - Modern, full-width design
 */
const ClickButton = ({ 
  onPress, 
  clickValue, 
  disabled = false,
  style 
}) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.7);

  const handlePress = () => {
    if (disabled) return;

    // Scale animation
    scale.value = withSequence(
      withSpring(0.96, { duration: 80 }),
      withSpring(1, { duration: 120 })
    );

    // Glow effect
    glowOpacity.value = withSequence(
      withSpring(1, { duration: 100 }),
      withSpring(0.7, { duration: 200 })
    );

    runOnJS(onPress)();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={[styles.container, style]}>
      {/* Glow effect */}
      <Animated.View style={[styles.glow, glowStyle]} />
      
      <Pressable onPress={handlePress} disabled={disabled}>
        <Animated.View style={[styles.button, animatedStyle]}>
          {/* Icon container */}
          <View style={styles.iconContainer}>
            <GameIcon 
              type="click" 
              size={64} 
              color={COLORS.background}
            />
          </View>
          
          {/* Value display */}
          <View style={styles.valueContainer}>
            <Text style={styles.valueLabel}>CLIQUEZ POUR</Text>
            <Text style={styles.value}>+{formatCurrency(clickValue)}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - (SPACING.lg * 2),
    alignSelf: 'center',
    marginVertical: SPACING.md,
  },
  glow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    opacity: 0.3,
  },
  button: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  valueContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  valueLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.background,
    opacity: 0.9,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.background,
  },
});

export default ClickButton;