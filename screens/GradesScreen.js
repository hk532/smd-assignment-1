import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Header from '../components/Header';
import Card from '../components/Card';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import {
  studentInfo,
  courses,
  semesterGrades,
  calculateCourseMarks,
} from '../data/mockData';

const screenWidth = Dimensions.get('window').width;

const GradesScreen = ({ navigation }) => {
  // GPA Chart Data
  const gpaData = {
    labels: semesterGrades.map(s => `S${s.semester}`),
    datasets: [{
      data: semesterGrades.map(s => s.gpa),
      color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
      strokeWidth: 3,
    }],
  };

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#4A90E2',
    },
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 85) return '#4CAF50';
    if (percentage >= 70) return '#8BC34A';
    if (percentage >= 60) return '#FF9800';
    if (percentage >= 50) return '#FF5722';
    return '#F44336';
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'B-';
    if (percentage >= 60) return 'C+';
    if (percentage >= 55) return 'C';
    if (percentage >= 50) return 'C-';
    return 'F';
  };

  return (
    <View style={styles.container}>
      <Header
        title="Grades & Transcript"
        subtitle="Academic performance record"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* CGPA Summary */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View style={styles.cgpaContainer}>
              <Text style={styles.cgpaLabel}>Cumulative CGPA</Text>
              <Text style={styles.cgpaValue}>{studentInfo.cgpa}</Text>
              <Text style={styles.cgpaMax}>Scale of 4.00</Text>
            </View>
            <View style={styles.summaryStats}>
              <View style={styles.summaryStatItem}>
                <Text style={styles.summaryStatLabel}>Current Semester:</Text>
                <Text style={styles.summaryStatValue}>Semester {studentInfo.semester}</Text>
              </View>
              <View style={styles.summaryStatItem}>
                <Text style={styles.summaryStatLabel}>Credits Completed:</Text>
                <Text style={styles.summaryStatValue}>{studentInfo.totalCredits} Cr</Text>
              </View>
              <View style={styles.summaryStatItem}>
                <Text style={styles.summaryStatLabel}>Degree Remaining:</Text>
                <Text style={styles.summaryStatValue}>{120 - studentInfo.totalCredits} Cr</Text>
              </View>
            </View>
          </View>
        </Card>

        {/* GPA Trend */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CGPA History & Trend</Text>
          <Card>
            <LineChart
              data={gpaData}
              width={screenWidth - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withInnerLines={false}
              withOuterLines={true}
              fromZero
              segments={4}
            />
            <View style={styles.trendInsight}>
              <Icon name="trending-up" size={18} color="#1976D2" />
              <Text style={styles.trendText}>
                Your CGPA improved by{' '}
                <Text style={styles.trendValue}>
                  +{(studentInfo.cgpa - semesterGrades[0].gpa).toFixed(2)}
                </Text>{' '}
                points since Semester 1
              </Text>
            </View>
          </Card>
        </View>

        {/* Current Semester Grades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enrolled Courses Breakdown</Text>
          {courses.map((course) => {
            const marks = calculateCourseMarks(course);
            const percentage = parseFloat(marks.percentage);
            const grade = getLetterGrade(percentage);
            const color = getGradeColor(percentage);

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
                    <Text style={styles.courseCredits}>{course.credits} Credit Hours</Text>
                  </View>
                  <View style={[styles.gradeContainer, { backgroundColor: color + '15' }]}>
                    <Text style={[styles.gradeValue, { color }]}>{grade}</Text>
                    <Text style={[styles.percentageValue, { color }]}>{percentage}%</Text>
                  </View>
                </View>

                <View style={styles.marksBreakdown}>
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Obtained</Text>
                    <Text style={styles.breakdownValue}>{marks.obtained}</Text>
                  </View>
                  <View style={styles.breakdownDivider} />
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Total</Text>
                    <Text style={styles.breakdownValue}>{marks.total}</Text>
                  </View>
                  <View style={styles.breakdownDivider} />
                  <View style={styles.breakdownItem}>
                    <Text style={styles.breakdownLabel}>Score</Text>
                    <Text style={[styles.breakdownValue, { color }]}>
                      {percentage}%
                    </Text>
                  </View>
                </View>

                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${percentage}%`, backgroundColor: color },
                      ]}
                    />
                  </View>
                </View>

                {/* Component breakdown */}
                <View style={styles.componentsContainer}>
                  <Text style={styles.componentsTitle}>Evaluation Breakdown</Text>
                  <View style={styles.componentsList}>
                    <View style={styles.componentRow}>
                      <Text style={styles.componentLabel}>Assignments:</Text>
                      <Text style={styles.componentValue}>
                        {course.assignments.reduce((sum, a) => sum + (a.obtained || 0), 0)} / {course.assignments.reduce((sum, a) => sum + a.marks, 0)}
                      </Text>
                    </View>
                    <View style={styles.componentRow}>
                      <Text style={styles.componentLabel}>Quizzes:</Text>
                      <Text style={styles.componentValue}>
                        {course.quizzes.reduce((sum, q) => sum + (q.obtained || 0), 0)} / {course.quizzes.reduce((sum, q) => sum + q.marks, 0)}
                      </Text>
                    </View>
                    <View style={styles.componentRow}>
                      <Text style={styles.componentLabel}>Midterm Exam:</Text>
                      <Text style={styles.componentValue}>
                        {course.midterm.obtained !== null ? `${course.midterm.obtained} / ${course.midterm.marks}` : 'Pending'}
                      </Text>
                    </View>
                    <View style={styles.componentRow}>
                      <Text style={styles.componentLabel}>Final Exam:</Text>
                      <Text style={styles.componentValue}>
                        {course.finalExam.obtained !== null ? `${course.finalExam.obtained} / ${course.finalExam.marks}` : `Upcoming (${course.finalExam.marks} Marks)`}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
            );
          })}
        </View>

        {/* Semester-wise Transcript */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Semester Transcript History</Text>
          {semesterGrades.map((semester) => (
            <Card key={semester.semester} style={styles.semesterCard}>
              <View style={styles.semesterHeader}>
                <View style={styles.semesterTitleContainer}>
                  <Text style={styles.semesterTitle}>Semester {semester.semester}</Text>
                  {semester.current && (
                    <Badge label="In Progress" variant="primary" size="small" />
                  )}
                </View>
                <View style={styles.semesterGpaContainer}>
                  <Text style={styles.semesterGpa}>{semester.gpa.toFixed(2)}</Text>
                  <Text style={styles.semesterGpaLabel}>GPA</Text>
                </View>
              </View>
              <View style={styles.semesterStats}>
                <View style={styles.semesterStatItem}>
                  <Text style={styles.semesterStatLabel}>Attempted Credits</Text>
                  <Text style={styles.semesterStatValue}>{semester.credits} Cr</Text>
                </View>
                <View style={styles.semesterStatDivider} />
                <View style={styles.semesterStatItem}>
                  <Text style={styles.semesterStatLabel}>Earned Quality Points</Text>
                  <Text style={styles.semesterStatValue}>
                    {(semester.gpa * semester.credits).toFixed(2)}
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Grade Distribution Info */}
        <Card style={styles.infoCard}>
          <View style={styles.infoTitleRow}>
            <Icon name="info" size={16} color="#4A90E2" />
            <Text style={styles.infoTitle}>Grading Scale Legend</Text>
          </View>
          <View style={styles.gradeScale}>
            <View style={styles.gradeScaleItem}>
              <View style={[styles.gradeScaleDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.gradeScaleText}>Grade A (85% – 100%)</Text>
            </View>
            <View style={styles.gradeScaleItem}>
              <View style={[styles.gradeScaleDot, { backgroundColor: '#8BC34A' }]} />
              <Text style={styles.gradeScaleText}>Grade B (70% – 84%)</Text>
            </View>
            <View style={styles.gradeScaleItem}>
              <View style={[styles.gradeScaleDot, { backgroundColor: '#FF9800' }]} />
              <Text style={styles.gradeScaleText}>Grade C (50% – 69%)</Text>
            </View>
            <View style={styles.gradeScaleItem}>
              <View style={[styles.gradeScaleDot, { backgroundColor: '#F44336' }]} />
              <Text style={styles.gradeScaleText}>Grade F (&lt; 50%)</Text>
            </View>
          </View>
        </Card>

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
  summaryCard: {
    margin: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cgpaContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  cgpaLabel: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '600',
    marginBottom: 4,
  },
  cgpaValue: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  cgpaMax: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  summaryStats: {
    flex: 1,
    gap: 8,
  },
  summaryStatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryStatLabel: {
    fontSize: 12,
    color: '#666666',
  },
  summaryStatValue: {
    fontSize: 12,
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
  trendInsight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 10,
    backgroundColor: '#EEF4FC',
    borderRadius: 8,
    gap: 8,
  },
  trendText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    fontWeight: '500',
  },
  trendValue: {
    fontWeight: 'bold',
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
    marginBottom: 2,
  },
  courseCredits: {
    fontSize: 12,
    color: '#888888',
  },
  gradeContainer: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 54,
  },
  gradeValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  percentageValue: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  marksBreakdown: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginLeft: 8,
  },
  breakdownItem: {
    flex: 1,
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  breakdownValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },
  breakdownDivider: {
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
  componentsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
    marginLeft: 8,
  },
  componentsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#555555',
    marginBottom: 6,
  },
  componentsList: {
    gap: 4,
  },
  componentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  componentLabel: {
    fontSize: 12,
    color: '#666666',
  },
  componentValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#222222',
  },
  semesterCard: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  semesterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  semesterTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  semesterTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222222',
  },
  semesterGpaContainer: {
    alignItems: 'center',
    backgroundColor: '#F3F6FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  semesterGpa: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  semesterGpaLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '600',
  },
  semesterStats: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 10,
  },
  semesterStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  semesterStatLabel: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 2,
  },
  semesterStatValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222222',
  },
  semesterStatDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  infoCard: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
  },
  gradeScale: {
    gap: 8,
  },
  gradeScaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gradeScaleDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  gradeScaleText: {
    fontSize: 13,
    color: '#555555',
  },
  bottomPadding: {
    height: 24,
  },
});

export default GradesScreen;
