import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ContinuousLegend } from "../../component/Legend/ContinuousLegend";
import { createContinuousLibraryColorScale } from "./legendCommonFunction";

export default {
  component: ContinuousLegend,
  title: "Utils / Common Functions",
} as ComponentMeta<typeof ContinuousLegend>;

const min = 0;
const max = 1;
const dataObjectName = "Physics color map function";
const colorName = "Physics";

function colorMap(value: number) {
  const f = createContinuousLibraryColorScale(colorName);
  return f(value);
}

const ContinuousLegendTemplate: ComponentStory<typeof ContinuousLegend> = (
  args
) => {
  return <ContinuousLegend {...args} />;
};

export const ColorMapFunction = ContinuousLegendTemplate.bind({});
ColorMapFunction.args = {
  min,
  max,
  dataObjectName,
  colorMapFunction: colorMap,
};

export const DefaultColorMapFunction = ContinuousLegendTemplate.bind({});
DefaultColorMapFunction.args = {
  min,
  max,
  dataObjectName: "Default color scale (Rainbow)",
};
