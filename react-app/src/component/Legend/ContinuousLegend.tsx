import * as React from "react";
import { useRef } from "react";
import {
  RGBToHex,
  colorsArray,
  RGBToHexValue,
} from "../Utils/legendCommonFunction";
import { select, scaleLinear, axisBottom, axisRight } from "d3";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { color } from "d3-color";
import { range } from "d3";
import { colorTablesArray } from "../colorTableTypes";
import defaultColorTables from "../color-tables.json";

declare type continuousLegendProps = {
  /**
   * Min value
   */
  min: number;
  /**
   * Max value
   */
  max: number;
  /**
   * Title for the legend
   */
  dataObjectName: string;
  /**
   * Specify the position
   */
  position?: {left: number, top: number} | null;
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
  colorTables?: colorTablesArray;
  /**
   * Optional function property
   *
   * Takes a value in the range [0,1] and returns a color
   *
   * If a colorMapFunction is used, then the colorTable file is not needed
   */
  colorMapFunction?: any;
  /**
   * Reverse the range(min and max)
   */
  reverseRange?: boolean;
  isAuto?: boolean;
  breakPoint?: any;
  editedBreakPointValues?: any;
  /**
   * Should the range be shown or not
   */
  isRangeShown?: boolean;
};

declare type ItemColor = {
  color: string;
  breakPoint?: number;
};

