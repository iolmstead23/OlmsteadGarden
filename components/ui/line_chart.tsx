import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function LineChart({statPlotData}:{statPlotData: string}) {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      }
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  function formatLineColor() {
    switch(statPlotData) {
      case 'Temperature':
        return 'rgb(255, 99, 132)';
      case 'Fertility':
        return 'rgb(54, 162, 235)';
      case 'pH':
        return 'rgb(255, 205, 86)';
      case 'Moisture':
        return 'rgb(75, 192, 192)';
      default:
        return 'rgb(255, 99, 132)';
    }
  };
  
  const data = {
    labels,
    datasets: [
      {
        label: statPlotData,
        data: labels.map(() => faker.number.int({ min: 0, max: 10 })),
        borderColor: formatLineColor(),
        backgroundColor: formatLineColor(),
        yAxisID: 'y',
      }
    ],
  };

  return (
    <div className='flex flex-col items-left w-4/5'>
      <Line options={options} data={data} height={100}/>
    </div>
  );
}