import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = 0;
const max = 0.35;
const dataObjectName = "Wells / POROTOT";
const position = {left: 5, top: 10};
const horizontal = true;
const colorName = "Porosity";
const reverseRange = false;
const isRangeShown = true;
const legendFontSize = 13;
const tickFontSize = 13;
const numberOfTicks = 3;
const legendScaleSize = 300;

const Template = (args) => {
  return <ContinuousLegend {...args} />;
};

export const PoroTotTemplate = Template.bind({});
PoroTotTemplate.args = {
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
