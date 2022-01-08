import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
// Based on objectName return the colors array from color.tables.json file
export function colorsArray(objectName, template, colorTables) {
    const properties = template[0]["properties"];
    const propertiesData = properties.filter((value) => value.objectName == objectName);
    const colorTableData = colorTables.filter((value) => value.name.toLowerCase() ==
        propertiesData[0].colorTable.toLowerCase());
    return colorTableData[0].colors;
}
// return the colors based on the point
export function rgbValues(objectName, point, template, colorTables) {
    var _a;
    const colorTableColors = colorsArray(objectName, template, colorTables);
    // compare the point and first value from colorTableColors
    const colorArrays = colorTableColors.find((value) => {
        return point == value[0];
    });
    // if point and value in color table matches then return particular colors
    if (colorArrays) {
        return colorArrays.slice(1);
    }
    // if no match then need to do interpolation
    else {
        // Get index of first match of colortable point greater than point
        const index = colorTableColors.findIndex((value) => {
            return value[0] > point;
        });
        const firstColorArray = colorTableColors[index - 1];
        const secondColorArray = colorTableColors[index];
        if ((firstColorArray || secondColorArray) != undefined) {
            const interpolatedValues = interpolateRgb(RGBToHex(firstColorArray).color, RGBToHex(secondColorArray).color)(point);
            return (_a = color(interpolatedValues)) === null || _a === void 0 ? void 0 : _a.rgb();
        }
        return undefined;
    }
}
// return the hex color code and offset
export function RGBToHex(rgb) {
    let r = Math.round(rgb[1]).toString(16), g = Math.round(rgb[2]).toString(16), b = Math.round(rgb[3]).toString(16);
    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    const offset = rgb[0] * 100.0;
    return { color: "#" + r + g + b, offset: offset };
}
//# sourceMappingURL=continousLegend.js.map