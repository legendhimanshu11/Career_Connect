import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LatestJobs = () => {
  const { searchFilter } = useContext(AppContext);

  const dummyJobs = [
    {
      title: 'Mobile App Developer',
      company: 'Swiggy',
      location: 'Remote',
      type: 'Full-time',
      tags: ['Flutter', 'iOS', 'Android']
    },
    {
      title: 'QA Tester',
      company: 'Capgemini',
      location: 'Noida',
      type: 'Full-time',
      tags: ['Testing', 'Automation']
    },
    {
      title: 'Cloud Architect',
      company: 'Oracle',
      location: 'Gurgaon',
      type: 'Full-time',
      tags: ['AWS', 'Cloud', 'Infrastructure']
    },
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Internship', 'Remote'];
  const locations = ['Bangalore', 'Remote', 'Mumbai', 'Hyderabad', 'Noida'];

  return (
    <section className="px-4 md:px-20 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Filter Panel */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">Job Type</label>
            <select className="w-full p-2 border rounded">
              {jobTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
            <select className="w-full p-2 border rounded">
              {locations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          {/* Saved search filter tags */}
          {searchFilter.title && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Search</h3>
              <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{searchFilter.title}</span>
              {searchFilter.location && <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full ml-2">{searchFilter.location}</span>}
            </div>
          )}
        </div>

        {/* Latest Jobs Grid */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Latest Jobs</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dummyJobs.map((job, i) => (
              <div key={i} className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-medium text-gray-800 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                <p className="text-xs mt-1 mb-3 text-blue-500 font-medium">{job.type}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
                <button className="w-full text-sm py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
