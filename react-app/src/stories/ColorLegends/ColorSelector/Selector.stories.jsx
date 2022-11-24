import * as React from "react";
import { ColorSelectorAccordion } from "../../../component/ColorSelector/ColorSelectorAccordion";
import colorTables from "../../../component/color-tables.json";
export default {
  component: ColorSelectorAccordion,
  title: "Legends/ColorSelector",
};

const Template = (args) => {
  return (
    <ColorSelectorAccordion {...args} />
  );
};

export const selectorTemplate = Template.bind({});
selectorTemplate.args = {
  cssLegendStyles:{ top: "0%", left: "0%" },
  isHorizontal : true,
  isModal : false,
  colorTables,
}
