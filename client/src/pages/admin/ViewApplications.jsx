import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });
      setApplications(data.applications || []);
    } catch (err) {
      toast.error("Failed to fetch applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleExport = (type) => {
    const dataToExport = applications.map((app) => ({
      Name: app.name || app.userId?.name,
      Email: app.email || app.userId?.email,
      Phone: app.phone || "N/A",
      JobTitle: app.jobId?.title,
      Resume: app.resumeUrl || app.userId?.resume,
      Status: app.status || "Pending",
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Applications");

    if (type === "excel") {
      XLSX.writeFile(wb, "Applications.xlsx");
    } else if (type === "pdf") {
      toast.info("Use browser 'Print to PDF' from Excel export for PDF download.");
    }
  };

  const statusDistribution = applications.reduce((acc, app) => {
    const status = app.status || "Pending";
    acc[status] = acc[status] + 1 || 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusDistribution),
    datasets: [
      {
        data: Object.values(statusDistribution),
        backgroundColor: ["#60A5FA", "#34D399", "#F87171", "#FBBF24"],
        borderWidth: 1,
      },
    ],
  };

  if (loading) return <p className="p-5">Loading applications...</p>;

  return (
    <motion.div
      className="p-5"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">View Applications</h2>
        <div className="space-x-3">
          <button
            onClick={() => handleExport("excel")}
            className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
          >
            Export Excel
          </button>
          <button
            onClick={() => handleExport("pdf")}
            className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:bg-red-600"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="max-w-sm mb-6">
        <Pie data={chartData} />
      </div>

      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border divide-y divide-gray-200 shadow-md rounded-lg bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Applicant</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Job</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Resume</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {applications.map((app, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-800">{app.name || app.userId?.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{app.email || app.userId?.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{app.phone || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{app.jobId?.title}</td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={app.resumeUrl || app.userId?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        app.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : app.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ViewApplications;
