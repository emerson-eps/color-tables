import React from "react";
import { DiscreteColorLegend } from "../../../component/Legend/DiscreteLegend";
import colorTables from "../../../component/color-tables.json";

export default {
  component: DiscreteColorLegend,
  title: "Legends/DiscreteColorLegend",
};

const discreteData = {
  F_OFFSHORE: [[], 0],
  F_LOWER_SHOREFACE: [[], 1],
  F_UPPER_SHOREFACE: [[], 2],
  F_MOUTH_BAR: [[], 3],
  F_TIDAL_BAR: [[], 4],
  F_TIDAL_CHANNEL: [[], 5],
  F_TIDAL_FLAT_SANDY: [[], 6],
  F_TIDAL_FLAT_MUDDY: [[], 7],
  F_MARSH: [[], 8],
  F_CALCITE: [[], 9],
  R_OFFSHORE: [[], 10],
  R_SHOREFACE: [[], 11],
  R_TIDAL: [[], 12],
  R_ONSHORE: [[], 13],
  R_USF: [[], 14],
  R_LSF: [[], 15],
};
const dataObjectName = "Wells / RDE_ORIG";
const position = { left: 16, top: 10 };
const horizontal = true;
const colorName = "Stratigraphy";

const Template = (args) => {
  return <DiscreteColorLegend {...args} />;
};

export const RDEOrigTemplate = Template.bind({});
RDEOrigTemplate.args = {
  discreteData,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
};
