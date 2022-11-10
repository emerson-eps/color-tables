import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = -999;
const max = 14023;
const dataObjectName = "Wells / PERMTOT";
const position = {left: 5, top: 10};
const horizontal = true;
const colorName = "Porosity";
const isRangeShown = true;

const Template = (args) => {
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
  isRangeShown,
};
