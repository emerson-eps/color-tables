declare type ItemColor = {
  color: any;
};

// eslint-disable-next-line
export default function discreteLegendUtil(
  itemColor: ItemColor[],
  isSelectorLegend?: boolean,
  horizontal?: boolean,
  discreteCodeMaping?: boolean
): any {
  // eslint-disable-next-line
  function legend(g: any) {
    function drawLegend() {
      if (!discreteCodeMaping) {
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
      } else {
        g.selectAll("div")
          .remove()
          .data(itemColor)
          .enter()
          // main div
          .append("div")
          .attr("class", "row")
          .style("min-height", "30px")
          .style("width", "100%")
          // rect box
          .append("span")
          .style("width", "20px")
          .style("height", "20px")
          .style("margin-right", "10px")
          .style("display", "inline-block")
          .style("position", "relative")
          .style("top", "6px")
          .style("background", (d: any) => d["color"]);
        // label
        g.selectAll("div.row")
          .append("span")
          .style("width", "20px")
          .style("height", "20px")
          .style("margin-right", "10px")
          .style("display", "inline-block")
          .text((d: any) => d["name"])
          .attr("id", `label-${(d: any) => d["name"]}`);
        // input field
        g.selectAll("div.row").append("input").style("display", "none");
        // edit icon
        g.selectAll("div.row")
          // .append("title", "Click to edit")
          .append("text")
          .style("cursor", "pointer")
          .style("transform", "rotate(90deg) !important")
          .attr("font-family", "FontAwesome")
          .text(() => "\u270D")
          .style("position", "relative")
          .style("top", "-3px")
          .attr("font-size", "12px")
          .style("width", "20px")
          .style("height", "20px")
          .style("margin-right", "10px")
          .style("display", "inline-block")
          .on("click", startEditing);
        // done button
        g.selectAll("div.row")
          .append("text")
          .attr("font-family", "FontAwesome")
          .text(() => "\u2714")
          .style("width", "20px")
          .style("height", "20px")
          .style("display", "none")
          .style("cursor", "pointer")
          .on("click", finishEditing);
      }
    }

    drawLegend();
  }

  function startEditing(e: any) {
    const labelSpan = e.target.parentElement.children[1];
    const input = e.target.parentElement.children[2];
    const button = e.target.parentElement.children[4];
    const oldLabel = labelSpan.innerHTML;
    labelSpan.style.display = "none";
    button.style.display = "inline";
    input.style.display = "inline";
    input.value = oldLabel;
  }

  function finishEditing(e: any) {
    const labelSpan = e.target.parentElement.children[1];
    const input = e.target.parentElement.children[2];
    const button = e.target.parentElement.children[4];
    labelSpan.innerHTML = input.value;
    labelSpan.style.display = "inline";
    input.style.display = "none";
    button.style.display = "none";
  }

  return legend;
}
