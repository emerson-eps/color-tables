import React from "react";

import { DiscreteColorLegend } from "../../../component/Legend/DiscreteLegend";
import colorTables from "../../../component/color-tables.json";

export default {
  component: DiscreteColorLegend,
  title: "Legends/DiscreteColorLegend",
};

const discreteData = {
  no: [[], 0],
  yes: [[], 1],
};
const dataObjectName = "Wells / FaultDistance_HUM";
const position = { left: 16, top: 10 };
const horizontal = true;
const colorName = "GasOilWater";

const Template = (args) => {
  return <DiscreteColorLegend {...args} />;
};

export const FaultDistanceHumTemplate = Template.bind({});
FaultDistanceHumTemplate.args = {
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
