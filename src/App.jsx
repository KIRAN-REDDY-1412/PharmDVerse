import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterCollegePage from './pages/RegisterCollegePage';
import CollegePortal from './pages/college/CollegePortal';
import CollegeLoginPage from './pages/college/CollegeLoginPage';
import PreceptorLoginPage from './pages/college/PreceptorLoginPage';
import StudentLoginPage from './pages/college/StudentLoginPage';
import AdminLogin from './pages/admin/AdminLogin';
import SuperAdminDashboard from './pages/admin/Dashboard';
import CollegeManagement from './pages/admin/CollegeManagement';
import AddCollege from './pages/admin/AddCollege';
import ViewCollege from './pages/admin/ViewCollege';
import EditCollege from './pages/admin/EditCollege';
import ManageCollegeAdmins from './pages/admin/ManageCollegeAdmins';
import CollegeSubscription from './pages/admin/CollegeSubscription';
import CollegeAnalytics from './pages/admin/CollegeAnalytics';
import CollegeAuditLogs from './pages/admin/CollegeAuditLogs';
import SubscriptionDashboard from './pages/admin/SubscriptionDashboard';
import SubscriptionList from './pages/admin/SubscriptionList';
import CreateSubscriptionPlan from './pages/admin/CreateSubscriptionPlan';
import EditSubscriptionPlan from './pages/admin/EditSubscriptionPlan';
import AssignSubscription from './pages/admin/AssignSubscription';
import RenewSubscription from './pages/admin/RenewSubscription';
import LicenseManagement from './pages/admin/LicenseManagement';
import PaymentHistory from './pages/admin/PaymentHistory';
import UsageMonitoring from './pages/admin/UsageMonitoring';
import ExpiryAlerts from './pages/admin/ExpiryAlerts';
import UserDashboard from './pages/admin/UserDashboard';
import UserList from './pages/admin/UserList';
import ViewUser from './pages/admin/ViewUser';
import EditUser from './pages/admin/EditUser';
import RolePermissionMatrix from './pages/admin/RolePermissionMatrix';
import CollegeLandingPage from './pages/CollegeLandingPage';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import ReportGenerator from './pages/admin/ReportGenerator';
import NotificationDashboard from './pages/admin/NotificationDashboard';
import CreateNotification from './pages/admin/CreateNotification';
import NotificationHistory from './pages/admin/NotificationHistory';
import SystemAuditLogs from './pages/admin/SystemAuditLogs';
import PlatformSettings from './pages/admin/PlatformSettings';
import AdminSupportHub from './pages/admin/AdminSupportHub';
import MyProfile from './pages/admin/MyProfile';
import ClinicalCaseRepository from './pages/admin/ClinicalCaseRepository';
import ComingSoon from './pages/ComingSoon';
import CollegeAdminDashboard from './pages/college/Dashboard';
import PreceptorManagement from './pages/college/PreceptorManagement';
import PreceptorList from './pages/college/PreceptorList';
import PreceptorProfile from './pages/college/PreceptorProfile';
import StudentManagement from './pages/college/StudentManagement';
import StudentList from './pages/college/StudentList';
import StudentProfile from './pages/college/StudentProfile';
import ClinicalCaseManagement from './pages/college/ClinicalCaseManagement';
import ClinicalCaseList from './pages/college/ClinicalCaseList';
import CaseAnalytics from './pages/college/CaseAnalytics';
import ReportsManagement from './pages/college/ReportsManagement';
import StudentReports from './pages/college/StudentReports';
import PreceptorReports from './pages/college/PreceptorReports';
import ClinicalCaseReports from './pages/college/ClinicalCaseReports';
import AcademicYearReports from './pages/college/AcademicYearReports';
import MyProfileManagement from './pages/college/MyProfileManagement';
import NotificationsManagement from './pages/college/NotificationsManagement';
import NotificationsInbox from './pages/college/NotificationsInbox';
import SettingsManagement from './pages/college/SettingsManagement';
import CollegeInformation from './pages/college/CollegeInformation';
import AcademicYearManagement from './pages/college/AcademicYearManagement';
import AcademicSettings from './pages/college/AcademicSettings';
import NotificationSettings from './pages/college/NotificationSettings';
import SecuritySettings from './pages/college/SecuritySettings';
import BackupRestore from './pages/college/BackupRestore';
import CollegeSupportHub from './pages/college/CollegeSupportHub';
import AssignStudentsManagement from './pages/college/AssignStudentsManagement';
import AssignedStudentsList from './pages/college/AssignedStudentsList';
import { ThemeProvider } from './context/ThemeContext';
import AdminCaseViewPage from './pages/college/AdminCaseViewPage';

