import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Header from '../components/Header';
import Card from '../components/Card';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import {
  courses,
  calculateAttendancePercentage,
  getAttendanceStatus,
} from '../data/mockData';

const screenWidth = Dimensions.get('window').width;

const AttendanceScreen = ({ navigation }) => {
  const totalClasses = courses.reduce((sum, course) => sum + course.totalClasses, 0);
  const attendedClasses = courses.reduce((sum, course) => sum + course.attendedClasses, 0);
  const overallAttendance = calculateAttendancePercentage(attendedClasses, totalClasses);
  const attendanceStatus = getAttendanceStatus(parseFloat(overallAttendance));

  // Chart data
  const chartData = {
    labels: courses.map(c => c.id.split('-')[1]),
    datasets: [{
      data: courses.map(c =>
        parseFloat(calculateAttendancePercentage(c.attendedClasses, c.totalClasses))
      ),
    }],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    style: { borderRadius: 16 },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: '#ECEFF1',
      strokeDasharray: '0',
    },
  };

  // Calculate classes needed for 75% attendance for each course
  const calculateClassesNeeded = (attended, total) => {
    const current = (attended / total) * 100;
    if (current >= 75) return 0;
    const needed = Math.ceil((0.75 * total - attended) / 0.25);
    return needed > 0 ? needed : 0;
  };

  return (
    <View style={styles.container}>
      <Header
        title="Attendance Tracker"
        subtitle="Monitor eligibility & class presence"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Overall Attendance */}
        <Card style={styles.overallCard}>
          <Text style={styles.overallLabel}>Aggregate University Attendance</Text>
          <View style={styles.overallContent}>
            <View style={styles.percentageContainer}>
              <Text style={[styles.percentageValue, { color: attendanceStatus.color }]}>
                {overallAttendance}%
              </Text>
              <Badge
                label={attendanceStatus.status}
                variant={parseFloat(overallAttendance) >= 75 ? 'success' : 'danger'}
                size="medium"
              />
            </View>
            <View style={styles.overallStats}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Present Classes:</Text>
                <Text style={styles.statValue}>{attendedClasses}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Total Conducted:</Text>
                <Text style={styles.statValue}>{totalClasses}</Text>
              </View>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Missed / Absent:</Text>
                <Text style={[styles.statValue, { color: '#F44336' }]}>
                  {totalClasses - attendedClasses}
                </Text>
              </View>
            </View>
          </View>
        </Card>

        {/* Attendance Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course-Wise Attendance Graph</Text>
          <Card>
            <BarChart
              data={chartData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              showValuesOnTopOfBars
              fromZero
              segments={5}
              yAxisSuffix="%"
            />
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={styles.legendText}>≥75% (Safe)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#FF9800' }]} />
                <Text style={styles.legendText}>65-74% (Warning)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
                <Text style={styles.legendText}>&lt;65% (Critical)</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Course Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course-by-Course Attendance Status</Text>
          {courses.map((course) => {
            const percentage = calculateAttendancePercentage(
              course.attendedClasses,
              course.totalClasses
            );
            const status = getAttendanceStatus(parseFloat(percentage));
            const classesNeeded = calculateClassesNeeded(
              course.attendedClasses,
              course.totalClasses
            );

            return (
              <Card
                key={course.id}
                style={styles.courseCard}
                onPress={() => navigation.navigate('CourseDetail', { course })}
              >
                <View style={[styles.courseColorBar, { backgroundColor: course.color }]} />
                
                <View style={styles.courseHeader}>
                  <View style={styles.courseTitleContainer}>
                    <Text style={styles.courseCode}>{course.id}</Text>
                    <Text style={styles.courseName}>{course.name}</Text>
                  </View>
                  <View style={styles.coursePercentageContainer}>
                    <Text style={[styles.coursePercentage, { color: status.color }]}>
                      {percentage}%
                    </Text>
                  </View>
                </View>

                <View style={styles.courseStats}>
                  <View style={styles.courseStatItem}>
                    <Text style={styles.courseStatLabel}>Attended</Text>
                    <Text style={styles.courseStatValue}>{course.attendedClasses}</Text>
                  </View>
                  <View style={styles.courseStatDivider} />
                  <View style={styles.courseStatItem}>
                    <Text style={styles.courseStatLabel}>Missed</Text>
                    <Text style={[styles.courseStatValue, { color: '#F44336' }]}>
                      {course.totalClasses - course.attendedClasses}
                    </Text>
                  </View>
                  <View style={styles.courseStatDivider} />
                  <View style={styles.courseStatItem}>
                    <Text style={styles.courseStatLabel}>Total Classes</Text>
                    <Text style={styles.courseStatValue}>{course.totalClasses}</Text>
                  </View>
                </View>

                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${percentage}%`,
                          backgroundColor: status.color,
                        },
                      ]}
                    />
                  </View>
                </View>

                {classesNeeded > 0 ? (
                  <View style={styles.warningContainer}>
                    <Icon name="warning" size={16} color="#E65100" />
                    <Text style={styles.warningText}>
                      Attend next <Text style={styles.warningBold}>{classesNeeded}</Text> classes consecutively to reach 75% threshold
                    </Text>
                  </View>
                ) : (
                  <View style={styles.successContainer}>
                    <Icon name="check" size={16} color="#2E7D32" />
                    <Text style={styles.successText}>
                      Attendance requirement satisfied. You are eligible for examinations.
                    </Text>
                  </View>
                )}
              </Card>
            );
          })}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  overallCard: {
    margin: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  overallLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 14,
  },
  overallContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageContainer: {
    alignItems: 'center',
    marginRight: 20,
    gap: 6,
  },
  percentageValue: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  overallStats: {
    flex: 1,
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statLabel: {
    fontSize: 13,
    color: '#666666',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 14,
    gap: 14,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  courseCard: {
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  courseColorBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingLeft: 8,
  },
  courseTitleContainer: {
    flex: 1,
  },
  courseCode: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '700',
    marginBottom: 2,
  },
  courseName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },
  coursePercentageContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  coursePercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseStats: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginLeft: 8,
  },
  courseStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  courseStatLabel: {
    fontSize: 11,
    color: '#777777',
    marginBottom: 3,
  },
  courseStatValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },
  courseStatDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  progressBarContainer: {
    marginBottom: 10,
    marginLeft: 8,
  },
  progressBar: {
    height: 7,
    backgroundColor: '#F0F2F5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    gap: 8,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#E65100',
    lineHeight: 16,
  },
  warningBold: {
    fontWeight: 'bold',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
    gap: 8,
  },
  successText: {
    flex: 1,
    fontSize: 12,
    color: '#2E7D32',
    lineHeight: 16,
  },
  bottomPadding: {
    height: 24,
  },
});

export default AttendanceScreen;
