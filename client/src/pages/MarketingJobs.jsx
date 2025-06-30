import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import allJobs from '../data/allJobs';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MarketingJobs = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Only marketing-tagged jobs
  const marketingJobs = allJobs.filter((job) =>
    job.tags.map(tag => tag.toLowerCase()).includes('marketing')
  );

  useEffect(() => {
    let updatedJobs = marketingJobs;

    if (selectedLocation) {
      updatedJobs = updatedJobs.filter(job =>
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    if (searchKeyword) {
      updatedJobs = updatedJobs.filter(job =>
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        job.description.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    setFilteredJobs(updatedJobs);
  }, [selectedLocation, searchKeyword]);

  // Animation variants for job cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    }),
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-pink-50 to-purple-100 min-h-screen px-4 xl:px-20 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Animated Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Marketing Jobs</h2>
            <p className="text-gray-600 text-sm">
              Find exciting opportunities in branding, SEO, content, and digital marketing roles.
            </p>
          </motion.div>

          {/* Filter Inputs */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <motion.input
              type="text"
              placeholder="Search by title or skill"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm"
              variants={cardVariants}
              custom={0}
            />
            <motion.select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border rounded-md text-sm"
              variants={cardVariants}
              custom={1}
            >
              <option value="">All Locations</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Remote">Remote</option>
            </motion.select>
            <motion.button
              onClick={() => {
                setSearchKeyword('');
                setSelectedLocation('');
              }}
              className="bg-red-100 text-red-600 px-4 py-2 rounded hover:bg-red-200 transition text-sm"
              variants={cardVariants}
              custom={2}
            >
              Reset Filters
            </motion.button>
          </motion.div>

          {/* Animated Job Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredJobs.length === 0 ? (
              <motion.p
                className="text-gray-500 col-span-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No jobs found for the selected criteria.
              </motion.p>
            ) : (
              filteredJobs.map((job, i) => (
                <motion.div
                  key={job.id || i}
                  variants={cardVariants}
                  custom={i}
                >
                  <JobCard job={job} highlightTags={['Marketing']} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MarketingJobs;