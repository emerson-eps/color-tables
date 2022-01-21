//import { scaleSequential, interpolateViridis, ScaleSequential } from "d3";
import * as d3 from "d3";

export const colorScalesCont = [
    {
        "name": "Spectral",
        "discrete": false,
        "colors": d3.interpolateSpectral
    },
    {
        "name": "RdYlBu",
        "discrete": false,
        "colors": d3.interpolateRdYlBu
    },
    {
        "name": "RdYlGn",
        "discrete": false,
        "colors": d3.interpolateRdYlGn
    },
    {
        "name": "RdBu",
        "discrete": false,
        "colors": d3.interpolateRdBu
    },
    {
        "name": "PiYG",
        "discrete": false,
        "colors": d3.interpolatePiYG
    },
    {
        "name": "Warm",
        "discrete": false,
        "colors": d3.interpolateWarm
    },
    {
        "name": "Cool",
        "discrete": false,
        "colors": d3.interpolateCool
    },
    
    // Viridis: d3.interpolateViridis,
    // Inferno: d3.interpolateInferno,
    // Magma: d3.interpolateMagma,
    // Plasma: d3.interpolatePlasma,
    // CubeHelix: d3.interpolateCubehelixDefault,
    // YlOrRd: d3.interpolateYlOrRd,
    // Blues: d3.interpolateBlues,
    // Greens: d3.interpolateGreens,
    // Oranges: d3.interpolateOranges,
    // Purples: d3.interpolatePurples,
    // Greys: d3.interpolateGreys,
    // Reds: d3.interpolateReds
];

export function interpolatorContinuous(): d3.ScaleSequential<string, never> {
    return d3.scaleSequential(d3.interpolateInferno);
}