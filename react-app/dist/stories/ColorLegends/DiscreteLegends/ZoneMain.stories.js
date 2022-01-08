import React from "react";
import DiscreteColorLegend from "../../../component/Legend/DiscreteLegend";
import template from "../../../component/welllayer_template.json";
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
const name = "ZONE_MAIN";
const dataObjectName = "Wells / ZONE_MAIN";
const position = [16, 10];
const horizontal = true;
const Template = (args) => {
    return React.createElement(DiscreteColorLegend, Object.assign({}, args));
};
export const ZoneMainTemplate = Template.bind({});
ZoneMainTemplate.args = {
    discreteData,
    name,
    dataObjectName,
    position,
    template,
    colorTables,
    horizontal,
};
//# sourceMappingURL=ZoneMain.stories.js.map