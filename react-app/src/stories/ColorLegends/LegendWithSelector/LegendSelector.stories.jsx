import React from "react";
import colorTables from "../../../component/color-tables.json";
import { ColorLegend } from "../../../component/Legend/ColorLegend";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  component: ColorLegend,
  title: "Legends/LegendWithColorSelector",
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
    console.log("data:", data);
    setColorName(data?.name || data?.legendColorName);
  }, []);

  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
};

export const LegendWithColorSelector = Template.bind({});
LegendWithColorSelector.args = {
  min: 0,
  max: 0.35,
  position: { left: 5, top: 10 },
  horizontal: true,
  colorName: "Rainbow",
  colorTables,
  discreteData,
  isModal: true,
  isRangeShown: true,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
};
