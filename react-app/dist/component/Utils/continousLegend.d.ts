import { colorTablesArray } from "../ColorTableTypes";
import { templateArray } from "../WelllayerTemplateTypes";
export declare function colorsArray(objectName: string, template: templateArray, colorTables: colorTablesArray): [number, number, number, number][];
export declare function rgbValues(objectName: string, point: number, template: templateArray, colorTables: colorTablesArray): number[] | {
    r: number;
    g: number;
    b: number;
    opacity: number;
} | undefined;
export declare function RGBToHex(rgb: number[]): {
    color: string;
    offset: number;
};
