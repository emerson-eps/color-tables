import React from "react";
import colorTables from "../../../component/color-tables.json";
import { ColorLegend } from "../../../component/Legend/ColorLegend";

export default {
  component: ColorLegend,
  title: "Legends/LegendWithColorSelector",
};

const Template = (args) => {
  const [getColor, setColorName] = React.useState("Rainbow");

  const getColorName = React.useCallback((data) => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);

  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
};

export const LegendWithColorSelector = Template.bind({});
LegendWithColorSelector.args = {
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
};
