import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import { courses } from '../data/mockData';

const CoursesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, attendance, marks

  // Filter courses based on search
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'attendance') {
      const attA = (a.attendedClasses / a.totalClasses) * 100;
      const attB = (b.attendedClasses / b.totalClasses) * 100;
      return attB - attA;
    } else if (sortBy === 'marks') {
      return b.credits - a.credits;
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <Header
        title="Enrolled Courses"
        subtitle={`${courses.length} registered courses • Fall 2026`}
        onBackPress={() => navigation.goBack()}
      />

      {/* Modern Search Field */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={16} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by code, subject name, or teacher..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
              <Icon name="x-mark" size={14} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Sort Pills Row */}
      <View style={styles.sortContainer}>
        <View style={styles.sortLabelContainer}>
          <Icon name="filter" size={14} color="#475569" />
          <Text style={styles.sortLabel}>Order:</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortPillsList}>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'name' && styles.sortButtonActive]}
            onPress={() => setSortBy('name')}
            activeOpacity={0.8}
          >
            <Text style={[styles.sortButtonText, sortBy === 'name' && styles.sortButtonTextActive]}>
              Alphabetical (A-Z)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'attendance' && styles.sortButtonActive]}
            onPress={() => setSortBy('attendance')}
            activeOpacity={0.8}
          >
            <Text style={[styles.sortButtonText, sortBy === 'attendance' && styles.sortButtonTextActive]}>
              Attendance %
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortButton, sortBy === 'marks' && styles.sortButtonActive]}
            onPress={() => setSortBy('marks')}
            activeOpacity={0.8}
          >
            <Text style={[styles.sortButtonText, sortBy === 'marks' && styles.sortButtonTextActive]}>
              Credit Hours
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Result Status Bar */}
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          Displaying {sortedCourses.length} of {courses.length} enrolled subjects
        </Text>
        {searchQuery !== '' && (
          <Badge label="Filtered" variant="primary" size="small" />
        )}
      </View>

      {/* Courses Feed */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {sortedCourses.length > 0 ? (
          sortedCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => navigation.navigate('CourseDetail', { course })}
            />
          ))
        ) : (
          <EmptyState
            icon="search"
            title="No Matching Courses"
            message={`No enrolled classes matched "${searchQuery}". Please check the keyword or reset your filter.`}
            actionTitle="Reset Search Filter"
            onAction={() => setSearchQuery('')}
          />
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 8,
    fontSize: 13,
    color: '#0F172A',
  },
  clearBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  sortLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 8,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  sortPillsList: {
    gap: 6,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sortButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  sortButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  sortButtonTextActive: {
    color: '#FFFFFF',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  statusText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  bottomPadding: {
    height: 24,
  },
});

export default CoursesScreen;
