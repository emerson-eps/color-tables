import React from "react";
import { DiscreteColorLegend } from "../../../component/Legend/DiscreteLegend";
import colorTables from "../../../component/color-tables.json";

export default {
  component: DiscreteColorLegend,
  title: "Legends/DiscreteColorLegend",
};

const discreteData = {
  OS: [[], 0],
  LSF: [[], 1],
  USF: [[], 2],
  MB: [[], 3],
  TB: [[], 4],
  TC: [[], 5],
  TFS: [[], 6],
  TFM: [[], 7],
  MSH: [[], 8],
  CAL: [[], 9],
};
const dataObjectName = "Wells / FACIES";
const position = [16, 10];
const horizontal = true;
const colorName = "Facies";

const Template = (args) => {
  return <DiscreteColorLegend {...args} />;
};

export const FaciesTemplate = Template.bind({});
FaciesTemplate.args = {
  discreteData,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
};
