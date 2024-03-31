// Assuming the main JS file is in the same directory as covidData.js

// Now you can use `covidStats` in this file
console.log(covidStats);

const data = {
  recovered: 675384116,
  active: 22138091,
  deaths: 7008933,
};

const svg = d3.select("#pieChart"),
  width = svg.attr("width"),
  height = svg.attr("height"),
  radius = Math.min(width, height) / 2;

const color = d3.scaleOrdinal(["#4daf4a", "#377eb8", "#e41a1c"]);

const pie = d3.pie().value((d) => d.value);
const data_ready = pie(
  Object.entries(data).map(([key, value]) => ({ key, value }))
);

const arc = d3.arc().innerRadius(0).outerRadius(radius);

svg
  .append("g")
  .attr("transform", `translate(${width / 2}, ${height / 2})`)
  .selectAll("path")
  .data(data_ready)
  .join("path")
  .attr("d", arc)
  .attr("fill", (d) => color(d.data.key))
  .attr("stroke", "white")
  .style("stroke-width", "2px")
  .style("opacity", 0.7);
