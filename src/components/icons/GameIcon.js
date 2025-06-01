import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../../constants/gameConstants';

/**
 * 🎨 GameIcon - Beautiful SVG icons with gradients and modern design
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
            <Defs>
              <LinearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#FFD700" />
                <Stop offset="100%" stopColor="#FFA500" />
              </LinearGradient>
            </Defs>
            <Circle 
              cx="12" 
              cy="12" 
              r="10" 
              fill="url(#coinGrad)" 
              stroke="#B8860B" 
              strokeWidth="1.5"
            />
            <Path 
              d="M12 6v12M9 9h6M9 15h6" 
              stroke="#8B4513" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </Svg>
        );
        
      case 'click':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#FFE135" />
                <Stop offset="100%" stopColor="#FF6B35" />
              </LinearGradient>
            </Defs>
            <Path 
              d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
              fill="url(#starGrad)"
              stroke="#E55100"
              strokeWidth="1"
            />
            <Circle cx="12" cy="12" r="3" fill="#FFF" opacity="0.8" />
          </Svg>
        );
        
      case 'factory':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="factoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#607D8B" />
                <Stop offset="100%" stopColor="#455A64" />
              </LinearGradient>
            </Defs>
            <Rect 
              x="2" 
              y="10" 
              width="20" 
              height="12" 
              fill="url(#factoryGrad)"
              stroke="#37474F"
              strokeWidth="1"
              rx="2"
            />
            {/* Chimneys */}
            <Rect x="5" y="6" width="2" height="4" fill="#795548" rx="1" />
            <Rect x="11" y="4" width="2" height="6" fill="#795548" rx="1" />
            <Rect x="17" y="7" width="2" height="3" fill="#795548" rx="1" />
            
            {/* Smoke */}
            <Circle cx="6" cy="4" r="1" fill="#B0BEC5" opacity="0.7" />
            <Circle cx="12" cy="2" r="1" fill="#B0BEC5" opacity="0.7" />
            <Circle cx="18" cy="5" r="1" fill="#B0BEC5" opacity="0.7" />
            
            {/* Windows */}
            <Rect x="7" y="14" width="2" height="2" fill="#4FC3F7" rx="0.5" />
            <Rect x="11" y="14" width="2" height="2" fill="#4FC3F7" rx="0.5" />
            <Rect x="15" y="14" width="2" height="2" fill="#4FC3F7" rx="0.5" />
          </Svg>
        );
        
      case 'upgrade':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="upgradeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#4CAF50" />
                <Stop offset="100%" stopColor="#2E7D32" />
              </LinearGradient>
            </Defs>
            <Path 
              d="M12 2L22 12L17 12L17 22L7 22L7 12L2 12Z" 
              fill="url(#upgradeGrad)"
              stroke="#1B5E20"
              strokeWidth="1.5"
            />
            <Path 
              d="M12 6L16 10L14 10L14 16L10 16L10 10L8 10Z" 
              fill="#FFF"
              opacity="0.9"
            />
          </Svg>
        );
        
      case 'generator':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="generatorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#2196F3" />
                <Stop offset="100%" stopColor="#1565C0" />
              </LinearGradient>
            </Defs>
            <Circle 
              cx="12" 
              cy="12" 
              r="8" 
              fill="none" 
              stroke="url(#generatorGrad)" 
              strokeWidth="2.5"
            />
            <Circle cx="12" cy="12" r="4" fill="url(#generatorGrad)" />
            <Circle cx="12" cy="12" r="2" fill="#FFF" />
            
            {/* Rotating elements */}
            <Path 
              d="M12 4v4M12 16v4M4 12h4M16 12h4" 
              stroke="url(#generatorGrad)" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <Circle cx="12" cy="4" r="1.5" fill="#FF5722" />
            <Circle cx="12" cy="20" r="1.5" fill="#FF5722" />
            <Circle cx="4" cy="12" r="1.5" fill="#FF5722" />
            <Circle cx="20" cy="12" r="1.5" fill="#FF5722" />
          </Svg>
        );
        
      case 'income':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="incomeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#4CAF50" />
                <Stop offset="100%" stopColor="#8BC34A" />
              </LinearGradient>
            </Defs>
            <Path 
              d="M7 14l3-3 3 3 5-5" 
              stroke="url(#incomeGrad)" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <Path 
              d="M18 9v3M18 9h-3" 
              stroke="url(#incomeGrad)" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <Circle cx="7" cy="14" r="2" fill="#4CAF50" />
            <Circle cx="10" cy="11" r="2" fill="#4CAF50" />
            <Circle cx="13" cy="14" r="2" fill="#4CAF50" />
            <Circle cx="18" cy="9" r="2" fill="#4CAF50" />
          </Svg>
        );
        
      case 'prestige':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="prestigeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#9C27B0" />
                <Stop offset="50%" stopColor="#E91E63" />
                <Stop offset="100%" stopColor="#FF5722" />
              </LinearGradient>
            </Defs>
            <Polygon 
              points="12,2 15.09,8.26 22,9 17,14 18.18,21 12,17.77 5.82,21 7,14 2,9 8.91,8.26" 
              fill="url(#prestigeGrad)"
              stroke="#D32F2F"
              strokeWidth="1"
            />
            <Circle cx="12" cy="12" r="4" fill="#FFD700" opacity="0.8" />
            <Circle cx="12" cy="12" r="2" fill="#FFF" />
          </Svg>
        );
        
      case 'settings':
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Defs>
              <LinearGradient id="settingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#607D8B" />
                <Stop offset="100%" stopColor="#455A64" />
              </LinearGradient>
            </Defs>
            <Circle cx="12" cy="12" r="3" fill="url(#settingsGrad)" />
            <Path 
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" 
              fill="none" 
              stroke="url(#settingsGrad)" 
              strokeWidth="1.5"
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