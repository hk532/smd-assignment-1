import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import CoursesScreen from './screens/CoursesScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import GradesScreen from './screens/GradesScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Navigation function to switch between screens
  const navigateTo = (screen, params = {}) => {
    if (screen === 'CourseDetail' && params.course) {
      setSelectedCourse(params.course);
    }
    setCurrentScreen(screen);
  };

  // Function to go back to previous screen
  const goBack = () => {
    if (currentScreen === 'CourseDetail') {
      setCurrentScreen('Courses');
    } else if (currentScreen !== 'Dashboard') {
      setCurrentScreen('Dashboard');
    }
  };

  // Render the appropriate screen based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'Dashboard':
        return <DashboardScreen navigation={{ navigate: navigateTo }} />;
      case 'Courses':
        return <CoursesScreen navigation={{ navigate: navigateTo, goBack }} />;
      case 'CourseDetail':
        return <CourseDetailScreen route={{ params: { course: selectedCourse } }} navigation={{ goBack }} />;
      case 'Attendance':
        return <AttendanceScreen navigation={{ navigate: navigateTo, goBack }} />;
      case 'Grades':
        return <GradesScreen navigation={{ navigate: navigateTo, goBack }} />;
      case 'Profile':
        return <ProfileScreen navigation={{ navigate: navigateTo, goBack }} />;
      default:
        return <DashboardScreen navigation={{ navigate: navigateTo }} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});
