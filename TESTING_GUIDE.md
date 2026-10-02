# SmartFlex - Complete Testing Guide

## Prerequisites

Before testing, ensure:
- Node.js installed
- Expo CLI available
- Expo Go app installed on phone
- Computer and phone on same WiFi

## Step 1: Install Dependencies

```bash
cd SmartFlex
npm install
```

## Step 2: Start the Application

```bash
npm start
```

Wait for the QR code to appear in terminal or browser.

## Step 3: Load on Device

### Android:
1. Open Expo Go app
2. Tap "Scan QR code"
3. Scan the code from terminal
4. App will load

### iOS:
1. Open Camera app
2. Point at QR code
3. Tap notification
4. Opens in Expo Go

## Expected Behavior

### On First Load
- You should see the Dashboard screen
- Header with "SmartFlex" title
- Two tabs: "Overview" and "Analytics"
- Quick Stats cards (scroll horizontally)
- Academic insights section
- Pending assignments
- Recent announcements

### If You See Blank Screen
This might be a chart rendering issue. Try:

1. **Switch to Analytics tab** (at top of screen)
2. **Switch back to Overview**
3. **Pull down to refresh**

## Testing Each Feature

### 1. Dashboard (Main Screen)

**Overview Tab:**
- [ ] Can see 4 stat cards (CGPA, Attendance, Courses, Pending)
- [ ] Stat cards scroll horizontally
- [ ] Academic insights show warnings (if attendance low)
- [ ] Pending assignments display with due dates
- [ ] Announcements show with priority badges
- [ ] Can tap stat cards to navigate

**Analytics Tab:**
- [ ] Tab switching works
- [ ] Line Chart displays (CGPA trend)
- [ ] Bar Chart displays (Attendance)
- [ ] Progress Chart displays (3 circles)
- [ ] Pie Chart displays (Credits)
- [ ] Charts are readable
- [ ] Insights text appears below charts

**Pull to Refresh:**
- [ ] Pull down gesture works
- [ ] Loading indicator appears
- [ ] Content refreshes

### 2. Navigation Testing

From Dashboard:
- [ ] Tap profile icon (top right) -> Goes to Profile
- [ ] Tap "Courses" stat card -> Goes to Courses
- [ ] Tap "Attendance" stat card -> Goes to Attendance
- [ ] Tap "Grades" stat card -> Goes to Grades

From any screen:
- [ ] Back button (top left) returns to previous screen

### 3. Courses Screen

**Display:**
- [ ] All 5 courses display
- [ ] Each course shows: code, name, instructor, schedule, room
- [ ] Attendance percentage shown
- [ ] Current marks shown
- [ ] Color bar on left side

**Search:**
- [ ] Can type in search box
- [ ] Results filter in real-time
- [ ] Search works for: course name, code, instructor
- [ ] Clear button (X) appears when typing
- [ ] Clear button works

**Sort:**
- [ ] Three sort buttons visible: Name, Attendance, Credits
- [ ] Active sort button highlighted
- [ ] Clicking changes sort order
- [ ] Courses reorder correctly

**Interaction:**
- [ ] Tap any course card -> Goes to Course Detail

**Empty State:**
- [ ] Search for "ZZZZZ" -> Shows "No Courses Found"
- [ ] Clear search -> Courses return

### 4. Course Detail Screen

**Tabs:**
- [ ] Three tabs visible: Overview, Assignments, Grades
- [ ] Tab switching works
- [ ] Active tab highlighted

**Overview Tab:**
- [ ] Course information table displays
- [ ] Attendance summary shows circular progress
- [ ] Present/Total/Status shown
- [ ] Marks overview displays
- [ ] Current score percentage shown

**Assignments Tab:**
- [ ] All assignments list
- [ ] Submitted/Pending badges show
- [ ] Due dates display
- [ ] Scores shown for submitted assignments
- [ ] Color coded status

**Grades Tab:**
- [ ] Quizzes display with scores
- [ ] Progress bars show for each quiz
- [ ] Midterm exam details shown
- [ ] Final exam status shown
- [ ] Percentages calculated correctly

**Navigation:**
- [ ] Back button returns to Courses

### 5. Attendance Screen

**Overall Summary:**
- [ ] Large percentage number displays
- [ ] Status shows (Excellent/Good/Warning/Critical)
- [ ] Color coded (Green/Yellow/Orange/Red)
- [ ] Present/Absent/Total counts shown

