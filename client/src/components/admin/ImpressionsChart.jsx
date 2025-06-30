// src/components/ImpressionsChart.jsx
import { useEffect, useState, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ImpressionsChart = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
          headers: { token: companyToken },
        });

        const jobs = data.jobsData || [];

        const labels = jobs.map((job) => job.title || "Untitled Job");
        const impressions = jobs.map((job) => job.views || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Job Impressions",
              data: impressions,
              backgroundColor: "#4F46E5",
              borderRadius: 6,
              barThickness: 30,
            },
          ],
        });
      } catch (err) {
        console.error("Error loading impressions data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [backendUrl, companyToken]);

  if (loading) return <p className="text-gray-500">Loading chart...</p>;
  if (!chartData || chartData.labels.length === 0)
    return <p className="text-gray-500">No job data to display.</p>;

  return (
    <div className="bg-white rounded shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Job Impressions</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y} views`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ImpressionsChart;