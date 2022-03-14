import * as React from "react";
import { ColorSelectorWrapper } from "../../../component/ColorSelector/ColorTableSelectorWrapper";
export default {
  component: ColorSelectorWrapper,
  title: "Legends/ColorSelector",
};

const Template = args => {
  return <ColorSelectorWrapper />;
};

export const selectorTemplate = Template.bind({});
