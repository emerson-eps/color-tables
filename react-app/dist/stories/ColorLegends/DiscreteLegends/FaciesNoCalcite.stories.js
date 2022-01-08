import React from "react";
import DiscreteColorLegend from "../../../component/Legend/DiscreteLegend";
import template from "../../../component/welllayer_template.json";
import colorTables from "../../../component/color-tables.json";
export default {
    component: DiscreteColorLegend,
    title: "Legends/DiscreteColorLegend",
};
const discreteData = {
    "F_OFFSHORE": [[], 0],
    "F_LOWER_SHOREFACE": [[], 1],
    "F_UPPER_SHOREFACE": [[], 2],
    "F_MOUTH_BAR": [[], 3],
    "F_TIDAL_BAR": [[], 4],
    "F_TIDAL_CHANNEL": [[], 5],
    "F_TIDAL_FLAT_SANDY": [[], 6],
    "F_TIDAL_FLAT_MUDDY": [[], 7],
    "F_MARSH": [[], 8],
    "F_CALCITE": [[], 9]
};
const name = "FACIES_NoCalcite";
const dataObjectName = "Wells / FACIES_NoCalcite";
const position = [16, 10];
const horizontal = true;
const Template = (args) => {
    return React.createElement(DiscreteColorLegend, Object.assign({}, args));
};
export const FaciesNoCalciteTemplate = Template.bind({});
FaciesNoCalciteTemplate.args = {
    discreteData,
    name,
    dataObjectName,
    position,
    template,
    colorTables,
    horizontal,
};
//# sourceMappingURL=FaciesNoCalcite.stories.js.map