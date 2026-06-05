import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { colorTables } from "..";
import { type ColorLegendProps, ColorLegend, type ScaleHandler } from ".";

// storybook page
const meta: Meta<typeof ColorLegend> = {
  title: "Legends/ColorLegend",
  component: ColorLegend,
  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};
export default meta;

type Story = StoryObj<typeof ColorLegend>;

const defaultProps: ColorLegendProps = {
  horizontal: true,
  isOpenProp: true,
  min: 0,
  max: 0.35,
  colorName: "Rainbow",
  dataObjectName: "Legend with Selector",
  isModal: true,
  isRangeShown: true,
  legendFontSize: 16,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
};

export const DefaultStyle: Story = {
  args: {
    ...defaultProps,
  },
};

export const TopLeftPosition: Story = {
  args: {
    ...defaultProps,
    cssLegendStyles: { left: "0vw", top: "0vh" },
  },
};

export const TopRightPosition: Story = {
  args: {
    ...defaultProps,
    cssLegendStyles: { right: "2vw", top: "0vh" },
  },
};

export const VerticalPositioning: Story = {
  args: {
    ...defaultProps,
    cssLegendStyles: { right: "0vw", top: "0vh" },
    horizontal: false,
  },
};

export const BottomRightPosition: Story = {
  args: {
    ...defaultProps,
    cssLegendStyles: { right: "2vw", bottom: "0vh" },
  },
};

export const BottomLeftPosition: Story = {
  args: {
    ...defaultProps,
    cssLegendStyles: { left: "0vw", bottom: "0vh" },
  },
};

export const BackgroundColor: Story = {
  args: {
    ...defaultProps,
    cssLegendStyles: {
      backgroundColor: "red",
      borderRadius: "5px",
      padding: "5px",
    },
    horizontal: false,
  },
};

const ColorSelector: React.FC<ColorLegendProps> = (props) => {
  const [color, setColor] = React.useState("Rainbow");

  const getColorName: ScaleHandler = React.useCallback((data) => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColor(data?.name || data?.legendColorName);
  }, []);

  return <ColorLegend {...props} colorName={color} getScale={getColorName} />;
};

export const LegendWithColorSelector: Story = {
  args: {
    min: 0,
    max: 0.35,
    cssLegendStyles: { left: "0vw", top: "0vh" },
    horizontal: true,
    colorName: "Rainbow",
    dataObjectName: "Legend with Selector",
    colorTables,
    isModal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
  },
  render: (args) => <ColorSelector {...args} />,
};