**Bar Chart:**
- [ ] Chart displays with all courses
- [ ] Values shown on bars
- [ ] Legend displays (Safe/Warning thresholds)

**Course Cards:**
- [ ] Each course card displays
- [ ] Color bar on left
- [ ] Attendance percentage shown
- [ ] Present/Absent/Total breakdown
- [ ] Progress bar displays
- [ ] Color matches status

**Smart Features:**
- [ ] Low attendance (<75%) shows warning
- [ ] "Attend next X classes" message appears
- [ ] High attendance (>85%) shows success message
- [ ] Calculations are correct

**Interaction:**
- [ ] Tap course card -> Goes to Course Detail

### 6. Grades Screen

**CGPA Summary:**
- [ ] Current CGPA displays large
- [ ] Semester number shown
- [ ] Total credits shown
- [ ] Remaining credits calculated

**CGPA Trend Chart:**
- [ ] Line chart displays
- [ ] Shows all 6 semesters
- [ ] Trend insight text appears
- [ ] Chart is readable

**Current Semester:**
- [ ] All 5 courses display
- [ ] Letter grades shown (A, B, C, etc.)
- [ ] Percentage shown
- [ ] Color coded by grade
- [ ] Progress bar for each course
- [ ] Component breakdown shows
  - Assignments total
  - Quizzes total
  - Midterm score
  - Final status

**Transcript:**
- [ ] All semesters listed
- [ ] Each shows: semester number, GPA, credits
- [ ] Current semester badge shows
- [ ] Quality points calculated

**Grade Scale:**
- [ ] Legend displays at bottom
- [ ] Color coding matches grades

### 7. Profile Screen

**Tabs:**
- [ ] Two tabs: Profile, Fee Details
- [ ] Tab switching works

**Profile Tab:**
- [ ] Avatar with initials displays
- [ ] Student name, ID, department shown
- [ ] Academic information table displays
- [ ] Contact information section shows

**Edit Mode:**
- [ ] "Edit" button visible
- [ ] Tap Edit -> Form appears
- [ ] Name input shows current value
- [ ] Email input shows current value
- [ ] Both inputs are editable

**Form Validation:**
- [ ] Clear name field -> Error message "Name is required"
- [ ] Enter "Ab" -> Error "Name must be at least 3 characters"
- [ ] Enter invalid email (e.g., "test") -> Error "Please enter valid email"
- [ ] Enter "test@" -> Still shows error
- [ ] Enter "test@example.com" -> No error
- [ ] Clear error on typing

**Form Submission:**
- [ ] Both Cancel and Save buttons visible
- [ ] Cancel -> Returns to view mode
- [ ] Cancel -> Data not changed
- [ ] Save with valid data -> Shows loading spinner
- [ ] Save -> Success alert appears
- [ ] Save -> Returns to view mode

**Quick Actions:**
- [ ] Three action cards display
- [ ] Tap "My Courses" -> Goes to Courses
- [ ] Tap "Attendance" -> Goes to Attendance
- [ ] Tap "Grades" -> Goes to Grades

**Fee Details Tab:**
- [ ] Total fee displays large
- [ ] Paid/Pending breakdown shows
- [ ] "All Fees Paid" badge if paid fully
- [ ] Color coding (green for paid, red for pending)
- [ ] Fee breakdown table displays:
  - Tuition fee
  - Lab fee
  - Library fee
  - Sports fee
  - Miscellaneous
  - Total row
- [ ] Payment history displays
- [ ] Each payment shows: date, amount, method, status

### 8. State Testing

**Loading States:**
- [ ] Pull to refresh shows loading (Dashboard)
- [ ] Form submission shows loading (Profile)

**Empty States:**
- [ ] No search results shows empty state (Courses)
- [ ] Empty state has icon, message, action button

**Error States:**
- [ ] Form validation errors display
- [ ] Error text appears below input
- [ ] Error border appears (red)

**Success States:**
- [ ] High attendance shows green success
- [ ] All fees paid shows success badge
- [ ] Form save shows success alert

**Data-Dependent States:**
- [ ] High attendance (>85%) -> Green color
- [ ] Medium attendance (75-84%) -> Yellow/Orange
- [ ] Low attendance (<75%) -> Red with warning
- [ ] Submitted assignment -> Green "Submitted" badge
- [ ] Pending assignment -> Orange "Pending" badge

