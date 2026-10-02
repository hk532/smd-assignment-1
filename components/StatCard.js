import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import Icon from './Icon';

const StatCard = ({ icon, label, value, subValue, color = '#2563EB', trend, onPress }) => {
  return (
    <Card onPress={onPress} style={[styles.card, { borderTopColor: color, borderTopWidth: 3 }]}>
      <View style={styles.topRow}>
        <View style={[styles.iconContainer, { backgroundColor: color + '15' }]}>
          <Icon name={icon} size={20} color={color} />
        </View>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend.direction === 'up' ? '#ECFDF5' : '#FEF2F2' }]}>
            <Icon
              name="trending-up"
              size={11}
              color={trend.direction === 'up' ? '#047857' : '#B91C1C'}
            />
            <Text style={[styles.trendText, { color: trend.direction === 'up' ? '#047857' : '#B91C1C' }]}>
              {trend.value}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {subValue && <Text style={styles.subValue}>{subValue}</Text>}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 14,
    marginHorizontal: 6,
    minWidth: 155,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 2,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 3,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subValue: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '500',
  },
});

export default StatCard;
