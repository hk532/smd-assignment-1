import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import Icon from './Icon';
import Badge from './Badge';
import { calculateAttendancePercentage, calculateCourseMarks } from '../data/mockData';

const CourseCard = ({ course, onPress }) => {
  const attendancePercentage = calculateAttendancePercentage(
    course.attendedClasses,
    course.totalClasses
  );
  const marks = calculateCourseMarks(course);
  const isSafeAttendance = parseFloat(attendancePercentage) >= 75;

  return (
    <Card onPress={onPress} style={styles.card}>
      {/* Top row with Course Code pill & Credits Badge */}
      <View style={styles.topRow}>
        <View style={styles.codePill}>
          <View style={[styles.codeDot, { backgroundColor: course.color }]} />
          <Text style={styles.courseCode}>{course.id}</Text>
        </View>
        <Badge label={`${course.credits} Credits`} variant="primary" size="small" />
      </View>

      {/* Course Title & Instructor */}
      <Text style={styles.courseName} numberOfLines={2}>
        {course.name}
      </Text>
      <View style={styles.instructorRow}>
        <Icon name="user" size={13} color="#64748B" />
        <Text style={styles.instructor}>{course.instructor}</Text>
      </View>

      {/* Metrics Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Attendance</Text>
          <View style={styles.statValueContainer}>
            <Text style={[styles.statValue, { color: isSafeAttendance ? '#059669' : '#DC2626' }]}>
              {attendancePercentage}%
            </Text>
            <Text style={styles.statSubValue}>
              ({course.attendedClasses}/{course.totalClasses})
            </Text>
          </View>
          <View style={styles.miniProgressBar}>
            <View
              style={[
                styles.miniProgressFill,
                {
                  width: `${Math.min(100, parseFloat(attendancePercentage))}%`,
                  backgroundColor: isSafeAttendance ? '#10B981' : '#EF4444',
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current Marks</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>{marks.percentage}%</Text>
            <Text style={styles.statSubValue}>
              ({marks.obtained}/{marks.total})
            </Text>
          </View>
          <View style={styles.miniProgressBar}>
            <View
              style={[
                styles.miniProgressFill,
                {
                  width: `${Math.min(100, parseFloat(marks.percentage))}%`,
                  backgroundColor: '#3B82F6',
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Location and Timings Footer */}
      <View style={styles.footerRow}>
        <View style={styles.scheduleItem}>
          <Icon name="clock" size={12} color="#64748B" />
          <Text style={styles.scheduleText}>{course.schedule}</Text>
        </View>
        <View style={styles.scheduleItem}>
          <Icon name="pin" size={12} color="#64748B" />
          <Text style={styles.roomText}>{course.room}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  codeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  courseCode: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 14,
  },
  instructor: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  statSubValue: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  miniProgressBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  divider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 12,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scheduleText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  roomText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '700',
  },
});

export default CourseCard;