## Data Manipulation Testing

### Change Data and Test UI Updates

1. **Open**: `data/mockData.js`

2. **Test Attendance Warning:**
   - Find Database Systems course
   - Change `attendedClasses` from 22 to 15
   - Save and reload app
   - [ ] Dashboard shows warning
   - [ ] Attendance screen shows red warning
   - [ ] "Attend next X classes" appears

3. **Test CGPA Trend:**
   - Change semester 6 GPA from 3.65 to 3.9
   - Save and reload
   - [ ] Dashboard CGPA updates
   - [ ] Line chart updates
   - [ ] Trend calculation updates

4. **Test Course Addition:**
   - Add new course to courses array
   - Save and reload
   - [ ] New course appears in list
   - [ ] Total courses count updates
   - [ ] Charts update with new data

5. **Test Empty Announcements:**
   - Change `announcements` array to `[]`
   - Save and reload
   - [ ] Announcements section handles empty state

## Performance Testing

- [ ] Scrolling is smooth
- [ ] Tab switching is instant
- [ ] Navigation has no lag
- [ ] Charts render quickly
- [ ] Search is responsive
- [ ] No crashes or freezes

## Visual Testing

- [ ] All text is readable
- [ ] Colors are consistent
- [ ] Spacing is appropriate
- [ ] Cards have proper shadows
- [ ] Buttons are touch-friendly (not too small)
- [ ] No text overflow
- [ ] No overlapping elements

## Interaction Testing

- [ ] All buttons respond to touch
- [ ] Touch feedback is visible (opacity change)
- [ ] Back buttons work consistently
- [ ] Forms can be filled
- [ ] Search input accepts text
- [ ] Scrolling works everywhere needed

## Calculations Verification

### Attendance Percentage
Course: Mobile App Development
- Attended: 24
- Total: 30
- Expected: 80.0%
- [ ] Matches app display

### Classes Needed (Database Systems)
- Current: 73.33%
- Target: 75%
- Formula: ceil((0.75 * 30 - 22) / 0.25)
- Expected: 5 classes
- [ ] Matches app display

### Course Marks
Mobile App Development:
- Assignments: 18/20
- Quizzes: 17/20  
- Midterm: 21/25
- Total so far: 56/65
- Percentage: 86.2%
- [ ] Matches app display

### CGPA Trend
From S1 to S6:
- Increase: 3.65 - 3.4 = 0.25
- [ ] Insight text says "0.25 points"

## Common Issues and Solutions

### Issue: Blank Screen on Load

**Solution:**
1. Check console for errors
2. Try reloading (shake device, tap Reload)
3. Clear cache: `npx expo start --clear`

### Issue: Charts Not Displaying

**Solution:**
1. Verify react-native-chart-kit installed
2. Verify react-native-svg installed
3. Switch tabs back and forth
4. Reload app

### Issue: Navigation Not Working

**Solution:**
1. Check App.js is using state-based navigation
2. Verify all screens are imported
3. Check navigation prop is passed to screens

### Issue: Search Not Working

**Solution:**
1. Check if text input is responding
2. Verify filter logic in CoursesScreen
3. Check console for errors

### Issue: Form Validation Not Working

**Solution:**
1. Type in fields to trigger validation
2. Check error state updates on change
3. Verify validateForm function

## Final Checklist

Before submission, verify:
- [ ] All screens load correctly
- [ ] All navigation works
- [ ] All interactions respond
- [ ] All calculations are correct
- [ ] All charts display
- [ ] All forms work
- [ ] All validations work
- [ ] No console errors
- [ ] No crashes
- [ ] App is usable on mobile device

## Test Results

Date Tested: ________________
Device: ________________
OS Version: ________________

Overall Result: [ ] PASS [ ] FAIL

Issues Found:
1. ________________
2. ________________
3. ________________

## Notes

- Test on actual mobile device (not just emulator)
- Test with different screen sizes if possible
- Test all interactive elements
- Verify all data displays correctly
- Check all calculations match expected values
- Ensure app is intuitive to use

## Success Criteria

The app passes testing if:
1. All screens load and display correctly
2. All navigation works smoothly
3. All interactive elements respond
4. All calculations are accurate
5. All charts display properly
6. All forms work with validation
7. No crashes or errors occur
8. App is usable and intuitive

If all criteria are met, the app is ready for submission and viva demonstration.
