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
  getScale?: any;
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
  getScale,
}: ColorLegendProps) => {
  const generateUniqueId = Math.ceil(Math.random() * 9999).toString();
  const divRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuto, setAuto] = React.useState(true);
  const [newMin, setNewMin] = React.useState();
  const [newMax, setNewMax] = React.useState();
  const [breakValue, setBreakValue] = React.useState();
  const [isNone] = React.useState(true);

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
      if (data) {
        setBreakValue(data);
        if (getBreakpointValue) getBreakpointValue({ breakpoint: [data] });
      }
    },
    [getItemColor]
  );

  const breakpointValues = React.useCallback((data: any) => {
    if (data) {
      setItemColor(data);
      if (getBreakpointValue) getBreakpointValue(data);
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
      if (getScale) {
        getScale(data);
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
            editedBreakPointValues={getItemColor}
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
            isHorizontal={horizontal}
            colorTables={colorTables}
            getRange={getRange}
            isCont={isCont}
            getBreakpoint={getBreakpoint}
            getEditedBreakPoint={breakpointValues}
            newColorScaleData={getSelectedColorScale}
            currentLegendName={
              getColorScaleData?.color?.length > 0
                ? getColorScaleData.name
                : colorName
            }
          />
        )}
      </div>
    </div>
  );
};
