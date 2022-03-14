import React from "react";
import { DiscreteColorLegend } from "../../../component/Legend/DiscreteLegend";
import colorTables from "../../../component/color-tables.json";

export default {
  component: DiscreteColorLegend,
  title: "Legends/DiscreteColorLegend",
};

const discreteData = {
  OFFSHORE: [[], 1],
  LSF: [[], 2],
  USF: [[], 3],
  TIDAL: [[], 4],
  ONSHORE: [[], 5],
};
const dataObjectName = "Wells / RDE";
const position = [16, 10];
const horizontal = true;
const colorName = "Accent";

const Template = args => {
  return <DiscreteColorLegend {...args} />;
};

export const RDETemplate = Template.bind({});
RDETemplate.args = {
  discreteData,
  dataObjectName,
  position,
  colorName,
  colorTables,
  horizontal,
};
