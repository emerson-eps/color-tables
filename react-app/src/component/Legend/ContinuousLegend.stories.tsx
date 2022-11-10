import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContinuousLegend } from "../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends  / ContinuousLegend",
} as ComponentMeta<typeof ContinuousLegend>;

const min = 0;
const max = 1;
const dataObjectName = "Physics color map";
const colorName = "Physics";

const Story: ComponentStory<typeof ContinuousLegend> = (args) => {
  return <ContinuousLegend {...args} />;
};

export const StandardColorTableLibrary = Story.bind({});
StandardColorTableLibrary.args = {
  min,
  max,
  dataObjectName,
  colorName: colorName,
};

export const DefaultColorTable = Story.bind({});
DefaultColorTable.args = {
  min,
  max,
  dataObjectName: "Default color table (Rainbow)",
};
