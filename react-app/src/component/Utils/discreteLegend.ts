export type NamedColor = {
  color: string;
  name?: string;
};

/**
 * @deprecated use NamedColor instead.
 */
export type ItemColor = NamedColor;

export default function discreteLegendUtil(
  itemColor: NamedColor[],
  isSelectorLegend?: boolean,
  horizontal?: boolean
): any {
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
      if (
        (horizontal && !isSelectorLegend) ||
        (horizontal === true && isSelectorLegend)
      ) {
        g.selectAll("rect")
          .attr("x", function (_d: number, i: number) {
            return i;
          })
          .attr("y", 0);
      } else if (
        (!horizontal && !isSelectorLegend) ||
        (horizontal === false && isSelectorLegend)
      ) {
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
  return legend;
}
