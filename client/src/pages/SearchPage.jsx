import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import JobCard from '../components/JobCard';

const SearchPage = () => {
  const { jobs } = useContext(AppContext);
  const location = useLocation();
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleQuery = queryParams.get('title')?.toLowerCase() || '';
    const locationQuery = queryParams.get('location')?.toLowerCase() || '';
    const categoryQuery = queryParams.get('category')?.toLowerCase() || '';

    const results = jobs.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(titleQuery);
      const locationMatch = job.location.toLowerCase().includes(locationQuery);
      const categoryMatch = job.title.toLowerCase().includes(categoryQuery) ||
                            job.company.toLowerCase().includes(categoryQuery) ||
                            job.tags?.some(tag => tag.toLowerCase().includes(categoryQuery));

      return titleMatch && locationMatch || categoryMatch;
    });

    setFilteredJobs(results);
  }, [location.search, jobs]);

  return (
    <section className="px-4 py-16 md:px-20">
      <h1 className="text-3xl font-semibold mb-6">Search Results</h1>

      {filteredJobs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No jobs found matching your search.</p>
      )}
    </section>
  );
};

export default SearchPage;
