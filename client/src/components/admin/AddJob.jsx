// src/pages/admin/AddJob.jsx
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const AddJob = () => {
  const location = useLocation(); // ✅ FIXED: moved inside component
  const editingJob = location.state?.job || null;
  const { backendUrl, companyToken } = useContext(AppContext); // ✅ uses backendUrl

  const [job, setJob] = useState(
    editingJob || {
      title: "",
      company: "",
      logo: "",
      location: "",
      type: "",
      tags: [],
      description: "",
    }
  );

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const addTag = () => {
    if (tagInput && !job.tags.includes(tagInput)) {
      setJob((prev) => ({ ...prev, tags: [...prev.tags, tagInput] }));
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setJob((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingJob
        ? `${backendUrl}/api/company/update-job/${editingJob._id}`
        : `${backendUrl}/api/company/create-job`;

      const method = editingJob ? "put" : "post";

      await axios[method](url, job, {
        headers: { token: companyToken },
      });

      toast.success(
        editingJob ? "Job updated successfully!" : "Job posted successfully!"
      );

      if (!editingJob) {
        setJob({
          title: "",
          company: "",
          logo: "",
          location: "",
          type: "",
          tags: [],
          description: "",
        });
      }
    } catch (err) {
      toast.error("Failed to post job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {editingJob ? "Edit Job" : "Post a New Job"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="input w-full"
          required
        />
        <input
          type="text"
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="input w-full"
          required
        />
        <input
          type="url"
          name="logo"
          value={job.logo}
          onChange={handleChange}
          placeholder="Company Logo URL"
          className="input w-full"
        />
        <input
          type="text"
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Job Location"
          className="input w-full"
        />
        <select
          name="type"
          value={job.type}
          onChange={handleChange}
          className="input w-full"
          required
        >
          <option value="">Select Job Type</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
          <option value="Fresher">Fresher</option>
          <option value="Full-time">Full-time</option>
          <option value="Walk-in">Walk-in</option>
        </select>

        <div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add skill/tag (e.g., React)"
              className="input flex-1"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-red-500 text-sm"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <textarea
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="input w-full h-32 resize-none"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded text-white transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isSubmitting
            ? editingJob
              ? "Updating..."
              : "Posting..."
            : editingJob
            ? "Update Job"
            : "Post Job"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddJob;
