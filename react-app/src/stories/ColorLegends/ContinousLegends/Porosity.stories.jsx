import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
import colorTables from "../../../component/color-tables.json";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = 0;
const max = 0.35;
const dataObjectName = "Wells / PORO";
const position = [16, 10];
const horizontal = true;
const colorName = "Porosity";

const Template = args => {
  return <ContinuousLegend {...args} />;
};

export const PorosityTemplate = Template.bind({});
PorosityTemplate.args = {
  min,
  max,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
};
