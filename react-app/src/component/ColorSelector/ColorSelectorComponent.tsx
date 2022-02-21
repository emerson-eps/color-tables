import * as React from "react";
import { LegendContinous } from "../Legend/legendContinous";
import * as colorTables from "../color-tables.json";
import {colorScalesCont} from "../Utils/d3ColorScale"
//import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const position = [16, 206];
const continuosColorData: any = []
const continuosD3ColorData: any = []

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

export const ColorSelector: React.FC<legendProps> = ({
    useColorTableColors,
    useD3Colors,
}: legendProps) => {
    let continuousLegend;
    function onClickFunction () {
        console.log('click me')
    }
    if (useColorTableColors) {
        continuousLegend =  continuosColorData.map((value: any, key: any) => {
            return <div>
                        <LegendContinous 
                            position={position + key} 
                            colorArray={value}
                            legendColor={''}
                            legendColorName={''} 
                            useContColorTable={true}
                            valueIndex={key}
                            // icon={<MoreHorizIcon />}
                        />
                        {/* <MoreHorizIcon onClick={() => onClickFunction()}/> */}
                </div>
            
        });
    } 
    if (useD3Colors) {
        continuousLegend = continuosD3ColorData.map((val: any, key: any) => {
            return <LegendContinous
                        position={position + key}
                        colorArray={{}}
                        legendColor={val.color} 
                        legendColorName={val.name} 
                        useContColorTable={false}  
                        valueIndex={key + "0"}
                        // icon={<MoreHorizIcon />}
            />
        });
    }

    return (
        <div>
            {continuousLegend} 
        </div>
    );
};