import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = 2782;
const max = 3513;
const dataObjectName = "Wells / PERM";
const position = {left: 5, top: 10};
const horizontal = true;
const colorName = "Permeability";
const colorMapFunction = (x) => [255 - x * 100, 255 - x * 100, 255 * x];
const reverseRange = false;
const isRangeShown = true;
const legendFontSize = 13;
const tickFontSize = 13;
const numberOfTicks = 3;
const legendScaleSize = 300;

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
  reverseRange,
  isRangeShown,
  legendFontSize,
  tickFontSize,
  numberOfTicks,
  legendScaleSize,
};
