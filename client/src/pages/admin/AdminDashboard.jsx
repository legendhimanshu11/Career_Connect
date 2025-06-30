// src/pages/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import DashboardHeader from '../../components/admin/DashboardHeader';
import WorkingTypeChart from '../../components/admin/WorkingTypeChart';
import ApplicantsTable from '../../components/admin/ApplicantsTable';
import NotQualifiedChart from '../../components/admin/NotQualifiedChart';
import ImpressionsChart from '../../components/admin/ImpressionsChart';
import JobAnalytics from '../../components/admin/JobAnalytics';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const AdminDashboard = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [showNotQualified, setShowNotQualified] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [jobsRes, appsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/company/list-jobs`, {
          headers: { token: companyToken },
        }),
        axios.get(`${backendUrl}/api/company/applicants`, {
          headers: { token: companyToken },
        }),
      ]);

      setJobs(jobsRes.data.jobsData || []);
      setApplications(appsRes.data.applications || []);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalViews = jobs.reduce((acc, job) => acc + (job.views || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ee] via-[#fef1f6] to-[#eaf9f8] p-5 font-sans">
      {/* Header Section */}
      <DashboardHeader
        jobCount={jobs.length}
        applicationCount={applications.length}
        viewCount={totalViews}
        loading={loading}
      />

      {/* Grid Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">
        <WorkingTypeChart applications={applications} />
        <ApplicantsTable applications={applications} />
        <ImpressionsChart jobs={jobs} />
      </div>

      {/* Bottom Section: Collapsible Analytics */}
      <div className="mt-6 space-y-4">

        {/* Job Analytics Collapsible */}
        <div className="bg-white rounded-md shadow p-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowAnalytics((prev) => !prev)}
          >
            <h2 className="text-lg font-semibold text-gray-700">📊 Job Analytics</h2>
            <span className="text-sm text-blue-600">
              {showAnalytics ? 'Hide ▲' : 'Show ▼'}
            </span>
          </div>
          {showAnalytics && jobs.length >0 && (
            <div className="mt-4">
              <JobAnalytics jobs={jobs} />
            </div>
          )}
        </div>

        {/* Not Qualified Chart Collapsible */}
        <div className="bg-white rounded-md shadow p-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowNotQualified((prev) => !prev)}
          >
            <h2 className="text-lg font-semibold text-gray-700">🚫 Not Qualified Breakdown</h2>
            <span className="text-sm text-blue-600">
              {showNotQualified ? 'Hide ▲' : 'Show ▼'}
            </span>
          </div>
          {showNotQualified && (
            <div className="mt-4">
              <NotQualifiedChart applications={applications} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
