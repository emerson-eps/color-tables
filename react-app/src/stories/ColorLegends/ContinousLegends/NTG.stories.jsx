import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = 0;
const max = 1;
const dataObjectName = "Wells / NTG";
const position = {left: 5, top: 10};
const horizontal = true;
const colorName = "Rainbow";
const reverseRange = false;
const isRangeShown = true;
const legendFontSize = 13;
const tickFontSize = 13;
const numberOfTicks = 3;
const legendScaleSize = 300;

const Template = (args) => {
  return <ContinuousLegend {...args} />;
};

export const NTGTemplate = Template.bind({});
NTGTemplate.args = {
  min,
  max,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
  reverseRange,
  isRangeShown,
  legendFontSize,
  tickFontSize,
  numberOfTicks,
  legendScaleSize,
};
