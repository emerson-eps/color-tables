import * as React from "react";
import { ColorSelectorAccordion } from "../../../component/ColorSelector/ColorSelectorAccordion";
import colorTables from "../../../component/color-tables.json";
export default {
    component: ColorSelectorAccordion,
    title: "Legends/ColorSelector",
};

const Template = (args) => {
    return <ColorSelectorAccordion colorTables={colorTables}/>;
};

export const selectorTemplate = Template.bind({});