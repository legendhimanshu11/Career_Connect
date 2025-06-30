import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const JobCard = ({ job, highlightTags = [] }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const goToApplyPage = () => {
    navigate(`/apply-job/${job.id}`);
    scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSave = () => {
    setSaved(prev => !prev);
    // Optional: Save to localStorage or backend API
  };

  const isTagHighlighted = (tag) =>
    highlightTags.map(t => t.toLowerCase()).includes(tag.toLowerCase());

  const hotTags = ['remote', 'urgent', 'immediate', 'hiring'];
  const isHot = job.tags?.some(tag => hotTags.includes(tag.toLowerCase()));

  return (
    <div className="border border-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 bg-white relative">
      {/* Save Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-blue-600"
        onClick={toggleSave}
        title={saved ? 'Unsave Job' : 'Save Job'}
      >
        {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>

      {/* Company Logo + Level */}
      <div className="flex justify-between items-center mb-2">
        <img
          src={job.logo || '/default-logo.png'}
          alt={job.company || 'Company'}
          className="h-10 w-10 object-contain"
        />
        <span className="text-xs bg-blue-100 px-2 py-0.5 rounded text-blue-600 font-medium">
          {job.type}
        </span>
      </div>

      {/* Job Title & Company */}
      <h4 className="font-semibold text-lg text-gray-800 mb-1">{job.title}</h4>
      <p className="text-sm text-gray-600 mb-2">{job.company} • {job.location}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {job.tags?.map((tag, i) => (
          <span
            key={i}
            title={tag}
            className={`text-xs px-2 py-1 rounded-full border ${
              isTagHighlighted(tag)
                ? 'bg-yellow-100 border-yellow-400 text-yellow-700 font-medium'
                : 'bg-blue-50 border-blue-200 text-blue-600'
            }`}
          >
            {tag}
          </span>
        ))}
        {isHot && (
          <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded-full font-semibold">
            🔥 HOT
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className="text-sm text-gray-500 line-clamp-3 mb-4"
        dangerouslySetInnerHTML={{
          __html: job.description.slice(0, 150),
        }}
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={goToApplyPage}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Apply Now
        </button>
        <button
          onClick={goToApplyPage}
          className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;