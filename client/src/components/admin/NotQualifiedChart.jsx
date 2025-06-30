import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const NotQualifiedChart = ({ applications }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const statusCounts = {
      Pending: 0,
      Accepted: 0,
      Rejected: 0,
    };

    applications.forEach((app) => {
      const status = app.status || "Pending";
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      } else {
        statusCounts.Pending++;
      }
    });

    setChartData({
      labels: ["Pending", "Accepted", "Rejected"],
      datasets: [
        {
          label: "Applications Status",
          data: [
            statusCounts.Pending,
            statusCounts.Accepted,
            statusCounts.Rejected,
          ],
          backgroundColor: ["#facc15", "#10b981", "#ef4444"],
          borderWidth: 1,
        },
      ],
    });
  }, [applications]);

  if (!chartData) return <p>Loading status chart...</p>;

  return (
    <div className="bg-white rounded shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Application Status Overview</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default NotQualifiedChart;