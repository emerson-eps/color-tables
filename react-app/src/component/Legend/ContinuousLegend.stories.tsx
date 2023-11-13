import React from "react";

import {
  ContinuousLegend,
  ContinuousLegendProps,
} from "../../component/Legend/ContinuousLegend";

export default {
  component: ContinuousLegend,
  title: "Legends  / ContinuousLegend",
};

const min = 0;
const max = 1;
const dataObjectName = "Physics color map";
const colorName = "Physics";

const DEFAULT_ARGS: ContinuousLegendProps = {
  min: min,
  max: max,
  isRangeShown: true,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
  legendScaleSize: 300,
};

const Story = (args: ContinuousLegendProps) => {
  return <ContinuousLegend {...args} />;
};

export const StandardColorTableLibrary = Story.bind({});
StandardColorTableLibrary.args = {
  ...DEFAULT_ARGS,
  dataObjectName: dataObjectName,
  colorName: colorName,
};

export const DefaultColorTable = Story.bind({});
DefaultColorTable.args = {
  ...DEFAULT_ARGS,
  dataObjectName: "Default color table (Rainbow)",
};

export const BackgroundColor = () => {
  return (
    <ContinuousLegend
      {...DEFAULT_ARGS}
      dataObjectName={dataObjectName}
      cssLegendStyles={{
        backgroundColor: "red",
      }}
    />
  );
};
