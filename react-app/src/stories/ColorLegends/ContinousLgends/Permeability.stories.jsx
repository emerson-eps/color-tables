import React from "react";
import {ContinuousLegend} from "../../../component/Legend/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";

const min = -999;
const max = 14023;
const dataObjectName = "Wells / PERM";
const position = [16, 10];
const name = "PERM";
const horizontal = true;
const colorName = "Permeability";

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const PermeabilityTemplate = Template.bind({});
PermeabilityTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    name,
    colorName,
    colorTables,
    horizontal,
};