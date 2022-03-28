import * as React from "react";
import { useRef } from "react";
import discreteLegendUtil from "../Utils/discreteLegend";
import { select } from "d3";
import { colorTablesArray, colorTablesObj } from "../ColorTableTypes";

declare type ItemColor = {
    color: string;
}

declare type colorLegendProps = {
    discreteData: { objects: Record<string, [number[], number]> };
    dataObjectName: string;
    position?: number[] | null;
    colorName: string;
    colorTables: colorTablesArray | string;
    horizontal?: boolean | null;
    updateLegend?: any
}

export const DiscreteColorLegend: React.FC<colorLegendProps> = ({
    discreteData,
    dataObjectName,
    position,
    colorName,
    colorTables,
    horizontal,
    updateLegend,
}: colorLegendProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    let itemName: string[] = [];
    let itemColor: ItemColor[] = [];
    let testColor: ItemColor[] = [];
    let testName: string[] = [];

    React.useEffect(() => {
        if (divRef.current) {
            discreteLegend();
        }
        return function cleanup() {
            select(divRef.current).select("div").remove();
            select(divRef.current).select("svg").remove();
        };
    }, [discreteData, colorName, colorTables, horizontal, updateLegend]);

    async function discreteLegend() {
        let dataSet;
        let discreteFlag = false

        if (typeof colorTables === "string") {
            try {
                let res = await fetch(colorTables);
                dataSet = await res.json()
            } catch (error) {
                console.error(error);
            }
        }

        let colorsArray = typeof colorTables === "string" ? 
            colorTableData(colorName, dataSet)
            :
            colorTableData(colorName, colorTables);

        // Main discrete legend
        if(!updateLegend) {
            Object.keys(discreteData).forEach((key) => {
                //eslint-disable-next-line
                let code = (discreteData as { [key: string]: any })[key][1]
                //compare the first value in colorarray(colortable) and code from discreteData
                const matchedColorsArrays = colorsArray.find((value: number[]) => {
                    return value[0] == code;
                });
                if (matchedColorsArrays)
                    itemColor.push({color: RGBToHex(matchedColorsArrays)});
                    itemName.push(key);
            });
            discreteFlag = false
        } 
        // Discrete legend using Colortable colors
        else if (updateLegend && updateLegend.color) {
            // Object.keys(discreteData).forEach((key) => {
            //     //eslint-disable-next-line
            //     let code = (discreteData as { [key: string]: any })[key][1]
            //     //compare the first value in colorarray(colortable) and code from discreteData
            //     const matchedColorsArrays = updateLegend.color.find((value: number[]) => {
            //         return value[0] == code;
            //     });
            //     if (matchedColorsArrays) {
            //         testColor.push({color: RGBToHex(matchedColorsArrays)});
            //         testName.push(key);
            //     }
                
            // });

            //let color = updateLegend;
            updateLegend.color.forEach((key: any) => {
                testColor.push({color: RGBToHex(key)});
            });

            itemColor = testColor
            itemName = testName
            discreteFlag = true
        }
        // Discrete legend using d3 colors
        else  {
            updateLegend.colorsObject.forEach((key: any) => {
                itemColor.push({color: key});
            });

            itemColor = itemColor
            itemName = updateLegend.legendColorName
            discreteFlag = true

        }

        //const ordinalValues = scaleOrdinal().domain(itemName);
        const colorLegend = discreteLegendUtil(itemColor, discreteFlag)
        const legendLength = itemColor.length;
        const calcLegendHeight = 22 * legendLength + 4 * legendLength;
        const selectedLegend = select(divRef.current);
        selectedLegend
            .append("div")
            .text(dataObjectName)
            .attr("y", 10)
            .style("margin-bottom", "5px")
        if (horizontal && !discreteFlag) selectedLegend.style("height", 150 + "px");
        const svgLegend = selectedLegend
            .style("margin-right", "41px")
            .style("margin-top", "5px")
            .append("svg")
            .call(colorLegend);
        if (colorLegend && !horizontal) {
            svgLegend
                .attr("height", calcLegendHeight + "px")
                .attr("width", 220 + "px");
        } else if (!discreteFlag && horizontal) {
            svgLegend
                .style("transform", "rotate(90deg)")
                .attr("height", calcLegendHeight + "px")
                .attr("width", calcLegendHeight + "px");
        }
        else {
            
            var totalRect;
            if (updateLegend.color) {
                totalRect = updateLegend.color.length
            } else {
                totalRect = updateLegend.colorsObject.length
            }
            svgLegend.attr("viewBox", `0 0 ${totalRect} 2`)
            .attr("preserveAspectRatio", "none")
            .style("font-size", ".5")
            .attr("height", "50px")
            .attr("width", "150px");
        }
    }

    return (
        <div
            style={{
                position: "absolute",
                right: position ? position[0] : ' ',
                top: position ? position[1] : ' ',
                backgroundColor: "#ffffffcc",
                borderRadius: "5px",
            }}
        >
            <div id="legend" ref={divRef}></div>
        </div>
    );
};

// Based on name return the colors array from color.tables.json file
export function colorTableData(
    colorName: string,
    colorTables: colorTablesArray
): [number, number, number, number][] {
    const colorTableData = colorTables.filter(
        (value: colorTablesObj) =>
            value.name.toLowerCase() == colorName.toLowerCase()
    );
    return colorTableData.length > 0 ? colorTableData[0].colors : [];
}

export function RGBToHex(rgb: number[]) {
    let r = rgb[1].toString(16),
        g = rgb[2].toString(16),
        b = rgb[3].toString(16);
    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    return "#" + r + g + b;
}

DiscreteColorLegend.defaultProps = {
    position: [5, 10],
};