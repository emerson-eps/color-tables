import { color, RGBColor } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import { colorTablesArray, colorTablesObj } from "../colorTableTypes";
import { d3ColorScales } from "./d3ColorScale";
import colorTables from "../../component/color-tables.json";
import * as d3 from "d3";
import { range } from "lodash";

type Color = [number, number, number];

function getColor(rgb: RGBColor): Color {
  if (rgb !== undefined) {
    return [rgb["r"], rgb["g"], rgb["b"]];
  }
}

// Based on objectName return the colors array from color.tables.json file
export function colorsArray(
  colorName: string,
  iscolorTablesDefined: colorTablesArray | any
): any {
  const getColorTables = iscolorTablesDefined
    ? iscolorTablesDefined
    : colorTables;
  const colorTableData = getColorTables.filter(
    (value: colorTablesObj) =>
      value.name.toLowerCase() === colorName.toLowerCase()
  );
  return colorTableData.length > 0 ? colorTableData[0].colors : [];
}

// return the colors based on the point
export function rgbValues(
  point: number,
  colorName: string,
  iscolorTablesDefined: colorTablesArray | any
): Color {
  const getColorTables = iscolorTablesDefined
    ? iscolorTablesDefined
    : colorTables;
  const colorTableColors = colorsArray(colorName, getColorTables);
  // compare the point and first value from colorTableColors
  const colorArrays = colorTableColors.find(
    (value: [number, number, number, number]) => {
      return point === value[0];
    }
  );

  // if point and value in color table matches then return particular colors
  if (colorArrays) {
    return colorArrays.slice(1);
  }
  // if no match then need to do interpolation
  else {
    // Get index of first match of colortable point greater than point
    const index = colorTableColors.findIndex((value: number[]) => {
      return value[0] > point;
    });

    const firstColorArray = colorTableColors[index - 1];
    const secondColorArray = colorTableColors[index];

    if ((firstColorArray || secondColorArray) !== undefined) {
      const t0 = firstColorArray[0];
      const t1 = secondColorArray[0];
      const t = (point - t0) / (t1 - t0); // t = 0.0 gives first color, t = 1.0 gives second color.
      const interpolatedValues = interpolateRgb(
        RGBToHex(firstColorArray).color,
        RGBToHex(secondColorArray).color
      )(t);
      const c = color(interpolatedValues)?.rgb();
      return getColor(c);
    }
    return undefined;
  }
}

// return the hex color code and offset
export function RGBToHex(rgb: number[]) {
  let r = Math.round(rgb[1]).toString(16),
    g = Math.round(rgb[2]).toString(16),
    b = Math.round(rgb[3]).toString(16);
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  const offset = rgb[0] * 100.0;

  return { color: "#" + r + g + b, offset: offset };
}

// temporary code to support colorlayer discrete color continous legend
// return the hex color code and offset
export function RGBToHexValue(rgb: number[], max?: number) {
  let r = Math.round(rgb[1]).toString(16),
    g = Math.round(rgb[2]).toString(16),
    b = Math.round(rgb[3]).toString(16);
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  const normalizePoint = (rgb[0] - 0) / (max - 0);

  return { color: "#" + r + g + b, offset: normalizePoint * 100.0 };
}

