import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import allJobs from '../data/allJobs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';

const WalkInJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [slideIndex, setSlideIndex] = useState(0);

  const jobsPerPage = 6;

  useEffect(() => {
    let jobs = allJobs.filter(
      (job) =>
        job.tags.includes('Walk-in') &&
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );

    if (sortOption === 'title') {
      jobs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'company') {
      jobs.sort((a, b) => a.company.localeCompare(b.company));
    }

    setFilteredJobs(jobs);
    setSlideIndex(0);
  }, [search, location, sortOption]);

  const totalSlides = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    slideIndex * jobsPerPage,
    slideIndex * jobsPerPage + jobsPerPage
  );

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

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
            Explore <span className="text-blue-600">Walk-in Jobs</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Instant hiring opportunities you can walk into
          </p>
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

        {/* Job Cards */}
        <motion.div
          key={slideIndex}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentJobs.length > 0 ? (
            currentJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
              >
                <JobCard job={job} highlightTags={['Walk-in']} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No walk-in jobs found.
            </p>
          )}
        </motion.div>

        {/* Pagination Arrows + Dots */}
        {filteredJobs.length > jobsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button onClick={prevSlide} className="hover:scale-110 transition">
              <img
                src={assets.left_arrow_icon}
                alt="Previous"
                className="w-5 h-5"
              />
            </button>

            {Array.from({ length: totalSlides }).map((_, i) => (
              <span
                key={i}
                onClick={() => setSlideIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === slideIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}

            <button onClick={nextSlide} className="hover:scale-110 transition">
              <img
                src={assets.right_arrow_icon}
                alt="Next"
                className="w-5 h-5"
              />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WalkInJobs;