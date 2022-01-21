// import * as React from "react";
// import { ColorSelector } from "../../../component/ColorSelector/ColorTableSelector";
// export default {
//     component: ColorSelector,
//     title: "Legends/ColorSelector",
// };

// import colorTables from "../../../component/color-tables.json";

// const min = 0;
// const max = 0.35;
// const dataObjectName = "Wells / PORO";
// const position = [16, 10];
// const name = "PORO";
// const horizontal = true;
// const colorName = "Porosity";

// const Template = (args) => {
//     return <ColorSelector {...args} />;
// };

// export const selectorTemplate = Template.bind({});
// selectorTemplate.args = {
//     min,
//     max,
//     dataObjectName,
//     position,
//     name,
//     colorName,
//     colorTables,
//     horizontal,
// };

import * as React from "react";
import { ColorSelector } from "../../../component/ColorSelector/ColorTableSelector";
export default {
    component: ColorSelector,
    title: "Legends/ColorSelector",
};

const Template = (args) => {
    return <ColorSelector />;
};

export const selectorTemplate = Template.bind({});