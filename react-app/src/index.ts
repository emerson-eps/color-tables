import { ColorSelectorAccordion } from './component/ColorSelector/ColorSelectorAccordion';
import { ColorLegendComponent } from './component/Legend/ColorLegend';
import { colorsArray, rgbValues, RGBToHex } from './component/Utils/continousLegend';
import { d3ColorScales } from './component/Utils/d3ColorScale';
import { colorTablesObj, colorTablesArray } from './component/colorTableTypes';
import { ContinuousLegend } from './component/Legend/ContinuousLegend';
import { DiscreteColorLegend } from './component/Legend/DiscreteLegend';
import * as colorTables from './component/color-tables.json';

export {
    ColorSelectorAccordion,
    ContinuousLegend,
    DiscreteColorLegend,
    ColorLegendComponent,
    colorsArray,
    rgbValues,
    RGBToHex,
    d3ColorScales,
    colorTablesObj,
    colorTablesArray,
    colorTables,
};
