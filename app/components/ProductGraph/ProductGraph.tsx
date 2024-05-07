"use client";
import useWindowDimensions from "@/app/custom-hooks/useWindowDimensions";
import * as d3 from "d3";
import { useEffect, useState } from "react";
// Function to generate random data
function generateRandomData() {
  const data = [];
  const startDate = new Date(2023, 0, 1); // Start date
  const endDate = new Date(2023, 11, 31); // End date
  const numDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

  for (let i = 0; i <= numDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const randomValue = Math.floor(Math.random() * 100); // Random value between 0 and 100
    data.push([currentDate, randomValue]);
  }

  return data;
}

// Usage

export default function ProductGraph() {
  const randomData = generateRandomData();
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [width, height] = useWindowDimensions();
  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 };

    // append the svg object to the body of the page
    const svg = d3
      .select(ref)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //Read the data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

      // When reading the csv, I must format variables:
      function (d) {
        return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
      }
    ).then(
      // Now I can use this dataset:
      function (data) {
        // Add X axis --> it is a date format
        const x = d3
          .scaleTime()
          .domain(
            d3.extent(data, function (d) {
              return d.date;
            })
          )
          .range([0, width]);
        svg
          .append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x))
          .style("stroke", "white")
          .selectAll("path")
          .attr("stroke", "white");

        // Add Y axis
        const y = d3
          .scaleLinear()
          .domain([
            0,
            d3.max(data, function (d) {
              return +d.value;
            }),
          ])
          .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Add the line
        svg
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", 1.5)
          .attr(
            "d",
            d3
              .line()
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.value);
              })
          );
      }
    );
    return () => {
      d3.select(ref).select("svg").remove();
    };
  }, [ref, width]);

  return <div ref={setRef} />;
}
