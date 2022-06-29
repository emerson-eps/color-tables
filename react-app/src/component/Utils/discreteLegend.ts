declare type ItemColor = {
  color: any;
};

// eslint-disable-next-line
export default function discreteLegendUtil(
  itemColor: ItemColor[],
  isSelectorLegend?: boolean,
  horizontal?: any
): any {
  const legendValues: ItemColor[] = [];

  // eslint-disable-next-line
  function legend(g: any) {
    function drawLegend() {
      // Code to fill the color
      // Styling for color selector legend
      g.selectAll("g.legendCells")
        .data(itemColor)
        .enter()
        .append("g")
        .append("rect")
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
        });
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
      } else if (horizontal === true && isSelectorLegend) {
        g.selectAll("rect")
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
      } else {
        g.selectAll("rect")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
      }
    }

    drawLegend();
  }
  // eslint-disable-next-line
  legend.inputScale = function (newScale: any) {
    // eslint-disable-next-line
    let scale: any = {};
    scale = newScale;

    scale.domain().forEach(function (el: any) {
      const cellObject = { color: scale(el), label: el };
      legendValues.push(cellObject);
    });
    return this;
  };

  return legend;
}
