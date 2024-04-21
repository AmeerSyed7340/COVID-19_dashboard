import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Vaccination = () => {
  const [chartData, setChartData] = useState(null);  // Initialize chartData to null

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=30&fullData=false")
      .then(response => response.json())
      .then(data => {
        const chartLabels = Object.keys(data);
        const chartValues = Object.values(data);
        const newData = {
          labels: chartLabels,
          datasets: [
            {
              label: 'Vaccine Coverage',
              data: chartValues,
              fill: false,
              borderColor: 'rgb(53, 162, 235)',
              tension: 0.1
            }
          ]
        };
        setChartData(newData);
      })
      .catch(error => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}> {/* Ensuring the div has a specific size */}
      {chartData ? (
        <Line 
          data={chartData}
          options={{
            responsive: true,   // Make sure the chart is responsive
            maintainAspectRatio: false  // Allow the chart to fill the container
          }}
        />
      ) : <p>Loading chart...</p>}
    </div>
  );
};

export default Vaccination;
