import * as React from "react";
import { useRef } from "react";
import discreteLegendUtil from "../Utils/discreteLegend";
import { select, scaleOrdinal } from "d3";
import { colorTablesArray } from "../../component/colorTableTypes";
import { colorsArray } from "../Utils/legendCommonFunction"
import { d3ColorScales } from "../Utils/d3ColorScale";

declare type ItemColor = {
    color: string;
    name?: string
};

declare type colorLegendProps = {
    discreteData: { objects: Record<string, [number[], number]> };
    dataObjectName: string;
    position?: number[] | null;
    colorName: string;
    colorTables: colorTablesArray | string;
    horizontal?: boolean | null;
    updateLegend?: any
};

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

    React.useEffect(() => {
        if (divRef.current) {
            select(divRef.current).select("div").remove();
            select(divRef.current).select("svg").remove();
            discreteLegend();
        }
        return function cleanup() {
            select(divRef.current).select("div").remove();
            select(divRef.current).select("svg").remove();
        };
    }, [discreteData, colorName, colorTables, horizontal, updateLegend]);

    async function discreteLegend() {
        let dataSet;
        let useSelectorLegend = false;

        try {
            // fix for dash wrapper
            if (typeof colorTables === "string") {
                const res = await fetch(colorTables);
                dataSet = await res.json();
            }

            const arrayOfColors =
                typeof colorTables === "string"
                    ? colorsArray(colorName, dataSet)
                    : colorsArray(colorName, colorTables);

                const d3ColorArrays = colorsArray(colorName, d3ColorScales)

            // Main discrete legend
            if (!updateLegend || updateLegend.length == 0) {
                Object.keys(discreteData).forEach((key) => {
                    //eslint-disable-next-line
                    let code = (discreteData as { [key: string]: any })[key][1]
                    // for colortable colors
                    if (arrayOfColors.length > 0) {
                        //compare the first value in colorarray(colortable) and code from discreteData
                        const matchedColorsArrays = arrayOfColors.find(
                            (value: number[]) => {
                                return value[0] == code;
                            }
                        );
                        if (matchedColorsArrays)
                            itemColor.push({
                                color: RGBToHex(matchedColorsArrays),
                                name: key
                            });
                        itemName.push(key);
                    }
                    // for d3 colors
                    else {
                        var matchedColorsArrays = d3ColorArrays.find((_value: number,index: number) => {
                            return index == code;
                        });
                        if(matchedColorsArrays) itemColor.push({color: matchedColorsArrays});
                    }
                    
                });
                useSelectorLegend = false;
            }
            // Discrete legend using Colortable colors
            else if (updateLegend?.color) {
                updateLegend.color.forEach((key: any) => {
                    itemColor.push({ color: RGBToHex(key) });
                });

                useSelectorLegend = true;
            }
            // Discrete legend using d3 colors
            else if (updateLegend?.colorsObject) {
                updateLegend.colorsObject.forEach((key: any) => {
                    itemColor.push({ color: key });
                });

                itemName = updateLegend.legendColorName;
                useSelectorLegend = true;
            }

            const ordinalValues = scaleOrdinal().domain(itemName);
            const colorLegend = discreteLegendUtil(
                itemColor,
                useSelectorLegend,
                horizontal
            )
            .inputScale(ordinalValues);
            const currentDiv = select(divRef.current);
            let totalRect;

            // append the title
            currentDiv
                .append("div")
                .text(dataObjectName)
                .style("color", "grey")
                .attr("y", 10)
                .style("margin-bottom", "5px");

            // Append svg to the div
            const svgLegend = currentDiv
                .style("margin", "5px")
                .append("svg")
                .call(colorLegend);

            // Style for main horizontal legend
            if (!useSelectorLegend) {
                totalRect = itemColor.length;
            }
            // Style for color selector legend
            else {
                // calculate width for legend using colortable colors
                if (updateLegend?.color) {
                    totalRect = updateLegend.color.length;
                }
                // calculate width for legend using d3 colors
                else {
                    totalRect = updateLegend.colorsObject.length;
                }
            }

            if (horizontal) {
                svgLegend
                    .attr("viewBox", `0 0 ${totalRect} 2`)
                    .attr("preserveAspectRatio", "none")
                    .style("font-size", ".4")
                    .attr("height", "50px")
                    .attr("width", "150px");
            }
            // vertical legend
            else if (!horizontal) {
                svgLegend
                    .attr("viewBox", `0 0 4 ${totalRect}`)
                    .attr("preserveAspectRatio", "none")
                    .style("font-size", ".4")
                    .attr("height", "150px")
                    .attr("width", "100px");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            style={{
                position: "absolute",
                right: position ? position[0] : " ",
                top: position ? position[1] : " ",
                backgroundColor: "#ffffffcc",
                borderRadius: "5px",
                zIndex: 999,
            }}
        >
            <div id="legend" ref={divRef}></div>
        </div>
    );
};

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