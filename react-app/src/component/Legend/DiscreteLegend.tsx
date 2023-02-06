import * as React from "react";
import { useRef } from "react";
import discreteLegendUtil from "../Utils/discreteLegend";
import { select } from "d3";
import { colorsArray, RGBToHex } from "../Utils/legendCommonFunction";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { colorTablesArray } from "../colorTableTypes";
import defaultColorTables from "../color-tables.json";

declare type ItemColor = {
  color: string;
  name?: string;
};

declare type discreteLegendProps = {
  /**
   * Discrete data to build legend
   */
  discreteData?: { objects: Record<string, [number[], number]> };
  /**
   * Title for the legend
   */
  dataObjectName?: string;
  /**
   * Name of the color(ex: Rainbow)
   */
  colorName?: string;
  /**
   * Orientation for legend
   */
  horizontal?: boolean | null;
  /**
   * Used while using color selector component
   *
   * Returns the object with name and array of colors
   */
  getColorScaleData?: any;
  /**
   * ID
   */
  id?: string;
  /**
   * Prop containing color table data
   *
   * Reference: https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/color-tables.json
   */
  colorTables?: colorTablesArray | string;
  /**
   * Font size of legend name (in px)
   */
  legendFontSize?: number;
  /**
   * Font size of legend ticks (in px)
   */
  tickFontSize?: number;
  /**
   * Number of ticks in the main legend (only shown when isRangeShown prop is true)
   * This refers to the number between min and max range points
   */
  numberOfTicks?: number;
  /**
   * This prop controls the number of ticks shown on the scale of the color legend (in px)
   */
  legendScaleSize?: number;
  /**
   * css styles to be applied
   */
  cssLegendStyles?: any;
};

