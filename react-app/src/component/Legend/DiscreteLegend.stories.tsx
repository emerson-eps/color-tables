import React from "react";

import {
  DiscreteCodes,
  DiscreteColorLegend,
  DiscreteColorLegendProps,
} from "./DiscreteLegend";

export default {
  component: DiscreteColorLegend,
  title: "Legends/DiscreteColorLegend",
};

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
const dataObjectName = "Wells / FACIES";
const horizontal = true;
const colorName = "Facies";

const DEFAULT_ARGS: DiscreteColorLegendProps = {
  discreteData,
  dataObjectName,
  colorName,
  horizontal,
  legendScaleSize: 300,
  legendFontSize: 13,
  tickFontSize: 13,
  numberOfTicks: 3,
};

const Template = (args: DiscreteColorLegendProps) => {
  return <DiscreteColorLegend {...args} />;
};

export const Facies = Template.bind({});
Facies.args = {
  ...DEFAULT_ARGS,
};

export const BackgroundColor = () => {
  return (
    <DiscreteColorLegend
      {...DEFAULT_ARGS}
      dataObjectName={dataObjectName}
      cssLegendStyles={{
        backgroundColor: "red",
      }}
    />
  );
};
