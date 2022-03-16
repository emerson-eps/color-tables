import * as React from "react";
import { useRef } from "react";
import legendUtil from "../Utils/discreteLegend";
import { scaleOrdinal, select } from "d3";
import { colorTablesArray, colorTablesObj } from "../ColorTableTypes";
import {useCallback} from "react";
import { ColorSelectorWrapper } from "../ColorSelector/ColorTableSelectorWrapper";

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
}

export const DiscreteColorLegend: React.FC<colorLegendProps> = ({
    discreteData,
    dataObjectName,
    position,
    colorName,
    colorTables,
    horizontal,
}: colorLegendProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [updateLegend, setUpdateLegendColor] = React.useState([] as any);
    let itemName: string[] = [];
    let itemColor: ItemColor[] = [];
    let testColor: ItemColor[] = [];
    // Get new colorscale from colorselector and update legend
    const colorScaleObject = React.useCallback((colorScaleObject: any) => {
        setUpdateLegendColor(colorScaleObject);
    }, []);

    React.useEffect(() => {
        if (divRef.current) {
            discreteLegend();
        }
        return function cleanup() {
            select(divRef.current).select("div").remove();
            select(divRef.current).select("svg").remove();
        };
    }, [discreteData, colorName, colorTables, horizontal, updateLegend]);

    const [isToggled, setIsToggled] = React.useState(false);
    const handleClick = useCallback(() => {
        setIsToggled(true);
    }, []);

    async function discreteLegend() {
        let dataSet;

        if (typeof colorTables === "string") {
            let res = await fetch(colorTables);
            dataSet = await res.json()
        }

        let colorsArray = typeof colorTables === "string" ? 
            colorTableData(colorName, dataSet)
            :
            colorTableData(colorName, colorTables);

        if(!updateLegend.color) {
            console.log('---normal----')
            Object.keys(discreteData).forEach((key, value) => {
                // eslint-disable-next-line
                let code = (discreteData as { [key: string]: any })[key][1]
                // compare the first value in colorarray(colortable) and code from discreteData
                const matchedColorsArrays = colorsArray.find((value: number[]) => {
                    return value[0] == code;
                });
                if (matchedColorsArrays)
                    itemColor.push({
                        color: RGBToHex(matchedColorsArrays),
                    });
                itemName.push(key);
            });
        } 
        else if (updateLegend.color) {
            let color = updateLegend;
            
            updateLegend.color.forEach((key, value) => {
                testColor.push({color: RGBToHex(key)});
            });

            itemColor = testColor
            itemName = color.name
        }

        const ordinalValues = scaleOrdinal().domain(itemName);
        const colorLegend = legendUtil(itemColor).inputScale(ordinalValues);
        const legendLength = itemColor.length;
        const calcLegendHeight = 22 * legendLength + 4 * legendLength;
        const selectedLegend = select(divRef.current);
        selectedLegend
            .append("div")
            .text(dataObjectName)
            .attr("y", 7)
            .style("color", "#6F6F6F")
            .style("margin", "10px 10px");
        if (horizontal) selectedLegend.style("height", 150 + "px");
        const svgLegend = selectedLegend
            .append("svg")
            .style("margin", "10px 10px")
            .call(colorLegend);
        if (colorLegend && !horizontal) {
            svgLegend
                .attr("height", calcLegendHeight + "px")
                .attr("width", 220 + "px");
        } else {
            svgLegend
                .style("transform", "rotate(90deg)")
                .attr("width", calcLegendHeight + "px")
                .attr("height", calcLegendHeight + "px");
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
            <div id="legend" ref={divRef} onClick={handleClick}></div>
            {isToggled && (
                <ColorSelectorWrapper colorScaleObject={colorScaleObject} />
            )}
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