import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import Header from '../components/Header';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import {
  studentInfo,
  courses,
  semesterGrades,
  announcements,
  getAcademicInsights,
  getPendingAssignments,
  calculateAttendancePercentage,
} from '../data/mockData';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const insights = getAcademicInsights();
  const pendingAssignments = getPendingAssignments();

  // Overall attendance calculations
  const totalClasses = courses.reduce((sum, course) => sum + course.totalClasses, 0);
  const attendedClasses = courses.reduce((sum, course) => sum + course.attendedClasses, 0);
  const overallAttendance = calculateAttendancePercentage(attendedClasses, totalClasses);

  // GPA Trend Chart Data
  const gpaData = {
    labels: semesterGrades.map(s => `S${s.semester}`),
    datasets: [{
      data: semesterGrades.map(s => s.gpa),
      color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
      strokeWidth: 3,
    }],
  };

  // Attendance Bar Chart Data
  const attendanceData = {
    labels: courses.map(c => c.id.split('-')[1]),
    datasets: [{
      data: courses.map(c => parseFloat(calculateAttendancePercentage(c.attendedClasses, c.totalClasses))),
    }],
  };

  // Course Credits Pie Chart Data
  const creditsData = courses.map((course) => ({
    name: course.id,
    credits: course.credits,
    color: course.color,
    legendFontColor: '#334155',
    legendFontSize: 12,
  }));

  // Progress Chart Data
  const progressData = {
    labels: ['Attd', 'CGPA', 'Degree'],
    data: [
      parseFloat(overallAttendance) / 100,
      studentInfo.cgpa / 4.0,
      studentInfo.totalCredits / 120,
    ],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(71, 85, 105, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#2563EB',
    },
    propsForBackgroundLines: {
      stroke: '#F1F5F9',
    },
  };

  const renderOverview = () => (
    <>
      {/* Eye-catching Student ID Hero Banner */}
      <TouchableOpacity
        style={styles.heroCard}
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.88}
      >
        <View style={styles.heroGlowEffect} />
        <View style={styles.heroContent}>
          <View style={styles.heroLeft}>
            <View style={styles.heroAvatarContainer}>
              <Text style={styles.heroAvatarInitials}>
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.heroInfo}>
              <View style={styles.heroNameRow}>
                <Text style={styles.heroName}>{studentInfo.name}</Text>
                <View style={styles.activeDot} />
              </View>
              <Text style={styles.heroRollNo}>{studentInfo.id} • Semester {studentInfo.semester}</Text>
              <Text style={styles.heroCampus}>{studentInfo.campusAddress}</Text>
            </View>
          </View>
          <View style={styles.profileBadgeBtn}>
            <Text style={styles.profileBadgeText}>Portal</Text>
            <Icon name="chevron-right" size={13} color="#2563EB" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Quick Action Navigation Grid */}
      <View style={styles.quickNavSection}>
        <TouchableOpacity
          style={styles.quickNavTile}
          onPress={() => navigation.navigate('Courses')}
          activeOpacity={0.8}
        >
          <View style={[styles.quickNavIcon, { backgroundColor: '#EFF6FF' }]}>
            <Icon name="book" size={18} color="#2563EB" />
          </View>
          <Text style={styles.quickNavTitle}>Courses</Text>
          <Text style={styles.quickNavSub}>{courses.length} Active</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickNavTile}
          onPress={() => navigation.navigate('Attendance')}
          activeOpacity={0.8}
        >
          <View style={[styles.quickNavIcon, { backgroundColor: '#ECFDF5' }]}>
            <Icon name="calendar" size={18} color="#059669" />
          </View>
          <Text style={styles.quickNavTitle}>Attendance</Text>
          <Text style={[styles.quickNavSub, { color: parseFloat(overallAttendance) >= 75 ? '#059669' : '#DC2626' }]}>
            {overallAttendance}%
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickNavTile}
          onPress={() => navigation.navigate('Grades')}
          activeOpacity={0.8}
        >
          <View style={[styles.quickNavIcon, { backgroundColor: '#FFFBEB' }]}>
            <Icon name="chart-bar" size={18} color="#D97706" />
          </View>
          <Text style={styles.quickNavTitle}>Grades</Text>
          <Text style={styles.quickNavSub}>{studentInfo.cgpa} CGPA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickNavTile}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.8}
        >
          <View style={[styles.quickNavIcon, { backgroundColor: '#F5F3FF' }]}>
            <Icon name="user" size={18} color="#7C3AED" />
          </View>
          <Text style={styles.quickNavTitle}>Account</Text>
          <Text style={styles.quickNavSub}>Profile & Fees</Text>
        </TouchableOpacity>
      </View>

      {/* Metric Cards Carousel */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <Text style={styles.sectionHint}>Live Metrics</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsScroll}
        >
          <StatCard
            icon="chart-bar"
            label="Cumulative CGPA"
            value={studentInfo.cgpa}
            subValue={`${studentInfo.totalCredits} Credits Passed`}
            color="#2563EB"
            trend={{ direction: 'up', value: '0.05' }}
            onPress={() => navigation.navigate('Grades')}
          />
          <StatCard
            icon="calendar"
            label="Aggregate Attendance"
            value={`${overallAttendance}%`}
            subValue={`${attendedClasses}/${totalClasses} Classes Present`}
            color={parseFloat(overallAttendance) >= 75 ? '#059669' : '#DC2626'}
            trend={{ direction: parseFloat(overallAttendance) >= 75 ? 'up' : 'down', value: '1.2%' }}
            onPress={() => navigation.navigate('Attendance')}
          />
          <StatCard
            icon="book"
            label="Enrolled Subjects"
            value={courses.length}
            subValue={`Semester ${studentInfo.semester} Load`}
            color="#7C3AED"
            onPress={() => navigation.navigate('Courses')}
          />
          <StatCard
            icon="pencil"
            label="Pending Submissions"
            value={pendingAssignments.length}
            subValue="Tasks Due Soon"
            color="#D97706"
          />
        </ScrollView>
      </View>

      {/* Smart Alerts & Insights */}
      {insights.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Intelligence & Alerts</Text>
          {insights.map((insight, index) => {
            const isWarning = insight.type === 'warning';
            const isSuccess = insight.type === 'success';
            const themeColor = isWarning ? '#D97706' : isSuccess ? '#059669' : '#2563EB';
            const bgTint = isWarning ? '#FFFBEB' : isSuccess ? '#ECFDF5' : '#EFF6FF';

            return (
              <Card key={index} style={[styles.insightCard, { borderLeftColor: themeColor, borderLeftWidth: 4 }]}>
                <View style={styles.insightContent}>
                  <View style={[styles.insightIconWrapper, { backgroundColor: bgTint }]}>
                    <Icon name={insight.icon} size={18} color={themeColor} />
                  </View>
                  <View style={styles.insightTextContainer}>
                    <Text style={styles.insightMessage}>{insight.message}</Text>
                    <Text style={[styles.insightAction, { color: themeColor }]}>{insight.action} →</Text>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>
      )}

      {/* Pending Assignments */}
      {pendingAssignments.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Upcoming Deliverables</Text>
            <Badge label={`${pendingAssignments.length} Pending`} variant="warning" size="small" />
          </View>
          {pendingAssignments.slice(0, 3).map((assignment) => (
            <Card key={`${assignment.courseId}-${assignment.id}`} style={styles.assignmentCard}>
              <View style={[styles.assignmentColorBar, { backgroundColor: assignment.color }]} />
              <View style={styles.assignmentContent}>
                <Text style={styles.assignmentCourse}>{assignment.courseName}</Text>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <View style={styles.dateRow}>
                  <Icon name="clock" size={12} color="#D97706" />
                  <Text style={styles.assignmentDue}>Due Date: {assignment.dueDate}</Text>
                </View>
              </View>
              <View style={styles.assignmentMarksBadge}>
                <Text style={styles.assignmentMarksValue}>{assignment.marks}</Text>
                <Text style={styles.assignmentMarksLabel}>Marks</Text>
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Recent Campus Notices */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>University Bulletins</Text>
        {announcements.slice(0, 3).map((announcement) => (
          <Card key={announcement.id} style={styles.announcementCard}>
            <View style={styles.announcementHeader}>
              <Badge
                label={announcement.priority}
                variant={announcement.priority === 'high' ? 'danger' : 'primary'}
                size="small"
              />
              <View style={styles.dateRow}>
                <Icon name="calendar" size={11} color="#94A3B8" />
                <Text style={styles.announcementDate}>{announcement.date}</Text>
              </View>
            </View>
            <Text style={styles.announcementTitle}>{announcement.title}</Text>
            <Text style={styles.announcementMessage}>{announcement.message}</Text>
          </Card>
        ))}
      </View>
    </>
  );

  const renderAnalytics = () => (
    <>
      {/* GPA Trend Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CGPA Progress Arc</Text>
        <Card>
          <Text style={styles.chartTitle}>Historical Semester Performance</Text>
          <LineChart
            data={gpaData}
            width={screenWidth - 64}
            height={210}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={true}
            fromZero
            segments={4}
          />
          <View style={styles.chartInsight}>
            <Icon name="trending-up" size={16} color="#1D4ED8" />
            <Text style={styles.chartInsightText}>
              Cumulative GPA reflects continuous upward progression (+0.25)
            </Text>
          </View>
        </Card>
      </View>

      {/* Attendance Bar Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Attendance Audit</Text>
        <Card>
          <Text style={styles.chartTitle}>Percentage Attended vs 75% Threshold</Text>
          <BarChart
            data={attendanceData}
            width={screenWidth - 64}
            height={210}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(5, 150, 105, ${opacity})`,
            }}
            style={styles.chart}
            showValuesOnTopOfBars
            fromZero
            segments={5}
          />
          <View style={styles.chartLegend}>
            <View style={styles.chartLegendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#059669' }]} />
              <Text style={styles.legendText}>Compliant (≥75%)</Text>
            </View>
            <View style={styles.chartLegendItem}>
              <View style={[styles.legendColor, { backgroundColor: '#DC2626' }]} />
              <Text style={styles.legendText}>Deficient (&lt;75%)</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Progress Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Milestone Completion</Text>
        <Card>
          <Text style={styles.chartTitle}>Curriculum & Degree Status</Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 64}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1, index) => {
                const colors = ['#059669', '#2563EB', '#D97706'];
                return colors[index] || `rgba(37, 99, 235, ${opacity})`;
              },
            }}
            style={styles.chart}
            strokeWidth={12}
            radius={28}
            hideLegend={false}
          />
          <View style={styles.progressDetails}>
            <View style={styles.progressItem}>
              <View style={[styles.progressDot, { backgroundColor: '#059669' }]} />
              <Text style={styles.progressLabel}>Classroom Presence: {overallAttendance}%</Text>
            </View>
            <View style={styles.progressItem}>
              <View style={[styles.progressDot, { backgroundColor: '#2563EB' }]} />
              <Text style={styles.progressLabel}>CGPA Index: {studentInfo.cgpa} / 4.00</Text>
            </View>
            <View style={styles.progressItem}>
              <View style={[styles.progressDot, { backgroundColor: '#D97706' }]} />
              <Text style={styles.progressLabel}>
                Credits Completed: {studentInfo.totalCredits} of 120 ({((studentInfo.totalCredits / 120) * 100).toFixed(0)}%)
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Course Credits Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Load Ratio</Text>
        <Card>
          <Text style={styles.chartTitle}>Credit Distribution by Course</Text>
          <PieChart
            data={creditsData}
            width={screenWidth - 64}
            height={200}
            chartConfig={chartConfig}
            accessor="credits"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
            absolute
          />
          <View style={styles.creditsSummary}>
            <Text style={styles.creditsSummaryText}>
              Semester Academic Weight: {courses.reduce((sum, c) => sum + c.credits, 0)} Total Credits
            </Text>
          </View>
        </Card>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Header
        title="SmartFlex"
        subtitle={`FAST NUCES • Welcome, ${studentInfo.name.split(' ')[0]}`}
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileHeaderBtn}
            activeOpacity={0.8}
          >
            <View style={styles.profileBtnIconCircle}>
              <Icon name="user" size={14} color="#FFFFFF" />
            </View>
            <Text style={styles.profileHeaderBtnText}>Portal</Text>
          </TouchableOpacity>
        }
      />

      {/* Modern Segmented Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}>
            Executive Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'analytics' && styles.tabActive]}
          onPress={() => setSelectedTab('analytics')}
        >
          <Text style={[styles.tabText, selectedTab === 'analytics' && styles.tabTextActive]}>
            Visual Analytics
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563EB" />}
      >
        {selectedTab === 'overview' ? renderOverview() : renderAnalytics()}
        <View style={styles.footer}>
          <Text style={styles.footerText}>FAST National University of Computer & Emerging Sciences</Text>
          <Text style={styles.footerSubText}>SmartFlex Student Academic System • Version 2.0</Text>
        </View>
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
  profileHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  profileBtnIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeaderBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  heroGlowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#2563EB',
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  heroLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  heroAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1E3A8A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  heroAvatarInitials: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
  heroInfo: {
    flex: 1,
  },
  heroNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  heroRollNo: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 1,
  },
  heroCampus: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  profileBadgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  profileBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  quickNavSection: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  quickNavTile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEF2F6',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1.5,
  },
  quickNavIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickNavTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
  },
  quickNavSub: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#2563EB',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
  section: {
    marginTop: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginHorizontal: 16,
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  sectionHint: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  statsScroll: {
    paddingHorizontal: 10,
  },
  insightCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  insightTextContainer: {
    flex: 1,
  },
  insightMessage: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 3,
  },
  insightAction: {
    fontSize: 11,
    fontWeight: '700',
  },
  assignmentCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 12,
  },
  assignmentColorBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  assignmentContent: {
    flex: 1,
    paddingLeft: 8,
  },
  assignmentCourse: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  assignmentTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assignmentDue: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '600',
  },
  assignmentMarksBadge: {
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    minWidth: 44,
  },
  assignmentMarksValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
  },
  assignmentMarksLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  announcementCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  announcementDate: {
    fontSize: 11,
    color: '#94A3B8',
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  announcementMessage: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  chart: {
    marginVertical: 6,
    borderRadius: 16,
  },
  chartTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  chartInsight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
  },
  chartInsightText: {
    fontSize: 12,
    color: '#1D4ED8',
    fontWeight: '600',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 16,
  },
  chartLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  progressDetails: {
    marginTop: 12,
    gap: 8,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  creditsSummary: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    alignItems: 'center',
  },
  creditsSummaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  footerSubText: {
    fontSize: 10,
    color: '#94A3B8',
  },
});

export default DashboardScreen;
