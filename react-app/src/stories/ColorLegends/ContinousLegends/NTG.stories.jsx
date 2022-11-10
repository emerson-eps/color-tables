import colorTables from "../../../component/color-tables.json";
import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
// eslint-disable-next-line import/no-anonymous-default-export
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
const isRangeShown = true;

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
  isRangeShown,
};
