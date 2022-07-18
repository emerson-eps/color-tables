import * as React from "react";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { ColorSelectorComponent } from "./ColorSelectorComponent";

export declare type colorScaleObj = {
  name: string;
  color:
    | [number, number, number, number][]
    | ((t: number) => string | string[]);
};
export type colorScaleArray = Array<colorScaleObj>;

declare type legendProps = {
  useColorTableColors?: boolean;
  newColorScaleData?: any;
  colorTables?: any;
  useSampling?: boolean;
  getSample?: any;
};

export const ColorSelectorWrapper: React.FC<legendProps> = ({
  useColorTableColors,
  newColorScaleData,
  colorTables,
  useSampling,
  getSample,
}: legendProps) => {
  let continuousLegend;
  let discreteLegend;

  const continuosColorData: colorScaleArray = [];
  const continuosD3ColorData: colorScaleArray = [];
  const discreteColorData: colorScaleArray = [];
  const discreteD3ColorData: colorScaleArray = [];

  const onChangeData = React.useCallback((e) => {
    if (e.value == "Linear") {
      getSample("Linear")
    } else {
      getSample("Logarithm")
    }
  }, []);

  if (!useSampling) {
    // Continuous legend using color table  data
    const colorTableContinuousData = colorTables.filter((element: any) => {
      return element.discrete === false;
    });

    colorTableContinuousData.forEach((element: any) => {
      continuosColorData.push({ color: element.colors, name: element.name });
    });

    // Continuous legend using d3 data
    const d3continuousData = d3ColorScales.filter((element: any) => {
      return element.discrete === false;
    });

    d3continuousData.forEach((element: any) => {
      continuosD3ColorData.push({ color: element.colors, name: element.name });
    });

    // Discrete legend using color table data
    const discreteData = colorTables.filter((element: any) => {
      return element.discrete === true;
    });

    discreteData.forEach((element: any) => {
      discreteColorData.push({ color: element.colors, name: element.name });
    });

    // Discrete legend using d3 data
    const d3discreteData = d3ColorScales.filter((element: any) => {
      return element.discrete === true;
    });

    d3discreteData.forEach((element: any) => {
      discreteD3ColorData.push({ color: element.colors, name: element.name });
    });
  
    // return continuous and discrete legend which uses d3 data
    if (!useColorTableColors) {
      continuousLegend = continuosD3ColorData.map((val: any, index: any) => {
        return (
          <ColorSelectorComponent
            legendColor={val.color}
            legendColorName={val.name}
            useContColorTable={false}
            uniqueId={index}
            colorScaleData={newColorScaleData}
            key={index}
          />
        );
      });

      discreteLegend = d3discreteData.map((val: any, index: any) => {
        return (
          <ColorSelectorComponent
            colorsObject={val.colors}
            legendColorName={val.name}
            useDiscColorTable={false}
            colorScaleData={newColorScaleData}
            key={index}
          />
        );
      });
    }

    // return continuous and discrete legend which uses colortable data
    else if (useColorTableColors) {
      continuousLegend = continuosColorData.map((value: any, index: any) => {
        return (
          <ColorSelectorComponent
            colorsObject={value}
            useContColorTable={true}
            uniqueId={index}
            colorScaleData={newColorScaleData}
            key={index}
          />
        );
      });

      discreteLegend = discreteColorData.map((val: any, index: any) => {
        return (
          <ColorSelectorComponent
            colorsObject={discreteColorData[index]}
            legendColorName={val.name}
            useDiscColorTable={true}
            colorScaleData={newColorScaleData}
            key={index}
          />
        );
      });
    }
  } else if (useSampling) {
    {useSampling}
    return (<div onChange={(ev) => {onChangeData(ev.target)}}>
      <input type="radio" value="Linear" name="legend" defaultChecked /> Linear <br />
      <input type="radio" value="Logarithm" name="legend"/> Logarithm
    </div>)
  }

  return (
    <div
      className="legendWrapper"
      style={{
        height: 200,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {continuousLegend}
      {discreteLegend}
    </div>
  );
};
