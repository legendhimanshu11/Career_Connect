// src/components/admin/JobAnalytics.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const JobAnalytics = ({ jobs }) => {
  // Generate job performance data
  const jobPerformanceData = jobs.map((job) => ({
    name: job.title.length > 10 ? job.title.slice(0, 10) + "..." : job.title,
    views: job.views || 0,
    applications: job.applicants?.length || 0,
  }));

  // Generate dummy impression data for now (static trend)
  const impressionTrendData = [
    { day: 'Mon', impressions: 40 },
    { day: 'Tue', impressions: 55 },
    { day: 'Wed', impressions: 65 },
    { day: 'Thu', impressions: 70 },
    { day: 'Fri', impressions: 60 },
    { day: 'Sat', impressions: 90 },
    { day: 'Sun', impressions: 100 },
  ];

  return (
    <div className="space-y-10">
      {/* Job Performance - Bar Chart */}
      <motion.div
        className="p-6 rounded-lg bg-white shadow-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-bold text-gray-700 mb-4">Job Performance (Views & Applications)</h2>
        {jobPerformanceData.length === 0 ? (
          <p className="text-gray-500">No job data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobPerformanceData}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <Tooltip />
              <Bar dataKey="views" fill="#60a5fa" radius={[4, 4, 0, 0]} />
              <Bar dataKey="applications" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Impression Trend - Line Chart */}
      <motion.div
        className="p-6 rounded-lg bg-white shadow-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg font-bold text-gray-700 mb-4">Impression Trends (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={impressionTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="impressions"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

JobAnalytics.propTypes = {
  jobs: PropTypes.array,
};
JobAnalytics.defaultProps={
  jobs:[],
};


export default JobAnalytics;