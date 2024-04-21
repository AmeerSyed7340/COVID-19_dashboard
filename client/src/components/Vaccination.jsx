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
              label: 'Global Vaccine Coverage',
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
    <div>
      
      {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default Vaccination;
