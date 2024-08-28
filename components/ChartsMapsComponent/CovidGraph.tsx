"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
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

// Register the necessary components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CovidGraph = () => {
  const [chartData, setChartData] = useState<any>(null);

  // Additional options for rendering the graph 
  const chartOptions = {
    maintainAspectRatio: false, // Disables the aspect ratio maintenance
    responsive: true, // Ensures the chart is responsive and adjusts based on the container's size
  }

  useEffect(() => {
    // Since the api takes time to load, its better to store api response in a session so that experince is smooth
    const fetchData = async () => {
      // Check if data is already in sessionStorage
      const storedData = sessionStorage.getItem('covidHistoricalData');

      if (storedData) {
        // If data exists in sessionStorage, use it
        const parsedData = JSON.parse(storedData);
        setChartData(parsedData);
      } else {
        // If not, fetch the data from the API
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        const data = response.data;

        // Process the data
        const dates = Object.keys(data.cases);
        const cases = Object.values(data.cases).map(value => value);

        const chartData = {
          labels: dates,
          datasets: [
            {
              label: "Cases",
              data: cases,
              borderColor: "rgba(239, 85, 80, 1)",
              fill: false,
            },
          ],
        };

        // Store the processed data in sessionStorage
        sessionStorage.setItem('covidHistoricalData', JSON.stringify(chartData));

        // Set the chart data
        setChartData(chartData);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] w-full border-[1px] border-black">
         {/* Check if chartData is available */}
        {chartData ? 
          /* Render the Line chart if chartData is present */
          <Line data={chartData} options={chartOptions} />
         :
          /* Display a loading message while the chart data is being fetched */
          <div className='h-full flex justify-center items-center'>
            <p className='text-center'>Loading chart data...</p>
          </div>
        }
      </div>
    </>
  )
}

export default CovidGraph