import * as React from "react";
import { DiscreteColorLegend } from "./DiscreteLegend";
import { ContinuousLegend } from "./ContinuousLegend";
import { useCallback, useRef } from "react";
import { ColorSelectorAccordion } from "../ColorSelector/ColorSelectorAccordion";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { colorTablesArray } from "../colorTableTypes";
import defaultColorTables from "../color-tables.json";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
declare type ColorLegendProps = {
  colorTables?: colorTablesArray;
  min?: number;
  max?: number;
  dataObjectName?: string;
  colorName?: string;
  horizontal?: boolean | null;
  discreteData?: { objects: Record<string, [number[], number]> };
  colorNameFromSelector?: any;
  reverseRange?: boolean;
  getColorRange?: any;
  getBreakpointValue?: any;
  getScale?: any;
  getInterpolateMethod?: any;
  isModal?: boolean;
  isRangeShown?: boolean;
  legendFontSize?: number;
  tickFontSize?: number;
  numberOfTicks?: number;
  legendScaleSize?: number;
  cssLegendStyles?: any;
  isOpenProp?: boolean;
  openColorSelector?: boolean;
};

// Todo: Adapt it for other layers too
export const ColorLegend: React.FC<ColorLegendProps> = ({
  horizontal,
  colorTables = defaultColorTables as colorTablesArray,
  min = 0,
  max = 1,
  dataObjectName,
  colorName = "Rainbow",
  discreteData,
  colorNameFromSelector,
  reverseRange,
  getColorRange,
  getBreakpointValue,
  getScale,
  getInterpolateMethod,
  isModal,
  isRangeShown = true,
  legendFontSize = 18,
  tickFontSize = 12,
  numberOfTicks = 1,
  legendScaleSize = 200,
  cssLegendStyles = { left: "0vw", top: "0vh" },
  isOpenProp = false,
  openColorSelector = true,
}: ColorLegendProps) => {
  const generateUniqueId = Math.ceil(Math.random() * 9999).toString();
  const divRef = useRef<HTMLDivElement>(null);
  const colorSelectorRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(isOpenProp);
  const [isAuto, setAuto] = React.useState(true);
  const [newMin, setNewMin] = React.useState();
  const [newMax, setNewMax] = React.useState();
  const [isLog, setLog] = React.useState(false);
  const [getItemColor, setItemColor] = React.useState([]);
  const [isNearest, setIsNearest] = React.useState(false);

  // callback function for modifying range
  const getRange = React.useCallback(
    (data: any) => {
      if (data === "Auto") {
        setAuto(true);
        if (getColorRange) getColorRange({ isAuto: true });
      } else {
        setAuto(false);
        if (data?.[0] && data?.[1]) {
          setNewMin(data[0]);
          setNewMax(data[1]);
          if (getColorRange)
            getColorRange({ range: [data[0], data[1]], isAuto: false });
        }
      }
    },
    [getColorRange]
  );

  const getInterpolation = React.useCallback(
    (data: any) => {
      if (data === "Logarithmic") {
        setLog(true);
        setIsNearest(false);
        // code to update map layer
        if (getInterpolateMethod)
          getInterpolateMethod({ isLog: true, isNearest: false });
      } else if (data === "Nearest") {
        setIsNearest(true);
        setLog(false);
        if (getInterpolateMethod)
          getInterpolateMethod({ isNearest: true, isLog: false });
      } else {
        setLog(false);
        setIsNearest(false);
        // code to update map layer
        if (getInterpolateMethod)
          getInterpolateMethod({ isLog: false, isNearest: false });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLog, isNearest]
  );

  const breakpointValues = React.useCallback((data: any) => {
    if (data) {
      setItemColor(data);
      if (getBreakpointValue) getBreakpointValue(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleColorSelector = useCallback(() => {
    if (divRef && divRef.current) {
      isOpen ? setIsOpen(false) : setIsOpen(true);
    }
  }, [isOpen]);

  const [getColorScaleData, setGetColorScaleData] = React.useState([] as any);

  const isColortableColors = colorTables?.find((value: any) => {
    return value?.name === colorName || colorNameFromSelector;
  });

  const isD3Colors = d3ColorScales.find((value: any) => {
    return value?.name === colorName || colorNameFromSelector;
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
      if (data.name && colorNameFromSelector) {
        colorNameFromSelector(data.name);
      }
      // d3 color name
      else if (colorNameFromSelector) {
        colorNameFromSelector(data.legendColorName);
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
    [colorNameFromSelector]
  );

  const handleModalClick = React.useCallback(
    (e: Event) => {
      if (!colorSelectorRef.current?.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  React.useEffect(() => {
    if (isOpen && isModal) {
      document.addEventListener("mousedown", handleModalClick);
    } else {
      document.removeEventListener("mousedown", handleModalClick);
    }
    return () => document.removeEventListener("mousedown", handleModalClick);
  }, [isOpen, isModal, handleModalClick]);

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

  const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
    <div style={{ position: "relative" }}>
      <div
        ref={divRef}
        onClick={toggleColorSelector}
        style={{ display: "inline-block", cursor: "pointer" }}
        title="Click here to edit"
      >
        {isCont === true && (
          <ContinuousLegend
            min={newMin && !isAuto ? newMin : min}
            max={newMax && !isAuto ? newMax : max}
            dataObjectName={legendName}
            colorName={colorName}
            horizontal={horizontal}
            getColorScaleData={getColorScaleData}
            id={generateUniqueId}
            colorTables={colorTables}
            reverseRange={reverseRange}
            editedBreakPointValues={getItemColor}
            isLog={isLog}
            isNearest={isNearest}
            isRangeShown={isRangeShown}
            legendFontSize={legendFontSizeState}
            tickFontSize={tickFontSizeState}
            numberOfTicks={numberOfTicksState}
            legendScaleSize={legendScaleSizeState}
            cssLegendStyles={cssLegendStyles}
          />
        )}
        {isCont === false && (
          <DiscreteColorLegend
            discreteData={discreteData}
            dataObjectName={legendName}
            colorName={colorName}
            horizontal={horizontal}
            getColorScaleData={getColorScaleData}
            id={generateUniqueId}
            colorTables={colorTables}
            legendFontSize={legendFontSizeState}
            tickFontSize={tickFontSizeState}
            numberOfTicks={numberOfTicksState}
            legendScaleSize={legendScaleSizeState}
            cssLegendStyles={cssLegendStyles}
          />
        )}
      </div>
      <div>
        {isOpen && openColorSelector && (
          <div style={{ display: "inline-block" }} ref={colorSelectorRef}>
            <ColorSelectorAccordion
              setIsOpen={() => setIsOpen(false)}
              isModal={isModal}
              dataObjectName={legendName}
              isHorizontal={horizontal}
              colorTables={colorTables}
              getRange={getRange}
              isCont={isCont}
              getEditedBreakPoint={breakpointValues}
              newColorScaleData={getSelectedColorScale}
              handleModalClick={handleModalClick}
              currentLegendName={
                getColorScaleData?.color?.length > 0
                  ? getColorScaleData.name
                  : colorName
              }
              getInterpolation={getInterpolation}
              legendScaleSize={legendScaleSizeState}
              cssLegendStyles={cssLegendStyles}
              selectedInterpolationType={
                isNearest
                  ? { isNearest: true }
                  : isLog
                  ? { isLog: true }
                  : { isLinear: true }
              }
              selectedRangeType={isAuto ? { isAuto: true } : { isAuto: false }}
            />
          </div>
        )}
      </div>
    </div>
    </ThemeProvider>
  );
};
