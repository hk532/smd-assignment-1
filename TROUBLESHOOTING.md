# Troubleshooting Guide - SmartFlex

## Problem: App Shows Only Plain 2 Screens or Blank Screens

### Possible Causes and Solutions

### Cause 1: Expo Cache Issue

**Symptoms:**
- App loads but shows minimal content
- Only 2-3 screens visible
- Missing charts or data

**Solution:**
```bash
cd SmartFlex
npx expo start --clear
```

Then reload the app on your device.

---

### Cause 2: Dependencies Not Installed

**Symptoms:**
- Charts don't display
- Components missing
- Console shows "Cannot find module" errors

**Solution:**
```bash
cd SmartFlex
rm -rf node_modules
npm install
npm start
```

For Windows Command Prompt:
```cmd
cd SmartFlex
rmdir /s /q node_modules
npm install
npm start
```

---

### Cause 3: Chart Libraries Not Working

**Symptoms:**
- Dashboard Analytics tab is blank
- No charts visible
- Console shows chart-related errors

**Solution:**

1. Verify dependencies:
```bash
npm list react-native-chart-kit react-native-svg
```

2. If missing, install:
```bash
npm install react-native-chart-kit react-native-svg
```

3. Restart:
```bash
npx expo start --clear
```

---

### Cause 4: JavaScript Errors Preventing Load

**Symptoms:**
- App shows error screen
- Red error overlay
- Console shows JavaScript errors

**Solution:**

1. **Check console output** in terminal
2. **Common errors:**
   - Syntax errors -> Check recent file changes
   - Import errors -> Verify file paths
   - Undefined variables -> Check mockData.js

3. **Quick fix:**
```bash
# Restart with diagnostics
npx expo start --clear
```

---

### Cause 5: Metro Bundler Issues

**Symptoms:**
- App stuck on loading
- "Downloading JavaScript bundle" never completes
- Blank white screen

**Solution:**

1. **Stop current process** (Ctrl+C in terminal)

2. **Clear all caches:**
```bash
cd SmartFlex
npx expo start --clear
```

3. **Hard reset:**
```bash
# Stop expo
# Delete cache folders
rm -rf .expo
rm -rf node_modules/.cache

# Restart
npm start
```

---

### Cause 6: Device Connection Issues

**Symptoms:**
- Can't scan QR code
- "Network response timed out"
- Connection drops

**Solution:**

**Option 1 - Tunnel Mode:**
```bash
npx expo start --tunnel
```

**Option 2 - Local Network:**
1. Ensure phone and computer on same WiFi
2. Disable VPN if active
3. Check firewall settings

**Option 3 - USB Connection:**
```bash
# For Android
npx expo start --localhost
adb reverse tcp:8081 tcp:8081
```

---

### Cause 7: Wrong Starting Screen

**Symptoms:**
- App starts but nothing interactive
- Just showing one or two static screens

**Solution:**

Check App.js line 10:
```javascript
const [currentScreen, setCurrentScreen] = useState('Dashboard');
```

Should start with 'Dashboard'. If you see plain screens, the dashboard might not be rendering. Try:

1. **Force reload on device:**
   - Shake device
   - Tap "Reload"

2. **Check Dashboard screen:**
```bash
# Verify file exists
ls screens/DashboardScreen.js
```

---

### Cause 8: Data File Missing or Corrupt

**Symptoms:**
- Screens load but no data
- "Cannot read property" errors
- Empty sections everywhere

**Solution:**

1. **Verify mockData.js exists:**
```bash
ls data/mockData.js
```

2. **Check if data is being imported:**
Open any screen file and verify:
```javascript
import { studentInfo, courses, ... } from '../data/mockData';
```

3. **Test data loading:**
Add this temporarily to Dashboard screen after imports:
```javascript
console.log('Courses:', courses);
console.log('Student:', studentInfo);
```

Check console output.

---

## Step-by-Step Debugging Process

### Step 1: Clean Install

```bash
cd SmartFlex
rm -rf node_modules
rm -rf .expo
npm install
```

### Step 2: Clear Start

```bash
npx expo start --clear
```

### Step 3: Check Console

Watch terminal for errors:
- Red errors = JavaScript issues
- Yellow warnings = Check but might be okay
- No errors = App should work

### Step 4: Reload on Device

- Shake device
- Tap "Reload"
- Or close and reopen app

### Step 5: Test Navigation

From Dashboard:
1. Try switching tabs (Overview/Analytics)
2. Try tapping stat cards
3. Try pull-to-refresh

If ANY of these work, the app is functional.

---

## Verification Checklist

Run through this checklist:

