import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";

const min = 2782;
const max = 3513;
const dataObjectName = "Wells / PERM";
const position = [16, 10];
const horizontal = true;
const colorName = "Permeability";
const colorMapFunction = (x) => [255 - x * 100, 255 - x * 100, 255 * x];

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
};
