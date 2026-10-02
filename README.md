# SmartFlex - Intelligent Student Portal

A comprehensive React Native mobile application for university students to manage their academic life efficiently.

## 📱 Application Overview

SmartFlex is a modern, mobile-first student portal that addresses real problems faced by university students. It provides an intuitive interface for tracking attendance, monitoring grades, managing courses, and staying updated with academic progress.

### Problem Statement

Traditional university portals are often:
- Not mobile-optimized
- Difficult to navigate
- Lack real-time insights and warnings
- Don't provide personalized recommendations
- Have poor user experience

**SmartFlex Solution**: A mobile-first, intelligent dashboard that provides:
- Real-time attendance tracking with warnings
- Visual grade monitoring with trend analysis
- Smart notifications for pending assignments
- Interactive charts for academic insights
- Personalized recommendations based on performance

## ✨ Features Implemented

### Core Requirements ✓

- **A. Meaningful Problem**: Addresses poor UX of university portals with mobile-first design
- **B. Mobile Application**: Built with React Native (Expo)
- **C. React Concepts**: Components, props, state, events, conditional rendering, data-driven UI
- **D. JavaScript**: Arrays, objects, functions, array methods, conditions, data manipulation
- **E. User Interaction**: Multiple interactive features (forms, filtering, sorting, navigation)
- **F. Data-Driven UI**: All UI generated from mock data objects and arrays
- **G. Form/Input**: Profile editing with validation and feedback
- **H. Application States**: Empty states, error states, loading states, data variations
- **I. Reusable Components**: Card, Button, Input, Header, StatCard, CourseCard, EmptyState
- **J. Usability**: Consistent, intuitive mobile interface

### Advanced Features ✓

1. **Search and Filtering**: Course search with real-time filtering
2. **Sorting**: Sort courses by name, attendance, or credits
3. **Personalized Dashboard**: Smart insights based on attendance and grades
4. **Dynamic Warnings**: Attendance warnings and recommendations
5. **Multiple States**: Loading, empty, error, and success states
6. **Calculations**: Attendance percentage, GPA calculations, classes needed
7. **Data Validation**: Email validation, required fields, character limits
8. **Interactive UI**: Expandable cards, pull-to-refresh, tab navigation
9. **Charts & Analytics**: Line, Bar, Pie, and Progress charts

### Dashboard Requirement ✓

**react-native-chart-kit** implementation with 4 chart types:

1. **Line Chart**: CGPA trend analysis over semesters
2. **Bar Chart**: Course-wise attendance comparison
3. **Pie Chart**: Credit hours distribution across courses
4. **Progress Chart**: Overall academic status (Attendance, CGPA, Degree completion)

## 📂 Project Structure

```
SmartFlex/
├── components/           # Reusable UI components
│   ├── Button.js        # Customizable button component
│   ├── Card.js          # Card container component
│   ├── CourseCard.js    # Course display card
│   ├── EmptyState.js    # Empty state handler
│   ├── Header.js        # Screen header component
│   ├── Input.js         # Form input with validation
│   └── StatCard.js      # Statistics display card
├── data/
│   └── mockData.js      # All application data and helper functions
├── screens/             # Application screens
│   ├── AttendanceScreen.js     # Attendance tracking
│   ├── CourseDetailScreen.js   # Individual course details
│   ├── CoursesScreen.js        # All courses list
│   ├── DashboardScreen.js      # Main dashboard with analytics
│   ├── GradesScreen.js         # Grades and transcript
│   └── ProfileScreen.js        # User profile and fee details
├── App.js               # Main app with navigation
└── README.md            # This file
```

## 🧭 Navigation Architecture

**State-Based View Switching** (As taught in class)
- No external navigation libraries
- Simple `useState` for screen management
- Clean switch/case pattern for rendering
- Lightweight and easy to understand

```javascript
const [currentScreen, setCurrentScreen] = useState('Dashboard');

const navigateTo = (screen) => {
  setCurrentScreen(screen);
};

switch (currentScreen) {
  case 'Dashboard':
    return <DashboardScreen />;
  // ... other screens
}
```

