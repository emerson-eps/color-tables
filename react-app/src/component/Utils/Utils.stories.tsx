import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { ContinuousLegend } from "../Legend/ContinuousLegend";

import {
  createContinuousLibraryColorScale,
  createDefaultContinuousColorScale,
} from "./legendCommonFunction";

// storybook page
const meta: Meta<typeof ContinuousLegend> = {
  title: "Utils/CommonFunctions",
  component: ContinuousLegend,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};
export default meta;

type Story = StoryObj<typeof ContinuousLegend>;

const min = 0;
const max = 1;
const dataObjectName = "Physics color map function";
const colorName = "Physics";

function colorMap(value: number) {
  const f = createContinuousLibraryColorScale(colorName);
  return f(value);
}

export const ColorMapFunction: Story = {
  args: {
    min,
    max,
    dataObjectName,
    colorMapFunction: colorMap,
    legendFontSize: 13,
  },
};

export const DefaultColorMapFunction: Story = {
  args: {
    min,
    max,
    dataObjectName: "Default color scale (Rainbow)",
    colorMapFunction: createDefaultContinuousColorScale(),
    legendFontSize: 13,
  },
};
