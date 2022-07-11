import { scaleLinear, scaleLog } from "d3";

/** Generic array of two values [T, T] */
export declare type Tuplet<T> = [T, T];

export function createScale(type: string, domain: number[] | Tuplet<number>): any {
    if (type === "linear") {
        return scaleLinear().domain(domain);
    }
    if (type === "log") {
        return scaleLog().domain(domain);
    }
}
