import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import allJobs from "../data/allJobs";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";

const InternshipJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const internships = allJobs.filter((job) => job.type === "Internship");

  const jobsPerPage = 6;

  useEffect(() => {
    let jobs = internships.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedLocation ? job.location === selectedLocation : true)
    );
    setFilteredJobs(jobs);
    setSlideIndex(0);
  }, [searchTerm, selectedLocation]);

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

  const uniqueLocations = [...new Set(internships.map((job) => job.location))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 xl:px-20 py-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Explore <span className="text-indigo-600">Internships</span>
          </h1>
          <p className="text-gray-500 mt-2">Real experience for real impact</p>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border rounded w-full"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((loc, i) => (
              <option key={i} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedLocation("");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset Filters
          </button>
        </motion.div>

        {/* Jobs Grid */}
        <motion.div
          key={slideIndex}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentJobs.length > 0 ? (
            currentJobs.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <JobCard job={job} highlightTags={["Internship"]} />
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No internships found.</p>
          )}
        </motion.div>

        {/* Pagination Controls */}
        {filteredJobs.length > jobsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={prevSlide}
              className="hover:scale-110 transition"
              title="Previous"
            >
              <img src={assets.left_arrow_icon} alt="Prev" className="h-5 w-5" />
            </button>

            {Array.from({ length: totalSlides }).map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  i === slideIndex ? "bg-indigo-600" : "bg-gray-300"
                }`}
                onClick={() => setSlideIndex(i)}
              />
            ))}

            <button
              onClick={nextSlide}
              className="hover:scale-110 transition"
              title="Next"
            >
              <img src={assets.right_arrow_icon} alt="Next" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default InternshipJobs;