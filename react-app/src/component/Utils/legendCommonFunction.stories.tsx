import React from "react";
import { ContinuousLegend } from "../../component/Legend/ContinuousLegend";
import {
  createContinuousLibraryColorScale,
  createDefaultContinuousColorScale,
} from "./legendCommonFunction";

export default {
  component: ContinuousLegend,
  title: "Utils / Common Functions",
};

const min = 0;
const max = 1;
const dataObjectName = "Physics color map function";
const colorName = "Physics";

function colorMap(value: number) {
  const f = createContinuousLibraryColorScale(colorName);
  return f(value);
}

const ContinuousLegendTemplate = (args: JSX.IntrinsicAttributes & 
  { min?: number; max?: number; dataObjectName?: string; colorName?: string;}) => {
  return <ContinuousLegend {...args} />;
};

export const ColorMapFunction = ContinuousLegendTemplate.bind({});
ColorMapFunction.args = {
  min,
  max,
  dataObjectName,
  colorMapFunction: colorMap,
  legendFontSize: 13,
};

export const DefaultColorMapFunction = ContinuousLegendTemplate.bind({});
DefaultColorMapFunction.args = {
  min,
  max,
  dataObjectName: "Default color scale (Rainbow)",
  colorMapFunction: createDefaultContinuousColorScale(),
  legendFontSize: 13,
};
