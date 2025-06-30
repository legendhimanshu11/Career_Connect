import { motion } from 'framer-motion';
import { useContext, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const navigate = useNavigate();
  const [jobSuggestions] = useState(['Frontend Developer', 'Backend Developer', 'Data Analyst', 'UI/UX Designer']);
  const [locationSuggestions] = useState(['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad']);
  const [showJobDropdown, setShowJobDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const onSearch = () => {
    const title = titleRef.current.value;
    const location = locationRef.current.value;
    setSearchFilter({ title, location });
    setIsSearched(true);
    navigate(`/search?title=${title}&location=${location}`);
  };

  const routeMap = {
    'Remote': '/remote-jobs',
    'Startup': '/startup-jobs',
    'MNC': '/mnc-jobs',
    'Internship': '/internship-jobs',
    'Fresher': '/fresher-jobs',
    'Full-time': '/fulltime-jobs',
    'Walk-in': '/walkin-jobs',
    'IT': '/it-jobs',
    'HR': '/hr-jobs',
    'Marketing': '/marketing-jobs',
  };

  const handleTagClick = (tag) => {
    const path = routeMap[tag];
    if (path) {
      navigate(path);
    } else {
      console.warn(`No route found for tag: '${tag}'`);
    }
  };

  const quickTags = Object.keys(routeMap);

  const featuredCompanies = [
    { logo: assets.microsoft_logo, name: 'Microsoft' },
    { logo: assets.walmart_logo, name: 'Walmart' },
    { logo: assets.accenture_logo, name: 'Accenture' },
    { logo: assets.samsung_logo, name: 'Samsung' },
    { logo: assets.amazon_logo, name: 'Amazon' },
    { logo: assets.adobe_logo, name: 'Adobe' },
  ];

  return (
    <motion.div className="bg-gradient-to-r from-blue-50 to-green-50 py-16 px-4 md:px-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 
          className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Find your <span className="text-blue-600">dream job</span> now
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Search from thousands of jobs across top companies
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-2 justify-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col w-full md:w-1/3 relative">
            <div className="flex items-center bg-white border rounded-md px-4">
              <img src={assets.search_icon} className="h-4 sm:h-5 mr-2" alt="search" />
              <input
                type="text"
                placeholder="Job title, skills or company"
                ref={titleRef}
                onFocus={() => setShowJobDropdown(true)}
                onBlur={() => setTimeout(() => setShowJobDropdown(false), 200)}
                className="w-full py-3 outline-none text-sm"
              />
            </div>
            {showJobDropdown && (
              <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-md z-10 text-left">
                {jobSuggestions.map((job, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                    onMouseDown={() => {
                      titleRef.current.value = job;
                      setShowJobDropdown(false);
                    }}
                  >
                    {job}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/4 relative">
            <div className="flex items-center bg-white border rounded-md px-4">
              <img src={assets.location_icon} className="h-4 sm:h-5 mr-2" alt="location" />
              <input
                type="text"
                placeholder="Location"
                ref={locationRef}
                onFocus={() => setShowLocationDropdown(true)}
                onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                className="w-full py-3 outline-none text-sm"
              />
            </div>
            {showLocationDropdown && (
              <ul className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-md z-10 text-left">
                {locationSuggestions.map((loc, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                    onMouseDown={() => {
                      locationRef.current.value = loc;
                      setShowLocationDropdown(false);
                    }}
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={onSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </motion.div>

        <motion.div 
          className="mt-8 overflow-x-auto whitespace-nowrap px-4 scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="inline-flex gap-3">
            {quickTags.map((tag, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleTagClick(tag)}
                className="px-4 py-2 bg-white border text-gray-700 rounded-full hover:bg-blue-600 hover:text-white transition text-sm"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className='mt-10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>Featured Companies</h2>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center'>
            {featuredCompanies.map((company, i) => (
              <motion.div 
                key={i} 
                className='bg-white p-4 shadow-sm rounded-lg flex items-center justify-center hover:scale-105 transition'
                whileHover={{ scale: 1.1 }}
              >
                <img className='h-8' src={company.logo} alt={company.name} title={company.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;