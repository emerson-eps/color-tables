import React from "react";
import {DiscreteColorLegend} from "../../../component/Legend/DiscreteLegend";
import colorTables from "../../../component/color-tables.json";

export default {
    component: DiscreteColorLegend,
    title: "Legends/DiscreteColorLegend",
};

const discreteData = {
    "no": [[], 0],
    "yes": [[], 1]
};
const colorName = "Gas-Water";
const dataObjectName = "Wells / FAULT_PROXIMITY_FLAG";
const position = [16, 10];
const horizontal = true;

const Template = (args) => {
    return <DiscreteColorLegend {...args} />;
};

export const FaultProximityFlagTemplate = Template.bind({});
FaultProximityFlagTemplate.args = {
    discreteData,
    dataObjectName,
    position,
    colorName,
    colorTables,
    horizontal,
};
