import * as React from "react";
import { ColorSelectorAccordion } from "../../../component/ColorSelector/ColorSelectorAccordion";
import colorTables from "../../../component/color-tables.json";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: ColorSelectorAccordion,
  title: "Legends/ColorSelector",
};

const Template = (args) => {
  return (
    <ColorSelectorAccordion
      colorTables={colorTables}
      position={{ top: 10, left: 5 }}
    />
  );
};

export const selectorTemplate = Template.bind({});
