import React from "react";

import { ColorLegend, ColorLegendProps, ScaleHandler } from "./ColorLegend";

export default {
  component: ColorLegend,
  title: "Legends/ColorLegend",
};

const Template = (args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");

  const getColorName: ScaleHandler = React.useCallback((data) => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);

  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
};

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

export const DefaultStyle = Template.bind({});
DefaultStyle.args = {
  ...defaultProps,
};

export const TopLeftPosition = Template.bind({});
TopLeftPosition.args = {
  ...defaultProps,
  cssLegendStyles: { left: "0vw", top: "0vh" },
};

export const TopRightPosition = Template.bind({});
TopRightPosition.args = {
  ...defaultProps,
  cssLegendStyles: { right: "0vw", top: "0vh" },
};

export const VerticalPositioning = Template.bind({});
VerticalPositioning.args = {
  ...defaultProps,
  cssLegendStyles: { right: "0vw", top: "0vh" },
  horizontal: false,
};

export const BottomRightPosition = (args: ColorLegendProps) => {
  const style = { right: "0vw", bottom: "0vh" };
  return <ColorLegend {...args} cssLegendStyles={style} />;
};

export const BottomLeftPosition = Template.bind({});
BottomLeftPosition.args = {
  ...defaultProps,
  cssLegendStyles: { left: "0vw", bottom: "0vh" },
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  ...defaultProps,
  cssLegendStyles: {
    backgroundColor: "red",
    borderRadius: "5px",
    padding: "5px",
  },
  horizontal: false,
};
