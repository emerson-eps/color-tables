import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
// eslint-disable-next-line import/no-anonymous-default-export
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
};
