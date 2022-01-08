import React from "react";
import ContinuousLegend from "../../../component/Legend/ContinuousLegend";
export default {
    component: ContinuousLegend,
    title: "Legends/ContinousLegend",
};
import template from "../../../component/welllayer_template.json";
import colorTables from "../../../component/color-tables.json";
const min = 2918;
const max = 4770;
const dataObjectName = "Wells / MD";
const position = [16, 10];
const name = "MD";
const horizontal = true;
const Template = (args) => {
    return React.createElement(ContinuousLegend, Object.assign({}, args));
};
export const MDTemplate = Template.bind({});
MDTemplate.args = {
    min,
    max,
    dataObjectName,
    position,
    name,
    template,
    colorTables,
    horizontal,
};
//# sourceMappingURL=MD.stories.js.map