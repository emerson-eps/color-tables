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
  getColorName?: any;
  reverseRange?: boolean;
  getColorRange?: any;
  getBreakpointValue?: any;
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
  getColorName,
  reverseRange,
  getColorRange,
  getBreakpointValue,
}: ColorLegendProps) => {
  const generateUniqueId = Math.ceil(Math.random() * 9999).toString();
  const divRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuto, setAuto] = React.useState(true);
  const [newMin, setNewMin] = React.useState();
  const [newMax, setNewMax] = React.useState();
  const [breakValue, setBreakValue] = React.useState();
  const [isNone, setNone] = React.useState(true);

  const [getItemColor, setItemColor] = React.useState([]);

  // callback function for modifying range
  const getRange = React.useCallback(
    (data: any) => {
      if (data === "Auto") {
        setAuto(true);
        if (getColorRange) getColorRange({ isAuto: true });
      } else {
        if (data?.[0] && data?.[1]) {
          setNewMin(data[0]);
          setNewMax(data[1]);
          setAuto(false);
          if (getColorRange)
            getColorRange({ range: [data[0], data[1]], isAuto: false });
        }
      }
    },
    [getColorRange]
  );

  const getBreakpoint = React.useCallback(
    (data: any) => {
      if (data === "None") {
        setNone(true);
        if (getBreakpointValue) getBreakpointValue({ setNone: true });
      } else {
        if (data) {
          setBreakValue(data);
          setNone(false);
          if (getBreakpointValue)
            getBreakpointValue({ breakpoint: [data], isNone: false });
        }
      }
    },
    [isNone]
  );

  const breakpointValues = React.useCallback((data: any) => {
    if (data) {
      setItemColor(data);
    }
  }, []);

  const toggleColorSelector = useCallback(() => {
    if (divRef && divRef.current) {
      isOpen ? setIsOpen(false) : setIsOpen(true);
    }
  }, [isOpen]);

  const [getColorScaleData, setGetColorScaleData] = React.useState([] as any);

  const isColortableColors = colorTables.find((value: any) => {
    return value?.name === colorName || getColorName;
  });

  const isD3Colors = d3ColorScales.find((value: any) => {
    return value?.name === colorName || getColorName;
  });

  const [isCont, setIsCont] = React.useState(
    (isColortableColors || isD3Colors) &&
      (isColortableColors?.discrete === false || isD3Colors?.discrete === false)
      ? true
      : false
  );

  // Get new colorscale from colorselector and update legend
  const getSelectedColorScale = React.useCallback(
    (data: any, value: any) => {
      // update color map layer
      if (data.name && getColorName) {
        getColorName(data.name);
      }
      // d3 color name
      else if (getColorName) {
        getColorName(data.legendColorName);
      }
      setGetColorScaleData(data);
      setIsCont(value);
    },
    [getColorName]
  );

  return (
    <div>
      <div ref={divRef} onClick={toggleColorSelector}>
        {isCont === true && (
          <ContinuousLegend
            min={newMin && isAuto === false ? newMin : min}
            max={newMax && !isAuto ? newMax : max}
            dataObjectName={dataObjectName}
            position={position}
            colorName={colorName}
            horizontal={horizontal}
            getColorScaleData={getColorScaleData}
            id={generateUniqueId}
            colorTables={colorTables}
            reverseRange={reverseRange}
            breakPoint={breakValue && isNone === false ? breakValue : []}
            getItemColor={getItemColor}
          />
        )}
        {isCont === false && (
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
            getRange={getRange}
            isCont={isCont}
            getBreakpoint={getBreakpoint}
            getEditedBreakPoint={breakpointValues}
          />
        )}
      </div>
    </div>
  );
};
