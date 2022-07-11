import React from "react";
import { LogLegend } from "../../../component/Legend/LogLegend";
export default {
  component: LogLegend,
  title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";

const min = 1;
const max = 10;
const dataObjectName = "Wells / PORO";
const position = [16, 10];
const horizontal = true;
const colorName = "Porosity";
const reverseRange = false;

const Template = (args) => {
  return <LogLegend {...args} />;
};

export const LogLegendTemplate = Template.bind({});
LogLegendTemplate.args = {
  min,
  max,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
  reverseRange,
};

// var log = d3.scaleLog()
//     .domain([ 0.1, 100, 1000 ])
//     .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);

// var svg = d3.select("svg");

// svg.append("g")
//   .attr("class", "legendLog")
//   .attr("transform", "translate(20,20)");

// var logLegend = d3.legendColor()
//     .cells([0.1, 5, 10, 50, 100, 500, 1000])
//     .scale(log);

// svg.select(".legendLog")
//   .call(logLegend);
