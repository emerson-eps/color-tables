export type ColorTable = {
  name: string;
  discrete: boolean;
  colors: [number, number, number, number][];
  description?: string;
  colorNaN?: [number, number, number];
  colorBelow?: [number, number, number];
  colorAbove?: [number, number, number];
};
/**
 * @deprecated use ColorTable instead.
 */
export type colorTablesObj = ColorTable;

export type ColorTableArray = Array<ColorTable>;
/**
 * @deprecated use ColorTableArray instead.
 */
export type colorTablesArray = ColorTableArray;
