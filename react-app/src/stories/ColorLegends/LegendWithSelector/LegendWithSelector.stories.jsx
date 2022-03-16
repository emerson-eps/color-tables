import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
import colorTables from "../../../component/color-tables.json";

export default {
    component: ContinuousLegend,
    title: "Legends/LegendWithSelector",
};

const min = 0;
const max = 0.35;
const dataObjectName = "Legend";
const position = [16, 10];
const horizontal = true;
const colorName = "Time/Depth";

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const legendWithSelector = Template.bind({});
legendWithSelector.args = {
    min,
    max,
    dataObjectName,
    position,
    horizontal,
    colorName,
    colorTables,
};