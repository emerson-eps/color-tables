import { ColorSelectorAccordion } from './component/ColorSelector/ColorSelectorAccordion';
import { ContinuousLegend } from './component/Legend/ContinuousLegend';
import { DiscreteColorLegend } from './component/Legend/DiscreteLegend';
import { ColorLegend } from './component/Legend/ColorLegend';
import { colorsArray, rgbValues, RGBToHex } from './component/Utils/continousLegend';
import { d3ColorScales } from './component/Utils/d3ColorScale';
import { colorTablesObj, colorTablesArray } from './component/colorTableTypes';
import * as colorTables from './component/color-tables.json';

export {
    ColorSelectorAccordion,
    ContinuousLegend,
    DiscreteColorLegend,
    ColorLegend,
    colorsArray,
    rgbValues,
    RGBToHex,
    d3ColorScales,
    colorTablesObj,
    colorTablesArray,
    colorTables,
};
