import { ColorSelectorAccordion } from "./component/ColorSelector/ColorSelectorAccordion";
import { ColorLegend, ColorLegendProps, ScaleHandler } from "./component/Legend/ColorLegend";
import {
  colorsArray,
  rgbValues,
  RGBToHex,
  createColorMapFunction,
  getColors,
  getRgbData,
} from "./component/Utils/legendCommonFunction";
import { d3ColorScales } from "./component/Utils/d3ColorScale";
import { colorTablesObj, colorTablesArray } from "./component/colorTableTypes";
import { ContinuousLegend, ContinuousLegendProps } from "./component/Legend/ContinuousLegend";
import { DiscreteColorLegend, DiscreteColorLegendProps, DiscreteCodes } from "./component/Legend/DiscreteLegend";
import { default as colorTables } from "./component/color-tables.json";

export {
  ColorSelectorAccordion,
  ContinuousLegend,
  ContinuousLegendProps,
  DiscreteColorLegend,
  DiscreteColorLegendProps,
  DiscreteCodes,
  ColorLegend,
  ColorLegendProps,
  ScaleHandler,
  colorsArray,
  rgbValues,
  RGBToHex,
  createColorMapFunction,
  getColors,
  getRgbData,
  d3ColorScales,
  colorTablesObj,
  colorTablesArray,
  colorTables,
};
