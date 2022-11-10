export declare type colorTablesObj = {
  name: string;
  discrete: boolean;
  colors: [number, number, number, number][];
  description?: string;
  colorNaN?: [number, number, number];
  colorBelow?: [number, number, number];
  colorAbove?: [number, number, number];
};
export type colorTablesArray = Array<colorTablesObj>;
