// Updated SearchResults.jsx with Sidebar Filters and Responsive Grid
import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import JobCard from '../components/JobCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchResults = () => {
  const location = useLocation();
  const { jobs } = useContext(AppContext);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortedJobs, setSortedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [sortOption, setSortOption] = useState('title');

  const query = new URLSearchParams(location.search);
  const title = query.get('title')?.toLowerCase();
  const locationParam = query.get('location')?.toLowerCase();
  const category = query.get('category');

  const highlightTags = category ? [category] : [];

  useEffect(() => {
    const results = jobs.filter(job => {
      const matchesTitle = title ? job.title.toLowerCase().includes(title) : true;
      const matchesLocation = locationParam ? job.location.toLowerCase().includes(locationParam) : true;
      const matchesCategory = category
        ? job.title.toLowerCase().includes(category.toLowerCase()) ||
          job.type.toLowerCase().includes(category.toLowerCase()) ||
          job.tags.map(tag => tag.toLowerCase()).includes(category.toLowerCase())
        : true;
      return matchesTitle && matchesLocation && matchesCategory;
    });
    setFilteredJobs(results);
    setCurrentPage(1);
  }, [location.search, jobs]);

  useEffect(() => {
    let sorted = [...filteredJobs];
    if (sortOption === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'company') {
      sorted.sort((a, b) => a.companyId.name.localeCompare(b.companyId.name));
    } else if (sortOption === 'location') {
      sorted.sort((a, b) => a.location.localeCompare(b.location));
    }
    setSortedJobs(sorted);
  }, [filteredJobs, sortOption]);

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const currentJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 xl:px-20 py-10 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white p-4 rounded shadow border space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
              <div>
                <label className="block mb-1 text-sm text-gray-600">Sort By</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm text-gray-700"
                >
                  <option value="title">Title</option>
                  <option value="company">Company</option>
                  <option value="location">Location</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Job Cards Grid */}
          <main className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Search Results</h2>
              <p className="text-sm text-gray-500">{filteredJobs.length} jobs found</p>
            </div>

            {currentJobs.length === 0 ? (
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentJobs.map((job, index) => (
                  <JobCard key={index} job={job} highlightTags={highlightTags} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-3">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${i + 1 === currentPage ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
