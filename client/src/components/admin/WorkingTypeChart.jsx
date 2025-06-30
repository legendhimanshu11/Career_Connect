import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const WorkingTypeChart = ({ applications }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const typeCounts = {
      "Full-time": 0,
      "Internship": 0,
      "Remote": 0,
      "Walk-in": 0,
      "Other": 0,
    };

    // Count job types from applications
    applications.forEach((app) => {
      const type = app.jobId?.type || "Other";
      if (typeCounts[type] !== undefined) {
        typeCounts[type]++;
      } else {
        typeCounts["Other"]++;
      }
    });

    const labels = Object.keys(typeCounts);
    const data = Object.values(typeCounts);

    setChartData({
      labels,
      datasets: [
        {
          label: "Applications by Job Type",
          data,
          backgroundColor: [
            "#4F46E5",
            "#10B981",
            "#F59E0B",
            "#EC4899",
            "#9CA3AF",
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [applications]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div className="bg-white rounded shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Applications by Job Type</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default WorkingTypeChart;