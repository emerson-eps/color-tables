import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";

import { ColorChangeHandler, ColorResult, SketchPicker } from "react-color";

const Template = () => {
  return <SketchPicker />;
};

export const MDTemplate = Template.bind({});