### Files Exist:
```bash
ls App.js
ls data/mockData.js
ls screens/DashboardScreen.js
ls screens/CoursesScreen.js
ls screens/AttendanceScreen.js
ls screens/GradesScreen.js
ls screens/ProfileScreen.js
ls screens/CourseDetailScreen.js
ls components/Button.js
ls components/Card.js
```

All should exist. If any missing, the file was deleted.

### Dependencies Installed:
```bash
npm list --depth=0
```

Should show:
- expo
- react
- react-native
- react-native-chart-kit
- react-native-svg

### No Console Errors:
Start app and check terminal - should see:
```
› Metro waiting on exp://...
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
```

NO red error messages.

---

## Quick Test Commands

### Test 1: Verify App Starts
```bash
cd SmartFlex
npm start
```
Wait for QR code. If QR appears, Metro bundler works.

### Test 2: Check for Errors
Look in terminal for any:
```
ERROR
Failed to compile
Cannot find module
```

If you see these, there's a problem with code.

### Test 3: Force Clean Start
```bash
npx expo start --clear --reset-cache
```

This clears everything and starts fresh.

---

## Common Error Messages and Fixes

### Error: "Cannot find module './data/mockData'"

**Fix:**
```bash
# Check if file exists
ls data/mockData.js

# If missing, you need to recreate it
# Check if it was accidentally deleted
```

### Error: "Element type is invalid"

**Fix:**
- Check all component imports
- Verify default exports
- Look for typos in import statements

### Error: "undefined is not an object (evaluating 'courses.map')"

**Fix:**
- mockData.js not loading
- Check import statement
- Verify courses array is exported

### Error: "Network response timed out"

**Fix:**
```bash
# Use tunnel mode
npx expo start --tunnel
```

---

## Force Full Reset (Nuclear Option)

If nothing else works:

```bash
# Stop expo (Ctrl+C)
cd SmartFlex

# Delete everything that can be regenerated
rm -rf node_modules
rm -rf .expo
rm -rf package-lock.json

# Fresh install
npm install

# Clear start
npx expo start --clear
```

---

## Testing App Functionality

Once app loads, test these in order:

1. **Dashboard loads**
   - [ ] Can see "SmartFlex" header
   - [ ] Can see two tabs: Overview, Analytics
   - [ ] Can see stat cards

2. **Tabs work**
   - [ ] Tap "Analytics" tab
   - [ ] Should see charts
   - [ ] Tap "Overview" tab
   - [ ] Back to main view

3. **Navigation works**
   - [ ] Tap any stat card
   - [ ] Should navigate to that screen
   - [ ] Back button should work

4. **Screens are interactive**
   - [ ] Courses: Can search
   - [ ] Courses: Can sort
   - [ ] Profile: Can edit
   - [ ] Dashboard: Can pull to refresh

If ALL of these work, your app is fully functional!

---

## Still Not Working?

### Check These:

1. **Node version:**
```bash
node --version
```
Should be 14.x or higher

2. **Expo CLI:**
```bash
npx expo --version
```
Should work without errors

3. **Phone and computer:**
- Both on same WiFi network
- No VPN active
- No firewall blocking

4. **Expo Go app:**
- Latest version installed
- Not cached old version
- Try logging out and back in

---

## Get Detailed Logs

To see what's happening:

```bash
npx expo start --clear --dev-client
```

This shows more detailed logs in terminal.

---

## Report Exact Error

If still stuck, note:

1. What do you see on screen? (describe exactly)
2. What errors in terminal? (copy exact text)
3. What step fails? (scanning QR, loading, navigation?)
4. What device? (Android/iOS version)
5. Did it ever work? (or never worked)

With this information, the problem can be diagnosed.

---

## App Should Show:

### On First Load (Dashboard):
- Blue header with "SmartFlex" and profile icon
- Two tabs: "Overview" and "Analytics"
- 4 stat cards (scroll left/right)
- "Academic Insights" section
- "Upcoming Deadlines" section
- "Recent Announcements" section

### If You Don't See This:
Something is wrong. Follow debugging steps above.

### If You See This:
App is working! Test navigation by tapping stat cards or switching tabs.

---

## Remember:

The app has:
- 6 fully functional screens
- 7 reusable components
- 4 types of charts
- Search and sort
- Form validation
- Interactive everything

If it's showing "plain 2 screens", something prevented full load.

Most common fix: `npx expo start --clear`

---

## Final Check:

```bash
# Clean everything
cd SmartFlex
rm -rf node_modules .expo
npm install
npx expo start --clear

# Scan QR code
# Wait for full load (might take 30 seconds first time)
# Should see full Dashboard with all features
```

If this doesn't work, check console for specific error message.
