import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import { calculateAttendancePercentage, calculateCourseMarks } from '../data/mockData';

const CourseDetailScreen = ({ route, navigation }) => {
  const { course } = route.params;
  const [selectedTab, setSelectedTab] = useState('overview');

  const attendancePercentage = calculateAttendancePercentage(
    course.attendedClasses,
    course.totalClasses
  );
  const marks = calculateCourseMarks(course);

  const renderOverview = () => (
    <>
      {/* Course Info */}
      <Card style={styles.card}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Course Code</Text>
          <Text style={styles.infoValue}>{course.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Instructor</Text>
          <Text style={styles.infoValue}>{course.instructor}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Credit Hours</Text>
          <Text style={styles.infoValue}>{course.credits} Cr</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Schedule</Text>
          <View style={styles.inlineInfo}>
            <Icon name="clock" size={13} color="#4A90E2" />
            <Text style={styles.infoValue}>{course.schedule}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Room / Lab</Text>
          <View style={styles.inlineInfo}>
            <Icon name="pin" size={13} color="#4A90E2" />
            <Text style={styles.infoValue}>{course.room}</Text>
          </View>
        </View>
      </Card>

      {/* Attendance Overview */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Attendance Summary</Text>
        <View style={styles.attendanceContainer}>
          <View style={styles.attendanceCircle}>
            <Text style={[
              styles.attendancePercentage,
              { color: parseFloat(attendancePercentage) >= 75 ? '#4CAF50' : '#F44336' }
            ]}>
              {attendancePercentage}%
            </Text>
            <Text style={styles.attendanceLabel}>Attendance</Text>
          </View>
          <View style={styles.attendanceDetails}>
            <View style={styles.attendanceDetailRow}>
              <Text style={styles.attendanceDetailLabel}>Attended Classes:</Text>
              <Text style={styles.attendanceDetailValue}>{course.attendedClasses}</Text>
            </View>
            <View style={styles.attendanceDetailRow}>
              <Text style={styles.attendanceDetailLabel}>Total Classes:</Text>
              <Text style={styles.attendanceDetailValue}>{course.totalClasses}</Text>
            </View>
            <View style={styles.attendanceDetailRow}>
              <Text style={styles.attendanceDetailLabel}>Standing:</Text>
              <Badge
                label={parseFloat(attendancePercentage) >= 75 ? 'Safe' : 'Warning'}
                variant={parseFloat(attendancePercentage) >= 75 ? 'success' : 'danger'}
                size="small"
              />
            </View>
          </View>
        </View>
      </Card>

      {/* Marks Overview */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Score Overview</Text>
        <View style={styles.marksOverview}>
          <View style={styles.marksCircle}>
            <Text style={styles.marksPercentage}>{marks.percentage}%</Text>
            <Text style={styles.marksLabel}>Total Scored</Text>
          </View>
          <View style={styles.marksBreakdown}>
            <Text style={styles.marksBreakdownText}>
              Obtained Marks: <Text style={styles.marksValue}>{marks.obtained}</Text>
            </Text>
            <Text style={styles.marksBreakdownText}>
              Total Possible: <Text style={styles.marksValue}>{marks.total}</Text>
            </Text>
          </View>
        </View>
      </Card>
    </>
  );

  const renderAssignments = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Course Assignments</Text>
        <Badge label={`${course.assignments.length} Tasks`} variant="primary" size="small" />
      </View>
      {course.assignments.map((assignment) => (
        <Card key={assignment.id} style={styles.card}>
          <View style={styles.assignmentHeader}>
            <View style={styles.assignmentTitleContainer}>
              <Text style={styles.assignmentTitle}>{assignment.title}</Text>
              <View style={styles.inlineInfo}>
                <Icon name="clock" size={12} color="#888888" />
                <Text style={styles.assignmentDue}>Due: {assignment.dueDate}</Text>
              </View>
            </View>
            <Badge
              label={assignment.submitted ? 'Submitted' : 'Pending'}
              variant={assignment.submitted ? 'success' : 'warning'}
              size="small"
            />
          </View>
          <View style={styles.assignmentMarks}>
            {assignment.submitted && assignment.obtained !== null ? (
              <Text style={styles.assignmentScore}>
                Obtained: <Text style={styles.assignmentScoreValue}>
                  {assignment.obtained} / {assignment.marks}
                </Text>
                {' '}({((assignment.obtained / assignment.marks) * 100).toFixed(0)}%)
              </Text>
            ) : (
              <Text style={styles.assignmentScore}>
                Weightage: <Text style={styles.assignmentScoreValue}>{assignment.marks} Marks</Text>
              </Text>
            )}
          </View>
        </Card>
      ))}
    </>
  );

  const renderQuizzes = () => (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quizzes</Text>
        <Badge label={`${course.quizzes.length} Quizzes`} variant="primary" size="small" />
      </View>
      {course.quizzes.map((quiz) => (
        <Card key={quiz.id} style={styles.card}>
          <View style={styles.quizHeader}>
            <Text style={styles.quizTitle}>{quiz.title}</Text>
            <View style={styles.quizScore}>
              <Text style={styles.quizScoreValue}>
                {quiz.obtained} / {quiz.marks}
              </Text>
            </View>
          </View>
          <View style={styles.quizPercentage}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(quiz.obtained / quiz.marks) * 100}%`,
                    backgroundColor: quiz.obtained / quiz.marks >= 0.7 ? '#4CAF50' : '#FF9800',
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {((quiz.obtained / quiz.marks) * 100).toFixed(0)}%
            </Text>
          </View>
        </Card>
      ))}

      {/* Exams */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Examinations</Text>
      </View>
      
      <Card style={styles.card}>
        <View style={styles.examHeader}>
          <Text style={styles.examTitle}>Midterm Examination</Text>
          {course.midterm.obtained !== null ? (
            <View style={styles.examScore}>
              <Text style={styles.examScoreValue}>
                {course.midterm.obtained} / {course.midterm.marks}
              </Text>
            </View>
          ) : (
            <Badge label="Pending" variant="warning" size="small" />
          )}
        </View>
        {course.midterm.obtained !== null && (
          <View style={styles.quizPercentage}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${(course.midterm.obtained / course.midterm.marks) * 100}%`,
                    backgroundColor: '#4A90E2',
                  }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {((course.midterm.obtained / course.midterm.marks) * 100).toFixed(0)}%
            </Text>
          </View>
        )}
      </Card>

      <Card style={styles.card}>
        <View style={styles.examHeader}>
          <Text style={styles.examTitle}>Final Examination</Text>
          {course.finalExam.obtained !== null ? (
            <View style={styles.examScore}>
              <Text style={styles.examScoreValue}>
                {course.finalExam.obtained} / {course.finalExam.marks}
              </Text>
            </View>
          ) : (
            <Badge label="Upcoming" variant="default" size="small" />
          )}
        </View>
        <Text style={styles.examNote}>Total Weightage: {course.finalExam.marks} Marks</Text>
      </Card>
    </>
  );

  return (
    <View style={styles.container}>
      <Header
        title={course.name}
        subtitle={`${course.id} • ${course.instructor}`}
        onBackPress={() => navigation.goBack()}
      />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'assignments' && styles.tabActive]}
          onPress={() => setSelectedTab('assignments')}
        >
          <Text style={[styles.tabText, selectedTab === 'assignments' && styles.tabTextActive]}>
            Assignments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'grades' && styles.tabActive]}
          onPress={() => setSelectedTab('grades')}
        >
          <Text style={[styles.tabText, selectedTab === 'grades' && styles.tabTextActive]}>
            Quizzes & Exams
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {selectedTab === 'overview' && renderOverview()}
          {selectedTab === 'assignments' && renderAssignments()}
          {selectedTab === 'grades' && renderQuizzes()}
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
  content: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginRight: 6,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  tabTextActive: {
    color: '#4A90E2',
  },
  card: {
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  inlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#666666',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#222222',
  },
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  attendancePercentage: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  attendanceLabel: {
    fontSize: 10,
    color: '#777777',
    marginTop: 2,
    fontWeight: '500',
  },
  attendanceDetails: {
    flex: 1,
    gap: 8,
  },
  attendanceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceDetailLabel: {
    fontSize: 13,
    color: '#666666',
  },
  attendanceDetailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222222',
  },
  marksOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marksCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EEF4FC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    borderWidth: 2,
    borderColor: '#CBE0FB',
  },
  marksPercentage: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  marksLabel: {
    fontSize: 10,
    color: '#4A90E2',
    marginTop: 2,
    fontWeight: '600',
  },
  marksBreakdown: {
    flex: 1,
    gap: 8,
  },
  marksBreakdownText: {
    fontSize: 13,
    color: '#666666',
  },
  marksValue: {
    fontWeight: 'bold',
    color: '#222222',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  assignmentTitleContainer: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 4,
  },
  assignmentDue: {
    fontSize: 12,
    color: '#777777',
  },
  assignmentMarks: {
    marginTop: 6,
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 6,
  },
  assignmentScore: {
    fontSize: 12,
    color: '#666666',
  },
  assignmentScoreValue: {
    fontWeight: 'bold',
    color: '#222222',
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  quizTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
  quizScore: {
    backgroundColor: '#EEF4FC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quizScoreValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  quizPercentage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#EEF0F4',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666666',
    minWidth: 40,
    textAlign: 'right',
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  examTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
  examScore: {
    backgroundColor: '#EEF4FC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  examScoreValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  examNote: {
    fontSize: 12,
    color: '#777777',
  },
  bottomPadding: {
    height: 24,
  },
});

export default CourseDetailScreen;
