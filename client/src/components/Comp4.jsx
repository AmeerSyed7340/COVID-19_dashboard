import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "../styles/Comp4.css";

const Comp4 = () => {
  const [compData, setCompData] = useState([]);
  const d3Container = useRef(null);

  // Fetch data on mount
  useEffect(() => {
    fetch(
      "https://disease.sh/v3/covid-19/vaccine/coverage/states?lastdays=30&fullData=false"
    )
      .then((response) => response.json())
      .then((data) => {
        // Filter out the 'United States' entry or any other non-state entities if necessary
        const excludeList = [
          "United States",
          "Bureau of Prisons",
          "Dept of Defense",
          "Federated States of Micronesia",
          "Indian Health Svc",
          "Long Term Care",
          "Marshall Islands",
          "Northern Mariana Islands",
          "Republic of Palau",
          "Veterans Health",
          "Virgin Islands",
        ];
        const filteredData = data.filter(
          (item) => !excludeList.includes(item.state)
        );
        setCompData(filteredData);
      });
  }, []);

  // Create heatmap when compData is updated
  useEffect(() => {
    if (compData.length > 0 && d3Container.current) {
      createHeatmap(compData);
    }
  }, [compData]); // Dependency array ensures this runs when compData changes

  const createHeatmap = (data) => {
    // Clear the previous SVG to avoid duplicates
    d3.select(d3Container.current).selectAll("*").remove();

    const margin = { top: 50, right: 20, bottom: 100, left: 100 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const stateNames = data.map((d) => d.state);
    const dates = Object.keys(data[0].timeline).map((date) => new Date(date));
    const counts = data.map((d) => Object.values(d.timeline));

    const x = d3.scaleBand().range([0, width]).domain(dates).padding(0.05);

    const y = d3
      .scaleBand()
      .range([height, 0])
      .domain(stateNames)
      .padding(0.05);

    const colorScale = d3
      .scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([0, d3.max(counts.flat())]);

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => `translate(0,${y(d.state)})`)
      .selectAll("rect")
      .data((d) => Object.entries(d.timeline))
      .join("rect")
      .attr("x", (d) => x(new Date(d[0])))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("fill", (d) => colorScale(d[1]));

    // Add the X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d")))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add the Y Axis
    svg.append("g").call(d3.axisLeft(y));
  };

  return <div className="comp4" ref={d3Container}></div>;
};

export default Comp4;
