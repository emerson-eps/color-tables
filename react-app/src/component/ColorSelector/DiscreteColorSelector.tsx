import * as React from "react";
import DiscreteColorLegend from "../Legend/legendDiscrete";
import * as colorTables from "../color-tables.json";

const position = [16, 206];
const discreteColorData: any = []

var discreteData = colorTables.filter((element: any) => {
    return element.discrete == true; 
});

discreteData.forEach((element: any) => {
    discreteColorData.push({color: element.colors, name: element.name})
})
        
const ColorSelectorss = () => {
    return (
        discreteData.map((val: any, key: any) => {
            return <DiscreteColorLegend position={position} colorArray={discreteColorData[key]} />
        }) 
    );
};

export default ColorSelectorss;