export const DiscreteColorLegend: React.FC<discreteLegendProps> = ({
  discreteData,
  dataObjectName,
  colorName = "Stratigraphy",
  horizontal,
  getColorScaleData,
  id,
  colorTables = defaultColorTables as colorTablesArray,
  legendFontSize,
  tickFontSize,
  numberOfTicks,
  legendScaleSize = 200,
  cssLegendStyles = { left: "0vw", top: "0vh" },
}: discreteLegendProps) => {
  const generateUniqueId = Math.ceil(Math.random() * 9999).toString();
  const divRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (divRef.current) {
      select(divRef.current).select("div").remove();
      select(divRef.current).select("svg").remove();
      discreteLegend();
    }

    async function discreteLegend() {
      let dataSet;
      let useSelectorLegend = false;
      let itemName: string[] = [];
      let itemColor: ItemColor[] = [];
      try {
        // fix for dash wrapper
        if (typeof colorTables === "string") {
          const res = await fetch(colorTables);
          dataSet = await res.json();
        }

        const arrayOfColors =
          typeof colorTables === "string"
            ? colorsArray(colorName, dataSet)
            : colorsArray(colorName, colorTables);

        const d3ColorArrays = colorsArray(colorName, d3ColorScales);

        // temporary fix, will be removed later
        const defaultDiscreteData: any = {
          discrete_1: [[], 0],
          discrete_2: [[], 1],
          discrete_3: [[], 2],
          discrete_4: [[], 3],
          discrete_5: [[], 4],
          discrete_6: [[], 5],
          discrete_7: [[], 6],
          discrete_8: [[], 7],
          discrete_9: [[], 8],
          discrete_10: [[], 9],
        };

        // Main single discrete legend
        if (!getColorScaleData || getColorScaleData.length === 0) {
          const entries = Object.entries(
            discreteData ? discreteData : defaultDiscreteData
          );
          //eslint-disable-next-line
          const sorted = entries.sort((a: any, b: any) => a[1][1] - b[1][1]);
          sorted.forEach((value) => {
            const key = value[0];
            const val = value[1];
            const code = val[1];
            // for colortable colors
            if (arrayOfColors.length > 0) {
              //compare the first value in colorarray(colortable) and code from discreteData
              const matchedColorsArrays = arrayOfColors.find(
                (value: [number[], number][]) => {
                  return value[0] === code;
                }
              );
              if (matchedColorsArrays)
                itemColor.push({
                  color: RGBToHex(matchedColorsArrays).color,
                  name: key,
                });
              itemName.push(key);
            }
            // for d3 colors
            else {
              var matchedColorsArrays = d3ColorArrays.find(
                (_value: number, index: [number[], number]) => {
                  return index === code;
                }
              );
              if (matchedColorsArrays)
                itemColor.push({ color: matchedColorsArrays });
            }
          });
          useSelectorLegend = false;
        }
        // Discrete legend using Colortable colors (color selector component)
        if (getColorScaleData?.color) {
          getColorScaleData.color.forEach((key: any) => {
            itemColor.push({ color: RGBToHex(key).color });
          });

          useSelectorLegend = true;
        }
        // Discrete legend using d3 colors
        if (getColorScaleData?.colorsObject) {
          getColorScaleData.colorsObject.forEach((key: any) => {
            itemColor.push({ color: key });
          });

          itemName = getColorScaleData.legendColorName;
          useSelectorLegend = true;
        }

        const colorLegend = discreteLegendUtil(
          itemColor,
          useSelectorLegend,
          horizontal
        );
        let totalRect;

        // Style for main horizontal legend
        if (!useSelectorLegend) {
          totalRect = itemColor.length;
        }
        // Style for color selector legend
        else {
          // calculate width for legend using colortable colors
          if (getColorScaleData?.color) {
            totalRect = getColorScaleData.color.length;
          }
          // calculate width for legend using d3 colors
          else {
            totalRect = getColorScaleData.colorsObject.length;
          }
        }

        const currentDiv = select(divRef.current);

        // append the title
        currentDiv
          .append("div")
          .text(dataObjectName)
          .style("color", "grey")
          .style("white-space", "nowrap")
          .style("overflow", "hidden")
          .style("width", "150px")
          .style("text-overflow", "ellipsis")
          .style("margin-bottom", horizontal ? "5px" : "0px")
          .style(
            "font-size",
            legendFontSize && legendFontSize > 0
              ? `${legendFontSize}px`
              : "16px"
          )
          .style(
            "transform",
            horizontal ? "none" : "translate(-69px, 80px) rotate(270deg)"
          );

        // Append svg to the div
        const svgLegend = currentDiv
          .style("margin", horizontal ? "5px 0px 0px 15px" : "0px 5px 0px 5px")
          // .style("width", horizontal ? "145px" : "50px")
          .style(
            "width",
            horizontal
              ? legendScaleSize < 200
                ? 200
                : legendScaleSize
              : "50px"
          )
          .append("svg")
          .call(colorLegend);

        svgLegend
          .attr(
            "viewBox",
            horizontal ? `0 0 ${totalRect} 1.5` : `0 0 2 ${totalRect}`
          )
          .attr("preserveAspectRatio", "none")
          .style("font-size", ".4")
          .style("margin-left", horizontal ? "0" : "20px")
          // .attr("height", horizontal ? "30px" : "153px")
          .attr(
            "height",
            horizontal
              ? "30px"
              : legendScaleSize < 200
              ? 190
              : legendScaleSize - 10
          )
          // .attr("width", horizontal ? "150px" : "40px");
          .attr(
            "width",
            horizontal
              ? legendScaleSize < 200
                ? 190
                : legendScaleSize - 10
              : "40px"
          );
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    discreteData,
    colorName,
    colorTables,
    horizontal,
    getColorScaleData,
    dataObjectName,
    legendFontSize,
    tickFontSize,
    numberOfTicks,
    legendScaleSize,
  ]);

  return (
    <div
      style={{
        position: "absolute",
        minHeight: "70px",
        backgroundColor: "#ffffffcc",
        borderRadius: "5px",
        zIndex: 999,
        margin: "10px",
        ...cssLegendStyles,
      }}
    >
      <div
        id={id ? id : `disc-legend - ${generateUniqueId}`}
        ref={divRef}
      ></div>
    </div>
  );
};
