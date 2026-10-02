# SmartFlex - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Development Server
Open your terminal in the SmartFlex folder and run:
```bash
npm start
```

### Step 2: Open on Your Device
1. Install **Expo Go** app on your phone:
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Scan the QR code shown in your terminal with:
   - **Android**: Expo Go app
   - **iOS**: Camera app

### Step 3: Explore the App!
The app will load on your device. Start exploring from the Dashboard.

---

## 🎯 Key Features to Test

### 1. Dashboard
- View quick stats (CGPA, Attendance, Courses)
- Switch to Analytics tab to see charts
- Pull down to refresh
- Tap on stat cards to navigate

### 2. Courses
- Search for courses
- Try different sort options (Name, Attendance, Credits)
- Tap any course to see details

### 3. Course Details
- Switch between Overview, Assignments, and Grades tabs
- View attendance and marks breakdown

### 4. Attendance
- Check overall attendance
- See course-wise breakdown with chart
- Notice warnings for low attendance
- View "classes needed" calculations

### 5. Grades
- View CGPA trend chart
- Check current semester grades
- See transcript of all semesters

### 6. Profile
- View student information
- Switch to Fee Details tab
- Tap "Edit" to modify contact info
- Try form validation (clear name or enter invalid email)
- Test form submission

---

## 📱 Navigation Tips

- **Back Arrow** (←) at top left returns to previous screen
- **Profile Icon** at top right (Dashboard) opens Profile
- **Tab Buttons** within screens switch content
- **Cards** are tappable - try pressing them!

---

## 🎨 What to Look For

### Data-Driven UI
- All data comes from `data/mockData.js`
- Try changing values in mockData.js and reload

### Reusable Components
- Notice consistent buttons, cards, and inputs
- Same components used throughout

### State Management
- Form validation (Profile screen)
- Search and filter (Courses screen)
- Tab switching (multiple screens)
- Loading states (form submission)

### Calculations
- Attendance percentages
- GPA calculations
- Marks totals
- Classes needed for 75%

### Charts (Dashboard Analytics Tab)
1. **Line Chart**: CGPA progression over semesters
2. **Bar Chart**: Attendance by course
3. **Progress Chart**: Overall academic status
4. **Pie Chart**: Credit hours distribution

---

## 🔍 Testing Scenarios

### Scenario 1: Low Attendance Warning
1. Go to Attendance screen
2. Find "Database Systems" (73.33%)
3. Notice red warning color
4. See "Attend next X classes" message

### Scenario 2: Form Validation
1. Go to Profile screen
2. Tap "Edit" button
3. Clear the name field → See error
4. Enter invalid email → See error
5. Enter valid data → Save successfully

### Scenario 3: Search & Sort
1. Go to Courses screen
2. Search for "Application"
3. Clear search
4. Try different sort options
5. Search for "XYZ" → See empty state

### Scenario 4: Course Details
1. From Courses, tap any course
2. View Overview tab (info, attendance, marks)
3. Switch to Assignments tab
4. Switch to Grades tab
5. Navigate back

### Scenario 5: Dashboard Analytics
1. On Dashboard, tap "Analytics" tab
2. Scroll through all 4 charts
3. Read the insights below each chart
4. Switch back to "Overview" tab

---

## 🐛 Troubleshooting

### App won't load?
- Check that `npm start` is running
- Make sure phone and computer are on same WiFi
- Try pressing 'r' in terminal to reload

### Dependencies issues?
```bash
npm install
```

### Clear cache if needed:
```bash
npx expo start --clear
```

### Port already in use?
The Metro bundler will find another port automatically.

---

## 📖 Understanding the Code

### Key Files to Review

**Data Layer**:
- `data/mockData.js` - All application data

**Reusable Components**:
- `components/Button.js` - Button variants
- `components/Card.js` - Card container
- `components/Input.js` - Form input
- `components/CourseCard.js` - Course display

**Main Screens**:
- `screens/DashboardScreen.js` - Home screen with charts
- `screens/CoursesScreen.js` - Course list with search/sort
- `screens/AttendanceScreen.js` - Attendance tracking
- `screens/GradesScreen.js` - Grades and transcript
- `screens/ProfileScreen.js` - Profile with form

**Navigation**:
- `App.js` - Navigation setup

---

## 💡 Customization Ideas

Want to modify the app? Try:

1. **Change Colors**:
   - Find `#4A90E2` in any file
   - Replace with your preferred color

2. **Add More Courses**:
   - Edit `data/mockData.js`
   - Add new course objects to `courses` array

3. **Modify Student Info**:
   - Edit `studentInfo` object in `data/mockData.js`

4. **Add More Charts**:
   - Check react-native-chart-kit documentation
   - Add to Dashboard Analytics tab

5. **Create New Features**:
   - Add new screen
   - Create navigation route
   - Import in App.js

---

## 📚 Documentation Files

- **README.md** - Complete project documentation
- **ASSIGNMENT_DOCUMENTATION.md** - Detailed requirement coverage
- **QUICK_START.md** - This file
- **package.json** - Dependencies and scripts

---

## 🎓 For Viva Defense

### Key Points to Remember

1. **Architecture**:
   - Reusable component pattern
   - Data-driven UI approach
   - State management with useState

2. **React Concepts**:
   - Components, props, state
   - Event handling
   - Conditional rendering
   - List rendering with .map()

3. **JavaScript Features**:
   - Array methods (.map, .filter, .reduce, .sort)
   - Arrow functions
   - Object/array manipulation
   - Helper functions for calculations

4. **Forms & Validation**:
   - Profile edit form
   - Email regex validation
   - Required field checking
   - Error state management

5. **Charts**:
   - 4 types: Line, Bar, Pie, Progress
   - Using react-native-chart-kit
   - Data transformation for charts

6. **User Experience**:
   - Mobile-first design
   - Touch-friendly interface
   - Visual feedback
   - Consistent navigation

---

## ✅ Quick Checklist

Before submission/viva:

- [ ] App runs without errors
- [ ] All screens are accessible
- [ ] Charts display correctly
- [ ] Form validation works
- [ ] Search and sort function properly
- [ ] Navigation flows smoothly
- [ ] Understand the code structure
- [ ] Can explain key features
- [ ] Know where each requirement is implemented

---

## 🆘 Need Help?

### Common Questions

**Q: Where is the attendance warning logic?**
A: `data/mockData.js` → `getAcademicInsights()` function

**Q: How does form validation work?**
A: `screens/ProfileScreen.js` → `validateForm()` function

**Q: Where are the charts?**
A: `screens/DashboardScreen.js` → Analytics tab

**Q: How is navigation set up?**
A: `App.js` → Stack Navigator

**Q: Where are reusable components?**
A: `components/` folder

---

## 🎉 You're Ready!

SmartFlex is fully functional and meets all assignment requirements. Explore the app, understand the code, and you're ready for your viva!

**Good luck with your assignment! 🚀**

---

## 📞 Development Commands

```bash
# Start development server
npm start

# Start with cache clear
npx expo start --clear

# Install dependencies
npm install

# Check installed packages
npm list --depth=0

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Run on Web
npm run web
```

---

**Pro Tip**: Keep the terminal open while the app is running. Press 'r' to reload, 'm' to toggle menu, 'shift+m' to see more options.
