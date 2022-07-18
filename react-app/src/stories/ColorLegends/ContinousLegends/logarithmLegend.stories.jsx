import React from "react";
import { LogLegend } from "../../../component/Legend/LogLegend";
export default {
  component: LogLegend,
  title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";
import { scaleLog } from "d3";

const min = 1;
const max = 10;
const dataObjectName = "Wells / PORO";
const position = [16, 10];
const horizontal = true;
const colorName = "Porosity";
const reverseRange = false;
const colorMapFunction = createLogarithmicLibraryColorScale("Stratigraphy")
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
  colorMapFunction
};

function createLogarithmicLibraryColorScale(
  name,
  library = colorTables
) {
  const breakpoints = library.find((value) => {
    return value.name === name;
  });
  const domain = breakpoints.colors.map((row) => row[0]);
  return (number) => {
    return scaleLog().domain(domain) * breakpoints.colors.map((row) => {
      return [row[1], row[2], row[3]]
    });
  };
}
