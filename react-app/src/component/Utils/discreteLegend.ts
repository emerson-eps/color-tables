declare type ItemColor = {  
    color: any; 
}

// eslint-disable-next-line
export default function discreteLegendUtil(itemColor: ItemColor[], colorSelectorLegend?: boolean): any {
    var cellWidth = 22;
    var cellHeight: any = 22;
    const cellPadding = 2;

    if (colorSelectorLegend) {
        cellWidth = 25;
        cellHeight = 22;
    }
    let legendValues: ItemColor[] = [];

    // eslint-disable-next-line
    function legend(g: any) {
        function drawLegend() {
            // Code to fill the color
            if (colorSelectorLegend) {
                g.selectAll("rect")
                    .attr("x", function (d: any, i: any) {
                        return i;
                    })
                    .attr("y", 0)
                    .style("fill", function (d: Record<string, unknown>) {
                        return d["color"];
                    })
                    .attr("height", 1)
                    .attr("width", 1)
            } else if (!colorSelectorLegend) {
                g.selectAll("g.legendCells")
                    .append("rect")
                    .attr("height", cellHeight)
                    .attr("width", cellWidth)
                    .style("fill", function (d: Record<string, unknown>) {
                        return d["color"];
                    });
            }
            // Display the labels for legend
            if (!colorSelectorLegend) {
                g.selectAll("g.legendCells")
                    .append("text")
                    .attr("class", "breakLabels")
                    .style("fill", "#6F6F6F")
                    .attr("x", cellWidth + cellPadding)
                    .attr("y", 5 + cellHeight / 2)
                    .text(function (d: Record<string, unknown>, i: any) {
                        return d["label"];
                    });
            }
            // Alighment of cell in straight line
            if (!colorSelectorLegend) {
                g.selectAll("g.legendCells").attr(
                    "transform",
                    function (_d: Record<string, unknown>, i: number) {
                        console.log(i)
                        return (
                           "translate(0," + i * (cellHeight + cellPadding) + ")"
                           //"translate(0," + i + ")"
                        );
                    }
                );
            }
        }

        // display the discrete legend
        if (colorSelectorLegend) {
            g.selectAll("g.legendCells")
            .data(itemColor)
            .enter()
            .append("rect")
        } else if (!colorSelectorLegend) {
            g.selectAll("g.legendCells")
            .data(itemColor)
            .enter()
            //.append("rect")
            .append("g")
            .attr("class", "legendCells")
        }
       
        drawLegend();
    }
    // eslint-disable-next-line
    legend.inputScale = function (newScale: any) {
        // eslint-disable-next-line
        let scale: any = {};
        scale = newScale;
        
        // scale.domain().forEach(function (el: any) {
        //     const cellObject = { color: scale(el), label: el };
        //     //legendValues.push(cellObject);
        // });
        return this;
    };

    return legend;
}
