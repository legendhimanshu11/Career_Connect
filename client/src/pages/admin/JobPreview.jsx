import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const JobPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); // ✅ Use query param instead of useParams

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`/api/jobs/${id}`);
        setJob(res.data.job);

        // Increment views
        await axios.post(`/api/jobs/increment-views/${id}`);
      } catch (err) {
        toast.error('Failed to fetch job details');
        navigate('/admin/manage-jobs');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id, navigate]);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading job preview...</div>;
  if (!job) return <div className="text-center mt-10 text-red-600">Job not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md mt-6"
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center mb-6 text-sm text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back
      </button>

      <div className="flex items-center gap-4 mb-4">
        {job.logo && (
          <img src={job.logo} alt={job.company} className="w-14 h-14 object-cover rounded" />
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
          <p className="text-sm text-gray-500">{job.company} • {job.location}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
          {job.type}
        </span>
        {job.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-600 mb-6">
        <span className="font-medium text-black">Views:</span> {job.views || 0}
      </p>

      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {job.description}
      </div>
    </motion.div>
  );
};

export default JobPreview;
