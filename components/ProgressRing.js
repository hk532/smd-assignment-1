import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// A circular progress indicator built with View elements
// Shows a percentage value inside a styled circle with a progress border effect

const ProgressRing = ({
  progress = 0, // 0 to 100
  size = 80,
  strokeWidth = 6,
  color = '#4A90E2',
  bgColor = '#F0F0F0',
  label = '',
  valueText = '',
  showPercentage = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background circle */}
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: bgColor,
          },
        ]}
      />

      {/* Progress overlay — using quadrant approach */}
      {/* Top half mask */}
      {clampedProgress > 0 && (
        <View
          style={[
            styles.progressRing,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              borderLeftColor: clampedProgress < 50 ? bgColor : color,
              borderBottomColor: clampedProgress < 25 ? bgColor : clampedProgress < 75 ? color : color,
              borderRightColor: clampedProgress < 75 ? bgColor : color,
              borderTopColor: color,
              transform: [{ rotate: `${-90 + (clampedProgress * 3.6)}deg` }],
              opacity: 0.35,
            },
          ]}
        />
      )}

      {/* Solid accent border on left side proportional to progress */}
      <View
        style={[
          styles.accentRing,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: 'transparent',
            borderLeftColor: color,
            borderBottomColor: clampedProgress >= 50 ? color : 'transparent',
            borderRightColor: clampedProgress >= 75 ? color : 'transparent',
            borderTopColor: clampedProgress >= 100 ? color : 'transparent',
            transform: [{ rotate: '-90deg' }],
          },
        ]}
      />

      {/* Center content */}
      <View style={styles.centerContent}>
        <Text
          style={[
            styles.valueText,
            {
              fontSize: size * 0.22,
              color: color,
            },
          ]}
        >
          {valueText || (showPercentage ? `${Math.round(clampedProgress)}%` : '')}
        </Text>
        {label ? (
          <Text
            style={[
              styles.labelText,
              { fontSize: size * 0.11 },
            ]}
          >
            {label}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
  },
  progressRing: {
    position: 'absolute',
  },
  accentRing: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: {
    fontWeight: 'bold',
  },
  labelText: {
    color: '#999999',
    marginTop: 2,
  },
});

export default ProgressRing;
