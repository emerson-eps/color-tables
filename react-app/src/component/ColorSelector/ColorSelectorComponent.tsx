import * as React from "react";
import { useRef } from "react";
import { RGBToHex } from "../Utils/legendCommonFunction";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { select, range } from "d3";
import * as d3 from "d3";
import discreteLegendUtil from "../Utils/discreteLegend";
import { color } from "d3-color";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    legend: {
      paddingLeft: "5px",
      "&:hover": {
        background: "#f1f1f1",
        cursor: "pointer",
      },
    },
    selected: {
      background: "#c1c1c1 !important",
    },
  })
);

declare type legendProps = {
  colorsObject?: any;
  legendColor?: any;
  legendColorName?: string | undefined;
  useContColorTable?: boolean;
  useDiscColorTable?: boolean;
  uniqueId?: number;
  colorScaleData: any;
  currentLegendName?: string;
};

declare type ItemColor = {
  color: string;
  offset?: number;
};

export const ColorSelectorComponent: React.FC<legendProps> = ({
  /**
   * Returns the object with name and array of colors for colortable colorscale
   *
   * Returns the array of colors for d3 colorscale
   */
  colorsObject,
  /**
   * Returns the function for d3 colorscale(continuous)
   */
  legendColor,
  /**
   * Name of the color(ex: Rainbow)
   */
  legendColorName,
  /**
   * Used to distinguish between discrete and continuous legend
   *
   * Also used to distinguish between discrete and continuous colors
   */
  useContColorTable,
  /**
   * Used to distinguish between discrete and continuous legend
   *
   * Also used to distinguish between discrete and continuous colors
   */
  useDiscColorTable,
  /**
   * Unique id is Used to show multiple legends
   */
  uniqueId,
  /**
   * Returns the function
   */
  colorScaleData,
  /**
   * The name of the current (selected) color legend
   */
  currentLegendName,
}: legendProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();
  // create an array of steps based on the color scale
  // returns an array of evenly-spaced numbers. Returns the integers from zero to the specified end minus one.
  // d3.range(start, stop, step)
  let data: any;
  var extent: any;
  if (legendColor) {
    data = range(10).map((d) => ({
      color: legendColor(d / 10),
      value: d,
    }));
    // get the array's min and max value
    extent = d3.extent(data, (d: any) => d?.value);
  }

  const handleChange = React.useCallback(() => {
    // continous legend with colortable colors
    if (
      colorsObject &&
      Object.keys(colorsObject).length > 0 &&
      useContColorTable
    ) {
      return colorScaleData ? colorScaleData(colorsObject, true) : null;
    }
    // continous legend with d3 colors
    else if (data && !useContColorTable) {
      const arrayData: any = [];
      data.forEach((colorsObject: any) => {
        arrayData.push([
          0 + "." + colorsObject.value,
          color(colorsObject.color)?.rgb().r,
          color(colorsObject.color)?.rgb().g,
          color(colorsObject.color)?.rgb().b,
        ]);
      });
      return colorScaleData
        ? colorScaleData({ arrayData, legendColorName }, true)
        : null;
    }
    // discrete legend with colortable colors
    else if (
      colorsObject &&
      Object.keys(colorsObject).length > 0 &&
      useDiscColorTable
    ) {
      return colorScaleData ? colorScaleData(colorsObject, false) : null;
    }
    // discrete legend with d3 colors
    else {
      return colorScaleData
        ? colorScaleData({ colorsObject, legendColorName }, false)
        : null;
    }
  }, [
    colorScaleData,
    colorsObject,
    data,
    legendColorName,
    useContColorTable,
    useDiscColorTable,
  ]);

  React.useEffect(
    () => {
      // continuous legend using color table colors
      if (useContColorTable === true && divRef.current) {
        contColortableLegend();
      }
      // discrete legend using color table colors
      if (useDiscColorTable === true && divRef.current) {
        discColorTableLegend();
      }
      // discrete legend using d3 colors
      if (useDiscColorTable === false && divRef.current) {
        discD3legend();
      }
      // continuous legend using d3 colors
      else if (useContColorTable === false && divRef.current) {
        contD3Legend();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [useContColorTable, useDiscColorTable]
  );

  // continuous legend using color table colors (using linear gradiend)
  function contColortableLegend() {
    const itemColor: ItemColor[] = [];

    colorsObject.color.forEach((value: [number, number, number, number]) => {
      // return the color and offset needed to draw the legend
      itemColor.push({
        offset: RGBToHex(value).offset,
        color: RGBToHex(value).color,
      });
    });

    // append a defs (for definition) element to your SVG
    const svgLegend = select(divRef.current)
      .append("svg")

      .style("cursor", "pointer")
      .style("height", "30px")
      .style("width", 220);
    const defs = svgLegend.append("defs");
    const currentIndex = "linear-gradient-" + uniqueId + "0";
    // append a linearGradient element to the defs and give it a unique id
    const linearGradient = defs
      .append("linearGradient")
      .attr("id", currentIndex)
      .attr("x1", "0%")
      .attr("x2", "100%") //since it's a horizontal linear gradient
      .attr("y1", "0%")
      .attr("y2", "0%");
    // append multiple color stops by using D3's data/enter step

    linearGradient
      .selectAll("stop")
      .data(itemColor)
      .enter()
      .append("stop")
      .attr("offset", function (data) {
        return data.offset + "%";
      })
      .attr("stop-color", function (data) {
        return data.color;
      });

    // draw the rectangle and fill with gradient
    svgLegend
      .append("rect")
      .attr("x", 0)
      .attr("y", 5)
      .attr("width", "100")
      .attr("height", 15)
      .style("fill", "url(#" + currentIndex + ")");

    // append title
    svgLegend
      .append("text")
      .attr("id", "legendTitle")
      .attr("x", 106)
      .attr("y", 17.5)
      .style("font-size", "small")
      .style("font-weight", "700")
      .text(colorsObject.name);
  }

  // continuous legend using d3 colors (using linear gradiend)
  function contD3Legend() {
    const itemColor: any = [];

    d3ColorScales.forEach((value: any) => {
      // return the color and offset needed to draw the legend
      itemColor.push(value.colors);
    });

    // append a defs (for definition) element to your SVG
    const svgLegend = select(divRef.current)
      .append("svg")
      .style("cursor", "pointer")
      .style("height", "50px");

    const defs = svgLegend.append("defs");
    const currentIndex = "linear-gradient-" + uniqueId;
    // append a linearGradient element to the defs and give it a unique id
    const linearGradient = defs
      .append("linearGradient")
      .attr("id", currentIndex)
      .attr("x1", "0%")
      .attr("x2", "100%") //since it's a horizontal linear gradient
      .attr("y1", "0%")
      .attr("y2", "0%");

    // append multiple color stops by using D3's data/enter step
    linearGradient
      .selectAll("stop")
      .data(data)
      .enter()
      .append("stop")
      .attr(
        "offset",
        (d: any) =>
          ((d.value - extent[0]) / (extent[1] - extent[0])) * 100 + "%"
      )
      .attr("stop-color", (d: any) => d.color);

    // append title
    svgLegend
      .append("text")
      .attr("id", "legendTitle")
      .attr("x", 106)
      .attr("y", 17.5)
      .style("font-size", "small")
      .style("font-weight", "700")
      .text(legendColorName ? legendColorName : "");

    // draw the rectangle and fill with gradient
    svgLegend
      .append("rect")
      .attr("x", 0)
      .attr("y", 5)
      .attr("width", "100")
      .attr("height", 15)
      .style("fill", "url(#" + currentIndex + ")");
  }

  // discrete legend using color table colors
  function discColorTableLegend() {
    const itemColor: ItemColor[] = [];
    const itemName: any = [];

    colorsObject.color.forEach((element: any, key: any) => {
      itemColor.push({ color: RGBToHex(element) });
      itemName.push(key);
    });

    function RGBToHex(rgb: number[]) {
      let r = rgb[1].toString(16),
        g = rgb[2].toString(16),
        b = rgb[3].toString(16);
      if (r.length === 1) r = "0" + r;
      if (g.length === 1) g = "0" + g;
      if (b.length === 1) b = "0" + b;
      return "#" + r + g + b;
    }

    let count = itemName.length;
    const colorLegend = discreteLegendUtil(itemColor, true);
    const selectedLegend = select(divRef.current);

    selectedLegend
      .append("svg")
      .style("cursor", "pointer")
      .style("margin-top", "5px")
      .attr("viewBox", `0 0 ${count} 1`)
      .attr("preserveAspectRatio", "none")
      .style("width", "101px")
      .style("height", "15px")
      .call(colorLegend);

    // colorname as label for the legend (ex: facies)
    selectedLegend
      .append("label")
      .text(legendColorName ? legendColorName : "")
      // .attr("y", 7)
      .style("width", "15px")
      .style("margin-left", "10px")
      .style("white-space", "nowrap")
      .style("font-size", "small")
      .style("font-weight", "700")
      .append(":hover")
      .style("cursor", "pointer");
  }

  // discrete legend using d3 colors
  function discD3legend() {
    const itemName: any = [];
    const itemColor: any = [];
    colorsObject.forEach((element: any, key: any) => {
      itemColor.push({ color: element });
      itemName.push(key);
    });
    //const ordinalValues = scaleOrdinal(colorsObject).domain(itemName);
    const count = itemName.length;
    const discreteLegend = discreteLegendUtil(itemColor, true);
    select("svg")
      .append("g")
      .attr("transform", "translate(50,70)")
      .attr("class", "legend")
      .call(discreteLegend);
    const selectedLegend = select(divRef.current);
    selectedLegend
      .append("svg")
      .style("cursor", "pointer")
      .style("margin-top", "5px")
      .style("background", "grey")
      .attr("viewBox", `0 0 ${count} 1`)
      .attr("preserveAspectRatio", "none")

      .style("width", "101px")
      .style("height", "15px")
      .call(discreteLegend);
    selectedLegend
      .append("text")
      .text(legendColorName ? legendColorName : "")
      .style("width", "15px")
      .style("margin-left", "10px")
      .style("font-size", "small")
      .style("font-weight", "700");
  }

  return (
    <div
      className={`${
        currentLegendName === legendColorName
          ? `${classes.selected} ${classes.legend}`
          : classes.legend
      }`}
    >
      <div
        id="legend"
        style={{ height: 30 }}
        ref={divRef}
        onClick={handleChange}
      ></div>
    </div>
  );
};