// Preceptor Portal Imports
import PreceptorDashboard from './pages/preceptor/PreceptorDashboard';
import AssignedStudentsHub from './pages/preceptor/AssignedStudentsHub';
import PreceptorStudentList from './pages/preceptor/PreceptorStudentList';
import ClinicalCasesHub from './pages/preceptor/ClinicalCasesHub';
import PreceptorCaseList from './pages/preceptor/PreceptorCaseList';
import FinalReview from './pages/preceptor/FinalReview';
import PreceptorNotifications from './pages/preceptor/PreceptorNotifications';
import PreceptorInbox from './pages/preceptor/PreceptorInbox';
import PreceptorProfileHub from './pages/preceptor/PreceptorProfileHub';
import PreceptorSettingsHub from './pages/preceptor/PreceptorSettingsHub';
import PreceptorSupportHub from './pages/preceptor/PreceptorSupportHub';
import PreceptorNotificationSettings from './pages/preceptor/PreceptorNotificationSettings';
import PreceptorSecuritySettings from './pages/preceptor/PreceptorSecuritySettings';
import PreceptorReviewFramework from './components/preceptor/PreceptorReviewFramework';

// Student Portal Imports
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfileHub from './pages/student/StudentProfileHub';
import StudentNotificationSettings from './pages/student/StudentNotificationSettings';
import StudentNewCase from './pages/student/StudentNewCase';
import PatientProfileForm from './components/forms/PatientProfileForm';
import PatientCounsellingForm from './components/forms/PatientCounsellingForm';
import DrugInformationRequestForm from './components/forms/DrugInformationRequestForm';
import PharmacistInterventionForm from './components/forms/PharmacistInterventionForm';
import ADRForm from './components/forms/ADRForm';
import StudentCasesHub from './pages/student/StudentCasesHub';
import StudentCaseLibrary from './pages/student/StudentCaseLibrary';
import StudentNotifications from './components/student/StudentNotifications';
import StudentInbox from './pages/student/StudentInbox';
import StudentSettingsHub from './pages/student/StudentSettingsHub';
import StudentSupport from './pages/student/StudentSupport';
import ClinicalDocumentationHub from './components/forms/ClinicalDocumentationHub';
import { AuthProvider } from './context/AuthContext';
import { DatabaseProvider } from './context/DatabaseContext';

