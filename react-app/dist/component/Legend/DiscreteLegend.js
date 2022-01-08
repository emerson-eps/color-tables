import * as React from "react";
import legendUtil from "../Utils/discreteLegend";
import { scaleOrdinal, select } from "d3";
const DiscreteColorLegend = ({ discreteData, name, dataObjectName, position, template, colorTables, horizontal, }) => {
    React.useEffect(() => {
        discreteLegend("#legend");
    }, [discreteData, template, colorTables, horizontal]);
    function discreteLegend(legend) {
        const itemName = [];
        const itemColor = [];
        const colorsArray = colorTableData(name, template, colorTables);
        Object.keys(discreteData).forEach((key) => {
            // eslint-disable-next-line
            let code = discreteData[key][1];
            // compare the first value in colorarray(colortable) and code from discreteData
            const matchedColorsArrays = colorsArray.find((value) => {
                return value[0] == code;
            });
            if (matchedColorsArrays)
                itemColor.push({
                    color: RGBToHex(matchedColorsArrays),
                });
            itemName.push(key);
        });
        function RGBToHex(rgb) {
            let r = rgb[1].toString(16), g = rgb[2].toString(16), b = rgb[3].toString(16);
            if (r.length == 1)
                r = "0" + r;
            if (g.length == 1)
                g = "0" + g;
            if (b.length == 1)
                b = "0" + b;
            return "#" + r + g + b;
        }
        const ordinalValues = scaleOrdinal().domain(itemName);
        const colorLegend = legendUtil(itemColor).inputScale(ordinalValues);
        select(legend).select("svg").remove();
        const legendLength = itemColor.length;
        const calcLegendHeight = 22 * legendLength + 4 * legendLength;
        const selectedLegend = select(legend);
        if (!horizontal)
            selectedLegend.style("height", 150 + "px");
        const svgLegend = selectedLegend
            .append("svg")
            .style("margin", "10px 10px")
            .call(colorLegend);
        if (colorLegend && horizontal) {
            svgLegend
                .attr("height", calcLegendHeight + "px")
                .attr("width", 220 + "px");
        }
        else {
            svgLegend
                .style("transform", "rotate(90deg)")
                .attr("width", calcLegendHeight + "px")
                .attr("height", calcLegendHeight + "px");
        }
    }
    return (React.createElement("div", { style: {
            position: "absolute",
            right: position[0],
            top: position[1],
            backgroundColor: "#ffffffcc",
            borderRadius: "5px",
        } },
        React.createElement("label", { style: { color: "#6F6F6F", margin: "10px 10px" } }, dataObjectName),
        React.createElement("div", { id: "legend" })));
};
// Based on name return the colors array from color.tables.json file
export function colorTableData(name, template, colorTables) {
    const properties = template[0]["properties"];
    const propertiesData = properties.filter((value) => value.objectName == name);
    const colorTableData = colorTables.filter((value) => value.name.toLowerCase() ==
        propertiesData[0].colorTable.toLowerCase());
    return colorTableData[0].colors;
}
DiscreteColorLegend.defaultProps = {
    position: [5, 10],
};
export default DiscreteColorLegend;
//# sourceMappingURL=DiscreteLegend.js.map