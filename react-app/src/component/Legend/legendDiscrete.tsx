import * as React from "react";
import legendUtil from "../Utils/discreteLegend";
import { scaleOrdinal, select } from "d3";
import { colorTablesArray, colorTablesObj } from "../ColorTableTypes";

interface ItemColor {
    color: string;
}

interface colorLegendProps {
    position: number[];
    colorArray: any;
}

const DiscreteColorLegend: React.FC<colorLegendProps> = ({
    position,
    colorArray,
}: colorLegendProps) => {
    React.useEffect(() => {
        discreteLegend("#legend");
    }, [colorArray]);

    function discreteLegend(legend: string) {
        //const itemName: string[] = [];
        const itemColor: ItemColor[] = [];
        const itemName: any = [];
        colorArray.color.forEach((element: any, key: any) => {
            itemColor.push({color: RGBToHex(element)});
            itemName.push(key);
        })
        function RGBToHex(rgb: number[]) {
            let r = rgb[1].toString(16),
                g = rgb[2].toString(16),
                b = rgb[3].toString(16);
            if (r.length == 1) r = "0" + r;
            if (g.length == 1) g = "0" + g;
            if (b.length == 1) b = "0" + b;
            return "#" + r + g + b;
        }

        const ordinalValues = scaleOrdinal().domain(itemName);
        const colorLegend = legendUtil(itemColor).inputScale(ordinalValues);
        const legendLength = itemColor.length;
        const calcLegendHeight = 22 * legendLength + 4 * legendLength;
        const selectedLegend = select(legend);
        selectedLegend
            .append("div")
            //.text(dataObjectName)
            .attr("y", 7)
            .style("color", "#6F6F6F")
            .style("margin", "10px 10px");
        //if (!horizontal) selectedLegend.style("height", 150 + "px");
        const svgLegend = selectedLegend
            .append("svg")
            .style("margin", "10px 10px")
            .call(colorLegend);
        // if (colorLegend) {
        //     svgLegend
        //         .attr("height", calcLegendHeight + "px")
        //         .attr("width", 220 + "px");
        // } else {
            svgLegend
               // .style("transform", "rotate(90deg)")
                .attr("width", calcLegendHeight + "px")
                .attr("height", calcLegendHeight + "px");
        //}
    }
    return (
        <div
            style={{
                // position: "absolute",
                right: position[0],
                top: position[1],
                backgroundColor: "#ffffffcc",
                borderRadius: "5px",
            }}
        >
            <div id="legend"></div>
        </div>
    );
};

export default DiscreteColorLegend;

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