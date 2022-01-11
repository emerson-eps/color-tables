import React from "react";
import {ContinuousLegend} from "../../../component/Legend/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";

const min = 0;
const max = 1;
const dataObjectName = "Wells / NTG";
const position = [16, 10];
const name = "NTG";
const horizontal = true;
const colorName = "Rainbow";

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const NTGTemplate = Template.bind({});
NTGTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    name,
    colorName,
    colorTables,
    horizontal,
};