## 🎨 Screens

### 1. Dashboard (Main Screen)
- **Overview Tab**:
  - Quick stats cards (CGPA, Attendance, Courses, Pending assignments)
  - Academic insights with smart warnings
  - Upcoming assignment deadlines
  - Recent announcements
- **Analytics Tab**:
  - CGPA trend line chart
  - Attendance bar chart
  - Overall progress chart
  - Credit distribution pie chart

### 2. Courses Screen
- List of all enrolled courses
- Search functionality
- Sort by name, attendance, or credits
- Each course card shows:
  - Course code and name
  - Instructor details
  - Schedule and location
  - Attendance percentage
  - Current marks

### 3. Course Detail Screen
- **Overview Tab**: Course info, attendance summary, marks overview
- **Assignments Tab**: All assignments with status and scores
- **Grades Tab**: Quizzes, midterm, and final exam details

### 4. Attendance Screen
- Overall attendance summary
- Course-wise attendance bar chart
- Detailed breakdown per course
- Smart warnings for low attendance
- Calculation of classes needed to reach 75%

### 5. Grades Screen
- Current CGPA with statistics
- CGPA trend line chart
- Current semester courses with grades
- Semester-wise transcript
- Grade scale information

### 6. Profile Screen
- **Profile Tab**:
  - Student information
  - Academic details
  - Editable contact information with validation
  - Quick action links
- **Fee Details Tab**:
  - Fee summary and status
  - Detailed fee breakdown
  - Payment history

## 🎯 React Concepts Demonstrated

### 1. Components
- Functional components throughout
- Reusable component library (Button, Card, Input, etc.)
- Component composition and nesting

### 2. Props
- Data passing to child components
- Callback props for event handling
- Optional props with default values
- Prop destructuring

### 3. State Management
- `useState` for local state
- Form state management
- Tab selection state
- Loading and error states

### 4. Events
- `onPress` handlers for navigation and actions
- `onChangeText` for form inputs
- `onRefresh` for pull-to-refresh
- Form submission handling

### 5. Conditional Rendering
- Tab content switching
- Empty state displays
- Error message displays
- Loading indicators
- Status badges based on data

### 6. Lists and Iteration
- `.map()` for rendering lists
- `.filter()` for search
- `.sort()` for sorting
- `.reduce()` for calculations

## 🔧 JavaScript Features Used

### Arrays and Objects
```javascript
// Complex data structures
const courses = [{ id, name, instructor, assignments: [], quizzes: [] }];

// Array methods
const pending = courses.flatMap(c => c.assignments).filter(a => !a.submitted);
```

### Functions
```javascript
// Helper functions
export const calculateAttendancePercentage = (attended, total) => {
  return ((attended / total) * 100).toFixed(1);
};

// Array reduce for calculations
const totalClasses = courses.reduce((sum, course) => sum + course.totalClasses, 0);
```

### Data Manipulation
```javascript
// Sorting with custom logic
const sorted = courses.sort((a, b) => {
  const attA = (a.attendedClasses / a.totalClasses) * 100;
  const attB = (b.attendedClasses / b.totalClasses) * 100;
  return attB - attA;
});
```

### Validation
```javascript
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

## 📊 Data-Driven Architecture

All UI is generated from data objects:

```javascript
// Mock data structure
export const courses = [...];
export const studentInfo = {...};
export const announcements = [...];

// Data-driven rendering
{courses.map(course => (
  <CourseCard key={course.id} course={course} />
))}
```

Dynamic behavior examples:
- Changing attendance → Updates warnings and recommendations
- Adding assignments → Reflects in pending count
- Modifying grades → Recalculates percentages
- Empty data → Shows appropriate empty states

## 🎨 User Input & Validation

**Profile Edit Form** demonstrates:
- Text input with real-time validation
- Email format validation using regex
- Required field checking
- Error message display
- Form submission handling
- Loading states
- Success feedback

```javascript
const validateForm = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  } else if (formData.name.trim().length < 3) {
    newErrors.name = 'Name must be at least 3 characters';
  }
  
  if (!validateEmail(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
  }
  
  return Object.keys(newErrors).length === 0;
};
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Installation Steps

