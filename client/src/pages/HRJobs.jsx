import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import allJobs from '../data/allJobs';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../assets/assets';

const HRJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const jobsPerPage = 6;

  useEffect(() => {
    const results = allJobs.filter((job) => {
      const matchesCategory = job.type === 'HR';
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchesCategory && matchesSearch && matchesLocation;
    });
    setFilteredJobs(results);
    setSlideIndex(0); // Reset to first slide when filters change
  }, [searchTerm, locationFilter]);

  const totalSlides = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    slideIndex * jobsPerPage,
    slideIndex * jobsPerPage + jobsPerPage
  );

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-indigo-100 py-16 px-4 md:px-20 text-center">
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Explore Top <span className="text-pink-600">HR Jobs</span>
        </motion.h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Discover exciting HR roles in talent acquisition, employee engagement, L&D and more.
        </p>

        {/* Search Filters */}
        <motion.div
          className="mt-10 flex flex-col md:flex-row justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            placeholder="Search job title..."
            className="px-4 py-2 rounded border w-full md:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="px-4 py-2 rounded border w-full md:w-1/4"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </motion.div>
      </section>

      {/* Job Listings */}
      <section className="py-16 px-4 md:px-20">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500 text-center">No matching jobs found.</p>
        ) : (
          <>
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
              {currentJobs.map((job, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <JobCard job={job} highlightTags={['HR']} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination Controls */}
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
                    i === slideIndex ? 'bg-pink-600' : 'bg-gray-300'
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
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default HRJobs;