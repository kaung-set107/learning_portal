import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],

  ["Listening", 11],
  ["Reading", 24],
  ["Writing", 26],
  ["hello", 0],
  ["Speaking", 39],

  // CSS-style declaration
];

export const options = {
  title: "My Daily Activities",
  pieHole: 0.5,
  is3D: false,
};

export default function PieChart() {
  return (
    <Chart
      chartType='PieChart'
      width='100%'
      height='400px'
      data={data}
      options={options}
    />
  );
}
