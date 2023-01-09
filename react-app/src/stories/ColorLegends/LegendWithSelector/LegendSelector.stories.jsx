import React from "react";
import colorTables from "../../../component/color-tables.json";
import { ColorLegend } from "../../../component/Legend/ColorLegend";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: ColorLegend,
  title: "Legends/LegendWithColorSelector",
};

const discreteData = {
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

const Template = (args) => {
  const [getColor, setColorName] = React.useState("GasOilWater");

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
  colorName: "GasOilWater",
  dataObjectName: "Legend with Selector",
  colorTables,
  isModal: true,
  isRangeShown: true,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
  discreteData
};
