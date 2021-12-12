import React from "react";
import DiscreteColorLegend from "../../../component/Legend/DiscreteLegend";
import template from "../../../component/welllayer_template.json";
import colorTables from "../../../component/color-tables.json";

export default {
    component: DiscreteColorLegend,
    title: "Legends/DiscreteColorLegend",
};

const discreteData = {
    "no": [[], 0],
    "yes": [[], 1]
};
const name = "FaultDistance_HUM";
const dataObjectName = "Wells / FaultDistance_HUM";
const position = [16, 10];
const horizontal = true;

const Template = (args) => {
    return <DiscreteColorLegend {...args} />;
};

export const FaultDistanceHumTemplate = Template.bind({});
FaultDistanceHumTemplate.args = {
    discreteData,
    name,
    dataObjectName,
    position,
    template,
    colorTables,
    horizontal,
};
