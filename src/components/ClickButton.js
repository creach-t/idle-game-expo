import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
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

/**
 * 🎯 ClickButton Component
 * The main interactive element that players tap to earn currency
 * Includes satisfying animations and haptic feedback with custom icons
 */
const ClickButton = ({ 
  onPress, 
  clickValue, 
  disabled = false,
  style 
}) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  /**
   * Handle press with animations
   */
  const handlePress = () => {
    if (disabled) return;

    // Scale animation
    scale.value = withSequence(
      withSpring(0.9, { duration: 100 }),
      withSpring(1.1, { duration: 150 }),
      withSpring(1, { duration: 200 })
    );

    // Slight rotation for extra juice
    rotation.value = withSequence(
      withSpring(-2, { duration: 100 }),
      withSpring(2, { duration: 100 }),
      withSpring(0, { duration: 100 })
    );

    // Trigger haptic feedback and callback
    runOnJS(onPress)();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
  }));

  return (
    <Pressable onPress={handlePress} disabled={disabled}>
      <Animated.View style={[styles.container, animatedStyle, style]}>
        <View style={styles.iconContainer}>
          <GameIcon 
            type="click" 
            size={48} 
            color={COLORS.background}
          />
        </View>
        <Text style={styles.value}>{formatCurrency(clickValue)}</Text>
        <Text style={styles.label}>TAP TO EARN</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 3,
    borderColor: COLORS.accent,
  },
  iconContainer: {
    marginBottom: SPACING.xs,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.text,
    opacity: 0.8,
  },
});

export default ClickButton;