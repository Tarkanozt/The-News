import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function NewsGraph({ articles }) {
  // Group articles by date, hour, and minute
  const groupedData = articles.reduce((acc, article) => {
    const publishedAt = new Date(article.publishedAt);
    const date = publishedAt.toLocaleDateString(); // e.g., "11/22/2024"
    const hour = String(publishedAt.getHours()).padStart(2, "0"); // Format hour as "14" instead of "14"
    const minute = String(publishedAt.getMinutes()).padStart(2, "0"); // Format minute as "05" instead of "5"

    // Combine date, hour, and minute to create a unique key (e.g., "11/22/2024 14:05")
    const dateTime = `${date} ${hour - 3}:${minute}`;

    acc[dateTime] = (acc[dateTime] || 0) + 1; // Increment count for this dateTime
    return acc;
  }, {});

  // Prepare data for the graph
  const labels = Object.keys(groupedData); // e.g., ["11/22/2024 14:05", "11/22/2024 14:10"]
  const dataCounts = Object.values(groupedData); // e.g., [3, 5, 2, ...]

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Articles",
        data: dataCounts,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "News Categories by Date, Hour, and Minute",
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date, Hour, and Minute" },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45, // Rotate labels for better readability
        },
      },
      y: {
        title: { display: true, text: "Number of Articles" },
      },
    },
  };

  return <Bar data={data} options={options} />;
}
