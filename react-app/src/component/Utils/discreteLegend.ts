import * as d3 from "d3";

declare type ItemColor = {	
    color: string;	
}

// eslint-disable-next-line
export default function discreteLegendUtil(itemColor: ItemColor[]): any {
    let legendValues: ItemColor[] = [];
    const cellWidth = 22;
    const cellHeight: any = 22;
    const cellPadding = 4;

    // eslint-disable-next-line
    function legend(g: any) {
        function drawLegend() {
            itemColor.forEach((item, index) => {
                legendValues[index].color = item.color;
            });
            // Code to fill the color
            g.selectAll("g.legendCells")
                .append("rect")
                .attr("height", cellHeight)
                .attr("width", cellWidth)
                .style("stroke", "black")
                .style("stroke-width", "1px")
                .style("fill", function (d: Record<string, unknown>) {
                    return d["color"];
                });
            // Display the label
            g.selectAll("g.legendCells")
                .append("text")
                .attr("class", "breakLabels")
                .style("fill", "#6F6F6F")
                .attr("x", cellWidth + cellPadding)
                .attr("y", 5 + cellHeight / 2)
                .text(function (d: Record<string, unknown>) {
                    return d["label"];
                });
            // Alighment of cell in straight line
            g.selectAll("g.legendCells").attr(
                "transform",
                function (_d: Record<string, unknown>, i: number) {
                    return (
                        "translate(0," + i * (cellHeight + cellPadding) + ")"
                    );
                }
            );
        }
        // display the discrete legend
        g.selectAll("g.legendCells")
            .data(legendValues)
            .enter()
            .append("g")
            .attr("class", "legendCells");
        drawLegend();
    }
    // eslint-disable-next-line
    legend.inputScale = function (newScale: any) {
        // eslint-disable-next-line
        let scale: any = {};
        scale = newScale;
        legendValues = [];
        scale.domain().forEach(function (el: string) {
            const cellObject = { color: scale(el), label: el };
            legendValues.push(cellObject);
        });
        return this;
    };
    return legend;
}

export function d3DiscreteLegendUtil(itemColor?: any) {
    let legendValues = [{ color: "black" }];
    var cellWidth = 30;
    var cellHeight: any = 20;
    var labelFormat = d3.format(".01f");
    var cellPadding = 0;

    function legend(g: any) {
        function redraw() {
            itemColor.forEach((item: any, index: number) => {
                legendValues[index].color = item.color;
            });
            g.selectAll("g.legendCells")
                .select("rect")
                .style("fill", function (d: Record<string, unknown>) {
                    return d["color"];
                });
            g.selectAll("g.legendCells").attr("transform", function(d: any,i: any) {return "translate(" + (i * cellWidth) + ",0)" });
            g.selectAll("text.breakLabels")
                .style("text-anchor", "middle")
                .attr("x", 0).attr("y", -7)
                .style("display", function(i: any) {return i == 0 ? "none" : "block"})
                .text(function(d: any) {return labelFormat(d["label"])});
        }
        // display the discrete legend
        g.selectAll("g.legendCells")
            .data(legendValues)
            .enter()
            .append("g")
            .attr("class", "legendCells")
            .attr("transform", function(i: any) {return "translate(" + (i * (cellWidth + cellPadding)) + ",0)" })
        // fill the color
        g.selectAll("g.legendCells")
            .append("rect")
            .attr("height", cellHeight)
            .attr("width", cellWidth)
            .style("fill", function (d: Record<string, unknown>) {
                return d["color"];
            });
        // shows the label
        g.selectAll("g.legendCells")
            .append("text")
            .attr("class", "breakLabels");
        redraw();
    }
    legend.inputScale = function (newScale: string[]) {
        let scale: any = {};
        if (!arguments.length) return scale;
        scale = newScale;
        legendValues = [];
        scale.domain().forEach(function (el: string) {
            const cellObject = { color: scale(el), label: el };
            legendValues.push(cellObject);
        });
        return this;
    };
    legend.cellWidth = function(newCellSize: any) {
        if (!arguments.length) return cellWidth;
            cellWidth = newCellSize;
            return this;
    }

    legend.cellHeight = function(newCellSize: any) {
        if (!arguments.length) return cellHeight;
            cellHeight = newCellSize;
            return this;
    }
    return legend;
}
