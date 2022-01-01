import React from "react";
import ContinuousLegend from "../../../component/Legend/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "Legends/ContinousLegend",
};
import template from "../../../component/welllayer_template.json";
import colorTables from "../../../component/color-tables.json";

const min = -999;
const max = 14023;
const dataObjectName = "Wells / PERMTOT";
const position = [16, 10];
const name = "PERM_TOT";
const horizontal = true;

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const PermTotTemplate = Template.bind({});
PermTotTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    name,
    template,
    colorTables,
    horizontal,
};