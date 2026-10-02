import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// A lightweight icon system using styled View elements
// No emojis, no external icon libraries needed

const Icon = ({ name, size = 24, color = '#333333' }) => {
  const s = size;
  const half = s / 2;
  const third = s / 3;
  const quarter = s / 4;
  const sixth = s / 6;
  const strokeWidth = Math.max(2, s / 12);

  const icons = {
    'chart-bar': (
      <View style={{ width: s, height: s, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: s * 0.06 }}>
        <View style={{ width: s * 0.18, height: s * 0.4, backgroundColor: color, borderRadius: s * 0.04 }} />
        <View style={{ width: s * 0.18, height: s * 0.7, backgroundColor: color, borderRadius: s * 0.04 }} />
        <View style={{ width: s * 0.18, height: s * 0.55, backgroundColor: color, borderRadius: s * 0.04 }} />
        <View style={{ width: s * 0.18, height: s * 0.85, backgroundColor: color, borderRadius: s * 0.04 }} />
      </View>
    ),

    'calendar': (
      <View style={{ width: s, height: s }}>
        <View style={{ position: 'absolute', top: s * 0.15, left: s * 0.1, right: s * 0.1, bottom: s * 0.05, borderWidth: strokeWidth, borderColor: color, borderRadius: s * 0.1 }} />
        <View style={{ position: 'absolute', top: s * 0.15, left: s * 0.1, right: s * 0.1, height: s * 0.22, backgroundColor: color, borderTopLeftRadius: s * 0.1, borderTopRightRadius: s * 0.1 }} />
        <View style={{ position: 'absolute', top: s * 0.05, left: s * 0.28, width: strokeWidth, height: s * 0.18, backgroundColor: color, borderRadius: strokeWidth }} />
        <View style={{ position: 'absolute', top: s * 0.05, right: s * 0.28, width: strokeWidth, height: s * 0.18, backgroundColor: color, borderRadius: strokeWidth }} />
        <View style={{ position: 'absolute', top: s * 0.48, left: s * 0.22, width: s * 0.12, height: s * 0.12, backgroundColor: color, borderRadius: s * 0.02 }} />
        <View style={{ position: 'absolute', top: s * 0.48, left: s * 0.44, width: s * 0.12, height: s * 0.12, backgroundColor: color, borderRadius: s * 0.02 }} />
        <View style={{ position: 'absolute', top: s * 0.48, left: s * 0.66, width: s * 0.12, height: s * 0.12, backgroundColor: color, borderRadius: s * 0.02 }} />
        <View style={{ position: 'absolute', top: s * 0.68, left: s * 0.22, width: s * 0.12, height: s * 0.12, backgroundColor: color, borderRadius: s * 0.02 }} />
        <View style={{ position: 'absolute', top: s * 0.68, left: s * 0.44, width: s * 0.12, height: s * 0.12, backgroundColor: color, borderRadius: s * 0.02 }} />
      </View>
    ),

    'book': (
      <View style={{ width: s, height: s }}>
        <View style={{ position: 'absolute', top: s * 0.1, left: s * 0.12, right: s * 0.12, bottom: s * 0.1, borderWidth: strokeWidth, borderColor: color, borderRadius: s * 0.08 }} />
        <View style={{ position: 'absolute', top: s * 0.1, left: s * 0.5, width: strokeWidth, height: s * 0.8, backgroundColor: color }} />
        <View style={{ position: 'absolute', top: s * 0.25, left: s * 0.22, width: s * 0.2, height: strokeWidth, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ position: 'absolute', top: s * 0.38, left: s * 0.22, width: s * 0.15, height: strokeWidth, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ position: 'absolute', top: s * 0.25, right: s * 0.22, width: s * 0.2, height: strokeWidth, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ position: 'absolute', top: s * 0.38, right: s * 0.22, width: s * 0.15, height: strokeWidth, backgroundColor: color, borderRadius: 1 }} />
      </View>
    ),

    'pencil': (
      <View style={{ width: s, height: s }}>
        <View style={{
          position: 'absolute', top: s * 0.1, left: s * 0.55, width: s * 0.3, height: s * 0.55,
          backgroundColor: color, borderRadius: s * 0.05, transform: [{ rotate: '-45deg' }],
          opacity: 0.3,
        }} />
        <View style={{
          position: 'absolute', top: s * 0.12, left: s * 0.58, width: strokeWidth * 1.5, height: s * 0.5,
          backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-45deg' }],
        }} />
        <View style={{
          position: 'absolute', bottom: s * 0.18, left: s * 0.18, width: s * 0.08, height: s * 0.08,
          backgroundColor: color, borderRadius: s * 0.04,
        }} />
      </View>
    ),

    'user': (
      <View style={{ width: s, height: s, alignItems: 'center' }}>
        <View style={{ width: s * 0.35, height: s * 0.35, borderRadius: s * 0.175, backgroundColor: color, marginTop: s * 0.1 }} />
        <View style={{ width: s * 0.6, height: s * 0.3, backgroundColor: color, borderTopLeftRadius: s * 0.3, borderTopRightRadius: s * 0.3, marginTop: s * 0.08 }} />
      </View>
    ),

    'search': (
      <View style={{ width: s, height: s }}>
        <View style={{ position: 'absolute', top: s * 0.1, left: s * 0.1, width: s * 0.5, height: s * 0.5, borderRadius: s * 0.25, borderWidth: strokeWidth, borderColor: color }} />
        <View style={{
          position: 'absolute', bottom: s * 0.15, right: s * 0.15, width: strokeWidth, height: s * 0.28,
          backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-45deg' }],
        }} />
      </View>
    ),

    'clock': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.75, height: s * 0.75, borderRadius: s * 0.375, borderWidth: strokeWidth, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ position: 'absolute', width: strokeWidth, height: s * 0.22, backgroundColor: color, bottom: s * 0.375 - s * 0.22, borderRadius: strokeWidth }} />
          <View style={{ position: 'absolute', width: s * 0.18, height: strokeWidth, backgroundColor: color, left: s * 0.375, top: s * 0.375 - strokeWidth / 2, borderRadius: strokeWidth }} />
        </View>
      </View>
    ),

    'pin': (
      <View style={{ width: s, height: s, alignItems: 'center' }}>
        <View style={{ width: s * 0.5, height: s * 0.5, borderRadius: s * 0.25, borderWidth: strokeWidth, borderColor: color, marginTop: s * 0.08, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: s * 0.14, height: s * 0.14, borderRadius: s * 0.07, backgroundColor: color }} />
        </View>
        <View style={{ width: 0, height: 0, borderLeftWidth: s * 0.12, borderRightWidth: s * 0.12, borderTopWidth: s * 0.2, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: color, marginTop: -s * 0.02 }} />
      </View>
    ),

    'warning': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 0, height: 0, borderLeftWidth: s * 0.4, borderRightWidth: s * 0.4, borderBottomWidth: s * 0.7, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: color, opacity: 0.2 }} />
        <View style={{ position: 'absolute', width: strokeWidth * 1.3, height: s * 0.22, backgroundColor: color, borderRadius: strokeWidth, top: s * 0.3 }} />
        <View style={{ position: 'absolute', width: strokeWidth * 1.5, height: strokeWidth * 1.5, backgroundColor: color, borderRadius: strokeWidth, bottom: s * 0.18 }} />
      </View>
    ),

    'target': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.75, height: s * 0.75, borderRadius: s * 0.375, borderWidth: strokeWidth, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: s * 0.45, height: s * 0.45, borderRadius: s * 0.225, borderWidth: strokeWidth, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: s * 0.15, height: s * 0.15, borderRadius: s * 0.075, backgroundColor: color }} />
          </View>
        </View>
      </View>
    ),

    'trending-up': (
      <View style={{ width: s, height: s }}>
        <View style={{ position: 'absolute', bottom: s * 0.25, left: s * 0.1, width: s * 0.75, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-25deg' }] }} />
        <View style={{ position: 'absolute', top: s * 0.2, right: s * 0.1, width: strokeWidth, height: s * 0.25, backgroundColor: color, borderRadius: strokeWidth }} />
        <View style={{ position: 'absolute', top: s * 0.2, right: s * 0.1, width: s * 0.22, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth }} />
      </View>
    ),

    'arrow-left': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.55, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth }} />
        <View style={{ position: 'absolute', left: s * 0.18, width: s * 0.25, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '45deg' }], top: s * 0.35 }} />
        <View style={{ position: 'absolute', left: s * 0.18, width: s * 0.25, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-45deg' }], bottom: s * 0.35 }} />
      </View>
    ),

    'chevron-right': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.25, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-45deg' }], marginBottom: s * 0.05 }} />
        <View style={{ width: s * 0.25, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '45deg' }], marginTop: s * 0.05 }} />
      </View>
    ),

    'star': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          width: s * 0.65, height: s * 0.65, backgroundColor: color,
          transform: [{ rotate: '0deg' }],
        }}>
          {/* Simple filled circle as star approximation */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: color, borderRadius: s * 0.05 }} />
        </View>
        {/* Use text-based star for accuracy */}
        <Text style={{ position: 'absolute', fontSize: s * 0.85, color: color, lineHeight: s, textAlign: 'center' }}>★</Text>
      </View>
    ),

    'star-outline': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: s * 0.85, color: color, lineHeight: s, textAlign: 'center' }}>☆</Text>
      </View>
    ),

    'check': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.2, height: strokeWidth * 1.3, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '45deg' }], position: 'absolute', left: s * 0.2, bottom: s * 0.35 }} />
        <View style={{ width: s * 0.4, height: strokeWidth * 1.3, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-45deg' }], position: 'absolute', right: s * 0.18, bottom: s * 0.38 }} />
      </View>
    ),

    'check-circle': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.78, height: s * 0.78, borderRadius: s * 0.39, borderWidth: strokeWidth, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: s * 0.15, height: strokeWidth * 1.2, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '45deg' }], position: 'absolute', left: s * 0.18, bottom: s * 0.28 }} />
          <View style={{ width: s * 0.3, height: strokeWidth * 1.2, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-45deg' }], position: 'absolute', right: s * 0.14, bottom: s * 0.3 }} />
        </View>
      </View>
    ),

    'x-mark': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.5, height: strokeWidth * 1.3, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '45deg' }], position: 'absolute' }} />
        <View style={{ width: s * 0.5, height: strokeWidth * 1.3, backgroundColor: color, borderRadius: strokeWidth, transform: [{ rotate: '-45deg' }], position: 'absolute' }} />
      </View>
    ),

    'bell': (
      <View style={{ width: s, height: s, alignItems: 'center' }}>
        <View style={{ width: s * 0.5, height: s * 0.5, borderTopLeftRadius: s * 0.25, borderTopRightRadius: s * 0.25, backgroundColor: color, marginTop: s * 0.12, opacity: 0.85 }} />
        <View style={{ width: s * 0.65, height: s * 0.12, backgroundColor: color, borderRadius: s * 0.06, marginTop: 0 }} />
        <View style={{ width: s * 0.15, height: s * 0.1, backgroundColor: color, borderBottomLeftRadius: s * 0.075, borderBottomRightRadius: s * 0.075, marginTop: s * 0.02 }} />
      </View>
    ),

    'money': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.7, height: s * 0.5, borderRadius: s * 0.06, borderWidth: strokeWidth, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: s * 0.3, fontWeight: 'bold', color: color }}>₨</Text>
        </View>
      </View>
    ),

    'settings': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.3, height: s * 0.3, borderRadius: s * 0.15, borderWidth: strokeWidth, borderColor: color }} />
        <View style={{ position: 'absolute', top: s * 0.08, width: strokeWidth, height: s * 0.15, backgroundColor: color, borderRadius: strokeWidth }} />
        <View style={{ position: 'absolute', bottom: s * 0.08, width: strokeWidth, height: s * 0.15, backgroundColor: color, borderRadius: strokeWidth }} />
        <View style={{ position: 'absolute', left: s * 0.08, width: s * 0.15, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth }} />
        <View style={{ position: 'absolute', right: s * 0.08, width: s * 0.15, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth }} />
      </View>
    ),

    'filter': (
      <View style={{ width: s, height: s, alignItems: 'center' }}>
        <View style={{ width: s * 0.7, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, marginTop: s * 0.22 }} />
        <View style={{ width: s * 0.45, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, marginTop: s * 0.15 }} />
        <View style={{ width: s * 0.2, height: strokeWidth, backgroundColor: color, borderRadius: strokeWidth, marginTop: s * 0.15 }} />
      </View>
    ),

    'send': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          width: 0, height: 0,
          borderTopWidth: s * 0.25, borderBottomWidth: s * 0.25, borderLeftWidth: s * 0.5,
          borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: color,
          transform: [{ rotate: '0deg' }],
        }} />
      </View>
    ),

    'message': (
      <View style={{ width: s, height: s }}>
        <View style={{ position: 'absolute', top: s * 0.15, left: s * 0.1, right: s * 0.1, height: s * 0.5, borderWidth: strokeWidth, borderColor: color, borderRadius: s * 0.08 }} />
        <View style={{ position: 'absolute', top: s * 0.35, left: s * 0.25, width: s * 0.5, height: strokeWidth, backgroundColor: color, borderRadius: 1, opacity: 0.5 }} />
        <View style={{ position: 'absolute', top: s * 0.48, left: s * 0.25, width: s * 0.3, height: strokeWidth, backgroundColor: color, borderRadius: 1, opacity: 0.5 }} />
        <View style={{ position: 'absolute', bottom: s * 0.2, left: s * 0.2, width: s * 0.12, height: s * 0.12, backgroundColor: color, transform: [{ rotate: '45deg' }] }} />
      </View>
    ),

    'graduation': (
      <View style={{ width: s, height: s, alignItems: 'center' }}>
        <View style={{ width: s * 0.8, height: strokeWidth * 1.5, backgroundColor: color, marginTop: s * 0.25, borderRadius: strokeWidth }} />
        <View style={{ width: 0, height: 0, borderLeftWidth: s * 0.35, borderRightWidth: s * 0.35, borderBottomWidth: s * 0.15, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: color, marginTop: -strokeWidth * 1.5 }} />
        <View style={{ width: s * 0.4, height: s * 0.25, borderBottomLeftRadius: s * 0.05, borderBottomRightRadius: s * 0.05, borderLeftWidth: strokeWidth, borderRightWidth: strokeWidth, borderBottomWidth: strokeWidth, borderColor: color, marginTop: 0 }} />
      </View>
    ),

    'info': (
      <View style={{ width: s, height: s, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: s * 0.7, height: s * 0.7, borderRadius: s * 0.35, borderWidth: strokeWidth, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: strokeWidth * 1.3, height: strokeWidth * 1.3, borderRadius: strokeWidth, backgroundColor: color, position: 'absolute', top: s * 0.12 }} />
          <View style={{ width: strokeWidth * 1.3, height: s * 0.22, borderRadius: strokeWidth, backgroundColor: color, position: 'absolute', bottom: s * 0.12 }} />
        </View>
      </View>
    ),
  };

  return icons[name] || (
    <View style={{ width: s, height: s, borderRadius: s / 2, borderWidth: strokeWidth, borderColor: color, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: s * 0.4, color, fontWeight: 'bold' }}>?</Text>
    </View>
  );
};

export default Icon;
