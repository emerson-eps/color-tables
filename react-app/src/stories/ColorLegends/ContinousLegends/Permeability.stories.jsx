import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
import colorTables from "../../../component/color-tables.json";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = -999;
const max = 14023;
const dataObjectName = "Wells / PERM";
const position = [16, 10];
const horizontal = true;
const colorName = "Permeability";

const Template = args => {
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
};
