import * as React from "react";
import { DiscreteColorLegend } from "./DiscreteLegend";
import { ContinuousLegend } from "./ContinuousLegend";
import { useCallback, useRef } from "react";
import { ColorSelectorAccordion } from "../ColorSelector/ColorSelectorAccordion";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { colorTablesArray } from "../colorTableTypes";

declare type ColorLegendProps = {
  colorTables: colorTablesArray;
  min: number;
  max: number;
  dataObjectName: string;
  position?: number[] | null;
  colorName: string;
  horizontal?: boolean | null;
  discreteData: { objects: Record<string, [number[], number]> };
  getColorMapname?: any;
};

// Todo: Adapt it for other layers too
export const ColorLegend: React.FC<ColorLegendProps> = ({
  position,
  horizontal,
  colorTables,
  min,
  max,
  dataObjectName,
  colorName,
  discreteData,
  getColorMapname,
}: ColorLegendProps) => {
  const generateUniqueId = Math.ceil(Math.random() * 9999).toString();
  const divRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleColorSelector = useCallback(() => {
    if (divRef && divRef.current) {
      isOpen ? setIsOpen(false) : setIsOpen(true);
    }
  }, [isOpen]);

  const [getColorScaleData, setGetColorScaleData] = React.useState([] as any);

  const isColortableColors = colorTables.find((value: any) => {
    return value?.name == colorName;
  });

  const isD3Colors = d3ColorScales.find((value: any) => {
    return value?.name == colorName;
  });

  const [isCont, setIsCont] = React.useState(
    (isColortableColors || isD3Colors) &&
      (isColortableColors?.discrete == false || isD3Colors?.discrete == false)
      ? true
      : false
  );

  // Get new colorscale from colorselector and update legend
  const getSelectedColorScale = React.useCallback((data: any, value: any) => {
    // update color map layer
    if (data.name && getColorMapname) {
      getColorMapname(data.name);
    }
    // d3 color name
    else if (getColorMapname) {
      getColorMapname(data.legendColorName);
    }
    setGetColorScaleData(data);
    setIsCont(value);
  }, []);

  return (
    <div>
      <div ref={divRef} onClick={toggleColorSelector}>
        {isCont == true && (
          <ContinuousLegend
            min={min}
            max={max}
            dataObjectName={dataObjectName}
            position={position}
            colorName={colorName}
            horizontal={horizontal}
            getColorScaleData={getColorScaleData}
            id={generateUniqueId}
            colorTables={colorTables}
          />
        )}
        {isCont == false && (
          <DiscreteColorLegend
            discreteData={discreteData}
            dataObjectName={dataObjectName}
            position={position}
            colorName={colorName}
            horizontal={horizontal}
            getColorScaleData={getColorScaleData}
            id={generateUniqueId}
            colorTables={colorTables}
          />
        )}
      </div>
      <div>
        {isOpen && (
          <ColorSelectorAccordion
            newColorScaleData={getSelectedColorScale}
            isHorizontal={horizontal}
            colorTables={colorTables}
          />
        )}
      </div>
    </div>
  );
};