export const ContinuousLegend: React.FC<continuousLegendProps> = ({
  min,
  max,
  dataObjectName,
  position,
  colorName = "Rainbow",
  horizontal,
  getColorScaleData,
  id,
  colorTables = defaultColorTables as colorTablesArray,
  colorMapFunction,
  reverseRange,
  breakPoint,
  editedBreakPointValues,
  isRangeShown,
}: continuousLegendProps) => {
  const generateUniqueId = Math.ceil(Math.random() * 9999).toString();
  const divRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (divRef.current) {
      select(divRef.current).select("div").remove();
      select(divRef.current).select("svg").remove();
      continuousLegend();
    }

    async function continuousLegend() {
      let itemColor: ItemColor[] = [];
      let dataSet;

      try {
        // fix for dash wrapper
        if (typeof colorTables === "string") {
          const res = await fetch(colorTables);
          dataSet = await res.json();
        }
        //Return the matched colors array from color.tables.json file
        let legendColors =
          typeof colorTables === "string"
            ? colorsArray(colorName, dataSet)
            : colorsArray(colorName, colorTables);

        // Update color of legend based on color selector scales
        // data is passed on click upon color scales
        if (getColorScaleData && Object.keys(getColorScaleData).length > 0) {
          // legend using color table data
          if (getColorScaleData.color) {
            legendColors = getColorScaleData.color;
          }
          // legend using d3 data
          else if (getColorScaleData.arrayData) {
            legendColors = getColorScaleData.arrayData;
          }
        }

        const isD3Colors = d3ColorScales.find((value: any) => {
          return value?.name === colorName;
        });
        // main continuous legend for d3 colors
        if (isD3Colors && isD3Colors.discrete === false) {
          const arrayData: any = [];
          const d3ColorArrays = colorsArray(colorName, d3ColorScales);
          const data = range(10).map((d) => ({ color: d3ColorArrays(d / 10) }));
          data.forEach((colorsObject: any, index: number) => {
            arrayData.push([
              0 + "." + index,
              color(colorsObject.color)?.rgb().r,
              color(colorsObject.color)?.rgb().g,
              color(colorsObject.color)?.rgb().b,
            ]);
          });
          legendColors = arrayData;
        }

        // condition to check if the legend is selected from color selector or not
        const getColorTableScale = colorTables.find((value: any) => {
          if (getColorScaleData) {
            return value.name === getColorScaleData?.name;
          } else {
            return value.name === colorName;
          }
        });

        const maxValue = legendColors.length - 1;

        // if colorMapFunction prop is passed
        if (colorMapFunction) {
          let rgbValue: any = [];
          for (var i = 0; i <= 1; i += 0.05) {
            const value = colorMapFunction(i);
            rgbValue.push([i.toFixed(2), value[0], value[1], value[2]]);
          }
          legendColors = rgbValue;
        }

        const arrOfNum = breakPoint?.map((str: string) => {
          return Number(str);
        });

        const userDefinedDomain = arrOfNum ? arrOfNum : [];
        legendColors.forEach(
          (value: [number, number, number, number], index: number) => {
            let domainIndex;

            if (userDefinedDomain[index]) {
              domainIndex = userDefinedDomain[index];
            } else {
              domainIndex = value[0];
            }

            // return the color and breakPoint needed to draw the legend
            itemColor.push({
              // to support discrete color for continous data
              breakPoint:
                getColorTableScale?.discrete === true
                  ? RGBToHexValue(value, maxValue).offset
                  : breakPoint?.length > 0
                  ? domainIndex * 100.0
                  : value[0] * 100.0,
              color: RGBToHex(value).color,
            });
          }
        );

        if (legendColors.length === 0) {
          return [0, 0, 0];
        }

        // get the position and color from the breakpoint modal
        if (editedBreakPointValues?.length > 0) {
          const options = editedBreakPointValues.map(function (row: any) {
            return { breakPoint: row.position * 100.0, color: row.color };
          });

          itemColor = options;
        }

        itemColor.sort((a, b) => {
          return a.breakPoint - b.breakPoint;
        });

        //const colorScale = scaleLinear().domain([min, max]).range([0, 150]);
        // append a defs (for definition) element to your SVG
        const svgLegend = select(divRef.current)
          .style("margin-right", "2px")
          .style("margin-left", "2px")
          .append("svg")
          .style("cursor", getColorScaleData ? "pointer" : "auto")
          .style("background-color", "#ffffffcc")
          .style("border-radius", "5px");

        const defs = svgLegend.append("defs");
        svgLegend
          .attr("width", horizontal ? "190" : "80")
          .attr("height", horizontal ? "70" : "173");
        const currentIndex = "linear-gradient-" + id + "0";
        let linearGradient = defs
          .append("linearGradient")
          .attr("id", currentIndex);
        // append a linearGradient element to the defs and give it a unique id
        if ((horizontal && !reverseRange) || (!horizontal && reverseRange)) {
          linearGradient
            .attr("x1", "0%")
            .attr("x2", horizontal ? "100%" : "0%")
            .attr("y1", "0%")
            .attr("y2", horizontal ? "0%" : "100%");
        } else if (
          (!horizontal && !reverseRange) ||
          (horizontal && reverseRange)
        ) {
          linearGradient
            .attr("x1", horizontal ? "100%" : "0%")
            .attr("x2", "0%")
            .attr("y1", horizontal ? "0%" : "100%")
            .attr("y2", "0%");
        }
        // append multiple color stops by using D3's data/enter step
        linearGradient
          .selectAll("stop")
          .data(itemColor)
          .enter()
          .append("stop")
          .attr("offset", function (data: any) {
            return data.breakPoint + "%";
          })
          .attr("stop-color", function (data: { color: any }) {
            return data.color;
          });

        // draw the rectangle and fill with gradient
        svgLegend
          .append("rect")
          .attr("x", 25)
          .attr("y", horizontal ? 30 : 18)
          .attr("width", horizontal ? "149" : 20)
          .attr("height", horizontal ? 20 : "149")
          .style("fill", "url(#" + currentIndex + ")");

        // append title
        svgLegend
          .append("text")
          .attr("x", horizontal ? 25 : -168)
          .attr("y", horizontal ? 20 : 15)
          .style("text-anchor", "left")
          .style("transform", horizontal ? "none" : "left")
          .style("transform", horizontal ? "none" : "rotate(270deg)")
          .style("fill", "grey")
          .style("font-size", "small")
          .text(dataObjectName);

        // create tick marks
        // range varies the size of the axis
        let xLeg = scaleLinear()
          .domain(reverseRange ? [max, min] : [min, max])
          .range([10, 158]);
        let yLeg = scaleLinear()
          .domain(reverseRange ? [min, max] : [max, min])
          .range([10, 158]);

        const horizontalAxisLeg = axisBottom(xLeg).tickValues(
          xLeg.ticks(0).concat(xLeg.domain(), (min + max) / 2)
        );
        const VerticalAxisLeg = axisRight(yLeg).tickValues(
          yLeg.ticks(0).concat(yLeg.domain(), (min + max) / 2)
        );

        if (isRangeShown) {
          svgLegend
            .attr("class", "axis")
            .append("g")
            .attr(
              "transform",
              horizontal ? "translate(16, 50)" : "translate(45, 7.5)"
            )
            .style("font-size", "10px")
            .style("font-weight", "700")
            .call(horizontal ? horizontalAxisLeg : VerticalAxisLeg)
            .style("height", 15);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    min,
    max,
    colorName,
    colorTables,
    horizontal,
    getColorScaleData,
    colorMapFunction,
    dataObjectName,
    id,
    reverseRange,
  ]);

  return (
    <div
      style={{
        position: "absolute",
        left: position ? position.left : " ",
        top: position ? position.top : " ",
        zIndex: 999,
      }}
    >
      <div
        id={id ? id : `cont-legend - ${generateUniqueId}`}
        ref={divRef}
      ></div>
    </div>
  );
};

ContinuousLegend.defaultProps = {
  position: {left: 5, top: 10},
};
