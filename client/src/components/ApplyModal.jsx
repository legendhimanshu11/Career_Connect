import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

const ApplyModal = ({ isOpen, setIsOpen, job }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    portfolio: "",
    resume: null,
    skills: "",
  });
  const [resumePreview, setResumePreview] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("jobDraft"));
    if (draft) {
      setForm(draft);
      if (draft.skills) {
        setSkillsList(draft.skills.split(",").map((s) => s.trim()));
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      const file = files[0];
      setForm((prev) => ({ ...prev, resume: file }));
      setResumePreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    if (skillsList.includes(skillInput.trim())) return;

    const updatedSkills = [...skillsList, skillInput.trim()];
    setSkillsList(updatedSkills);
    setForm((prev) => ({
      ...prev,
      skills: updatedSkills.join(","),
    }));
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    const updatedSkills = skillsList.filter((s) => s !== skill);
    setSkillsList(updatedSkills);
    setForm((prev) => ({
      ...prev,
      skills: updatedSkills.join(","),
    }));
  };

  const validate = () => {
    const { name, email, phone, address, resume } = form;
    if (!name || !email || !phone || !address || !resume) {
      toast.error("Please fill all required fields and upload resume.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be 10 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === "resume") {
          formData.append("resume", val);
        } else {
          formData.append(key, val);
        }
      });
      formData.append("jobId", job?.id || job?._id);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/manual-apply`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success("Application submitted!");
        localStorage.removeItem("jobDraft");
        setForm({
          name: "",
          email: "",
          phone: "",
          address: "",
          portfolio: "",
          resume: null,
          skills: "",
        });
        setSkillsList([]);
        setResumePreview(null);
        setIsOpen(false);
      } else {
        toast.error(res.data.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("jobDraft", JSON.stringify(form));
    toast.success("Draft saved!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-5 text-xl text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
              Apply for {job?.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", type: "text", label: "Full Name" },
                { name: "email", type: "email", label: "Email Address" },
                { name: "phone", type: "text", label: "Phone Number" },
                { name: "address", type: "text", label: "Address" },
                { name: "portfolio", type: "text", label: "Portfolio URL (optional)" },
              ].map(({ name, type, label }) => (
                <div key={name} className="relative">
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full px-4 pt-5 pb-2 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent text-gray-900 dark:text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all"
                  >
                    {label}
                  </label>
                </div>
              ))}

              {/* Resume Upload */}
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              {resumePreview && (
                <iframe
                  src={resumePreview}
                  title="Resume Preview"
                  className="w-full h-48 mt-2 rounded border"
                />
              )}

              {/* Skills Input */}
              <div className="mt-2">
                <label className="text-sm text-gray-600 dark:text-gray-300">Add Skills</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. React, MongoDB"
                    className="flex-1 px-3 py-2 border rounded-md bg-transparent dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                  >
                    Add Skill
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skillsList.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-200 dark:hover:bg-red-500 transition"
                      onClick={() => removeSkill(skill)}
                      title="Click to remove"
                    >
                      {skill} ✕
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="flex-1 py-2 border border-indigo-400 dark:border-indigo-500 text-indigo-500 dark:text-indigo-300 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-700 transition"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplyModal;
