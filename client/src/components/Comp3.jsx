import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "../styles/Comp3.css";

function Comp3({ stateName }) {
  const [stateLast30Days, setStateLast30Days] = useState([]);
  const d3Container = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!stateName) {
        return;
      }
      const response = await fetch(
        `https://disease.sh/v3/covid-19/nyt/states/${encodeURIComponent(
          stateName
        )}?lastdays=30`
      );
      const data = await response.json();
      setStateLast30Days(data);
    };

    fetchData();
  }, [stateName]);

  useEffect(() => {
    if (stateLast30Days.length > 0) {
      drawChart();
    }
  }, [stateLast30Days]);

  function drawChart() {
    const margin = { top: 20, right: 30, bottom: 30, left: 50 },
      width = 500 - margin.left - margin.right, // Adjusted to fit .comp3 width
      height = 300 - margin.top - margin.bottom; // Adjusted to fit .comp3 height

    // Clear the canvas from any previous drawings
    d3.select(d3Container.current).selectAll("*").remove();

    const svg = d3
      .select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis --> it is a date format
    const x = d3
      .scaleTime()
      .domain(d3.extent(stateLast30Days, (d) => new Date(d.date)))
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(x)
          .ticks(d3.timeDay.every(5)) // One tick per day; adjust as needed
          .tickFormat(d3.timeFormat("%d-%b"))
      ); // Fewer and formatted ticks);

    // Replace with dynamic range adjustment
    const minCases = d3.min(stateLast30Days, (d) => d.cases);
    const maxCases = d3.max(stateLast30Days, (d) => d.cases);
    const padding = (maxCases - minCases) * 0.1;

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([minCases - padding, maxCases + padding])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y).tickFormat(d3.format("~s"))); // Apply the tick format here

    // Add the line for cases
    svg
      .append("path")
      .datum(stateLast30Days)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(new Date(d.date)))
          .y((d) => y(d.cases))
      );

    // Optionally, repeat the above block for deaths with a different stroke color
  }

  return (
    <>
      <div className='rounded-md shadow-md bg-gradient-to-b from-slate-500 to-white'>
        <h1>Cases in last 30 days in {stateName}</h1>
        <div ref={d3Container}></div> {/* D3 chart will append here */}
      </div>
    </>
  );
}

export default Comp3;
