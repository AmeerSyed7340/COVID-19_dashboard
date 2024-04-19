import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import "../styles/Comp4.css";

const Comp4 = () => {
  const [compData, setCompData] = useState([]);
  const d3Container = useRef(null);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/vaccine/coverage/states?lastdays=30&fullData=false")
      .then((response) => response.json())
      .then((data) => {
        const excludeList = [
          "United States", "Bureau of Prisons", "Dept of Defense", "Federated States of Micronesia",
          "Indian Health Svc", "Long Term Care", "Marshall Islands", "Northern Mariana Islands",
          "Republic of Palau", "Veterans Health", "Virgin Islands"
        ];
        const filteredData = data.filter((item) => !excludeList.includes(item.state));
        setCompData(filteredData);
      });
  }, []);

  useEffect(() => {
    if (compData.length > 0 && d3Container.current) {
      const resizeObserver = new ResizeObserver(entries => {
        if (entries && entries.length) {
          const { width, height } = entries[0].contentRect;
          createHeatmap(compData, width, height);
        }
      });

      resizeObserver.observe(d3Container.current);

      return () => resizeObserver.disconnect();  // Cleanup observer when component unmounts
    }
  }, [compData]);

  const createHeatmap = (data, width, height) => {
    const margin = { top: 50, right: 20, bottom: 100, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    d3.select(d3Container.current).selectAll("*").remove();

    const svg = d3
      .select(d3Container.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const stateNames = data.map(d => d.state);
    const dates = Object.keys(data[0].timeline).map(date => new Date(date));
    const counts = data.map(d => Object.values(d.timeline));

    const x = d3.scaleBand().range([0, innerWidth]).domain(dates).padding(0.05);
    const y = d3.scaleBand().range([innerHeight, 0]).domain(stateNames).padding(0.05);
    const colorScale = d3.scaleSequential().interpolator(d3.interpolateInferno).domain([0, d3.max(counts.flat())]);

    svg.append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(0,${y(d.state)})`)
      .selectAll("rect")
      .data(d => Object.entries(d.timeline))
      .join("rect")
      .attr("x", d => x(new Date(d[0])))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("fill", d => colorScale(d[1]));

    svg.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d")))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(y));
  };

  return <div ref={d3Container} className="rounded-md shadow-md bg-gradient-to-b from-gray-300 to-white" style={{ width: '100%', height: '100%' }}></div>;
};

export default Comp4;
