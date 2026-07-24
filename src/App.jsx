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
import CollegeAdminDashboard from './pages/college/Dashboard';
import PreceptorManagement from './pages/college/PreceptorManagement';
import PreceptorList from './pages/college/PreceptorList';
import StudentManagement from './pages/college/StudentManagement';
import StudentList from './pages/college/StudentList';
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
import AcademicSettings from './pages/college/AcademicSettings';
import NotificationSettings from './pages/college/NotificationSettings';
import SecuritySettings from './pages/college/SecuritySettings';
import BackupRestore from './pages/college/BackupRestore';
import AssignStudentsManagement from './pages/college/AssignStudentsManagement';
import AssignedStudentsList from './pages/college/AssignedStudentsList';
import { ThemeProvider } from './context/ThemeContext';

// Preceptor Portal Imports
import PreceptorDashboard from './pages/preceptor/PreceptorDashboard';
import AssignedStudentsHub from './pages/preceptor/AssignedStudentsHub';
import PreceptorStudentList from './pages/preceptor/PreceptorStudentList';
import ClinicalCasesHub from './pages/preceptor/ClinicalCasesHub';
import PreceptorCaseList from './pages/preceptor/PreceptorCaseList';
import PreceptorReportsHub from './pages/preceptor/PreceptorReportsHub';
import PreceptorStudentReports from './pages/preceptor/PreceptorStudentReports';
import PreceptorCaseReports from './pages/preceptor/PreceptorCaseReports';
import PreceptorNotificationsHub from './pages/preceptor/PreceptorNotificationsHub';
import PreceptorInbox from './pages/preceptor/PreceptorInbox';
import PreceptorProfileHub from './pages/preceptor/PreceptorProfileHub';
import PreceptorSettingsHub from './pages/preceptor/PreceptorSettingsHub';
import PreceptorNotificationSettings from './pages/preceptor/PreceptorNotificationSettings';
import PreceptorSecuritySettings from './pages/preceptor/PreceptorSecuritySettings';

// Student Portal Imports
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfileHub from './pages/student/StudentProfileHub';
import StudentNotificationSettings from './pages/student/StudentNotificationSettings';
import StudentNewCase from './pages/student/StudentNewCase';
import PatientProfileForm from './pages/student/PatientProfileForm';
import PatientCounsellingForm from './pages/student/PatientCounsellingForm';
import DrugInformationRequestForm from './pages/student/DrugInformationRequestForm';
import PharmacistInterventionForm from './pages/student/PharmacistInterventionForm';
import ADRForm from './pages/student/ADRForm';
import StudentCasesHub from './pages/student/StudentCasesHub';
import StudentDraftCases from './pages/student/StudentDraftCases';
import StudentSubmittedCases from './pages/student/StudentSubmittedCases';
import StudentReturnedCases from './pages/student/StudentReturnedCases';
import StudentCaseLibrary from './pages/student/StudentCaseLibrary';
import StudentReportsHub from './pages/student/StudentReportsHub';
import StudentAcademicReports from './pages/student/StudentAcademicReports';
import StudentClinicalCaseReports from './pages/student/StudentClinicalCaseReports';
import StudentNotificationsHub from './pages/student/StudentNotificationsHub';
import StudentInbox from './pages/student/StudentInbox';
import StudentSettingsHub from './pages/student/StudentSettingsHub';
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
              <Route path="/register-college" element={<RegisterCollegePage />} />
              <Route path="/college-portal" element={<CollegePortal />} />
              <Route path="/college-login" element={<CollegeLoginPage />} />
              <Route path="/preceptor-login" element={<PreceptorLoginPage />} />
              <Route path="/student-login" element={<StudentLoginPage />} />
              <Route path="/super-admin" element={<AdminLogin />} />
              <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/college-admin/dashboard" element={<CollegeAdminDashboard />} />
              <Route path="/college-admin/preceptors" element={<PreceptorManagement />} />
              <Route path="/college-admin/preceptor-list" element={<PreceptorList />} />
              <Route path="/college-admin/students" element={<StudentManagement />} />
              <Route path="/college-admin/student-list" element={<StudentList />} />
              <Route path="/college-admin/assign-students" element={<AssignStudentsManagement />} />
              <Route path="/college-admin/assign-students/list" element={<AssignedStudentsList />} />
              <Route path="/college-admin/cases" element={<ClinicalCaseManagement />} />
              <Route path="/college-admin/case-list" element={<ClinicalCaseList />} />
              <Route path="/college-admin/case-analytics" element={<CaseAnalytics />} />
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

              {/* Preceptor Portal Routes */}
              <Route path="/preceptor/dashboard" element={<PreceptorDashboard />} />
              <Route path="/preceptor/students" element={<AssignedStudentsHub />} />
              <Route path="/preceptor/students/list" element={<PreceptorStudentList />} />
              <Route path="/preceptor/cases" element={<ClinicalCasesHub />} />
              <Route path="/preceptor/cases/list" element={<PreceptorCaseList />} />
              <Route path="/preceptor/reports" element={<PreceptorReportsHub />} />
              <Route path="/preceptor/reports/students" element={<PreceptorStudentReports />} />
              <Route path="/preceptor/reports/cases" element={<PreceptorCaseReports />} />
              <Route path="/preceptor/notifications" element={<PreceptorNotificationsHub />} />
              <Route path="/preceptor/notifications/inbox" element={<PreceptorInbox />} />
              <Route path="/preceptor/profile" element={<PreceptorProfileHub />} />
              <Route path="/preceptor/settings" element={<PreceptorSettingsHub />} />
              <Route path="/preceptor/settings/notifications" element={<PreceptorNotificationSettings />} />
              <Route path="/preceptor/settings/security" element={<PreceptorSecuritySettings />} />

              {/* Student Portal Routes */}
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/cases" element={<StudentCasesHub />} />
              <Route path="/student/cases/new" element={<StudentNewCase />} />
              <Route path="/student/cases/drafts" element={<StudentDraftCases />} />
              <Route path="/student/cases/submitted" element={<StudentSubmittedCases />} />
              <Route path="/student/cases/returned" element={<StudentReturnedCases />} />
              <Route path="/student/library" element={<StudentCaseLibrary />} />
              <Route path="/student/reports" element={<StudentReportsHub />} />
              <Route path="/student/reports/academic" element={<StudentAcademicReports />} />
              <Route path="/student/reports/cases" element={<StudentClinicalCaseReports />} />
              <Route path="/student/notifications" element={<StudentNotificationsHub />} />
              <Route path="/student/notifications/inbox" element={<StudentInbox />} />
              <Route path="/student/profile" element={<StudentProfileHub />} />
              <Route path="/student/settings" element={<StudentSettingsHub />} />
              <Route path="/student/settings/notifications" element={<StudentNotificationSettings />} />
              <Route path="/student/new-case" element={<StudentNewCase />} />
              <Route path="/student/new-case/patient-profile" element={<PatientProfileForm />} />
              <Route path="/student/new-case/patient-counselling" element={<PatientCounsellingForm />} />
              <Route path="/student/new-case/drug-information" element={<DrugInformationRequestForm />} />
              <Route path="/student/new-case/pharmacist-intervention" element={<PharmacistInterventionForm />} />
              <Route path="/student/new-case/adr-reporting" element={<ADRForm />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}

export default App;
