import { ColorTableArray } from "./colorTableTypes";
import colorTablesJson from "./color-tables.json";

export * from "./colorTableTypes";

export * from "./BreakPoint";
export * from "./ColorSelector";
export * from "./Legend";
export * from "./Utils";

const colorTables: ColorTableArray = colorTablesJson as ColorTableArray;

export { colorTables };
