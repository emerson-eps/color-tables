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
  position?: {left: number, top: number} | null;
  colorName: string;
  horizontal?: boolean | null;
  discreteData: { objects: Record<string, [number[], number]> };
  getColorName?: any;
  reverseRange?: boolean;
  getColorRange?: any;
  getBreakpointValue?: any;
  getScale?: any;
  getInterpolateMethod?: any;
  isModal?: boolean;
  isRangeShown?: boolean;
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
  getInterpolateMethod,
  isModal,
  isRangeShown=true,
}: ColorLegendProps) => {
  const generateUniqueId = Math.ceil(Math.random() * 9999).toString();
  const divRef = useRef<HTMLDivElement>(null);
  const colorSelectorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAuto, setAuto] = React.useState(true);
  const [newMin, setNewMin] = React.useState();
  const [newMax, setNewMax] = React.useState();
  const [breakValue, setBreakValue] = React.useState();
  const [isNone] = React.useState(true);
  const [isLog, setLog] = React.useState(false);
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

  const getInterpolation = React.useCallback(
    (data: any) => {
      if (data === "Logarithmic") {
        setLog(true);
        // code to update map layer
        if (getInterpolateMethod) getInterpolateMethod({ isLog: true });
      } else {
        setLog(false);
        // code to update map layer
        if (getInterpolateMethod) getInterpolateMethod({ isLog: false });
      }
    },
    [isLog]
  );

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
      setItemColor([]);
      if (getBreakpointValue) getBreakpointValue({ breakpoint: [] });
    },
    [getColorName]
  );

  // function to close the color selector if clicked outside
  function handleModalClick(e: Event) {
    if (!colorSelectorRef.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  React.useEffect(() => {
    if (isOpen && isModal) {
      document.addEventListener("mousedown", handleModalClick);
    } else {
      document.removeEventListener("mousedown", handleModalClick);
    }
    return () => document.removeEventListener("mousedown", handleModalClick);
  }, [isOpen, isModal]);

  // define a state that controls the position of the color selector
  const [colorSelectorPosition, setColorSelectorPosition] = React.useState({});
  React.useEffect(() => {
    if (divRef.current) {
      const colorLegendElement = divRef.current.firstChild as Element;
      const legendBoundingBox = colorLegendElement.getBoundingClientRect();
      setColorSelectorPosition({
        top: legendBoundingBox.top,
        left: legendBoundingBox.left,
      });
    }
  }, [position]);

  /* Defining some states to rerender the component upon prop change in storybook */

  // defining a state that controls the legend name and allows editing it
  const [legendName, setLegendName] = React.useState(dataObjectName);
  React.useEffect(() => {
    setLegendName(dataObjectName);
  }, [dataObjectName]);

  return (
    <div style={{position: "relative"}}>
      <div ref={divRef} onClick={toggleColorSelector}>
        {isCont === true && (
          <ContinuousLegend
            min={newMin && !isAuto ? newMin : min}
            max={newMax && !isAuto ? newMax : max}
            dataObjectName={legendName}
            position={position}
            colorName={colorName}
            horizontal={horizontal}
            getColorScaleData={getColorScaleData}
            id={generateUniqueId}
            colorTables={colorTables}
            reverseRange={reverseRange}
            breakPoint={breakValue && isNone === false ? breakValue : []}
            editedBreakPointValues={getItemColor}
            isLog={isLog}
            isRangeShown={isRangeShown}
          />
        )}
        {isCont === false && (
          <DiscreteColorLegend
            discreteData={discreteData}
            dataObjectName={legendName}
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
          <div style={{display: "inline-block"}} ref={colorSelectorRef}>
            <ColorSelectorAccordion            
              setIsOpen={() => setIsOpen(false)}
              isModal={isModal}
              dataObjectName={legendName}
              setDataObjectName={setLegendName}
              isHorizontal={horizontal}
              colorTables={colorTables}
              position={colorSelectorPosition}
              getRange={getRange}
              isCont={isCont}
              getBreakpoint={getBreakpoint}
              getEditedBreakPoint={breakpointValues}
              newColorScaleData={getSelectedColorScale}
              handleModalClick={handleModalClick}
              currentLegendName={
                getColorScaleData?.color?.length > 0
                  ? getColorScaleData.name
                  : colorName
              }
              getInterpolation={getInterpolation}
            />
          </div>
        )}
      </div>
    </div>
  );
};
