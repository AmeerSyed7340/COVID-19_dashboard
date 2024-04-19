import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/Comp3.css";

function Comp3({ stateName }) {
  const [stateLast30Days, setStateLast30Days] = useState([]);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!stateName) {
        return;
      }
      const response = await fetch(
        `https://disease.sh/v3/covid-19/nyt/states/${encodeURIComponent(stateName)}?lastdays=30`
      );
      const data = await response.json();
      setStateLast30Days(data);
    };

    fetchData();
  }, [stateName]);

  useEffect(() => {
    if (stateLast30Days.length > 0 && svgContainerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        if (entries && entries.length) {
          const { width, height } = entries[0].contentRect;
          drawChart(width, height);
        }
      });
      resizeObserver.observe(svgContainerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [stateLast30Days]);

  function drawChart(width, height) {
    // Setup margins and inner dimensions
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(svgContainerRef.current).selectAll("*").remove();

    const svg = d3.select(svgContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define the x-axis scale
    const x = d3.scaleTime()
      .domain(d3.extent(stateLast30Days, d => new Date(d.date)))
      .range([0, innerWidth]);

    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%b %d")));

    // Define the y-axis scale
    const minCases = d3.min(stateLast30Days, d => d.cases);
    const maxCases = d3.max(stateLast30Days, d => d.cases);
    const y = d3.scaleLinear()
      .domain([minCases, maxCases])  // Dynamically setting y-axis range from min to max cases
      .range([innerHeight, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Define the line path generator
    svg.append("path")
      .datum(stateLast30Days)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.cases))
      );
  }

  return (
    <div ref={svgContainerRef} className='rounded-md shadow-md bg-gradient-to-b from-slate-500 to-white' style={{ width: '100%', height: '100%' }}>
      <h1>Cases in last 30 days in {stateName}</h1>
    </div>
  );
}

export default Comp3;

