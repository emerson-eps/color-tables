import { ColorSelectorAccordion } from "./component/ColorSelector/ColorSelectorAccordion";
import { ColorLegend } from "./component/Legend/ColorLegend";
import {
  colorsArray,
  rgbValues,
  RGBToHex,
  createColorMapFunction,
  getColors,
  getRgbData,
  RGBToHexValue,
} from "./component/Utils/legendCommonFunction";
import { d3ColorScales } from "./component/Utils/d3ColorScale";
import { colorTablesObj, colorTablesArray } from "./component/colorTableTypes";
import { ContinuousLegend } from "./component/Legend/ContinuousLegend";
import { DiscreteColorLegend } from "./component/Legend/DiscreteLegend";
import { default as colorTables } from "./component/color-tables.json";

export {
  ColorSelectorAccordion,
  ContinuousLegend,
  DiscreteColorLegend,
  ColorLegend,
  colorsArray,
  rgbValues,
  RGBToHex,
  createColorMapFunction,
  getColors,
  getRgbData,
  RGBToHexValue,
  d3ColorScales,
  colorTablesObj,
  colorTablesArray,
  colorTables,
};
