import React from "react";
import {ContinuousLegend} from "../../../component/Legend/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";

const min = 2918;
const max = 4770;
const dataObjectName = "Wells / MD";
const position = [16, 10];
const horizontal = true;
const colorName = "Time/Depth";

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const MDTemplate = Template.bind({});
MDTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    colorName,
    colorTables,
    horizontal,
};