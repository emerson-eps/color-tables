import React from "react";
import ContinuousLegend from "../../../component/Legend/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "Legends/ContinousLegend",
};
import template from "../../../component/welllayer_template.json";
import colorTables from "../../../component/color-tables.json";

const min = 0;
const max = 0.35;
const dataObjectName = "Wells / PORO";
const position = [16, 10];
const name = "PORO";
const horizontal = true;

const Template = (args) => {
    return <ContinuousLegend {...args} />;
};

export const PorosityTemplate = Template.bind({});
PorosityTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    name,
    template,
    colorTables,
    horizontal,
};