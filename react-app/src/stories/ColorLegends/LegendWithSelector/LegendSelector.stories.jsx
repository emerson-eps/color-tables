import React from "react";
import colorTables from "../../../component/color-tables.json";
import { ColorLegend } from "../../../component/Legend/ColorLegend";

export default {
  component: ColorLegend,
  title: "Legends/LegendWithColorSelector",
};

// prop for continous legend
const min = 0;
const max = 0.35;
const dataObjectName = "Legend";
const position = [5, 10];
const horizontal = true;
const colorName = "Permeability";
const reverseRange = false;

// prop for discrete data
const discreteData = {
  Above_BCU: [[], 0],
  ABOVE: [[], 1],
  H12: [[], 2],
  H11: [[], 3],
  H10: [[], 4],
  H9: [[], 5],
  H8: [[], 6],
  H7: [[], 7],
  H6: [[], 8],
  H5: [[], 9],
  H4: [[], 10],
  H3: [[], 11],
  H2: [[], 12],
  H1: [[], 13],
  BELOW: [[], 14],
};

const Template = (args) => {
  return <ColorLegend {...args} />;
};

export const LegendWithColorSelector = Template.bind({});
LegendWithColorSelector.args = {
  min,
  max,
  dataObjectName,
  position,
  horizontal,
  colorName,
  colorTables,
  discreteData,
  reverseRange,
};
