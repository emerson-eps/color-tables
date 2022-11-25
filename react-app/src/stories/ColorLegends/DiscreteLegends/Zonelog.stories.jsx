import React from "react";
import { DiscreteColorLegend } from "../../../component/Legend/DiscreteLegend";
import colorTables from "../../../component/color-tables.json";

export default {
  component: DiscreteColorLegend,
  title: "Legends/DiscreteColorLegend",
};

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
const dataObjectName = "Wells / ZONELOG";
const position = { left: 16, top: 10 };
const horizontal = true;
const colorName = "Stratigraphy";

const Template = (args) => {
  return <DiscreteColorLegend {...args} />;
};

export const ZonelogTemplate = Template.bind({});
ZonelogTemplate.args = {
  discreteData,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
  legendFontSize: 13,
  legendScaleSize: 300,
  cssLegendStyles: { top: "0%", left: "0%" },
  // tickFontSize: 13,
  // numberOfTicks: 3,
};
