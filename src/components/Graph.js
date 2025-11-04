import { useState, useEffect } from 'react';
import * as d3 from 'd3';

export default function Graph() {
  const [rngNumber, setRngNumber] = useState(0);
  const [rngArray, setRngArray] = useState([]);
  const maxItems = 20;
  const timeout = 500;
  const maxValue = 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setRngNumber(Math.floor(Math.random() * maxValue));
    }, timeout);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // append new value and keep length <= maxItems
    setRngArray((prev) => {
      const temp = [...prev, rngNumber];
      if (temp.length > maxItems) temp.shift();
      return temp;
    });
  }, [rngNumber]);

  useEffect(() => {
    // Select SVG and clear
    const svg = d3.select('svg');
    if (!svg.node() || !rngArray || rngArray.length === 0) {
      svg.selectAll('*').remove();
      return;
    }
    svg.selectAll('*').remove();

    // Set the Width and Height (subtract margins)
    const w = svg.node().getBoundingClientRect().width - 40;
    const h = svg.node().getBoundingClientRect().height - 25;
    const barMargin = 10;
    const barWidth = w / rngArray.length;

    // Create yScale
    const yScale = d3.scaleLinear().domain([0, maxValue]).range([h, 0]);

    // Translate the Bars to make room for axis
    const chartGroup = svg
      .append('g')
      .classed('chartGroup', true)
      .attr('transform', `translate(30,3)`);

    // Bind data to groups
    const barGroups = chartGroup.selectAll('g').data(rngArray);

    // Enter
    const newBarGroups = barGroups
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${i * barWidth}, ${yScale(d)})`);

    /* 
    // Draw rectangles (COMMENTED OUT)
    newBarGroups
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", (d) => h - yScale(d))
      .attr("width", barWidth - barMargin)
      .attr("fill", "black");
    */

    // Add labels
    newBarGroups
      .append('text')
      .attr('x', (barWidth - barMargin) / 2)
      .attr('y', (d) => -6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#000')
      .style('font-size', '12px')
      .text((d) => d);

    // Add yAxis to chartGroup
    const yAxis = d3.axisLeft(yScale);
    chartGroup.append('g').classed('axis y', true).call(yAxis);

    // Remove exit (if any)
    barGroups.exit().remove();

    // Set the gradient
    chartGroup
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(0))
      .attr('x2', 0)
      .attr('y2', yScale(maxValue))
      .selectAll('stop')
      .data([
        { offset: '0%', color: 'green' },
        { offset: '100%', color: 'red' },
      ])
      .enter()
      .append('stop')
      .attr('offset', function (d) {
        return d.offset;
      })
      .attr('stop-color', function (d) {
        return d.color;
      });

    // Draw line
    const line = d3
      .line()
      .x((d, i) => i * barWidth + (barWidth - barMargin) / 2)
      .y((d) => yScale(d));

    chartGroup
      .append('path')
      .datum(rngArray)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [rngArray, maxValue]);

  return (
    <div className="App container">
      <h1>RNG Output: {rngNumber}</h1>
      <div className="row">
        <svg
          width="100%"
          height="200px"
          className="border border-primary rounded p-2"
        ></svg>
      </div>
    </div>
  );
}
