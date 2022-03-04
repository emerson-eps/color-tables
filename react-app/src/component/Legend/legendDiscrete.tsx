import * as React from "react";
import { useRef } from "react";
// import legendUtil from "../Utils/legend";
import legend1Util from "../Utils/d3discrete";
import { scaleOrdinal, select } from "d3";
import { colorTablesArray, colorTablesObj } from "../ColorTableTypes";

interface ItemColor {
    color: string;
}

interface colorLegendProps {
    position: number[];
    colorsObject: any;
    useDiscColorTable: boolean;
    colorName: string;
}

const DiscreteColorLegend1: React.FC<colorLegendProps> = ({
    position,
    colorsObject,
    useDiscColorTable,
    colorName,
}: colorLegendProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
        if (useDiscColorTable == true && divRef.current) {
            discreteLegend();
            return function cleanup() {
                select(divRef.current).select("div").remove();
                select(divRef.current).select("svg").remove();
            };
        } 
        else if (useDiscColorTable == false && divRef.current) {
           legendDemo();
           return function cleanup() {
            select(divRef.current).select("div").remove();
            select(divRef.current).select("svg").remove();
        };
        }
    }, [colorsObject]);

    function discreteLegend() {
        const itemColor: ItemColor[] = [];
        const itemName: any = [];

        colorsObject.color.forEach((element: any, key: any) => {
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
        const colorLegend = legend1Util(itemColor).cellWidth(20).cellHeight(15).inputScale(ordinalValues);
        select("svg").append("g").attr("transform", "translate(50,70)").attr("class", "legend").call(colorLegend);
        //const calcLegendHeight = 22 * itemColor.length + 4 * itemColor.length;
        const selectedLegend = select(divRef.current);
        selectedLegend
            .append("span")
            .text(colorName)
            .attr("y", 7)
            .style("color", "#6F6F6F")
            .style("float", "left")
            .style("width", "30%")
            .style("margin", "10px 0px");
        selectedLegend
            .append("svg")
            .style("margin", "15px 10px 10px 0px")
            .style("float", "right")
            .style("width", "60%")
            .style("height", "12px")
            .call(colorLegend);
    }

    function legendDemo() {
        const itemName: string[] = [];
        const itemColor: Record<string, unknown>[] = [];

        colorsObject.forEach((element: any, key: any) => {
            itemColor.push({color: element});
            itemName.push(key);
        });

        const ordinalValues = scaleOrdinal(colorsObject).domain(itemName);
        const discreteLegend = legend1Util(itemColor).cellWidth(20).cellHeight(15).inputScale(ordinalValues);
        select("svg").append("g").attr("transform", "translate(50,70)").attr("class", "legend").call(discreteLegend);
        const selectedLegend = select(divRef.current);
        selectedLegend
            .append("span")
            .text(colorName)
            .attr("y", 7)
            .style("color", "#6F6F6F")
            .style("float", "left")
            .style("width", "30%")
            .style("margin", "10px 0px");
        selectedLegend
            .append("svg")
            .style("margin", "15px 10px 10px 0px")
            .style("float", "right")
            .style("width", "60%")
            .style("height", "12px")
            .call(discreteLegend);
    }


    return (
        <div
            style={{
                right: position[0],
                top: position[1],
                borderRadius: "5px",
                height: "35px",
                margin: "5px"
            }}
        >
            <div id="legend" ref={divRef}></div>
        </div>
    );
};

export default DiscreteColorLegend1;

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