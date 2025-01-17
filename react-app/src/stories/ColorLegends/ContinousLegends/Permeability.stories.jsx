import React from "react";

import colorTables from "../../../component/color-tables.json";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = 2782;
const max = 3513;
const dataObjectName = "Wells / PERM";
const position = [16, 10];
const horizontal = true;
const colorName = "Permeability";
const colorMapFunction = (x) => [255 - x * 100, 255 - x * 100, 255 * x];
const isRangeShown = true;

const Template = (args) => {
  return <ContinuousLegend {...args} />;
};

export const PermeabilityTemplate = Template.bind({});
PermeabilityTemplate.args = {
  min,
  max,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
  colorMapFunction,
  isRangeShown,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
  cssLegendStyles: { top: "0%", left: "0%" },
};
