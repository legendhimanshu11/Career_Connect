import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const ApplyJob = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [JobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error('Login to apply for jobs');
      }

      if (!userData.resume) {
        navigate('/applications');
        return toast.error('Upload resume to apply');
      }

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
        navigate('/thank-you');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item.jobId._id === JobData._id
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied();
    }
  }, [JobData, userApplications, id]);

  return JobData ? (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col py-10 container px-4 sm:px-6 md:px-10 2xl:px-20 mx-auto"
      >
        <div className="bg-white text-black rounded-lg shadow-md w-full">
          {/* Header section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center md:justify-between flex-wrap gap-6 px-6 sm:px-8 py-10 sm:py-16 mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-sky-400 rounded-xl"
          >
            <div className="flex flex-col md:flex-row items-center text-center md:text-left">
              <img
                className="h-24 bg-white rounded-lg p-4 border mb-4 md:mb-0 md:mr-4"
                src={JobData.companyId.image}
                alt="Company Logo"
              />
              <div className="text-neutral-700">
                <h1 className="text-2xl sm:text-4xl font-semibold text-blue-800">
                  {JobData.title}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-gray-600 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.suitcase_icon}
                      alt="Company"
                      className="h-4"
                    />
                    {JobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.location_icon}
                      alt="Location"
                      className="h-4"
                    />
                    {JobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.person_icon}
                      alt="Level"
                      className="h-4"
                    />
                    {JobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.money_icon}
                      alt="Salary"
                      className="h-4"
                    />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center md:items-end text-sm">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={applyHandler}
                disabled={isAlreadyApplied}
                className="bg-gradient-to-r from-indigo-600 to-purple-500 py-3 px-10 text-white rounded shadow-md hover:opacity-90 disabled:opacity-50 transition font-semibold"
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </motion.button>
              <p className="mt-2 text-gray-600">
                Posted {moment(JobData.date).fromNow()}
              </p>
            </div>
          </motion.div>

          {/* Main body section */}
          <div className="flex flex-col lg:flex-row justify-between items-start px-6 sm:px-8 pb-10 gap-10">
            {/* Job Description */}
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl text-blue-800 mb-4">
                Job Description
              </h2>
              <div
                className="prose prose-blue max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              ></div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={applyHandler}
                disabled={isAlreadyApplied}
                className="bg-gradient-to-r from-indigo-600 to-purple-500 p-3 px-10 text-white rounded mt-10 shadow-md hover:opacity-90 disabled:opacity-50 transition font-semibold"
              >
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </motion.button>
            </div>

            {/* Related Jobs */}
            <div className="w-full lg:w-1/3">
              <h2 className="font-semibold text-xl text-blue-800 mb-4">
                More jobs from {JobData.companyId.name}
              </h2>
              {jobs
                .filter(
                  (job) =>
                    job._id !== JobData._id &&
                    job.companyId._id === JobData.companyId._id
                )
                .filter((job) => {
                  const appliedJobsIds = new Set(
                    userApplications.map(
                      (app) => app.jobId && app.jobId._id
                    )
                  );
                  return !appliedJobsIds.has(job._id);
                })
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;