import * as d3 from "d3";
import { range } from "lodash";

export const colorScalesCont: Record<string, (num: number) => string> = {
    Rainbow: d3.interpolateHslLong("red", "blue"),
    Spectral: d3.interpolateSpectral,
    RdYlBu: d3.interpolateRdYlBu,
    RdYlGn: d3.interpolateRdYlGn,
    RdBu: d3.interpolateRdBu,
    PiYG: d3.interpolatePiYG,
    Warm: d3.interpolateWarm,
    Cool: d3.interpolateCool,
    Viridis: d3.interpolateViridis,
    Inferno: d3.interpolateInferno,
    Magma: d3.interpolateMagma,
    Plasma: d3.interpolatePlasma,
    CubeHelix: d3.interpolateCubehelixDefault,
    YlOrRd: d3.interpolateYlOrRd,
    Blues: d3.interpolateBlues,
    Greens: d3.interpolateGreens,
    Oranges: d3.interpolateOranges,
    Purples: d3.interpolatePurples,
    Greys: d3.interpolateGreys,
    Reds: d3.interpolateReds
};

const toColorCont = (toColor: (t: number) => string) => {
    return (value: number, invert?: boolean) => {
      if (value < 0 || value > 1) throw new Error("value not in [0,1]");
      return invert ? toColor(1 - value) : toColor(value);
    };
  };

export const getSampleColorScales = () => {
    const colorScales: any = {};
    Object.keys(colorScalesCont).forEach(key => {
        const textureSize = 1024;
        const colorScales: any = {};
        colorScales[key] = {
            name: key,
            isDiscrete: false,
            colors: range(0, textureSize).map(i =>
                toColorCont(colorScalesCont[key])(i / (textureSize - 1))
            )
        };
    });
  return colorScales;
};