export function HextoRGB(hex: any) {
  var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

// temporary solution, wrote for color laer discrete colors
// return the colors based on the point
export function getRgbData(
  point: number,
  colorName: string,
  iscolorTablesDefined: colorTablesArray | any,
  userBreakPoint?: any
): number[] | { r: number; g: number; b: number; opacity: number } | undefined {
  const getColorTables = iscolorTablesDefined
    ? iscolorTablesDefined
    : colorTables;
  // get colortable colorscale data
  const getColorTableScale = getColorTables.find((value: any) => {
    return value.name === colorName;
  });
  // get d3 colorscale data
  var getD3Scale = d3ColorScales.find(function (value) {
    return value.name === colorName;
  });
  let rgb;
  // colortable discrete scale
  if (getColorTableScale?.discrete === true) {
    const getSelectedScaleLength = getColorTableScale?.colors.length;
    const minValue = 0;
    const maxValue = getSelectedScaleLength - 1;
    getColorTableScale?.colors.forEach((item: any, index: any) => {
      const currentIndex = index;
      const normalizedCurrentIndex =
        (currentIndex - minValue) / (maxValue - minValue);
      const nextIndex = index + 1;
      const normalizedNextIndex = (nextIndex - minValue) / (maxValue - 0);
      //const t = (point - t0) / (t1 - t0); // t = 0.0 gives first color, t = 1.0 gives second color.
      if (point >= normalizedCurrentIndex && point <= normalizedNextIndex) {
        if ((item && getColorTableScale?.colors[nextIndex]) !== undefined) {
          const interpolate = interpolateRgb(
            RGBToHex(item)?.color,
            RGBToHex(getColorTableScale?.colors[nextIndex])?.color
          )(point);
          rgb = color(interpolate)?.rgb();
        }
      }
    });
    return rgb;
  } else if (typeof getD3Scale?.colors == "function") {
    let colorMappingRange = getD3Scale?.colors(point);
    return (rgb = getColor(color(colorMappingRange)?.rgb()));
  } else if (typeof getD3Scale?.colors == "object") {
    const max = getD3Scale?.colors.length - 1;

    getD3Scale?.colors.forEach((item, index) => {
      const currentIndex = index;
      const normalizedCurrentIndex = (currentIndex - 0) / (max - 0);
      const nextIndex = index + 1;
      const normalizedNextIndex = (nextIndex - 0) / (max - 0);
      //const t = (point - t0) / (t1 - t0); // t = 0.0 gives first color, t = 1.0 gives second color.
      if (point >= normalizedCurrentIndex && point <= normalizedNextIndex) {
        const interpolate = interpolateRgb(item, getD3Scale[nextIndex])(point);
        rgb = getColor(color(interpolate)?.rgb());
      }
    });
    return rgb;
  } else {
    let colorTableColors = colorsArray(colorName, getColorTables);
    const itemColor: any = [];

    // logic for user defined domain, might be used in future
    // if (userBreakPoint?.length > 0) {
    //   colorTableColors?.forEach((value: any, index: any) => {
    //     let domainIndex;

    //     if (userBreakPoint[index]) {
    //       domainIndex = userBreakPoint[index];
    //     } else {
    //       domainIndex = value[0];
    //     }

    //     itemColor.push([domainIndex, value[1], value[2], value[3]]);
    //   });

    //   itemColor?.sort((a: any, b: any) => {
    //     if (a[0] == b[0]) return 0;
    //     return a[0] < b[0] ? -1 : 1;
    //   });
    //   colorTableColors = itemColor;
    // }

    if (userBreakPoint?.length > 0) {
      userBreakPoint.forEach((value: any) => {
        const rgbColor = HextoRGB(value.color);
        itemColor.push([value.position, rgbColor.r, rgbColor.g, rgbColor.b]);
      });

      itemColor?.sort((a: any, b: any) => {
        if (a[0] == b[0]) return 0;
        return a[0] < b[0] ? -1 : 1;
      });
      colorTableColors = itemColor;
    }

    // compare the point and first value from colorTableColors
    const colorArrays = colorTableColors.find(
      (value: [number, number, number, number]) => {
        return point === value[0];
      }
    );

    // if point and value in color table matches then return particular colors
    if (colorArrays) {
      return colorArrays.slice(1);
    }
    // if no match then need to do interpolation
    else {
      // Get index of first match of colortable point greater than point
      const index = colorTableColors.findIndex((value: number[]) => {
        return value[0] > point;
      });

      const firstColorArray = colorTableColors[index - 1];
      const secondColorArray = colorTableColors[index];

      if ((firstColorArray || secondColorArray) !== undefined) {
        const t0 = firstColorArray[0];
        const t1 = secondColorArray[0];
        const t = (point - t0) / (t1 - t0); // t = 0.0 gives first color, t = 1.0 gives second color.
        const interpolatedValues = interpolateRgb(
          RGBToHex(firstColorArray).color,
          RGBToHex(secondColorArray).color
        )(t);
        return color(interpolatedValues)?.rgb();
      }
      return undefined;
    }
  }
}

export function getColors(
  colorName: string,
  iscolorTablesDefined: any,
  point: number
): any {
  const getColorTables = iscolorTablesDefined
    ? iscolorTablesDefined
    : colorTables;
  const colorTableData = getColorTables.filter(
    (value: colorTablesObj) =>
      value.name.toLowerCase() === colorName.toLowerCase()
  );

  const colorArrays = colorTableData[0]?.colors.find((value: number[]) => {
    return value[0] === point;
  });

  return colorTableData.length > 0 ? colorArrays : [];
}

export function sampledColor(
  colorScaleName: string,
  point: number,
  categorial?: boolean,
  min?: number,
  max?: number,
  iscolorTablesDefined?: colorTablesArray | any
) {
  const getColorTables = iscolorTablesDefined
    ? iscolorTablesDefined
    : colorTables;
  // get colortable colorscale data
  const getColorTableScale = getColorTables.find((value: any) => {
    return value.name === colorScaleName;
  });

  // get d3 colorscale data
  const getD3Scale = d3ColorScales.find((value: any) => {
    return value.name === colorScaleName;
  });

  // return the color for matched point
  // does interpolation for non-matching point
  let rgb = rgbValues(point, colorScaleName, getColorTables);

  // colortable continuous scale
  if (getColorTableScale?.discrete === false) {
    // if log is discrete, then need to normalize
    if (categorial) {
      // condition added to resolve typescript error
      //if (min && max) {
      const normalizedPoint = (point - min) / (max - min);
      rgb = rgbValues(normalizedPoint, colorScaleName, getColorTables);
      //}
    } else {
      rgb = rgbValues(point, colorScaleName, getColorTables);
    }
  }

  // d3 continuous scale
  if (typeof getD3Scale?.colors == "function") {
    let colorMappingRange = getD3Scale?.colors(point);
    // if log is discrete, then need to normalize
    if (categorial) {
      const normalizedPoint = (point - min) / (max - min);
      colorMappingRange = getD3Scale?.colors(normalizedPoint);
    }
    rgb = getColor(color(colorMappingRange)?.rgb());
  }

  // colortable discrete scale
  if (getColorTableScale?.discrete === true) {
    if (categorial) {
      // compare the code and first value from colorsArray(colortable)
      const arrayOfColors: [number, number, number, number][] = colorsArray(
        colorScaleName,
        getColorTables
      );

      const colorArrays = arrayOfColors.find((value: number[]) => {
        return value[0] === point;
      });
      return colorArrays;
    } else {
      const getSelectedScaleLength = getColorTableScale?.colors.length;
      const minValue = 0;
      const maxValue = getSelectedScaleLength - 1;
      getColorTableScale?.colors.forEach((item: any, index: any) => {
        const currentIndex = index;
        const normalizedCurrentIndex =
          (currentIndex - minValue) / (maxValue - minValue);
        const nextIndex = index + 1;
        const normalizedNextIndex = (nextIndex - minValue) / (maxValue - 0);
        //const t = (point - t0) / (t1 - t0); // t = 0.0 gives first color, t = 1.0 gives second color.
        if (point >= normalizedCurrentIndex && point <= normalizedNextIndex) {
          if ((item && getColorTableScale?.colors[nextIndex]) !== undefined) {
            const interpolate = interpolateRgb(
              RGBToHex(item)?.color,
              RGBToHex(getColorTableScale?.colors[nextIndex])?.color
            )(point);
            rgb = getColor(color(interpolate)?.rgb());
          }
        }
      });
    }
  }

  // d3 discrete scale
  if (typeof getD3Scale?.colors == "object") {
    // discrete log
    if (categorial) {
      // const normalizedPoint = (point - min) / (max - min);
      const code = point;
      const d3ColorArrays = getD3Scale?.colors.find(
        (_value: any, index: number) => {
          return index === code;
        }
      );

      rgb = getColor(color(d3ColorArrays as string)?.rgb());
    }
    // continous log
    else {
      const max = getD3Scale?.colors.length - 1;
      getD3Scale?.colors.forEach((item: string, index: number) => {
        const currentIndex = index;
        const normalizedCurrentIndex = (currentIndex - 0) / (max - 0);
        const nextIndex = index + 1;
        const normalizedNextIndex = (nextIndex - 0) / (max - 0);
        //const t = (point - t0) / (t1 - t0); // t = 0.0 gives first color, t = 1.0 gives second color.
        if (point >= normalizedCurrentIndex && point <= normalizedNextIndex) {
          const interpolate = interpolateRgb(
            item,
            getD3Scale[nextIndex]
          )(point);
          rgb = getColor(color(interpolate)?.rgb());
        }
      });
    }
  }

  return rgb;
}

export function createColorMapFunction(colorScaleName: string) {
  return (
    x: number,
    categorial: boolean = false,
    min: number = 0,
    max: number = 1,
    iscolorTablesDefined: colorTablesArray | any = colorTables
  ) => {
    return sampledColor(
      colorScaleName,
      x,
      categorial,
      min,
      max,
      iscolorTablesDefined
    );
  };
}

export function createContinuousLibraryColorScale(
  name: string,
  library = colorTables as colorTablesArray
) {
  return (value: number) => {
    return rgbValues(value, name, library);
  };
}

export function createDefaultContinuousColorScale() {
  return createContinuousLibraryColorScale("Rainbow");
}

export const getColorArrayFromBreakPoints = (
  breakpoints: any,
  arraySize = 512
): string[] => {
  if (breakpoints.length === 0) {
    throw new Error("Couldn't provide color supplier from empty color array");
  }
  const colors = breakpoints.map((item: any) => item.color);
  const ratios = breakpoints.map((item: any) => item.position);
  let position = 0;
  return range(0, arraySize).map((i: any) => {
    if (ratios[position] < i / (arraySize - 1)) {
      position++;
    }
    if (position === 0) {
      return colors[0];
    }
    if (position === ratios.length) {
      return colors[colors.length - 1];
    }

    const color = d3.interpolateRgb(colors[position - 1], colors[position]);
    return d3
      .color(
        color(
          (i / arraySize - ratios[position - 1]) /
            (ratios[position] - ratios[position - 1])
        )
      )
      ?.formatHex() as string;
  });
};