1. **Navigate to project directory**:
   ```bash
   cd SmartFlex
   ```

2. **Dependencies are already installed**, but if needed:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   or
   ```bash
   npx expo start
   ```

4. **Run on device/emulator**:
   - **Android**: Press `a` in terminal or scan QR code with Expo Go
   - **iOS**: Press `i` in terminal or scan QR code with Expo Go (Mac only for simulator)
   - **Web**: Press `w` in terminal

## 📦 Dependencies

```json
{
  "expo": "~57.0.22",
  "expo-status-bar": "~57.0.1",
  "react": "19.2.3",
  "react-native": "0.86.3",
  "react-native-chart-kit": "^7.0.4",
  "react-native-svg": "15.15.5"
}
```

**Key Features**:
- **Expo**: React Native framework
- **react-native-chart-kit**: For dashboard charts (required)
- **react-native-svg**: Chart support (required by chart-kit)
- **No navigation libraries**: Using state-based view switching

## 🎓 AI-Assisted Development

This application was developed with AI assistance for:
- Architecture and structure planning
- Component design patterns
- Code generation and refactoring
- Best practices implementation
- Documentation

However, all code has been:
- Reviewed for correctness
- Tested for functionality
- Adapted to requirements
- Understood completely

## 🏆 Assignment Requirements Coverage

### Core Requirements (All Met ✓)
- [x] A. Meaningful Problem Description
- [x] B. Mobile Application (React Native)
- [x] C. React Concepts (Components, Props, State, Events)
- [x] D. JavaScript (Arrays, Functions, Methods, Conditions)
- [x] E. User Interaction (Forms, Navigation, Filtering)
- [x] F. Data-Driven UI (All from mock data)
- [x] G. Form/Input (Profile edit with validation)
- [x] H. Application States (Empty, Error, Loading, Success)
- [x] I. Reusable Components (7+ reusable components)
- [x] J. Usability (Mobile-optimized, consistent design)

### Advanced Features (10+ Implemented ✓)
- [x] Search and filtering
- [x] Sorting and prioritization
- [x] Personalized dashboard
- [x] Dynamic warnings and recommendations
- [x] Multiple application states
- [x] Attendance and grade calculations
- [x] Empty states and error states
- [x] Data validation and feedback
- [x] Interactive cards and lists
- [x] Meaningful animations and transitions

### Dashboard Requirement (Fully Met ✓)
- [x] Using react-native-chart-kit
- [x] 4 different chart types implemented
- [x] Meaningful data visualization
- [x] Professional design and theme
- [x] Interactive and responsive

## 📱 Screenshots & Demo

The application includes:
- **6 main screens** with tab-based navigation
- **25+ interactive components**
- **4 chart visualizations**
- **Fully responsive design**
- **Comprehensive data handling**

## 🔍 Key Highlights

1. **No Bottom/Side Bars**: Navigation uses stack-based approach as per requirements
2. **Functional UI**: Every element is interactive and responds to data
3. **Real Calculations**: Attendance percentages, GPA trends, grade calculations
4. **Smart Insights**: Context-aware warnings and recommendations
5. **Professional Design**: Consistent color scheme, typography, and spacing
6. **Error Handling**: Proper validation and user feedback
7. **Performance**: Optimized rendering and data handling

## 👨‍💻 Developer Notes

This application demonstrates:
- Clean code architecture
- Reusable component patterns
- Proper state management
- Data-driven development
- Mobile-first design principles
- Professional UI/UX practices

## 📝 License

This project is created for academic purposes as part of Mobile Application Development course assignment.

## 👤 Student Information

**Student**: [Your Name]  
**Student ID**: [Your ID]  
**Course**: Mobile Application Development  
**Assignment**: Open-Ended AI-Assisted Assignment  
**Marks**: 100

---

**Note**: All data in this application is mock data for demonstration purposes. In a production environment, this would connect to actual university APIs and databases.
