import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import JobCard from '../components/JobCard';
import allJobs from '../data/allJobs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';

const ITJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);

  const jobsPerPage = 6;

  useEffect(() => {
    const filtered = allJobs.filter(
      (job) =>
        job.type === 'IT' &&
        job.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
    );
    setFilteredJobs(filtered);
    setSlideIndex(0);
  }, [titleFilter, locationFilter]);

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
    <div className="min-h-screen bg-slate-50 pt-24 px-4 xl:px-24 pb-16">
      <Navbar />
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2">IT Job Openings</h2>
        <p className="text-gray-600 max-w-2xl">
          Explore top IT roles across software development, cloud, networking and system design.
        </p>
      </motion.div>

      {/* Filter bar */}
      <motion.div
        className="flex flex-wrap gap-4 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Search by job title..."
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Search by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/3"
        />
      </motion.div>

      {/* Job grid with animations */}
      <motion.div
        key={slideIndex}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {currentJobs.length > 0 ? (
          currentJobs.map((job, index) => (
            <motion.div
              key={index}
              className="hover:scale-[1.02] transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <JobCard job={job} highlightTags={['IT']} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-16 col-span-full">
            No IT jobs found for your criteria.
          </p>
        )}
      </motion.div>

      {/* Pagination controls */}
      {filteredJobs.length > jobsPerPage && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button onClick={prevSlide}>
            <img
              src={assets.left_arrow_icon}
              alt="Previous"
              className="w-5 h-5 hover:scale-110 transition"
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

          <button onClick={nextSlide}>
            <img
              src={assets.right_arrow_icon}
              alt="Next"
              className="w-5 h-5 hover:scale-110 transition"
            />
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ITJobs;