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
    const svg = d3
      .select(ref)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    const x = d3
      .scaleTime()
      .domain(d3.extent(randomData, (d) => new Date(d[0])) as [Date, Date])
      .range([0, width]);
    svg
      .append("g")
      .attr("stroke-width", 0)
      .attr("transform", `translate(${margin.top + 5},${height})`)
      .call(
        d3.axisBottom(x).tickFormat((d, i) => {
          const date = new Date(d.toString()).toLocaleString("default", {
            day: "numeric",
          });
          const month = new Date(d.toString()).toLocaleString("default", {
            month: "short",
          });
          if (!i || Number(date) % 7 === 0) return `${month}`;
          if (i % 3 === 0) return `${date}`;
          return "";
        })
      );
    const sine = d3.range(0, 10).map(function (k) {
      const value = [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)];
      return value;
    });

    const max = d3.max(randomData, (d) => d[1])!;
    const min = d3.min(randomData, (d) => d[1])!;
    const y = d3
      .scaleLinear()
      .domain(d3.extent(sine, (d) => d[0]) as number[])
      .range([height, 0]);

    svg
      .append("g")
      .attr("stroke-width", 0)
      .attr("transform", `translate(${width + 5},0)`)
      .call(d3.axisRight(y));
    svg
      .append("rect")
      .attr("width", width + 10)
      .attr("height", height)
      .attr("class", "dotted-lines-rect");

    svg.append("line").attr("class", "x-dotted-line");
    svg.append("line").attr("class", "y-dotted-line");

    svg
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", y(randomData[0]?.[1]))
      .attr("x2", 0)
      .attr("y2", y(max))
      .selectAll("stop")
      .data([{ color: "#E93842" }, { color: "#16C784" }])
      .enter()
      .append("stop")
      .attr("stop-color", (d) => d.color);

    svg
      .append("path")
      .datum(randomData)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x((d as [Date, number])[0]))
          .y((d) => y((d as [Date, number])[1]))
      );

    // svg
    //   .append("circle")
    //   .attr("class", "end-circle")
    //   .attr("cx", x(randomData[randomData.length - 1]?.[0]))
    //   .attr("cy", y(randomData[randomData.length - 1]?.[1]))
    //   .attr("r", 4)
    //   .style("fill", "url(#line-gradient");

    svg
      .append("circle")
      .attr("class", "graph-circle")
      .attr("r", 6)
      .style("fill", "url(#line-gradient)");

    svg
      .append("rect")
      .attr("width", width + 10)
      .attr("height", height)
      .attr("fill", "transparent")
      .on("mouseover", () => {
        svg
          .selectAll(".x-dotted-line, .y-dotted-line, .graph-circle")
          .classed("visible", true);
      })
      .on("mousemove", (event) => {
        const xPosition = d3.pointer(event)[0];
        const yPosition = d3.pointer(event)[1];
        svg
          .select(".x-dotted-line")
          .attr("x1", xPosition)
          .attr("x2", xPosition)
          .attr("y2", height);
        svg
          .select(".y-dotted-line")
          .attr("x2", width + 10)
          .attr("y1", yPosition - 10)
          .attr("y2", yPosition - 10);

        const bisect = d3.bisector<[Date, number], Date>((d) => d[0]).left;
        const index = bisect(randomData, x.invert(xPosition));
        const [xData, yData] = !index
          ? randomData[index]
          : randomData[index - 1];
        const xValue = x(new Date(xData));
        const yValue = y(yData);
        svg
          .select(".graph-circle")
          .datum(randomData)
          .attr("cx", xValue)
          .attr("cy", yValue)
          .style("fill", "url(#line-gradient)");
      })
      .on("mouseout", () => {
        svg
          .selectAll(".x-dotted-line, .y-dotted-line, .graph-circle")
          .classed("visible", false);
      });
    return () => {
      d3.select(ref).select("svg").remove();
    };
  }, [ref, width]);

  return <div ref={setRef} />;
}
