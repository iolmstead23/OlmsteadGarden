/*
 * Created on Fri Sep 20 2024
 * Author: Ian Olmstead
 *
 * License: GNU Affero General Public License (AGPL-3.0)
 *
 *For details, see https://www.gnu.org/licenses/agpl-3.0-standalone.html
 *
 *This program is free software: you can redistribute it and/or modify
 *it under the terms of the GNU Affero General Public License as published
 *by the Free Software Foundation, either version 3 of the License, or
 *(at your option) any later version.
 */

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function LineChart({ statPlotData }: { statPlotData: string }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  function formatLineColor() {
    switch (statPlotData) {
      case "Temperature":
        return "rgb(255, 99, 132)";
      case "Fertility":
        return "rgb(54, 162, 235)";
      case "pH":
        return "rgb(255, 205, 86)";
      case "Moisture":
        return "rgb(75, 192, 192)";
      default:
        return "rgb(255, 99, 132)";
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: statPlotData,
        data: labels.map(() => faker.number.int({ min: 0, max: 10 })),
        borderColor: formatLineColor(),
        backgroundColor: formatLineColor(),
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className="flex flex-col items-left w-[50vw]">
      <Line options={options} data={data} height={100} />
    </div>
  );
}
