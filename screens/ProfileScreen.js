import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Badge from '../components/Badge';
import { studentInfo, feeDetails, courses } from '../data/mockData';

const ProfileScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('profile'); // 'profile' | 'fees' | 'feedback'
  
  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: studentInfo.name,
    email: studentInfo.email,
    phone: '+92 300 1234567',
    address: studentInfo.campusAddress || 'FAST NUCES, A.K. Brohi Road, H-11, Islamabad',
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [savingProfile, setSavingProfile] = useState(false);

  // Settings Toggles State
  const [settings, setSettings] = useState({
    notifications: true,
    attendanceAlerts: true,
    gradeAlerts: true,
    biometrics: false,
  });

  // Course Feedback Form State
  const [feedbackCourse, setFeedbackCourse] = useState(courses[0].id);
  const [rating, setRating] = useState(5);
  const [feedbackCategory, setFeedbackCategory] = useState('Course Content');
  const [feedbackComments, setFeedbackComments] = useState('');
  const [feedbackErrors, setFeedbackErrors] = useState({});
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState([
    {
      id: 1,
      courseId: 'CS-401',
      courseName: 'Mobile Application Development',
      rating: 5,
      category: 'Course Content',
      comments: 'Excellent practical assignments and clear explanations of React Native state management.',
      date: '2026-09-10',
    },
    {
      id: 2,
      courseId: 'CS-402',
      courseName: 'Artificial Intelligence',
      rating: 4,
      category: 'Teaching',
      comments: 'Thorough coverage of heuristic search algorithms and neural network foundations.',
      date: '2026-09-08',
    }
  ]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateProfileForm = () => {
    const errs = {};
    if (!profileData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (profileData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters';
    }

    if (!profileData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!validateEmail(profileData.email)) {
      errs.email = 'Please enter a valid university email address';
    }

    if (!profileData.phone.trim()) {
      errs.phone = 'Phone number is required';
    }

    setProfileErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveProfile = () => {
    if (validateProfileForm()) {
      setSavingProfile(true);
      setTimeout(() => {
        setSavingProfile(false);
        setIsEditing(false);
        Alert.alert('Profile Updated', 'Student registration profile has been successfully saved.');
      }, 900);
    }
  };

  const handleCancelProfile = () => {
    setProfileData({
      name: studentInfo.name,
      email: studentInfo.email,
      phone: '+92 300 1234567',
      address: studentInfo.campusAddress || 'FAST NUCES, A.K. Brohi Road, H-11, Islamabad',
    });
    setProfileErrors({});
    setIsEditing(false);
  };

  const validateFeedbackForm = () => {
    const errs = {};
    if (rating === 0) {
      errs.rating = 'Please provide a star rating (1 to 5)';
    }
    if (!feedbackComments.trim()) {
      errs.comments = 'Feedback comment is required';
    } else if (feedbackComments.trim().length < 15) {
      errs.comments = 'Please write at least 15 characters of constructive feedback';
    }
    setFeedbackErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitFeedback = () => {
    if (validateFeedbackForm()) {
      const selectedCourseObj = courses.find(c => c.id === feedbackCourse);
      const newFeedback = {
        id: Date.now(),
        courseId: feedbackCourse,
        courseName: selectedCourseObj ? selectedCourseObj.name : feedbackCourse,
        rating,
        category: feedbackCategory,
        comments: feedbackComments.trim(),
        date: new Date().toISOString().split('T')[0],
      };

      setSubmittedFeedbacks([newFeedback, ...submittedFeedbacks]);
      setFeedbackComments('');
      setFeedbackErrors({});
      Alert.alert('Feedback Registered', 'Your course and faculty evaluation has been submitted to the academic board.');
    }
  };

  const renderProfile = () => (
    <>
      {/* Student Identity Card */}
      <View style={styles.idCardContainer}>
        <View style={styles.idCardHeader}>
          <View>
            <Text style={styles.idCardInstitution}>FAST NUCES ISLAMABAD</Text>
            <Text style={styles.idCardSub}>Department of Computer Science</Text>
          </View>
          <View style={styles.fastLogoBadge}>
            <Text style={styles.fastLogoText}>FAST</Text>
          </View>
        </View>

        <View style={styles.idCardBody}>
          <View style={styles.idCardAvatar}>
            <Text style={styles.idCardAvatarText}>
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.idCardDetails}>
            <Text style={styles.idCardName}>{profileData.name}</Text>
            <Text style={styles.idCardRoll}>{studentInfo.id}</Text>
            <View style={styles.idCardTagRow}>
              <Badge label="Active Student" variant="success" size="small" />
              <Badge label={`Sem ${studentInfo.semester}`} variant="primary" size="small" />
            </View>
          </View>
        </View>

        <View style={styles.idCardFooter}>
          <Text style={styles.idCardFooterText}>{studentInfo.campusAddress}</Text>
        </View>
      </View>

      {/* Academic Highlights Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Indicators</Text>
        <View style={styles.highlightsGrid}>
          <Card style={styles.highlightCard}>
            <View style={[styles.highlightIconWrapper, { backgroundColor: '#EFF6FF' }]}>
              <Icon name="chart-bar" size={18} color="#2563EB" />
            </View>
            <Text style={styles.highlightValue}>{studentInfo.cgpa}</Text>
            <Text style={styles.highlightLabel}>Cumulative GPA</Text>
            <Text style={styles.highlightMeta}>Top Quartile</Text>
          </Card>
          <Card style={styles.highlightCard}>
            <View style={[styles.highlightIconWrapper, { backgroundColor: '#ECFDF5' }]}>
              <Icon name="book" size={18} color="#059669" />
            </View>
            <Text style={styles.highlightValue}>{studentInfo.totalCredits}</Text>
            <Text style={styles.highlightLabel}>Earned Credits</Text>
            <Text style={styles.highlightMeta}>Degree Prog: 75%</Text>
          </Card>
        </View>
      </View>

      {/* Editable Student Information Form */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Student Dossier & Contacts</Text>
          {!isEditing && (
            <TouchableOpacity
              onPress={() => setIsEditing(true)}
              style={styles.editBtn}
              activeOpacity={0.8}
            >
              <Icon name="pencil" size={12} color="#2563EB" />
              <Text style={styles.editBtnText}>Modify</Text>
            </TouchableOpacity>
          )}
        </View>

        <Card style={styles.infoCard}>
          {isEditing ? (
            <View style={styles.formContainer}>
              <Text style={styles.formNote}>Update your official campus registration details below.</Text>
              <Input
                label="Full Legal Name"
                value={profileData.name}
                onChangeText={(text) => {
                  setProfileData({ ...profileData, name: text });
                  if (profileErrors.name) setProfileErrors({ ...profileErrors, name: '' });
                }}
                placeholder="Enter full name"
                error={profileErrors.name}
              />
              <Input
                label="University Email ID"
                value={profileData.email}
                onChangeText={(text) => {
                  setProfileData({ ...profileData, email: text });
                  if (profileErrors.email) setProfileErrors({ ...profileErrors, email: '' });
                }}
                placeholder="e.g. i222632@nu.edu.pk"
                keyboardType="email-address"
                error={profileErrors.email}
              />
              <Input
                label="Mobile Contact"
                value={profileData.phone}
                onChangeText={(text) => {
                  setProfileData({ ...profileData, phone: text });
                  if (profileErrors.phone) setProfileErrors({ ...profileErrors, phone: '' });
                }}
                placeholder="e.g. +92 300 1234567"
                keyboardType="phone-pad"
                error={profileErrors.phone}
              />
              <Input
                label="Campus Residential Address"
                value={profileData.address}
                onChangeText={(text) => setProfileData({ ...profileData, address: text })}
                placeholder="Enter address"
              />
              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={handleCancelProfile}
                  style={styles.halfBtn}
                />
                <Button
                  title="Save Details"
                  onPress={handleSaveProfile}
                  loading={savingProfile}
                  style={styles.halfBtn}
                />
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Student Name</Text>
                <Text style={styles.infoValue}>{profileData.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Roll Number</Text>
                <Text style={styles.infoValue}>{studentInfo.id}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Official Email</Text>
                <Text style={styles.infoValue}>{profileData.email}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Emergency Phone</Text>
                <Text style={styles.infoValue}>{profileData.phone}</Text>
              </View>
              <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.infoLabel}>Campus Address</Text>
                <Text style={styles.infoValue}>{profileData.address}</Text>
              </View>
            </View>
          )}
        </Card>
      </View>

      {/* Quick Access Portal Modules */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Direct Navigation</Text>
        <Card style={styles.actionCard} onPress={() => navigation.navigate('Courses')}>
          <View style={[styles.actionIconWrapper, { backgroundColor: '#EFF6FF' }]}>
            <Icon name="book" size={18} color="#2563EB" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Registered Courses ({courses.length})</Text>
            <Text style={styles.actionSubtitle}>Course schedules, venues, and lecture outlines</Text>
          </View>
          <Icon name="chevron-right" size={14} color="#94A3B8" />
        </Card>
        <Card style={styles.actionCard} onPress={() => navigation.navigate('Attendance')}>
          <View style={[styles.actionIconWrapper, { backgroundColor: '#ECFDF5' }]}>
            <Icon name="calendar" size={18} color="#059669" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Attendance & Exam Eligibility</Text>
            <Text style={styles.actionSubtitle}>Class counts, thresholds, and warning tracking</Text>
          </View>
          <Icon name="chevron-right" size={14} color="#94A3B8" />
        </Card>
        <Card style={styles.actionCard} onPress={() => navigation.navigate('Grades')}>
          <View style={[styles.actionIconWrapper, { backgroundColor: '#FFFBEB' }]}>
            <Icon name="chart-bar" size={18} color="#D97706" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Transcript & Academic Ledger</Text>
            <Text style={styles.actionSubtitle}>Semester-wise GPA, component scores, and honors</Text>
          </View>
          <Icon name="chevron-right" size={14} color="#94A3B8" />
        </Card>
      </View>

      {/* Settings & Toggle States */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <Card style={styles.infoCard}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setSettings({ ...settings, notifications: !settings.notifications })}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.settingTitle}>Academic Notifications</Text>
              <Text style={styles.settingDesc}>Receive immediate notice when marks or attendance update</Text>
            </View>
            <Badge
              label={settings.notifications ? 'Active' : 'Muted'}
              variant={settings.notifications ? 'success' : 'default'}
              size="small"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setSettings({ ...settings, attendanceAlerts: !settings.attendanceAlerts })}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.settingTitle}>Low Attendance SMS Warning</Text>
              <Text style={styles.settingDesc}>Dispatch alert when course presence falls under 75%</Text>
            </View>
            <Badge
              label={settings.attendanceAlerts ? 'Enabled' : 'Disabled'}
              variant={settings.attendanceAlerts ? 'warning' : 'default'}
              size="small"
            />
          </TouchableOpacity>
        </Card>
      </View>
    </>
  );

  const renderFeeDetails = () => (
    <>
      {/* Fee Status Summary Card */}
      <Card style={styles.feeCard}>
        <View style={styles.feeHeaderRow}>
          <View>
            <Text style={styles.feeTitle}>Challan Settlement Status</Text>
            <Text style={styles.feeSemester}>{feeDetails.semester}</Text>
          </View>
          <Badge
            label={feeDetails.pending === 0 ? 'Clear / Paid' : 'Outstanding'}
            variant={feeDetails.pending === 0 ? 'success' : 'danger'}
            size="medium"
          />
        </View>

        <View style={styles.feeAmountContainer}>
          <Text style={styles.feeLabel}>Semester Tuition & Services</Text>
          <Text style={styles.feeAmount}>₨ {feeDetails.totalFee.toLocaleString()}</Text>
        </View>

        <View style={styles.feeStatusContainer}>
          <View style={styles.feeStatusItem}>
            <Text style={styles.feeStatusLabel}>Cleared Amount</Text>
            <Text style={[styles.feeStatusValue, { color: '#059669' }]}>
              ₨ {feeDetails.paid.toLocaleString()}
            </Text>
          </View>
          <View style={styles.feeStatusItem}>
            <Text style={styles.feeStatusLabel}>Outstanding Balance</Text>
            <Text style={[styles.feeStatusValue, { color: feeDetails.pending > 0 ? '#DC2626' : '#059669' }]}>
              ₨ {feeDetails.pending.toLocaleString()}
            </Text>
          </View>
        </View>
      </Card>

      {/* Itemized Fee Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Itemized Fee Invoice</Text>
        <Card>
          <View style={styles.feeBreakdownRow}>
            <Text style={styles.feeBreakdownLabel}>Instructional Tuition</Text>
            <Text style={styles.feeBreakdownValue}>₨ {feeDetails.tuitionFee.toLocaleString()}</Text>
          </View>
          <View style={styles.feeBreakdownRow}>
            <Text style={styles.feeBreakdownLabel}>Computing & Lab Facilities</Text>
            <Text style={styles.feeBreakdownValue}>₨ {feeDetails.labFee.toLocaleString()}</Text>
          </View>
          <View style={styles.feeBreakdownRow}>
            <Text style={styles.feeBreakdownLabel}>Digital Research Library</Text>
            <Text style={styles.feeBreakdownValue}>₨ {feeDetails.libraryFee.toLocaleString()}</Text>
          </View>
          <View style={styles.feeBreakdownRow}>
            <Text style={styles.feeBreakdownLabel}>Student Sports & Recreation</Text>
            <Text style={styles.feeBreakdownValue}>₨ {feeDetails.sportsFee.toLocaleString()}</Text>
          </View>
          <View style={styles.feeBreakdownRow}>
            <Text style={styles.feeBreakdownLabel}>Administrative Services</Text>
            <Text style={styles.feeBreakdownValue}>₨ {feeDetails.miscellaneous.toLocaleString()}</Text>
          </View>
          <View style={[styles.feeBreakdownRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payable Invoice</Text>
            <Text style={styles.totalValue}>₨ {feeDetails.totalFee.toLocaleString()}</Text>
          </View>
        </Card>
      </View>

      {/* Transaction Records */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Official Payment Receipts</Text>
        {feeDetails.paymentHistory.map((payment) => (
          <Card key={payment.id} style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
              <View>
                <Text style={styles.paymentAmount}>₨ {payment.amount.toLocaleString()}</Text>
                <View style={styles.inlineInfo}>
                  <Icon name="calendar" size={11} color="#94A3B8" />
                  <Text style={styles.paymentDate}>{payment.date}</Text>
                </View>
              </View>
              <Badge label={payment.status} variant="success" size="small" />
            </View>
            <Text style={styles.paymentMethod}>Payment Mode: {payment.method}</Text>
          </Card>
        ))}
      </View>
    </>
  );

  const renderFeedback = () => (
    <>
      {/* Course Evaluation Input Card */}
      <Card style={styles.card}>
        <Text style={styles.formHeading}>Course & Faculty Evaluation Form</Text>
        <Text style={styles.formSubheading}>
          Evaluate course delivery, curriculum depth, and instructor support.
        </Text>

        {/* Course Picker Pills */}
        <Text style={styles.inputLabel}>Select Course</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.coursePills}>
          {courses.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.coursePill, feedbackCourse === c.id && styles.coursePillActive]}
              onPress={() => setFeedbackCourse(c.id)}
              activeOpacity={0.8}
            >
              <Text style={[styles.coursePillText, feedbackCourse === c.id && styles.coursePillTextActive]}>
                {c.id}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Evaluation Category Selection */}
        <Text style={styles.inputLabel}>Evaluation Criteria</Text>
        <View style={styles.categoryRow}>
          {['Teaching', 'Course Content', 'Pace', 'Labs'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catButton, feedbackCategory === cat && styles.catButtonActive]}
              onPress={() => setFeedbackCategory(cat)}
            >
              <Text style={[styles.catText, feedbackCategory === cat && styles.catTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Star Rating System */}
        <Text style={styles.inputLabel}>Performance Rating ({rating} of 5 Stars)</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
              style={styles.starTouchable}
              activeOpacity={0.7}
            >
              <Icon
                name={star <= rating ? 'star' : 'star-outline'}
                size={28}
                color={star <= rating ? '#F59E0B' : '#CBD5E1'}
              />
            </TouchableOpacity>
          ))}
        </View>
        {feedbackErrors.rating && (
          <Text style={styles.errorText}>{feedbackErrors.rating}</Text>
        )}

        {/* Written Review */}
        <Text style={styles.inputLabel}>Written Review & Constructive Feedback</Text>
        <TextInput
          style={[styles.feedbackTextInput, feedbackErrors.comments && styles.inputErrorBorder]}
          placeholder="Share your detailed experience regarding lecture delivery, assignment fairness, and lab support..."
          placeholderTextColor="#94A3B8"
          value={feedbackComments}
          onChangeText={(txt) => {
            setFeedbackComments(txt);
            if (feedbackErrors.comments) setFeedbackErrors({ ...feedbackErrors, comments: '' });
          }}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <View style={styles.charCountRow}>
          <Text style={styles.charCountText}>
            {feedbackComments.length} characters (min 15 required)
          </Text>
        </View>
        {feedbackErrors.comments && (
          <Text style={styles.errorText}>{feedbackErrors.comments}</Text>
        )}

        <Button
          title="Submit Academic Feedback"
          onPress={handleSubmitFeedback}
          style={styles.submitBtn}
        />
      </Card>

      {/* Submitted Reviews List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Submitted Evaluations ({submittedFeedbacks.length})</Text>
        {submittedFeedbacks.map((item) => (
          <Card key={item.id} style={styles.submittedCard}>
            <View style={styles.submittedHeader}>
              <View>
                <Text style={styles.submittedCourse}>{item.courseName} ({item.courseId})</Text>
                <Text style={styles.submittedDate}>Filed on {item.date}</Text>
              </View>
              <Badge label={item.category} variant="primary" size="small" />
            </View>
            <View style={styles.submittedStars}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Icon
                  key={s}
                  name={s <= item.rating ? 'star' : 'star-outline'}
                  size={14}
                  color={s <= item.rating ? '#F59E0B' : '#CBD5E1'}
                />
              ))}
            </View>
            <Text style={styles.submittedComments}>"{item.comments}"</Text>
          </Card>
        ))}
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Student Portal"
        subtitle={`Roll # ${studentInfo.id} • FAST NUCES`}
        onBackPress={() => navigation.goBack()}
      />

      {/* Modern 3-Way Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'profile' && styles.tabActive]}
          onPress={() => setSelectedTab('profile')}
        >
          <Text style={[styles.tabText, selectedTab === 'profile' && styles.tabTextActive]}>
            Student ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'fees' && styles.tabActive]}
          onPress={() => setSelectedTab('fees')}
        >
          <Text style={[styles.tabText, selectedTab === 'fees' && styles.tabTextActive]}>
            Fee Ledger
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'feedback' && styles.tabActive]}
          onPress={() => setSelectedTab('feedback')}
        >
          <Text style={[styles.tabText, selectedTab === 'feedback' && styles.tabTextActive]}>
            Evaluation
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {selectedTab === 'profile' && renderProfile()}
          {selectedTab === 'fees' && renderFeeDetails()}
          {selectedTab === 'feedback' && renderFeedback()}
        </View>
        <View style={styles.bottomPadding} />
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
  content: {
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  tab: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
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
  idCardContainer: {
    backgroundColor: '#1E3A8A',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 5,
  },
  idCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
    paddingBottom: 10,
  },
  idCardInstitution: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  idCardSub: {
    fontSize: 11,
    color: '#93C5FD',
    marginTop: 2,
    fontWeight: '500',
  },
  fastLogoBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  fastLogoText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 11,
  },
  idCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  idCardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  idCardAvatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E3A8A',
  },
  idCardDetails: {
    flex: 1,
  },
  idCardName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  idCardRoll: {
    fontSize: 13,
    fontWeight: '700',
    color: '#BFDBFE',
    marginBottom: 6,
  },
  idCardTagRow: {
    flexDirection: 'row',
    gap: 6,
  },
  idCardFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
    paddingTop: 8,
  },
  idCardFooterText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '500',
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  editBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  highlightsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  highlightCard: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
  },
  highlightIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  highlightValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  highlightLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  highlightMeta: {
    fontSize: 10,
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 4,
  },
  infoCard: {
    padding: 16,
  },
  formContainer: {
    paddingVertical: 2,
  },
  formNote: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    maxWidth: '62%',
    textAlign: 'right',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  halfBtn: {
    flex: 1,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 14,
  },
  actionIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  settingDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  feeCard: {
    marginBottom: 16,
    padding: 16,
  },
  feeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  feeTitle: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '800',
  },
  feeSemester: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  feeAmountContainer: {
    marginBottom: 14,
  },
  feeLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  feeAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  feeStatusContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
  },
  feeStatusItem: {
    flex: 1,
  },
  feeStatusLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 2,
    fontWeight: '600',
  },
  feeStatusValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  feeBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  feeBreakdownLabel: {
    fontSize: 13,
    color: '#475569',
  },
  feeBreakdownValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  totalRow: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    marginTop: 8,
    borderRadius: 8,
    borderBottomWidth: 0,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
  },
  paymentCard: {
    marginBottom: 10,
    padding: 14,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  inlineInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paymentDate: {
    fontSize: 11,
    color: '#94A3B8',
  },
  paymentMethod: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  formHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  formSubheading: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.2,
  },
  coursePills: {
    gap: 8,
    marginBottom: 14,
  },
  coursePill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  coursePillActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  coursePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  coursePillTextActive: {
    color: '#FFFFFF',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  catButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catButtonActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  catText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  catTextActive: {
    color: '#2563EB',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  starTouchable: {
    padding: 2,
  },
  feedbackTextInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    color: '#0F172A',
    minHeight: 95,
  },
  inputErrorBorder: {
    borderColor: '#EF4444',
  },
  charCountRow: {
    alignItems: 'flex-end',
    marginTop: 4,
    marginBottom: 6,
  },
  charCountText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  errorText: {
    fontSize: 11,
    color: '#EF4444',
    marginBottom: 8,
    fontWeight: '500',
  },
  submitBtn: {
    marginTop: 10,
  },
  submittedCard: {
    marginBottom: 10,
    padding: 14,
  },
  submittedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  submittedCourse: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  submittedDate: {
    fontSize: 11,
    color: '#94A3B8',
  },
  submittedStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 6,
  },
  submittedComments: {
    fontSize: 12,
    color: '#334155',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  bottomPadding: {
    height: 24,
  },
});

export default ProfileScreen;
