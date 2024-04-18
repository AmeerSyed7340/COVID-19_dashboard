import "../styles/Comp2.css";
import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

function Comp2({ eachState }) {
  const d3Container = useRef(null);

  useEffect(() => {
    if (eachState && d3Container.current) {
      drawBarChart();
    }
  }, [eachState]);

  function drawBarChart() {
    // Filter the data to exclude non-numeric fields and the state name
    const filteredData = Object.entries(eachState).filter(
      ([key, value]) =>
        typeof value === "number" && // Ensure it is a number
        !isNaN(value) && // Check it's not NaN
        value !== null && // Ensure it's not null
        value !== 0 && // Exclude fields with value 0
        key !== "state" && // Exclude the 'state' field
        key !== "updated" // Exclude the 'updated' field or any other fields you don't want to display
    );

    // Dimensions and margins of the chart
    const margin = { top: 20, right: 30, bottom: 70, left: 60 },
      width = 500 - margin.left - margin.right,
      height = 250 - margin.top - margin.bottom;

    // Remove the old svg
    d3.select(d3Container.current).selectAll("*").remove();

    // Create the svg canvas
    const svg = d3
      .select(d3Container.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis - we'll use the metric names as labels
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(filteredData.map((d) => d[0]))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Y axis - the values of the metrics
    const y = d3
      .scaleLinear()
      .domain([0, 10000000]) // Set the domain to go up to 15 million
      .range([height, 0]);

    // Define the Y axis with 2 million increments
    svg
      .append("g")
      .call(d3.axisLeft(y).tickValues(d3.range(0, 10000001, 1000000)));

    // Bars with a special indication for values above 15 million
    svg
      .selectAll(".bar")
      .data(filteredData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d[0]))
      .attr("y", (d) => y(Math.min(d[1], 10000000))) // Cap the value at 15 million for the bar height
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(Math.min(d[1], 10000000)))
      .attr("fill", (d) => (d[1] > 10000000 ? "#ff4136" : "#69b3a2")); // Use a different color if the value exceeds 15 million

    // Add a '+' sign for bars that exceed the maximum value
    svg
      .selectAll(".bar-label")
      .data(filteredData)
      .enter()
      .filter((d) => d[1] > 10000000) // Only for data points above 15 million
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => x(d[0]) + x.bandwidth() / 2) // Center the text in the bar
      .attr("y", (d) => y(10000000) - 5) // Position the text slightly above the top of the bar
      .attr("text-anchor", "middle")
      .text("+"); // The text is a '+' sign

    // Create a tooltip
    const tooltip = d3
      .select(d3Container.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip") // Use this class to style your tooltip
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("pointer-events", "none"); // Ensure the tooltip doesn't interfere with mouse events

    // Bars with mouseover event for tooltip
    svg
      .selectAll(".bar")
      .data(filteredData)
      // ... rest of your bar setup
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1);
        tooltip
          .html("Value: " + d[1])
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        tooltip.style("opacity", 0);
      });
  }

  return (
    <>
      <div className="comp2">
        <h1>Each state cases</h1>
        <div className="bar-chart-container" ref={d3Container}>
          {/* The bar chart will be appended here */}
        </div>
      </div>
    </>
  );
}

export default Comp2;
