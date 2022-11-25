import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
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
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
  cssLegendStyles: { top: "0%", left: "0%" },
};
