import { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { motion, AnimatePresence, complex } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import allJobsStatic from '../data/allJobs';
import FilterSidebar from './FilterSidebar';
import ApplyModal from './ApplyModal';

const LatestJobs = () => {
  const [slide, setSlide] = useState(0);
  const [filters, setFilters] = useState({ type: [], location: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  const jobsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/job`);
        const backendJobs = Array.isArray(res.data.jobs) ? res.data.jobs : [];

        const jobMap = {};
        allJobsStatic.forEach((job) => {
          jobMap[job.id] = job;
        });

        backendJobs.forEach((job) => {
          jobMap[job._id || job.id] = {
            ...job,
            id: job._id || job.id,
            tags: job.tags || [],
            logo: job.logo || assets.company_logo,
            company: job.company ||'Unknown Company',
            description:job.description ||'No description provided.'
          };
        });

        const mergedJobs = Object.values(jobMap);
        setJobs(mergedJobs);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load backend jobs. Showing static data.');
        setJobs(allJobsStatic);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
    const matchesLocation = filters.location.length === 0 || filters.location.includes(job.location);
    return matchesType && matchesLocation;
  });

  const totalSlides = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(slide * jobsPerPage, (slide + 1) * jobsPerPage);

  const nextSlide = () => setSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [filteredJobs.length]);

  const openModal = (job) => {
    if (!job || !job.id) return toast.error('Invalid Job ID');
    setSelectedJob(job);
    setModalOpen(true);
  };

  return (
    <section className="py-16 px-4 md:px-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-6">
          <FilterSidebar filters={filters} setFilters={setFilters} recentSearches={recentSearches} />

          <div className="w-full md:w-3/4">
            <h2 className="text-3xl font-semibold text-slate-800 dark:text-white mb-4 ml-2 transition hover:text-indigo-600 hover:underline underline-offset-4 duration-300">
              Latest Jobs
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5 }}
                className="grid gap-6 sm:grid-cols-2"
              >
                {currentJobs.map((job, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {job.logo && (
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-10 h-10 rounded-full object-contain"
                        />
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{job.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{job.company} • {job.location}</p>
                      </div>
                    </div>
                    <p className="text-xs mb-2 text-indigo-600 dark:text-indigo-400 font-medium">{job.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-3 h-12 overflow-hidden">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-50 dark:bg-indigo-700 text-indigo-600 dark:text-white px-2 py-1 text-xs rounded-full border border-indigo-200 dark:border-indigo-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => openModal(job)}
                      className="w-full text-sm py-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 dark:from-indigo-600 dark:to-purple-600 text-white transition shadow hover:shadow-lg"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-8">
              <button onClick={prevSlide} className="hover:scale-105 transition">
                <img src={assets.left_arrow_icon} alt="Previous" className="h-5 w-5 dark:invert" />
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-full ${i === slide ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'} cursor-pointer`}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
              <button onClick={nextSlide} className="hover:scale-105 transition">
                <img src={assets.right_arrow_icon} alt="Next" className="h-5 w-5 dark:invert" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {
        <ApplyModal isOpen ={modalOpen}
        setIsOpen={setModalOpen}
        job={selectedJob}
        />
      }
    </section>
  );
};

export default LatestJobs;
