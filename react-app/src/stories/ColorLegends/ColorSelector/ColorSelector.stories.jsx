import React from "react";
import ColorSelector from "../../../component/ColorSelector/ColorSelector";

export default {
    component: ColorSelector,
    title: "Legends/ColorSelector",
};

const viridisColorscale = ['#fafa6e', '#9cdf7c', '#4abd8c', '#00968e', '#106e7c', '#2a4858'];

const Template = (args) => {
    return <ColorSelector {...args} />;
};

export const colorSelectorTemplate = Template.bind({});
colorSelectorTemplate.args = {
    viridisColorscale,
};