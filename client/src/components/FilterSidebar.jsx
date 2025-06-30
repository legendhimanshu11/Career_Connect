// FilterSidebar.jsx
import { useState } from 'react';

const FilterSidebar = ({ filters, setFilters, recentSearches }) => {
  const handleCheckboxChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearAll = () => {
    setFilters({ type: [], location: [] });
  
  };
  

  return (
    <aside className="w-full md:w-1/4">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gradient-t-r from-blue-300 to-white ">Filters</h3>
          <button
            onClick={clearAll}
            className="text-xs text-black hover:underline focus:outline-none"
          >
            Clear All
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-2">Job Type</p>
          <div className="space-y-2">
            {['Full-time', 'Internship', 'Part-time', 'Remote'].map((type) => (
              <label key={type} className="flex items-center text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-600"
                  checked={filters.type.includes(type)}
                  onChange={() => handleCheckboxChange('type', type)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-2">Location</p>
          <div className="space-y-2">
            {['Bangalore', 'Mumbai', 'Hyderabad', 'Chennai', 'Remote', 'Noida'].map((location) => (
              <label key={location} className="flex items-center text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-600"
                  checked={filters.location.includes(location)}
                  onChange={() => handleCheckboxChange('location', location)}
                />
                {location}
              </label>
            ))}
          </div>
        </div>

        {recentSearches?.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-2">Recent Searches</p>
            <ul className="text-sm text-blue-600 space-y-1">
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:underline"
                  onClick={() => setFilters(search)}
                >
                  {search.title} {search.location && `- ${search.location}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;
