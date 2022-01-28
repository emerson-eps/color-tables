// import * as React from "react";
// import ContinuousLegends from "../Legend/legendContinous";
// import ContinuousLegendtt from "../Legend/d3legend";
// import DiscreteColorLegend from "../Legend/legendDiscrete";
// import * as colorTables from "../color-tables.json";
// import {colorScalesCont} from "../Utils/d3ColorSet"
// const position = [16, 206];
// const continuosColorData: any = []
// const continuosColorD3Data: any = []
// const discreteColorData: any = []

// interface legendProps {
//     colorTableColors: boolean
// }

// var continuousData = colorTables.filter((element: any) => {
//     return element.discrete == false; 
// });

// continuousData.forEach((element: any) => {
//     continuosColorData.push({color: element.colors, name: element.name})
// });

// var continuousD3Data = colorScalesCont.filter((element: any) => {
//     return element.discrete == false; 
// });

// continuousD3Data.forEach((element: any) => {
//     continuosColorD3Data.push({color: element.colors, name: element.name})
// });

// var discreteData = colorTables.filter((element: any) => {
//     return element.discrete == true; 
// });

// discreteData.forEach((element: any) => {
//     discreteColorData.push({color: element.colors, name: element.name})
// });

// // export const ColorSelectors: React.FC<legendProps> = ({
// //     colorTableColors,
// // }: legendProps) => {
        
// export const ColorSelectorrt: React.FC<legendProps> = ({
//         colorTableColors,
//     }: legendProps) => {
//     return (
//         continuousD3Data.map((val: any, key: any) => {
//             return <ContinuousLegendtt colors={val} colorTableColors={colorTableColors} />
//         })
//     );
// };

// // export const ColorSelectors: React.FC<legendProps> = ({
// //     colorTableColors,
// // }: legendProps) => {
// //     return (
// //         continuosColorData.map((val: any, key: any) => {
// //             return <ContinuousLegends 
// //                 position={position + key} 
// //                 colorArray={continuosColorData[key]} 
// //                 test={key}
// //                 colorTableColors={colorTableColors}
// //             />
// //         })
// //     );
// // };

// //export default ColorSelectors;
