import React from "react";
import colorTables from "../../../component/color-tables.json";
import { ColorLegend } from "../../../component/Legend/ColorLegend";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: ColorLegend,
  title: "Legends/cssLegendStyles",
};

// prop for discrete data
const discreteData = {
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

const Template = (args) => {
  const [getColor, setColorName] = React.useState("Rainbow");

  const getColorName = React.useCallback((data) => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);

  return (
    <ColorLegend {...args} colorName={getColor} getScale={getColorName} />
  );
};

const defaultProps = {
  cssLegendStyles: { left: "0vw", top: "0vh" },
  horizontal: true,
  isOpenProp: true,
  min: 0,
  max: 0.35,
  // position: { left: 5, top: 10 },
  colorName: "Rainbow",
  dataObjectName: "Legend with Selector",
  colorTables,
  discreteData,
  isModal: true,
  isRangeShown: true,
  legendFontSize: 16,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
}

export const TopLeftPosition = Template.bind({});
TopLeftPosition.args = {
  ...defaultProps,
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

export const BottomRightPosition = Template.bind({});
BottomRightPosition.args = {
  ...defaultProps,
  cssLegendStyles: { right: "0vw", bottom: "0vh" },
};

export const BottomLeftPosition = Template.bind({});
BottomLeftPosition.args = {
  ...defaultProps,
  cssLegendStyles: { left: "0vw", bottom: "0vh" },
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  ...defaultProps,
  cssLegendStyles: { backgroundColor: "gray", borderRadius: "5px", padding: "5px" },
  horizontal: false,
};