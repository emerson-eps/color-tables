import * as React from "react";
import { DiscreteColorLegend } from "./DiscreteLegend";
import { ContinuousLegend } from "./ContinuousLegend";
import { useRef } from "react";
import { ColorSelectorAccordion } from "../ColorSelector/ColorSelectorAccordion";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { colorTablesArray } from "../colorTableTypes";

declare type ColorLegendProps = {
  colorTables: colorTablesArray;
  min: number;
  max: number;
  dataObjectName: string;
  position?: { left: number; top: number } | null;
  colorName: string;
  horizontal?: boolean | null;
  discreteData: { objects: Record<string, [number[], number]> };
  getColorName?: any;
  reverseRange?: boolean;
  getColorRange?: any;
  getBreakpointValue?: any;
  getScale?: any;
  isModal?: boolean;
  isRangeShown?: boolean;
  legendFontSize?: number;
  tickFontSize?: number;
  numberOfTicks?: number;
  legendScaleSize?: number;
};

// Todo: Adapt it for other layers too
export const ColorLegend: React.FC<ColorLegendProps> = ({
  position = {left: 5, top: 10},
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
  isModal,
  isRangeShown,
  legendFontSize = 18,
  tickFontSize = 12,
  numberOfTicks = 1,
  legendScaleSize = 200,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getItemColor]
  );

  const breakpointValues = React.useCallback((data: any) => {
    if (data) {
      setItemColor(data);
      if (getBreakpointValue) getBreakpointValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleColorSelector = () => {
    if (divRef && divRef.current) {
      isOpen ? setIsOpen(false) : setIsOpen(true);
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getColorName]
  );

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

  // defining a state that controls the legend name FONT SIZE and allows editing it
  const [legendFontSizeState, setLegendFontSize] =
    React.useState<number>(legendFontSize);
  React.useEffect(() => {
    setLegendFontSize(legendFontSize);
  }, [legendFontSize]);

  // defining a state that controls the legend ticks' FONT SIZE and allows editing them
  const [tickFontSizeState, setTickFontSize] =
    React.useState<number>(tickFontSize);
  React.useEffect(() => {
    setTickFontSize(tickFontSize);
  }, [tickFontSize]);

  // defining a state that manages number of ticks
  const [numberOfTicksState, setNumberOfTicks] =
    React.useState<number>(numberOfTicks);
  React.useEffect(() => {
    setNumberOfTicks(numberOfTicks);
  }, [numberOfTicks]);

  // defining a state managing the legend scale size
  const [legendScaleSizeState, setLegendScaleSize] =
    React.useState<number>(legendScaleSize);
  React.useEffect(() => {
    setLegendScaleSize(legendScaleSize);
  }, [legendScaleSize]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={divRef}
        onClick={toggleColorSelector}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {isCont === true && (
          <ContinuousLegend
            min={newMin && isAuto === false ? newMin : min}
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
            isRangeShown={isRangeShown}
            legendFontSize={legendFontSizeState}
            tickFontSize={tickFontSizeState}
            numberOfTicks={numberOfTicksState}
            legendScaleSize={legendScaleSizeState}
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
            legendFontSize={legendFontSizeState}
            tickFontSize={tickFontSizeState}
            numberOfTicks={numberOfTicksState}
          />
        )}
      </div>
      <div>
        {isOpen && (
          <div style={{ display: "inline-block" }} ref={colorSelectorRef}>
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
              legendFontSize={legendFontSize}
              setLegendFontSize={setLegendFontSize}
              tickFontSize={tickFontSize}
              setTickFontSize={setTickFontSize}
            />
          </div>
        )}
      </div>
    </div>
  );
};
