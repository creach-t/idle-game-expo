import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';
import { COLORS } from '../../constants/gameConstants';

/**
 * 🎨 GameIcon - Composant d'icônes vectorielles personnalisées
 * Remplace les emojis par des icônes SVG professionnelles
 */
const GameIcon = ({ 
  type, 
  size = 24, 
  color = COLORS.text, 
  style = {} 
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'currency':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle 
              cx="12" 
              cy="12" 
              r="10" 
              fill={color} 
              stroke={COLORS.accent} 
              strokeWidth="2"
            />
            <Path 
              d="M12 6v12M9 9h6M9 15h6" 
              stroke={COLORS.background} 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </Svg>
        );
        
      case 'click':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path 
              d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
              fill={color}
              stroke={COLORS.accent}
              strokeWidth="1"
            />
          </Svg>
        );
        
      case 'factory':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Rect 
              x="3" 
              y="10" 
              width="18" 
              height="12" 
              fill={color}
              stroke={COLORS.secondary}
              strokeWidth="1"
            />
            <Rect x="6" y="6" width="3" height="4" fill={color} />
            <Rect x="12" y="4" width="3" height="6" fill={color} />
            <Rect x="18" y="8" width="3" height="2" fill={color} />
            <Circle cx="8" cy="16" r="1" fill={COLORS.background} />
            <Circle cx="16" cy="16" r="1" fill={COLORS.background} />
          </Svg>
        );
        
      case 'upgrade':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Polygon 
              points="12,2 22,12 17,12 17,22 7,22 7,12 2,12" 
              fill={color}
              stroke={COLORS.primary}
              strokeWidth="1"
            />
          </Svg>
        );
        
      case 'generator':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle 
              cx="12" 
              cy="12" 
              r="8" 
              fill="none" 
              stroke={color} 
              strokeWidth="2"
            />
            <Circle cx="12" cy="12" r="3" fill={color} />
            <Path 
              d="M12 4v4M12 16v4M4 12h4M16 12h4" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </Svg>
        );
        
      case 'income':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path 
              d="M7 14l3-3 3 3 5-5" 
              stroke={color} 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <Path 
              d="M18 9v3M18 9h-3" 
              stroke={color} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </Svg>
        );
        
      case 'prestige':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Polygon 
              points="12,2 15.09,8.26 22,9 17,14 18.18,21 12,17.77 5.82,21 7,14 2,9 8.91,8.26" 
              fill={color}
              stroke={COLORS.accent}
              strokeWidth="1"
            />
            <Circle cx="12" cy="12" r="3" fill={COLORS.accent} />
          </Svg>
        );
        
      case 'settings':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle cx="12" cy="12" r="3" fill={color} />
            <Path 
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" 
              fill="none" 
              stroke={color} 
              strokeWidth="1"
            />
          </Svg>
        );
        
      default:
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Circle cx="12" cy="12" r="10" fill={color} />
          </Svg>
        );
    }
  };

  return (
    <View style={[{ width: size, height: size }, style]}>
      {renderIcon()}
    </View>
  );
};

export default GameIcon;