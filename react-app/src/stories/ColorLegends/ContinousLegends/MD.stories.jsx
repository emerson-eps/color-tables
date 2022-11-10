import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};

const min = 2917;
const max = 4723;
const dataObjectName = "Wells / MD";
const position = {left: 5, top: 10};
const horizontal = true;
const colorName = "Time/Depth";
const isLog = true;
const isRangeShown = true;

const Template = (args) => {
  return <ContinuousLegend {...args} />;
};

export const MDTemplate = Template.bind({});
MDTemplate.args = {
  min,
  max,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
  isLog,
  isRangeShown,
};
