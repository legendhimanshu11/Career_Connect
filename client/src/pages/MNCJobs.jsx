import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import allJobs from '../data/allJobs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';

const MNCJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [currentPage, setCurrentPage] = useState(0);

  const jobsPerPage = 6;

  useEffect(() => {
    let jobs = allJobs.filter(
      (job) =>
        job.tags.includes('MNC') &&
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );

    if (sortOption === 'title') {
      jobs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'company') {
      jobs.sort((a, b) => a.company.localeCompare(b.company));
    }

    setFilteredJobs(jobs);
    setCurrentPage(0); // reset to first page on filter change
  }, [search, location, sortOption]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    currentPage * jobsPerPage,
    currentPage * jobsPerPage + jobsPerPage
  );

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
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
            Explore <span className="text-blue-600">MNC Jobs</span>
          </h1>
          <p className="text-gray-500 mt-2">Top multinational opportunities</p>
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

        {/* Jobs Grid */}
        <motion.div
          key={currentPage}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {currentJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <JobCard job={job} highlightTags={['MNC']} />
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {filteredJobs.length > jobsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={goToPrev}
              className="hover:scale-110 transition"
              title="Previous Page"
            >
              <img src={assets.left_arrow_icon} alt="Prev" className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === currentPage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}

            <button
              onClick={goToNext}
              className="hover:scale-110 transition"
              title="Next Page"
            >
              <img src={assets.right_arrow_icon} alt="Next" className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* No Jobs Found */}
        {filteredJobs.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No MNC jobs found.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MNCJobs;