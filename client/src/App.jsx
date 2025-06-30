import { useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddJob from './components/admin/AddJob';
// Pages
import Home from './pages/Home';
import Applications from './pages/Applications';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import Blog from './pages/Blog';
import Press from './pages/Press';
import HelpCenter from './pages/HelpCenter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Careers from './pages/Careers';
import RemoteJobs from './pages/RemoteJobs';
import InternshipJobs from './pages/InternshipJobs';
import MNCJobs from './pages/MNCJobs';
import FresherJobs from './pages/FresherJobs';
import FullTimeJobs from './pages/FullTimeJobs';
import WalkInJobs from './pages/WalkinJobs';
import ITJobs from './pages/ITJobs';
import HRJobs from './pages/HRJobs';
import MarketingJobs from './pages/MarketingJobs';
import StartupJobs from './pages/StartupJobs';
import Register from './pages/Register';
import Login from './pages/Login';

// Recruiter login modal
import RecruiterLogin from './components/RecruiterLogin';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AddJobPage from './pages/admin/AddJobPage';
import ManageJobs from './pages/admin/ManageJobs';
import ViewApplications from './pages/admin/ViewApplications';
import JobPreview from './pages/admin/JobPreview';
import JobAnalytics from './components/admin/JobAnalytics';
import ApplicantsTable from './components/admin/ApplicantsTable';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div>
        {showRecruiterLogin && <RecruiterLogin />}
        <ToastContainer autoClose={2000} position="top-right" />
        
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/press" element={<Press />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Job Category Pages */}
            <Route path="/remote-jobs" element={<RemoteJobs />} />
            <Route path="/internship-jobs" element={<InternshipJobs />} />
            <Route path="/mnc-jobs" element={<MNCJobs />} />
            <Route path="/fresher-jobs" element={<FresherJobs />} />
            <Route path="/fulltime-jobs" element={<FullTimeJobs />} />
            <Route path="/walkin-jobs" element={<WalkInJobs />} />
            <Route path="/it-jobs" element={<ITJobs />} />
            <Route path="/hr-jobs" element={<HRJobs />} />
            <Route path="/marketing-jobs" element={<MarketingJobs />} />
            <Route path="/startup-jobs" element={<StartupJobs />} />

            {/* Admin Dashboard Routes */}
            {companyToken && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/add-job" element={<AddJob />} />
                <Route path="/admin/manage-jobs" element={<ManageJobs />} />
                <Route path="/admin/view-applications" element={<ViewApplications />} />
                <Route path="/admin/job-preview/:id" element={<JobPreview />} />
                <Route path="/admin/analytics" element={<JobAnalytics />} />
                <Route path="/admin/applicants" element={<ApplicantsTable />} />
              </>
            )}
          </Routes>
       
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
