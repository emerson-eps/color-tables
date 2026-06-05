import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { colorTables } from "..";
import {
  type DiscreteCodes,
  DiscreteColorLegend,
  type DiscreteColorLegendProps,
} from ".";

// storybook page
const meta: Meta<typeof DiscreteColorLegend> = {
  title: "Legends/DiscreteColorLegend",
  component: DiscreteColorLegend,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};
export default meta;

type Story = StoryObj<typeof DiscreteColorLegend>;

type DiscreteDataType = DiscreteCodes | { objects: DiscreteCodes };

const discreteData: DiscreteCodes = {
  OS: [[], 0],
  LSF: [[], 1],
  USF: [[], 2],
  MB: [[], 3],
  TB: [[], 4],
  TC: [[], 5],
  TFS: [[], 6],
  TFM: [[], 7],
  MSH: [[], 8],
  CAL: [[], 9],
};

const DEFAULT_ARGS: DiscreteColorLegendProps = {
  discreteData,
  dataObjectName: "Wells / FACIES",
  colorName: "Facies",
  horizontal: true,
  legendScaleSize: 300,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
};

export const Facies: Story = {
  args: {
    ...DEFAULT_ARGS,
  },
};

export const BackgroundColor: Story = {
  args: {
    ...DEFAULT_ARGS,
    cssLegendStyles: {
      backgroundColor: "red",
    },
  },
};

const faciesNoCalciteData: DiscreteDataType = {
  F_OFFSHORE: [[], 0],
  F_LOWER_SHOREFACE: [[], 1],
  F_UPPER_SHOREFACE: [[], 2],
  F_MOUTH_BAR: [[], 3],
  F_TIDAL_BAR: [[], 4],
  F_TIDAL_CHANNEL: [[], 5],
  F_TIDAL_FLAT_SANDY: [[], 6],
  F_TIDAL_FLAT_MUDDY: [[], 7],
  F_MARSH: [[], 8],
  F_CALCITE: [[], 9],
};

const cssLegendStyles = { top: "0%", left: "0%" };

export const FaciesNoCalciteTemplate: Story = {
  args: {
    discreteData: faciesNoCalciteData,
    dataObjectName: "Wells / FACIES_NoCalcite",
    colorName: "Facies",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

const faultDistanceHumData: DiscreteDataType = {
  no: [[], 0],
  yes: [[], 1],
};

export const FaultDistanceHumTemplate: Story = {
  args: {
    discreteData: faultDistanceHumData,
    dataObjectName: "Wells / FaultDistance_HUM",
    colorName: "GasOilWater",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

const faultProximityFlagData: DiscreteDataType = {
  no: [[], 0],
  yes: [[], 1],
};

export const FaultProximityFlagTemplate: Story = {
  args: {
    discreteData: faultProximityFlagData,
    dataObjectName: "Wells / FAULT_PROXIMITY_FLAG",
    colorName: "Time/Depth",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

const rdeData: DiscreteDataType = {
  OFFSHORE: [[], 1],
  LSF: [[], 2],
  USF: [[], 3],
  TIDAL: [[], 4],
  ONSHORE: [[], 5],
};

export const RDETemplate: Story = {
  args: {
    discreteData: rdeData,
    dataObjectName: "Wells / RDE",
    colorName: "Accent",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

const rdeOrigData: DiscreteDataType = {
  F_OFFSHORE: [[], 0],
  F_LOWER_SHOREFACE: [[], 1],
  F_UPPER_SHOREFACE: [[], 2],
  F_MOUTH_BAR: [[], 3],
  F_TIDAL_BAR: [[], 4],
  F_TIDAL_CHANNEL: [[], 5],
  F_TIDAL_FLAT_SANDY: [[], 6],
  F_TIDAL_FLAT_MUDDY: [[], 7],
  F_MARSH: [[], 8],
  F_CALCITE: [[], 9],
  R_OFFSHORE: [[], 10],
  R_SHOREFACE: [[], 11],
  R_TIDAL: [[], 12],
  R_ONSHORE: [[], 13],
  R_USF: [[], 14],
  R_LSF: [[], 15],
};

export const RDEOrigTemplate: Story = {
  args: {
    discreteData: rdeOrigData,
    dataObjectName: "Wells / RDE_ORIG",
    colorName: "Stratigraphy",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

const zoneLogData: DiscreteDataType = {
  Above_BCU: [[], 0],
  ABOVE: [[], 1],
  H12: [[], 2],
  H11: [[], 3],
  H10: [[], 4],
  H9: [[], 5],
  H8: [[], 6],
  H7: [[], 7],
  H6: [[], 8],
  H5: [[], 9],
  H4: [[], 10],
  H3: [[], 11],
  H2: [[], 12],
  H1: [[], 13],
  BELOW: [[], 14],
};

export const ZonelogTemplate: Story = {
  args: {
    discreteData: zoneLogData,
    dataObjectName: "Wells / ZONELOG",
    colorName: "Stratigraphy",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};

const zoneMainData: DiscreteDataType = {
  0: [[], 0],
  4: [[], 4],
  UPPER: [[], 1],
  MID: [[], 2],
  LOWER: [[], 3],
};

export const ZoneMainTemplate: Story = {
  args: {
    discreteData: zoneMainData,
    dataObjectName: "Wells / ZONE_MAIN",
    colorName: "Stratigraphy",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles,
  },
};
