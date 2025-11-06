import { useState, useEffect } from 'react';
import * as d3 from 'd3';
// Import subscribe/unsubscribe to listen for music events
import { subscribe, unsubscribe } from '../console-monkey-patch';

export default function Graph() {
  const [rngNumber, setRngNumber] = useState(0);
  const [rngArray, setRngArray] = useState([]);
  // Track the last music event string
  const [lastHap, setLastHap] = useState('');
  // Count total events received
  const [totalEvents, setTotalEvents] = useState(0);
  const maxItems = 20;
  const maxValue = 60;
  // Clear graph every 100 events
  const clearEvery = 100;

  // Listen for Strudel music events
  useEffect(() => {
    function handleMusicData(event) {
      const musicData = event.detail;

      if (musicData && musicData.length > 0) {
        const latest = musicData[musicData.length - 1];
        // Convert music string to number
        const number = convertToNumber(latest);

        setRngNumber(number);
        setLastHap(latest);
        setTotalEvents((prev) => prev + 1);
      }
    }

    subscribe('d3Data', handleMusicData);
    return () => unsubscribe('d3Data', handleMusicData);
  }, []);

  // Convert Strudel music strings to numbers for visualization
  // Extracts values from patterns like "note:c3", "n:5", "gain:0.8"
  function convertToNumber(musicString) {
    // Extract musical note (e.g., "note:bb3")
    const noteMatch = musicString.match(/note:([a-g]#?b?)(\d+)/i);
    if (noteMatch) {
      const octave = parseInt(noteMatch[2]);
      return (octave * 12) % maxValue;
    }

    // Extract n value
    const nMatch = musicString.match(/n:(\d+)/);
    if (nMatch) return parseInt(nMatch[1]) % maxValue;

    // Extract gain value
    const gainMatch = musicString.match(/gain:([\d.]+)/);
    if (gainMatch) return Math.floor(parseFloat(gainMatch[1]) * maxValue);

    // Extract postgain value
    const postgainMatch = musicString.match(/postgain:([\d.]+)/);
    if (postgainMatch)
      return Math.floor(parseFloat(postgainMatch[1]) * 10) % maxValue;

    // Use string length
    return musicString.length % maxValue;
  }

  // Clear the graph array every 100 events
  useEffect(() => {
    if (totalEvents % clearEvery === 0 && totalEvents > 0) {
      setRngArray([]);
    }
  }, [totalEvents]);

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
    const svg = d3.select('#graph-svg');
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

  // Calculate countdown to next clear
  const eventsUntilClear = clearEvery - (totalEvents % clearEvery);

  return (
    <div className="App container">
      <div className="row">
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-body">
              <p>
                <strong>Total Events:</strong> {totalEvents} |{' '}
                <strong>Graph Points:</strong> {rngArray.length}/{maxItems}
              </p>
              <p>
                <strong>Clear in:</strong>{' '}
                <span
                  className={`badge ${
                    eventsUntilClear <= 10 ? 'bg-danger' : 'bg-info'
                  }`}
                >
                  {eventsUntilClear}
                </span>{' '}
                events
              </p>
              <p>
                <strong>Last Value:</strong>{' '}
                <span className="badge bg-success">{rngNumber}</span>
              </p>
              <p className="mb-0">
                <strong>Last Hap:</strong>{' '}
                <small
                  className="text-muted d-inline-block"
                  style={{
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    verticalAlign: 'top',
                  }}
                  title={lastHap || 'Waiting for data...'}
                >
                  {lastHap
                    ? lastHap.length > 30
                      ? lastHap.substring(0, 30) + '...'
                      : lastHap
                    : 'Waiting for data...'}
                </small>
              </p>
            </div>
          </div>
          <div className="alert alert-warning">
            <strong>Current Graph Data:</strong> [{rngArray.join(', ')}]
          </div>
        </div>
      </div>
      <div className="row">
        <svg
          id="graph-svg"
          width="100%"
          height="200px"
          className="border border-primary rounded p-2"
        ></svg>
      </div>
    </div>
  );
}
