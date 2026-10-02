import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ label, variant = 'default', size = 'medium', style }) => {
  const variantStyles = {
    default: { bg: '#F1F5F9', text: '#475569', dot: '#94A3B8' },
    primary: { bg: '#EFF6FF', text: '#1D4ED8', dot: '#3B82F6' },
    success: { bg: '#ECFDF5', text: '#047857', dot: '#10B981' },
    warning: { bg: '#FFFBEB', text: '#B45309', dot: '#F59E0B' },
    danger: { bg: '#FEF2F2', text: '#B91C1C', dot: '#EF4444' },
    info: { bg: '#F5F3FF', text: '#6D28D9', dot: '#8B5CF6' },
  };

  const sizeStyles = {
    small: { paddingH: 8, paddingV: 3, fontSize: 10, dotSize: 4 },
    medium: { paddingH: 10, paddingV: 4, fontSize: 11, dotSize: 5 },
    large: { paddingH: 14, paddingV: 6, fontSize: 12, dotSize: 6 },
  };

  const colors = variantStyles[variant] || variantStyles.default;
  const sizing = sizeStyles[size] || sizeStyles.medium;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          paddingHorizontal: sizing.paddingH,
          paddingVertical: sizing.paddingV,
        },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: colors.dot, width: sizing.dotSize, height: sizing.dotSize }]} />
      <Text
        style={[
          styles.text,
          {
            color: colors.text,
            fontSize: sizing.fontSize,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    borderRadius: 99,
  },
  text: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});

export default Badge;
