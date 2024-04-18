import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import '../styles/Comp1.css';
import usStatesGeoJson from '../data/gz_2010_us_040_00_500k.json';

function Comp1({ states }) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    const width = 960; // Set the width of the SVG element
    const height = 600; // Set the height of the SVG element

    svg.attr('width', width)
       .attr('height', height);

    const projection = d3.geoAlbersUsa()
                         .translate([width / 2, height / 2])
                         .scale(1300);
    const path = d3.geoPath().projection(projection);

    svg.selectAll('.state')
       .data(usStatesGeoJson.features)
       .enter()
       .append('path')
       .attr('class', 'state')
       .attr('d', path)
       .attr('fill', '#ccc')
       .attr('stroke', '#333');

    const radiusScale = d3.scaleSqrt()
                          .domain([0, d3.max(states, d => d.cases)])
                          .range([0, 50]);

    svg.selectAll('.bubble')
       .data(states)
       .enter()
       .append('circle')
       .attr('class', 'bubble')
       .attr('cx', d => {
         const matchingFeature = usStatesGeoJson.features.find(feature => feature.properties.NAME === d.state);
         return matchingFeature ? projection(d3.geoCentroid(matchingFeature))[0] : null;
       })
       .attr('cy', d => {
         const matchingFeature = usStatesGeoJson.features.find(feature => feature.properties.NAME === d.state);
         return matchingFeature ? projection(d3.geoCentroid(matchingFeature))[1] : null;
       })
       .attr('r', d => radiusScale(d.cases))
       .attr('fill', 'red')
       .attr('opacity', 0.75)
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

  }, [states]); // Redraw the map when 'states' data changes

  return (
    <div className="comp1">
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} className="tooltip" style={{position: 'absolute', pointerEvents: 'none', display: 'none', backgroundColor: 'white', border: '1px solid black', padding: '5px'}}></div>
    </div>
  );
}

export default Comp1;