function App() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/register-college" element={<RegisterCollegePage />} />
              <Route path="/college-portal" element={<CollegePortal />} />
              <Route path="/college-login" element={<CollegeLoginPage />} />
              <Route path="/preceptor-login" element={<PreceptorLoginPage />} />
              <Route path="/student-login" element={<StudentLoginPage />} />
              <Route path="/super-admin" element={<AdminLogin />} />
              <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/super-admin/college-management" element={<CollegeManagement />} />
              <Route path="/super-admin/colleges" element={<CollegeManagement />} />
              <Route path="/super-admin/colleges/add" element={<AddCollege />} />
              <Route path="/super-admin/colleges/view/:id" element={<ViewCollege />} />
              <Route path="/super-admin/colleges/edit/:id" element={<EditCollege />} />
              <Route path="/super-admin/colleges/:id/admins" element={<ManageCollegeAdmins />} />
              <Route path="/super-admin/colleges/:id/subscription" element={<CollegeSubscription />} />
              <Route path="/super-admin/colleges/:id/analytics" element={<CollegeAnalytics />} />
              <Route path="/super-admin/colleges/:id/audit-logs" element={<CollegeAuditLogs />} />
              <Route path="/super-admin/subscription" element={<SubscriptionDashboard />} />
              <Route path="/super-admin/subscriptions" element={<SubscriptionDashboard />} />
              <Route path="/super-admin/subscriptions/list" element={<SubscriptionList />} />
              <Route path="/super-admin/subscriptions/plans/create" element={<CreateSubscriptionPlan />} />
              <Route path="/super-admin/subscriptions/plans/edit/:id" element={<EditSubscriptionPlan />} />
              <Route path="/super-admin/subscriptions/assign" element={<AssignSubscription />} />
              <Route path="/super-admin/subscriptions/renew/:id" element={<RenewSubscription />} />
              <Route path="/super-admin/subscriptions/licenses" element={<LicenseManagement />} />
              <Route path="/super-admin/subscriptions/payments" element={<PaymentHistory />} />
              <Route path="/super-admin/subscriptions/usage" element={<UsageMonitoring />} />
              <Route path="/super-admin/subscriptions/alerts" element={<ExpiryAlerts />} />
              <Route path="/super-admin/users" element={<UserDashboard />} />
              <Route path="/super-admin/users/list" element={<UserList />} />
              <Route path="/super-admin/users/view/:id" element={<ViewUser />} />
              <Route path="/super-admin/users/edit/:id" element={<EditUser />} />
              
              <Route path="/super-admin/analytics" element={<AnalyticsDashboard />} />
              <Route path="/super-admin/analytics/reports" element={<ReportGenerator />} />
              
              <Route path="/super-admin/notifications" element={<NotificationDashboard />} />
              <Route path="/super-admin/notifications/create" element={<CreateNotification />} />
              <Route path="/super-admin/notifications/history" element={<NotificationHistory />} />
              
              <Route path="/super-admin/audit-logs" element={<SystemAuditLogs />} />
              <Route path="/super-admin/cases" element={<ClinicalCaseRepository />} />
              <Route path="/super-admin/cases/view/:id" element={<ClinicalDocumentationHub role="superadmin" />} />
              <Route element={<PreceptorReviewFramework role="superadmin" />}>
                <Route path="/super-admin/cases/view/:id/patient-profile" element={<PatientProfileForm role="superadmin" />} />
                <Route path="/super-admin/cases/view/:id/patient-counselling" element={<PatientCounsellingForm role="superadmin" />} />
                <Route path="/super-admin/cases/view/:id/drug-information" element={<DrugInformationRequestForm role="superadmin" />} />
                <Route path="/super-admin/cases/view/:id/pharmacist-intervention" element={<PharmacistInterventionForm role="superadmin" />} />
                <Route path="/super-admin/cases/view/:id/adr-reporting" element={<ADRForm role="superadmin" />} />
              </Route>
              <Route path="/super-admin/settings" element={<PlatformSettings />} />
              <Route path="/super-admin/platform-settings" element={<PlatformSettings />} />
              <Route path="/super-admin/support" element={<AdminSupportHub />} />
              <Route path="/super-admin/help-support" element={<AdminSupportHub />} />
              <Route path="/super-admin/profile" element={<MyProfile />} />
              <Route path="/college-admin/dashboard" element={<CollegeAdminDashboard />} />
              <Route path="/college-admin/preceptors" element={<PreceptorManagement />} />
              <Route path="/college-admin/preceptors/list" element={<PreceptorList />} />
              <Route path="/college-admin/preceptors/:id" element={<PreceptorProfile />} />
              <Route path="/college-admin/students" element={<StudentManagement />} />
              <Route path="/college-admin/students/list" element={<StudentList />} />
              <Route path="/college-admin/students/view/:id" element={<StudentProfile />} />
              <Route path="/college-admin/assign-students" element={<AssignStudentsManagement />} />
              <Route path="/college-admin/assign-students/list" element={<AssignedStudentsList />} />
              <Route path="/college-admin/cases" element={<ClinicalCaseManagement />} />
              <Route path="/college-admin/cases/list" element={<ClinicalCaseList />} />
              <Route path="/college-admin/cases/view/:id" element={<ClinicalDocumentationHub role="admin" />} />
              <Route element={<PreceptorReviewFramework role="admin" />}>
                <Route path="/college-admin/cases/view/:id/patient-profile" element={<PatientProfileForm role="admin" />} />
                <Route path="/college-admin/cases/view/:id/patient-counselling" element={<PatientCounsellingForm role="admin" />} />
                <Route path="/college-admin/cases/view/:id/drug-information" element={<DrugInformationRequestForm role="admin" />} />
                <Route path="/college-admin/cases/view/:id/pharmacist-intervention" element={<PharmacistInterventionForm role="admin" />} />
                <Route path="/college-admin/cases/view/:id/adr-reporting" element={<ADRForm role="admin" />} />
              </Route>
              <Route path="/college-admin/cases/analytics" element={<CaseAnalytics />} />
              <Route path="/college-admin/reports" element={<ReportsManagement />} />
              <Route path="/college-admin/reports/students" element={<StudentReports />} />
              <Route path="/college-admin/reports/preceptors" element={<PreceptorReports />} />
              <Route path="/college-admin/reports/cases" element={<ClinicalCaseReports />} />
              <Route path="/college-admin/reports/academic-year" element={<AcademicYearReports />} />
              <Route path="/college-admin/profile" element={<MyProfileManagement />} />
              <Route path="/college-admin/notifications" element={<NotificationsManagement />} />
              <Route path="/college-admin/notifications/inbox" element={<NotificationsInbox />} />
              <Route path="/college-admin/settings" element={<SettingsManagement />} />
              <Route path="/college-admin/settings/college-info" element={<CollegeInformation />} />

              <Route path="/college-admin/settings/academic" element={<AcademicSettings />} />
              <Route path="/college-admin/settings/notifications" element={<NotificationSettings />} />
              <Route path="/college-admin/settings/security" element={<SecuritySettings />} />
              <Route path="/college-admin/settings/backup" element={<BackupRestore />} />
              <Route path="/college-admin/support" element={<CollegeSupportHub />} />

              {/* Preceptor Portal Routes */}
              <Route path="/preceptor/dashboard" element={<PreceptorDashboard />} />
              <Route path="/preceptor/students" element={<AssignedStudentsHub />} />
              <Route path="/preceptor/students/list" element={<PreceptorStudentList />} />
              <Route path="/preceptor/cases" element={<ClinicalCasesHub />} />
              <Route path="/preceptor/cases/list" element={<PreceptorCaseList />} />
              <Route path="/preceptor/cases/view/:id" element={<ClinicalDocumentationHub role="preceptor" />} />
              <Route element={<PreceptorReviewFramework />}>
                <Route path="/preceptor/cases/view/:id/patient-profile" element={<PatientProfileForm role="preceptor" />} />
                <Route path="/preceptor/cases/view/:id/patient-counselling" element={<PatientCounsellingForm role="preceptor" />} />
                <Route path="/preceptor/cases/view/:id/drug-information" element={<DrugInformationRequestForm role="preceptor" />} />
                <Route path="/preceptor/cases/view/:id/pharmacist-intervention" element={<PharmacistInterventionForm role="preceptor" />} />
                <Route path="/preceptor/cases/view/:id/adr-reporting" element={<ADRForm role="preceptor" />} />
              </Route>
              <Route path="/preceptor/cases/view/:id/final-review" element={<FinalReview />} />
              <Route path="/preceptor/notifications" element={<PreceptorNotifications />} />
              <Route path="/preceptor/notifications/inbox" element={<PreceptorInbox />} />
              <Route path="/preceptor/profile" element={<PreceptorProfileHub />} />
              <Route path="/preceptor/settings" element={<PreceptorSettingsHub />} />
              <Route path="/preceptor/support" element={<PreceptorSupportHub />} />
              <Route path="/preceptor/settings/notifications" element={<PreceptorNotificationSettings />} />
              <Route path="/preceptor/settings/security" element={<PreceptorSecuritySettings />} />

              {/* Student Portal Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/cases" element={<StudentCasesHub />} />
              <Route path="/student/cases/new" element={<StudentNewCase />} />
              <Route path="/student/library" element={<StudentCaseLibrary />} />
              <Route path="/student/cases/view/:id" element={<ClinicalDocumentationHub role="student" />} />
              <Route path="/student/cases/view/:id/patient-profile" element={<PatientProfileForm role="student" />} />
              <Route path="/student/cases/view/:id/patient-counselling" element={<PatientCounsellingForm role="student" />} />
              <Route path="/student/cases/view/:id/drug-information" element={<DrugInformationRequestForm role="student" />} />
              <Route path="/student/cases/view/:id/pharmacist-intervention" element={<PharmacistInterventionForm role="student" />} />
              <Route path="/student/cases/view/:id/adr-reporting" element={<ADRForm role="student" />} />
              <Route path="/student/cases/edit/:id" element={<ClinicalDocumentationHub role="student" />} />
              <Route path="/student/notifications" element={<StudentNotifications />} />
              <Route path="/student/notifications/inbox" element={<StudentInbox />} />
              <Route path="/student/profile" element={<StudentProfileHub />} />
              <Route path="/student/settings" element={<StudentSettingsHub />} />
              <Route path="/student/support" element={<StudentSupport />} />
              <Route path="/student/settings/notifications" element={<StudentNotificationSettings />} />
              <Route path="/student/new-case" element={<StudentNewCase />} />
              <Route path="/super-admin/users/role-matrix" element={<RolePermissionMatrix />} />
              <Route path="/student/new-case/patient-profile" element={<PatientProfileForm />} />
              <Route path="/student/new-case/patient-counselling" element={<PatientCounsellingForm />} />
              <Route path="/student/new-case/drug-information" element={<DrugInformationRequestForm />} />
              <Route path="/student/new-case/pharmacist-intervention" element={<PharmacistInterventionForm />} />
              <Route path="/student/new-case/adr-reporting" element={<ADRForm />} />
              <Route path="/:slug" element={<CollegeLandingPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
