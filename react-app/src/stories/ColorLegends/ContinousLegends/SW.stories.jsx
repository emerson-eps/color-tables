import React from "react";

import colorTables from "../../../component/color-tables.json";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = 0;
const max = 1;
const dataObjectName = "Wells / SW";
const position = [16, 10];
const horizontal = true;
const colorName = "Rainbow";
const isRangeShown = true;

const Template = args => {
  return <ContinuousLegend {...args} />;
};

export const SWTemplate = Template.bind({});
SWTemplate.args = {
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
