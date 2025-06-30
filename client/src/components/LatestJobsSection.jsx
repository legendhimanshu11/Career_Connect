import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LatestJobsSection = () => {
  const { recentSearches = [], setSearchFilter, setIsSearched } = useContext(AppContext);

  const jobRoles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'HR Executive', 'Data Analyst', 'DevOps Engineer', 'Product Manager'];
  const locations = ['Bangalore', 'Hyderabad', 'Remote', 'Chennai', 'Noida', 'Gurgaon'];

  return (
    <section className="py-16 px-4 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Search Latest Job Listings</h2>
            <p className="text-sm text-gray-500">Quickly search by role or location</p>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              className="border px-3 py-2 rounded-md text-sm"
              onChange={(e) => setSearchFilter({ title: e.target.value }) || setIsSearched(true)}
              defaultValue=""
            >
              <option value="" disabled>Select Job Role</option>
              {jobRoles.map((role, i) => <option key={i} value={role}>{role}</option>)}
            </select>

            <select
              className="border px-3 py-2 rounded-md text-sm"
              onChange={(e) => setSearchFilter({ location: e.target.value }) || setIsSearched(true)}
              defaultValue=""
            >
              <option value="" disabled>Select Location</option>
              {locations.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}
            </select>
          </div>
        </div>

        {recentSearches.length > 0 && (
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-2 text-gray-700">Recent Searches</h3>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((item, i) => (
                <button
                  key={i}
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-1 text-sm rounded-full hover:bg-blue-100"
                  onClick={() => setSearchFilter(item) || setIsSearched(true)}
                >
                  {item.title} {item.location && `in ${item.location}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestJobsSection;
