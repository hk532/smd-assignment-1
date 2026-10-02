import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from './Icon';

const Header = ({ title, subtitle, rightComponent, onBackPress }) => {
  return (
    <View style={styles.header}>
      {/* Decorative ambient background accents */}
      <View style={styles.circleAccent1} />
      <View style={styles.circleAccent2} />

      <View style={styles.headerContent}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton} activeOpacity={0.75}>
            <Icon name="arrow-left" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent && <View style={styles.rightContainer}>{rightComponent}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1E3A8A', // Deep university navy
    paddingTop: Platform.OS === 'ios' ? 54 : 48,
    paddingBottom: 22,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
  },
  circleAccent1: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    top: -40,
    right: -20,
  },
  circleAccent2: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
    bottom: -30,
    left: 40,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  backButton: {
    marginRight: 12,
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#93C5FD',
    fontWeight: '500',
    marginTop: 2,
  },
  rightContainer: {
    marginLeft: 12,
    zIndex: 2,
  },
});

export default Header;
