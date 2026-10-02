import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';

const Card = ({ children, style, onPress, elevated = true, activeOpacity = 0.75 }) => {
  const Component = onPress ? TouchableOpacity : View;
  
  return (
    <Component
      style={[
        styles.card,
        elevated && styles.elevated,
        style
      ]}
      onPress={onPress}
      activeOpacity={onPress ? activeOpacity : 1}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  elevated: {
    ...Platform.select({
      ios: {
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
      android: {
        elevation: 2.5,
      },
      default: {
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
      },
    }),
  },
});

export default Card;
