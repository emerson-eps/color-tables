import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { colorTables } from "../component";
import {
  ContinuousLegend,
  type ContinuousLegendProps,
} from "../component/Legend/ContinuousLegend";

// storybook page
const meta: Meta<typeof ContinuousLegend> = {
  title: "Legends/ContinousLegend",
  component: ContinuousLegend,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};
export default meta;

type Story = StoryObj<typeof ContinuousLegend>;

const DEFAULT_ARGS: ContinuousLegendProps = {
  min: 0,
  max: 1,
  isRangeShown: true,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
};

const cssLegendStyles = { top: "0%", left: "0%" };

export const StandardColorTableLibrary: Story = {
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Physics color map",
    colorName: "Physics",
    cssLegendStyles,
  },
};

export const DefaultColorTable: Story = {
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Default color table (Rainbow)",
  },
};

export const BackgroundColor: Story = {
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Physics color map",
    cssLegendStyles: {
      backgroundColor: "red",
    },
  },
};

export const MDTemplate: Story = {
  args: {
    min: 2917,
    max: 4723,
    dataObjectName: "Wells / MD",
    colorName: "Time/Depth",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

export const NTGTemplate: Story = {
  args: {
    min: 0,
    max: 1,
    dataObjectName: "Wells / NTG",
    colorName: "Rainbow",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

export const PermeabilityTemplate: Story = {
  args: {
    min: 2782,
    max: 3513,
    dataObjectName: "Wells / PERM",
    colorName: "Permeability",
    colorTables,
    horizontal: true,
    colorMapFunction: (x: number) => [255 - x * 100, 255 - x * 100, 255 * x],
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

export const PermTotTemplate: Story = {
  args: {
    min: -999,
    max: 14023,
    dataObjectName: "Wells / PERMTOT",
    colorName: "Porosity",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

export const PorosityTemplate: Story = {
  args: {
    min: 0,
    max: 0.35,
    dataObjectName: "Wells / PORO",
    colorName: "Porosity",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

export const PoroTotTemplate: Story = {
  args: {
    min: 0,
    max: 0.35,
    dataObjectName: "Wells / POROTOT",
    colorName: "Porosity",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

export const SWTemplate: Story = {
  args: {
    min: 0,
    max: 1,
    dataObjectName: "Wells / SW",
    colorName: "Rainbow",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};
