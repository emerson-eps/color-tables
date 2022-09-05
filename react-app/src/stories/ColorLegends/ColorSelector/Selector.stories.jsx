import * as React from "react";
import { ColorSelectorAccordion } from "../../../component/ColorSelector/ColorSelectorAccordion";
import colorTables from "../../../component/color-tables.json";
import {CustomizedDialogs} from "../../../component/BreakPoint/Modal";


export default {
  component: ColorSelectorAccordion,
  title: "Legends/ColorSelector",
};

const Template = (args) => {
  //return <CustomizedDialogs open={true} />;
  return <ColorSelectorAccordion colorTables={colorTables} />;
};

export const selectorTemplate = Template.bind({});
