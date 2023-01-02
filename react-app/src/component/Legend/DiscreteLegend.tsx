import * as React from "react";
import { useRef } from "react";
//import {DiscreteLegendUtil} from "../Utils/discreteLegend";
import { select } from "d3";
import { colorsArray } from "../Utils/legendCommonFunction";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { colorTablesArray } from "../colorTableTypes";
import defaultColorTables from "../color-tables.json";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@material-ui/core";

declare type ItemColor = {
  color: string;
  name?: string;
};

declare type discreteLegendProps = {
  /**
   * Name of the color(ex: Rainbow)
   */
  colorName: string;
  /**
   * Discrete data to build legend
   */
  discreteData?: { objects: Record<string, [number[], number]> };
   /**
   * Title for the legend
   */
   dataObjectName?: string;
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
   * This prop controls the number of ticks shown on the scale of the color legend (in px)
   */
  legendScaleSize?: number;
  /**
   * css styles to be applied
   */
  cssLegendStyles?: any;
  useCodeMaping?: boolean
};

export const DiscreteColorLegend: React.FC<discreteLegendProps> = ({
  discreteData,
  dataObjectName = "Legend",
  colorName = "Stratigraphy",
  horizontal,
  getColorScaleData,
  id,
  colorTables = defaultColorTables as colorTablesArray,
  legendFontSize,
  legendScaleSize = 200,
  cssLegendStyles = { left: "0vw", top: "0vh" },
  useCodeMaping,
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
        // Single discrete legend
        if ((!getColorScaleData || getColorScaleData.length === 0) && discreteData) {
          const entries = Object.entries(discreteData);
          //eslint-disable-next-line
          const sorted = entries?.sort((a: any, b: any) => a[1][1] - b[1][1]);
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
                  color: RGBToHex(matchedColorsArrays),
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
        else if (getColorScaleData?.color) {
          
          getColorScaleData.color.forEach((key: any) => {
            itemColor.push({ color: RGBToHex(key) });
          });

          useSelectorLegend = true;
        }
        // Discrete legend using d3 colors
        else if (getColorScaleData?.colorsObject) {
          getColorScaleData.colorsObject.forEach((key: any) => {
            itemColor.push({ color: key });
          });

          itemName = getColorScaleData.legendColorName;
          useSelectorLegend = true;
        } else if (useCodeMaping) {
          arrayOfColors.forEach((key: any) => {
            itemColor.push({ color: RGBToHex(key) });
          });
        }

        // const ordinalValues = scaleOrdinal().domain(itemName);
        const colorLegend = DiscreteLegendUtil(itemColor,useSelectorLegend,horizontal)
        
       
        // .inputScale(ordinalValues);
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
          // .text(dataObjectName)
          // .style("color", "grey")
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
            horizontal ? `0 0 ${totalRect} 1.5` : `0 0 3 ${totalRect}`
          )
          .attr("preserveAspectRatio", "none")
          .style("font-size", ".4")
          .style("margin-left", horizontal ? "0" : "20px")
          .style("margin-top", horizontal ? "0" : "30px")
          // .attr("height", horizontal ? "30px" : "153px")
          .attr(
            "height",
            horizontal
              ? "30px"
              : legendScaleSize < 200
              ? 40
              : legendScaleSize - 10
          )
          // .attr("width", horizontal ? "150px" : "40px");
          .attr(
            "width",
            horizontal
              ? legendScaleSize < 200
                ? 40
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
    legendScaleSize,
  ]);

  return (
    <div
      style={{
        position: "absolute",
        minHeight: "70px",
        // backgroundColor: "#ffffffcc",
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

export function RGBToHex(rgb: number[]) {
  let r = rgb[1].toString(16),
    g = rgb[2].toString(16),
    b = rgb[3].toString(16);
  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;
  return "#" + r + g + b;
}

export function DiscreteLegendUtil (itemColor: any,isSelectorLegend?: any,horizontal?: any) {
  
  function legend(g: any) {
    function drawLegend() {
      g.append("symbol").attr("viewBox",`0 0 24 24`).attr("id","PenIcon")
        .append("path").attr("d","M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z")
        
      // Code to fill the color
      // Styling for color selector legend
      g.selectAll("g.legendCells")
      
        .data(itemColor)
        .enter()
        .append("g")
        .attr("id", "myCell")
        .append("rect")
        .attr("id", "myRect")
        .append("title")
        .text(function (d: Record<string, unknown>) {
          return d["name"];
        })
        .attr("class", "rectLabel")
        .style("cursor", "pointer")
        .style("pointer-events", "all");
      g.selectAll("rect")
      
        .attr("height", 1)
        .attr("width", 1)
        .style("fill", function (d: Record<string, unknown>) {
          return d["color"];
        }).append("text");
      g.selectAll("g").append("use").attr("id", "myUse").attr("xlink:href", "#PenIcon").attr("height", 1).attr("width", 1);

      if (horizontal && !isSelectorLegend) {
        g.selectAll("rect")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
          g.selectAll("image")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
      } else if (!horizontal && !isSelectorLegend) {
        g.selectAll("rect")
          .attr("y", function (_d: number, i: number) {
            return i;
          })
          .attr("x", 0);
        g.selectAll("use")
          .attr("y", function (_d: number, i: number) {
            return i;
          })
          .attr("x", 2);
      } else if (horizontal === true && isSelectorLegend) {
        g.selectAll("rect")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
          g.selectAll("image")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
      } else if (horizontal === false && isSelectorLegend) {
        g.selectAll("rect")
          .attr("y", function (_d: number, i: number) {
            return i;
          })
          .attr("x", 0);
          g.selectAll("image")
          .attr("y", function (_d: number, i: number) {
            return i;
          })
          .attr("x", 0);
      } else {
        g.selectAll("rect")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
          g.selectAll("image")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
      }
    }
    // const testData = React.useCallback(() => {
    //   console.log("comes")
    // }, []);
 

    drawLegend();

    
  }
  const useElement = document.getElementById('myRect');
  if (useElement) {
    useElement.addEventListener("onClick", handleClick);
    //console.log("useElement", useElement)
  }

 

  function handleClick(event: any) {
    console.log("event", event.type)
  }
  return legend;
}
