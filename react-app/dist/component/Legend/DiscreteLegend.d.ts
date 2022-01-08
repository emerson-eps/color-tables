import * as React from "react";
import { templateArray } from "../WelllayerTemplateTypes";
import { colorTablesArray } from "../ColorTableTypes";
declare type colorLegendProps = {
    discreteData: {
        objects: Record<string, [number[], number]>;
    };
    dataObjectName: string;
    name: string;
    position: number[];
    template: templateArray;
    colorTables: colorTablesArray;
    horizontal: boolean;
};
declare const DiscreteColorLegend: React.FC<colorLegendProps>;
export declare function colorTableData(name: string, template: templateArray, colorTables: colorTablesArray): [number, number, number, number][];
export default DiscreteColorLegend;
