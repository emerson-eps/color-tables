import * as React from "react";
import { useRef } from "react";
import discreteLegendUtil from "../Utils/discreteLegend";
import { select, scaleOrdinal } from "d3";
import { colorsArray } from "../Utils/legendCommonFunction";
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
  colorName: string;
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
  useCodeMaping?: boolean;
};

export const DiscreteColorLegend: React.FC<discreteLegendProps> = ({
  discreteData,
  dataObjectName,
  colorName = "GasOilWater",
  horizontal,
  getColorScaleData,
  id,
  colorTables = defaultColorTables as colorTablesArray,
  legendFontSize,
  tickFontSize,
  numberOfTicks,
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

        // Main single discrete legend
        if (
          (!getColorScaleData || getColorScaleData.length === 0) &&
          discreteData
        ) {
          const entries = Object.entries(discreteData);
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
          const entries = Object.entries(discreteData);
          
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
                  color: RGBToHex(matchedColorsArrays),
                  name: key,
                });
              itemName.push(key);
            }
          });  
          // arrayOfColors.forEach((key: any) => {
          //   itemColor.push({ color: RGBToHex(key) });
          // });
        }

        //const ordinalValues = scaleOrdinal().domain(itemName);
        const colorLegend = DiscreteLegendUtil(
          itemColor,
          useSelectorLegend,
          horizontal,
          useCodeMaping
        )
        //.inputScale(ordinalValues);
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
            horizontal ? `0 0 ${totalRect} 1.5` : `0 0 5 ${totalRect}`
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
              : "180px"
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
        //backgroundColor: "#ffffffcc",
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

export function DiscreteLegendUtil (itemColor: any,isSelectorLegend?: any,horizontal?: any, useCodeMaping?: any) {
  //const [isEditable, setIsEditable] = React.useState(false);
  let isEditable = false;
  function legend(g: any) {
    function drawLegend(this: any) {
      

      // Code to fill the color
      // Styling for color selector legend
      g.selectAll("g.legendCells")
        .data(itemColor)
        .enter()
        .append("g")
        
        .attr("class", useCodeMaping ? "myCell" : "")
        .style("pointer-events", "auto")
        .append("rect")
        .attr("class", useCodeMaping ? "myRect" : "")
        .attr("class", "rectLabel")
        .style("cursor", "pointer")
        .style("pointer-events", "auto");
        g.selectAll("rect")
        .attr("height", 1)
        .attr("width", 1)
        .style("fill", function (d: Record<string, unknown>) {
          return d["color"];
        });
        g.selectAll("g")
          .append("text")
          .attr("id", "editable")
          //.on("click", handleClick)
          .attr("contentEditable", true)
          .text(function (d: Record<string, unknown>) {
            return d["name"];
          })
          .on("keyup", function(d: any) { d.text = "test"; });
        // .on("click", handleClick(event, this))
        // .attr("height", 0.5)
        // .attr("width", 1);

      if (useCodeMaping) {
        g.selectAll("g")
        .append("use")
        .attr("id", "myUse")
        .attr("xlink:href", "#PenIcon")
        .on("click", handleClick)
        .attr("height", 0.5)
        .attr("width", 1)
        // .append("foreignObject")
        // .attr("width", 0.5)
        // .attr("height", 1)
        // .append("input")
        // .attr("type", "text")
        // .attr("id", "myInput");
      }
      if (useCodeMaping) {
        g.select("svg g:first-child")
        .append("foreignObject")
        // .attr("x", "3")
        // .attr("y", "0")
        .attr("width", 3)
        .attr("height", 1)
        .style("background", "lightgrey")
        .append("input")
        
        .attr("type", "text")
        .attr("name", "Test")
        .attr("value", "Sample")
        // .attr("focusable", true)
        .attr("autofocus", true)
        .style("font-size", "10px")
        .style("cursor", "help")
        .attr("class", "myInput")
        // .append("input")
        // .attr("id", "myInput")
        // .style("cursor", "pointer")
        // .attr("type", "text")
        // .attr("value", "Sample")
        // .attr("placeholder", "Enter")
        // .attr("x", "3")
        // .attr("y", "0")
        // .attr("width", 2)
        // .attr("height", 1)
      }
      

      if (horizontal && !isSelectorLegend) {
        g.selectAll("rect")
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
        
        if (useCodeMaping) {
          g.selectAll("text")
          .attr("y", function (_d: number, i: number) {
            return i + 0.5;
          })
          .attr("x", 1.25);
          g.selectAll("use")
          .attr("y", function (_d: number, i: number) {
            return i + 0.3;
          })
          .attr("x", 2);
          g.selectAll("foreignObject")
          .attr("y", function (_d: number, i: number) {
            return i;
          })
          .attr("x", 3);
          //if (isEditable) {
     
        }
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
      g.append("symbol").attr("viewBox",`0 0 24 24`).attr("id","PenIcon")
      .append("path").attr("d","M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z")
    }

    drawLegend();
  }

  function handleClick(evt: any) {
    // Array.from(document.querySelector('.myCell').querySelectorAll('text')).forEach(el => {
    //   el.addEventListener('click', function(evt) {
    //     console.log("text", evt.target)
    //   });
    // });
    var orginaltext = evt.target.textContent
    const test = document.querySelector('.myInput');
    //test.focus();
    console.log("test", test)
    // evt.stopImmediatePropagation();
    // const rect_text = evt.target.getBoundingClientRect();
    // const svgCell = document.getElementsByClassName("myCell")
    // const input = document.createElement("input");
    // console.log("svgCell", svgCell)

    // input.value = orginaltext;
    // input.onkeyup = function(e) {
    //   if (["Enter", "Escape"].includes(e.key)) {
    //     blur();
    //     return;
    //   }
    //   orginaltext = "test";
    // };
    // input.onblur = function(e) {
    //   input.remove();
    // };
    // input.style.left = rect_text.left + 'px';
    // input.style.top = rect_text.top + 'px';
    // input.style.width = 2 + 'ch';
    // input.style.height = rect_text.height + 'px';
    // document.querySelector('.myCell').append(input);
    //console.log("target", evt.target.innerHTML)
    // input.focus();
    //svgCell.append(input);
    // svgtext.target.__data__.name = "shruthi"
    // var text = document.getElementById("myRect");
    // var input = document.createElement("input");
    // input.type = "text";
    // input.value = text.textContent;
    // input.addEventListener("blur", function() {
    //   text.textContent = input.value;
    //   input.parentNode.replaceChild(text, input);
    // });
    // text.parentNode.replaceChild(input, text);
    // input.focus();
  }
  return legend;
}
