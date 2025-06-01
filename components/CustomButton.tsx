import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import Colors from '@/constants/Colors';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}: CustomButtonProps) {
  const handlePress = () => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const getButtonStyles = (): ViewStyle => {
    let buttonStyle: ViewStyle = { ...styles.button };
    
    // Apply variant styles
    switch (variant) {
      case 'primary':
        buttonStyle = { ...buttonStyle, ...styles.primaryButton };
        break;
      case 'secondary':
        buttonStyle = { ...buttonStyle, ...styles.secondaryButton };
        break;
      case 'outline':
        buttonStyle = { ...buttonStyle, ...styles.outlineButton };
        break;
      case 'ghost':
        buttonStyle = { ...buttonStyle, ...styles.ghostButton };
        break;
    }
    
    // Apply size styles
    switch (size) {
      case 'small':
        buttonStyle = { ...buttonStyle, ...styles.smallButton };
        break;
      case 'medium':
        buttonStyle = { ...buttonStyle, ...styles.mediumButton };
        break;
      case 'large':
        buttonStyle = { ...buttonStyle, ...styles.largeButton };
        break;
    }
    
    // Apply disabled style if needed
    if (disabled || isLoading) {
      buttonStyle = { ...buttonStyle, ...styles.disabledButton };
    }
    
    return buttonStyle;
  };

  const getTextStyles = (): TextStyle => {
    let textStyling: TextStyle = { ...styles.buttonText };
    
    // Apply variant specific text styles
    switch (variant) {
      case 'primary':
        textStyling = { ...textStyling, ...styles.primaryText };
        break;
      case 'secondary':
        textStyling = { ...textStyling, ...styles.secondaryText };
        break;
      case 'outline':
        textStyling = { ...textStyling, ...styles.outlineText };
        break;
      case 'ghost':
        textStyling = { ...textStyling, ...styles.ghostText };
        break;
    }
    
    // Apply size specific text styles
    switch (size) {
      case 'small':
        textStyling = { ...textStyling, ...styles.smallText };
        break;
      case 'medium':
        textStyling = { ...textStyling, ...styles.mediumText };
        break;
      case 'large':
        textStyling = { ...textStyling, ...styles.largeText };
        break;
    }
    
    // Apply disabled text style if needed
    if (disabled) {
      textStyling = { ...textStyling, ...styles.disabledText };
    }
    
    return textStyling;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={handlePress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : Colors.primary[500]} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[getTextStyles(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  // Variant Styles
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  secondaryButton: {
    backgroundColor: Colors.secondary[500],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  // Text Styles
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: Colors.primary[500],
  },
  ghostText: {
    color: Colors.primary[500],
  },
  // Size Styles
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
  },
  mediumButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 120,
  },
  largeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    minWidth: 160,
  },
  // Text Size Styles
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Disabled Styles
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.8,
  },
});