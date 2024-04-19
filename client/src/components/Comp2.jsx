import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/Comp2.css";

function Comp2({ eachState }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (eachState) {
      const resizeObserver = new ResizeObserver(entries => {
        if (entries.length) {
          const { width, height } = entries[0].contentRect;
          drawBarChart(width, height);
        }
      });
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
      }
    }
  }, [eachState]);

  function drawBarChart(width, height) {
    const margin = { top: 20, right: 30, bottom: 70, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Clear any existing SVG
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Filtering and preparing data
    const data = Object.entries(eachState).filter(([key, value]) => 
      typeof value === "number" && !isNaN(value) && value !== null && key !== "state" && key !== "updated"
    ).map(([key, value]) => ({ key, value }));

    const x = d3.scaleBand()
      .domain(data.map(d => d.key))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, 15000000]) // Adjusting the y-axis domain to 0 to 15 million
      .range([innerHeight, 0]);

    // Format large numbers with commas for thousands
    const yAxisTickFormat = d3.format(",.0f");

    svg.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
      .call(d3.axisLeft(y).tickFormat(yAxisTickFormat));

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.key))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.value))
      .attr("height", d => innerHeight - y(d.value))
      .attr("fill", "#69b3a2");
  }

  return (
    <div ref={containerRef} className='h-[500px] w-full rounded-md shadow-md bg-gradient-to-b from-slate-500 to-white'>
      <h1>Each State's Cases</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default Comp2;
