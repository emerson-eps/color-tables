import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
import colorTables from "../../../component/color-tables.json";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = -999;
const max = 14023;
const dataObjectName = "Wells / PERMTOT";
const position = [16, 10];
const horizontal = true;
const colorName = "Porosity";

const Template = args => {
  return <ContinuousLegend {...args} />;
};

export const PermTotTemplate = Template.bind({});
PermTotTemplate.args = {
  min,
  max,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
};
