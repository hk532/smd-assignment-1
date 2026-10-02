// Mock data for the student portal application

export const studentInfo = {
  id: '22i-2632',
  name: 'Humair Naseer',
  email: 'i222632@nu.edu.pk',
  department: 'Software Engineering',
  campusAddress: 'FAST NUCES, A.K. Brohi Road, H-11/4, Islamabad',
  semester: 9,
  cgpa: 3.65,
  totalCredits: 112,
  profileImage: 'https://via.placeholder.com/150',
};

export const courses = [
  {
    id: 'CS-401',
    name: 'Mobile Application Development',
    instructor: 'Dr. Sarah Ali',
    credits: 3,
    schedule: 'Mon, Wed 2:00 PM - 3:30 PM',
    room: 'CS-Lab 3',
    color: '#4A90E2',
    totalClasses: 30,
    attendedClasses: 24,
    assignments: [
      { id: 1, title: 'React Native App', dueDate: '2026-09-20', marks: 20, obtained: 18, submitted: true },
      { id: 2, title: 'State Management', dueDate: '2026-09-25', marks: 15, obtained: null, submitted: false },
    ],
    quizzes: [
      { id: 1, title: 'Quiz 1', marks: 10, obtained: 8 },
      { id: 2, title: 'Quiz 2', marks: 10, obtained: 9 },
    ],
    midterm: { marks: 25, obtained: 21 },
    finalExam: { marks: 30, obtained: null },
  },
  {
    id: 'CS-402',
    name: 'Artificial Intelligence',
    instructor: 'Dr. Hassan Raza',
    credits: 4,
    schedule: 'Tue, Thu 10:00 AM - 11:30 AM',
    room: 'Room 205',
    color: '#E24A90',
    totalClasses: 32,
    attendedClasses: 30,
    assignments: [
      { id: 1, title: 'Search Algorithms', dueDate: '2026-09-18', marks: 20, obtained: 19, submitted: true },
      { id: 2, title: 'Neural Networks', dueDate: '2026-09-28', marks: 20, obtained: null, submitted: false },
    ],
    quizzes: [
      { id: 1, title: 'Quiz 1', marks: 10, obtained: 9 },
      { id: 2, title: 'Quiz 2', marks: 10, obtained: 10 },
    ],
    midterm: { marks: 20, obtained: 18 },
    finalExam: { marks: 30, obtained: null },
  },
  {
    id: 'CS-403',
    name: 'Software Engineering',
    instructor: 'Prof. Fatima Malik',
    credits: 3,
    schedule: 'Mon, Wed 11:00 AM - 12:30 PM',
    room: 'Room 301',
    color: '#90E24A',
    totalClasses: 28,
    attendedClasses: 26,
    assignments: [
      { id: 1, title: 'UML Diagrams', dueDate: '2026-09-16', marks: 15, obtained: 14, submitted: true },
      { id: 2, title: 'Project Plan', dueDate: '2026-09-30', marks: 20, obtained: null, submitted: false },
    ],
    quizzes: [
      { id: 1, title: 'Quiz 1', marks: 10, obtained: 7 },
      { id: 2, title: 'Quiz 2', marks: 10, obtained: 8 },
    ],
    midterm: { marks: 25, obtained: 22 },
    finalExam: { marks: 30, obtained: null },
  },
  {
    id: 'CS-404',
    name: 'Database Systems',
    instructor: 'Dr. Bilal Ahmed',
    credits: 3,
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
    room: 'CS-Lab 1',
    color: '#E2904A',
    totalClasses: 30,
    attendedClasses: 22,
    assignments: [
      { id: 1, title: 'ER Diagram', dueDate: '2026-09-17', marks: 15, obtained: 13, submitted: true },
      { id: 2, title: 'SQL Queries', dueDate: '2026-09-27', marks: 20, obtained: null, submitted: false },
    ],
    quizzes: [
      { id: 1, title: 'Quiz 1', marks: 10, obtained: 8 },
      { id: 2, title: 'Quiz 2', marks: 10, obtained: 7 },
    ],
    midterm: { marks: 25, obtained: 20 },
    finalExam: { marks: 30, obtained: null },
  },
  {
    id: 'MGT-301',
    name: 'Project Management',
    instructor: 'Ms. Aisha Siddiqui',
    credits: 2,
    schedule: 'Fri 9:00 AM - 11:00 AM',
    room: 'Room 102',
    color: '#9B4AE2',
    totalClasses: 15,
    attendedClasses: 14,
    assignments: [
      { id: 1, title: 'Case Study', dueDate: '2026-09-19', marks: 25, obtained: 23, submitted: true },
    ],
    quizzes: [
      { id: 1, title: 'Quiz 1', marks: 15, obtained: 13 },
    ],
    midterm: { marks: 30, obtained: 27 },
    finalExam: { marks: 30, obtained: null },
  },
];

