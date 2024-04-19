import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/Comp1.css";
import usStatesGeoJson from "../data/gz_2010_us_040_00_500k.json";

function Comp1({ states }) {
  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);  // Reference for the tooltip div

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries && entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        updateMap(width, height);
      }
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, [states]);

  const updateMap = (width, height) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG contents

    const projection = d3.geoAlbersUsa()
                         .translate([width / 2, height / 2])
                         .scale(Math.min(width, height) * 1.3);
    const path = d3.geoPath().projection(projection);

    svg.selectAll(".state")
       .data(usStatesGeoJson.features)
       .join("path")
       .attr("d", path)
       .attr("fill", "#ccc")
       .attr("stroke", "#333");

    const radiusScale = d3.scaleSqrt()
                          .domain([0, d3.max(states, d => d.cases)])
                          .range([0, Math.min(width, height) / 20]);  // Ensure radius is visible

    const tooltip = d3.select(tooltipRef.current);

    svg.selectAll(".bubble")
       .data(states)
       .join("circle")
       .attr("cx", d => {
         const centroid = projection(d3.geoCentroid(usStatesGeoJson.features.find(f => f.properties.NAME === d.state)));
         return centroid ? centroid[0] : null;
       })
       .attr("cy", d => {
         const centroid = projection(d3.geoCentroid(usStatesGeoJson.features.find(f => f.properties.NAME === d.state)));
         return centroid ? centroid[1] : null;
       })
       .attr("r", d => radiusScale(d.cases))
       .attr("fill", "red")
       .attr("opacity", 0.75)
       .on('mouseover', (event, d) => {
         tooltip.style('display', 'block')
                .html(`<strong>State:</strong> ${d.state}<br/><strong>Cases:</strong> ${d.cases}`)
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`);
       })
       .on('mousemove', (event) => {
         tooltip.style('left', `${event.pageX + 10}px`)
                .style('top', `${event.pageY + 10}px`);
       })
       .on('mouseout', () => {
         tooltip.style('display', 'none');
       });
  };

  return (
    <div ref={wrapperRef} className="h-[500px] w-full rounded-md shadow-md bg-gradient-to-b from-slate-500 to-white">
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>
      <div ref={tooltipRef} className="tooltip" style={{ position: 'absolute', pointerEvents: 'none', display: 'none', backgroundColor: 'white', border: '1px solid black', padding: '5px', zIndex: 10 }}></div>
    </div>
  );
}

export default Comp1;
