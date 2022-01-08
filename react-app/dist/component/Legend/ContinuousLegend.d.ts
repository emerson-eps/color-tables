import * as React from "react";
import { templateArray } from "../WelllayerTemplateTypes";
import { colorTablesArray } from "../ColorTableTypes";
declare type legendProps = {
    min: number;
    max: number;
    dataObjectName: string;
    position: number[];
    name: string;
    template: templateArray;
    colorTables: colorTablesArray;
    horizontal: boolean;
};
declare const ContinuousLegend: React.FC<legendProps>;
export default ContinuousLegend;
