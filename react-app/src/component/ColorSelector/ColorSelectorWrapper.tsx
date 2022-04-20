import * as React from "react";
import colorTables from "../color-tables.json";
import {d3ColorScales} from "../Utils/d3ColorScale";
import {ColorSelectorComponent} from "./ColorSelectorComponent";

export declare type colorScaleObj = {
    name: string;
    color: [number, number, number, number][] | ((t: number) => string | string[]);
}
export type colorScaleArray = Array<colorScaleObj>;

const continuosColorData: colorScaleArray = [];
const continuosD3ColorData: colorScaleArray = [];
const discreteColorData: colorScaleArray = [];
const discreteD3ColorData: colorScaleArray = [];

declare type legendProps = {
    useColorTableColors: boolean,
    newColorScaleData: any
}

// Continuous legend using color table  data
const colorTableContinuousData = colorTables.filter((element: any) => {
    return element.discrete == false; 
});

colorTableContinuousData.forEach((element: any) => {
    continuosColorData.push({color: element.colors, name: element.name});
});

// Continuous legend using d3 data
const d3continuousData = d3ColorScales.filter((element: any) => {
    return element.discrete == false; 
});

d3continuousData.forEach((element: any) => {
    continuosD3ColorData.push({color: element.colors, name: element.name});
});

// Discrete legend using color table data
const discreteData = colorTables.filter((element: any) => {
    return element.discrete == true; 
});

discreteData.forEach((element: any) => {
    discreteColorData.push({color: element.colors, name: element.name});
});

// Discrete legend using d3 data
const d3discreteData = d3ColorScales.filter((element: any) => {
    return element.discrete == true; 
});

d3discreteData.forEach((element: any) => {
    discreteD3ColorData.push({color: element.colors, name: element.name});
});

export const ColorSelectorWrapper: React.FC<legendProps> = ({
    useColorTableColors,
    newColorScaleData,
}: legendProps) => {
    let continuousLegend;
    let discreteLegend;
        
        // return continuous and discrete legend which uses d3 data
        if (!useColorTableColors) {

            continuousLegend = continuosD3ColorData.map((val: any, key: any) => {
                return <ColorSelectorComponent
                            legendColor={val.color} 
                            legendColorName={val.name} 
                            useContColorTable={false}  
                            uniqueId={key}
                            colorScaleData={newColorScaleData}
                />
            });

            discreteLegend = d3discreteData.map((val: any) => {
                return <ColorSelectorComponent
                            colorsObject={val.colors} 
                            legendColorName={val.name} 
                            useDiscColorTable={false}
                            colorScaleData={newColorScaleData}
                        />
            });
        }

        // return continuous and discrete legend which uses colortable data
        else if (useColorTableColors) {
            continuousLegend =  continuosColorData.map((value: any, key: any) => {
                return <div>
                            <ColorSelectorComponent 
                                colorsObject={value}
                                useContColorTable={true}
                                uniqueId={key}
                                colorScaleData={newColorScaleData}
                            />
                    </div>
            });

            discreteLegend = discreteColorData.map((val: any, key: any) => {
                return <ColorSelectorComponent
                            colorsObject={discreteColorData[key]}
                            legendColorName={val.name} 
                            useDiscColorTable={true}	
                            colorScaleData={newColorScaleData}
                        />
            });
        }
    //}

    return (
        <div className="legendWrapper"
            style={{height: 200, overflow: "auto", display: "flex", flexDirection: "column", overflowX: "hidden"}}
        >
            {continuousLegend}
            {discreteLegend}
        </div>
    );
};