export const announcements = [
  {
    id: 1,
    title: 'Midterm Schedule Released',
    message: 'The midterm examination schedule has been posted. Please check your course pages for details.',
    date: '2026-09-14',
    priority: 'high',
    category: 'Academic',
  },
  {
    id: 2,
    title: 'Library Hours Extended',
    message: 'Library will remain open until 11 PM during exam week.',
    date: '2026-09-13',
    priority: 'medium',
    category: 'Facility',
  },
  {
    id: 3,
    title: 'Career Fair Next Week',
    message: 'Annual career fair will be held on September 22-23. Register on the placement portal.',
    date: '2026-09-12',
    priority: 'medium',
    category: 'Event',
  },
  {
    id: 4,
    title: 'Fee Payment Reminder',
    message: 'Last date for fee submission without fine is September 25.',
    date: '2026-09-10',
    priority: 'high',
    category: 'Financial',
  },
];

export const feeDetails = {
  semester: 'Fall 2026',
  tuitionFee: 85000,
  labFee: 15000,
  libraryFee: 3000,
  sportsFee: 2000,
  miscellaneous: 5000,
  totalFee: 110000,
  paid: 110000,
  pending: 0,
  dueDate: '2026-09-25',
  paymentHistory: [
    { id: 1, date: '2026-08-15', amount: 110000, method: 'Bank Transfer', status: 'Completed' },
    { id: 2, date: '2026-02-10', amount: 105000, method: 'Online Payment', status: 'Completed' },
  ],
};

export const semesterGrades = [
  { semester: 1, gpa: 3.4, credits: 15 },
  { semester: 2, gpa: 3.5, credits: 16 },
  { semester: 3, gpa: 3.6, credits: 15 },
  { semester: 4, gpa: 3.7, credits: 18 },
  { semester: 5, gpa: 3.8, credits: 16 },
  { semester: 6, gpa: 3.65, credits: 10, current: true },
];

// Helper functions for calculations
export const calculateAttendancePercentage = (attended, total) => {
  return ((attended / total) * 100).toFixed(1);
};

export const calculateCourseMarks = (course) => {
  let obtained = 0;
  let total = 0;

  // Assignments
  course.assignments.forEach(assignment => {
    total += assignment.marks;
    if (assignment.obtained !== null) {
      obtained += assignment.obtained;
    }
  });

  // Quizzes
  course.quizzes.forEach(quiz => {
    total += quiz.marks;
    if (quiz.obtained !== null) {
      obtained += quiz.obtained;
    }
  });

  // Midterm
  total += course.midterm.marks;
  if (course.midterm.obtained !== null) {
    obtained += course.midterm.obtained;
  }

  // Final (if available)
  if (course.finalExam.obtained !== null) {
    total += course.finalExam.marks;
    obtained += course.finalExam.obtained;
  } else {
    total += course.finalExam.marks;
  }

  return { obtained, total, percentage: ((obtained / total) * 100).toFixed(1) };
};

export const getAttendanceStatus = (percentage) => {
  if (percentage >= 85) return { status: 'Excellent', color: '#4CAF50' };
  if (percentage >= 75) return { status: 'Good', color: '#8BC34A' };
  if (percentage >= 65) return { status: 'Warning', color: '#FF9800' };
  return { status: 'Critical', color: '#F44336' };
};

export const getPendingAssignments = () => {
  const pending = [];
  courses.forEach(course => {
    course.assignments.forEach(assignment => {
      if (!assignment.submitted) {
        pending.push({
          ...assignment,
          courseName: course.name,
          courseId: course.id,
          color: course.color,
        });
      }
    });
  });
  return pending.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

export const getAcademicInsights = () => {
  const insights = [];
  
  // Check attendance warnings
  courses.forEach(course => {
    const percentage = calculateAttendancePercentage(course.attendedClasses, course.totalClasses);
    if (percentage < 75) {
      insights.push({
        type: 'warning',
        icon: 'warning',
        message: `${course.name} attendance is ${percentage}%. Minimum required: 75%`,
        action: 'Attend upcoming classes',
      });
    }
  });

  // Check pending assignments
  const pending = getPendingAssignments();
  if (pending.length > 0) {
    insights.push({
      type: 'info',
      icon: 'pencil',
      message: `You have ${pending.length} pending assignment${pending.length > 1 ? 's' : ''}`,
      action: 'View assignments',
    });
  }

  // Check CGPA trend
  if (studentInfo.cgpa >= 3.5) {
    insights.push({
      type: 'success',
      icon: 'target',
      message: `Excellent CGPA of ${studentInfo.cgpa}. Keep up the great work!`,
      action: 'View transcript',
    });
  }

  return insights;
};
