import React from "react";
import {DiscreteColorLegend} from "../../../component/Legend/DiscreteLegend";
import template from "../../../component/welllayer_template.json";
import colorTables from "../../../component/color-tables.json";

export default {
    component: DiscreteColorLegend,
    title: "Legends/DiscreteColorLegend",
};

const discreteData = {
    "OFFSHORE": [[], 1],
    "LSF": [[], 2],
    "USF": [[], 3],
    "TIDAL": [[], 4],
    "ONSHORE": [[], 5]
};
const name = "RDE";
const dataObjectName = "Wells / RDE";
const position = [16, 10];
const horizontal = true;

const Template = (args) => {
    return <DiscreteColorLegend {...args} />;
};

export const RDETemplate = Template.bind({});
RDETemplate.args = {
    discreteData,
    name,
    dataObjectName,
    position,
    template,
    colorTables,
    horizontal,
};
