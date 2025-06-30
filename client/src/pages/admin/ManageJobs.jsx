import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });
      setJobs(data.jobsData || []);
    } catch (err) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (jobId) => {
    setSelectedJobId(jobId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/api/company/delete-job/${selectedJobId}`, {
        headers: { token: companyToken },
      });
      toast.success('Job deleted successfully');
      setDeleteModalOpen(false);
      fetchJobs();
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const toggleVisibility = async (jobId) => {
    try {
      await axios.post(
        `${backendUrl}/api/company/change-visiblity`,
        { id: jobId },
        { headers: { token: companyToken } }
      );
      fetchJobs();
    } catch (error) {
      toast.error('Failed to update visibility');
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-white via-[#f5f5ff] to-[#e4f0ff]">
      <h1 className="text-2xl font-bold mb-6">Manage Your Jobs</h1>

      {loading ? (
        <div className="text-gray-500">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border p-5 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">{job.title}</h2>
                  <p className="text-sm text-gray-500">{job.location} • {job.level}</p>
                  <p className="text-sm mt-1">Applicants: <b>{job.applicants}</b></p>
                  <p className={`text-xs mt-1 ${job.visible ? 'text-green-600' : 'text-red-500'}`}>
                    {job.visible ? 'Visible' : 'Hidden'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Views: <span className="font-semibold">{job.views || 0}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => navigate(`/admin/job-preview?id=${job._id}`)}
                  >
                    Preview
                  </button>
                  <button
                    className="text-yellow-500 hover:underline"
                    onClick={() => toggleVisibility(job._id)}
                  >
                    Toggle Visibility
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteClick(job._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName="job"
      />
    </div>
  );
};

export default ManageJobs;
