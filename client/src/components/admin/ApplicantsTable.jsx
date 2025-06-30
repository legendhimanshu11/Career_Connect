// src/pages/admin/ApplicantsTable.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState([]);

  // Fetch applicants from backend
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get("/api/company/applications");
        setApplicants(res.data.applications || []);
      } catch (error) {
        toast.error("Failed to fetch applicants");
      }
    };
    fetchApplicants();
  }, []);

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md mt-5 overflow-x-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Applicants</h2>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-600 font-medium">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Job Applied</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Resume</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {applicants.length > 0 ? (
            applicants.map((applicant, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3">{applicant.name}</td>
                <td className="px-4 py-3">{applicant.email}</td>
                <td className="px-4 py-3">{applicant.phone}</td>
                <td className="px-4 py-3">{applicant.jobTitle}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    applicant.status === "shortlisted"
                      ? "bg-green-100 text-green-700"
                      : applicant.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {applicant.status || "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {applicant.resumeUrl ? (
                    <a
                      href={applicant.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FaDownload size={14} />
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No Resume</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-6 text-center text-gray-500">
                No applicants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ApplicantsTable;
