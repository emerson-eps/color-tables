import * as React from "react";
import { LegendContinous } from "../Legend/legendContinous";
import * as colorTables from "../color-tables.json";
import {colorScalesCont} from "../Utils/d3ColorScale"
import DiscreteColorLegend1 from "../Legend/legendDiscrete";

const position = [16, 206];
const continuosColorData: any = []
const continuosD3ColorData: any = []
// const discreteColorData: any = []

interface legendProps {
    useColorTableColors: boolean
    useD3Colors: boolean
}

// code is for color table continuous data
var colorTableContinuousData = colorTables.filter((element: any) => {
    return element.discrete == false; 
});

colorTableContinuousData.forEach((element: any) => {
    continuosColorData.push({color: element.colors, name: element.name})
});

// code is for d3 continuous data
var d3continuousData = colorScalesCont.filter((element: any) => {
    return element.discrete == false; 
});

d3continuousData.forEach((element: any) => {
    continuosD3ColorData.push({color: element.colors, name: element.name})
});

// var discreteData = colorTables.filter((element: any) => {
//     return element.discrete == true; 
// });

// discreteData.forEach((element: any) => {
//     discreteColorData.push({color: element.colors, name: element.name})
// });

export const ColorSelector: React.FC<legendProps> = ({
    useColorTableColors,
    useD3Colors,
}: legendProps) => {
    let continuousLegend;
    let discreteLegend;
    // if (useD3Colors) {
    //     result = discreteColorData.map((val: any, key: any) => {
    //         return <DiscreteColorLegend1 position={position} colorArray={discreteColorData[key]} useDiscColorTable={useDiscColorTable} />
    //     });
    // } 
    // else if (!useDiscColorTable) {
    //     result = discreteColorData.map((val: any, key: any) => {
    //         return <DiscreteColorLegend1 position={position} colorArray={discreteColorData[key]} useDiscColorTable={useDiscColorTable} />
    //     });
    // }
    if (useColorTableColors) {
        continuousLegend =  continuosColorData.map((value: any, key: any) => {
            return <LegendContinous position={position + key} colorArray={value} test={key} 
                useContColorTable={true} legendColorName={' '}
            />
        });

        // discreteLegend = discreteColorData.map((val: any, key: any) => {
        //     return <DiscreteColorLegend1 position={position} colorArray={discreteColorData[key]} useDiscColorTable={true} />
        // });
    } 
    if (useD3Colors) {
        continuousLegend = continuosD3ColorData.map((val: any, key: any) => {
            return <LegendContinous legendColor={val.color} legendColorName={val.name} position={position}
                useContColorTable={false} colorArray={{}} />
            });
    }

    return (
        <div>
            {continuousLegend} 
            {/* {discreteLegend} */}
        </div>
    );
};
