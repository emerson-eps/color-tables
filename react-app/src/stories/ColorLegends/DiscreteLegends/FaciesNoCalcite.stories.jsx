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
};
const dataObjectName = "Wells / FACIES_NoCalcite";
const position = { left: 16, top: 10 };
const horizontal = true;
const colorName = "Facies";

const Template = (args) => {
  return <DiscreteColorLegend {...args} />;
};

export const FaciesNoCalciteTemplate = Template.bind({});
FaciesNoCalciteTemplate.args = {
  discreteData,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
  legendFontSize: 13,
  legendScaleSize: 300,
  cssLegendStyles: { top: "0%", left: "0%" },
};
