import React from "react";
import {DiscreteColorLegend} from "../../../component/Legend/DiscreteLegend";
import colorTables from "../../../component/color-tables.json";

export default {
    component: DiscreteColorLegend,
    title: "Legends/DiscreteColorLegend",
};

const discreteData = {
    "0": [[], 0],
    "4": [[], 4],
    "UPPER": [[], 1],
    "MID": [[], 2],
    "LOWER": [[], 3]
};
const dataObjectName = "Wells / ZONE_MAIN";
const position = [16, 10];
const horizontal = true;
const colorName = "Stratigraphy";

const Template = (args) => {
    return <DiscreteColorLegend {...args} />;
};

export const ZoneMainTemplate = Template.bind({});
ZoneMainTemplate.args = {
    discreteData,
    dataObjectName,
    position,
    colorName,
    colorTables,
    horizontal,
};
