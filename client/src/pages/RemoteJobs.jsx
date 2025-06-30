import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import allJobs from '../data/allJobs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';

const RemoteJobs = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  const jobsPerPage = 6;

  // ⿡ Only include jobs with tag "Remote" (case insensitive)
  const remoteJobs = allJobs.filter((job) =>
    job.tags?.some(tag => tag.toLowerCase() === 'remote')
  );

  useEffect(() => {
    let jobs = remoteJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(search.toLowerCase()) &&
        job.location?.toLowerCase().includes(location.toLowerCase())
    );

    // ⿢ Sorting by title or company
    if (sortOption === 'title') {
      jobs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'company') {
      jobs.sort((a, b) =>
        (a.companyId?.name || '').localeCompare(b.companyId?.name || '')
      );
    }

    setFilteredJobs(jobs);
    setSlideIndex(0); // Reset when filters change
  }, [search, location, sortOption]);

  // ⿣ Pagination
  const totalSlides = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = slideIndex * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [filteredJobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 xl:px-20 py-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Explore <span className="text-blue-600">Remote Jobs</span>
          </h1>
          <p className="text-gray-500 mt-2">Flexible roles you can do from anywhere</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          >
            <option value="title">Sort by Title</option>
            <option value="company">Sort by Company</option>
          </select>
          <button
            onClick={() => {
              setSearch('');
              setLocation('');
              setSortOption('title');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset Filters
          </button>
        </motion.div>

        {/* Job Grid */}
        <motion.div
          key={slideIndex}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentJobs.map((job, index) => (
            <JobCard key={index} job={job} highlightTags={['Remote']} />
          ))}
        </motion.div>

        {/* Pagination */}
        {filteredJobs.length > jobsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button onClick={prevSlide} className="hover:scale-110 transition">
              <img src={assets.left_arrow_icon} alt="Prev" className="h-5 w-5" />
            </button>
            {Array.from({ length: totalSlides }).map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === slideIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setSlideIndex(i)}
              />
            ))}
            <button onClick={nextSlide} className="hover:scale-110 transition">
              <img src={assets.right_arrow_icon} alt="Next" className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* No Jobs */}
        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No remote jobs found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default RemoteJobs;