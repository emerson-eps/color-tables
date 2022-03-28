declare type ItemColor = {  
    color: any; 
}

// eslint-disable-next-line
export default function discreteLegendUtil(itemColor: ItemColor[], isSelectorLegend?: boolean): any {
    var cellWidth = 22;
    var cellHeight = 22;
    const cellPadding = 2;

    if (isSelectorLegend) {
        cellWidth = 25;
        cellHeight = 22;
    }

    //let legendValues: ItemColor[] = [];

    // eslint-disable-next-line
    function legend(g: any) {
        function drawLegend() {
            // Code to fill the color
            // Styling for color selector legend
            if (isSelectorLegend) {
                g.selectAll("g.legendCells")
                    .data(itemColor)
                    .enter()
                    .append("g")
                    .append("rect");
                g.selectAll("rect")
                    .attr("x", function (d: number, i: any) {
                        console.log(d)
                        return i;
                    })
                    .attr("y", 0)
                    .attr("height", 1)
                    .attr("width", 1)
                    .style("fill", function (d: Record<string, unknown>) {
                        return d["color"];
                    })
                // Display the labels for legend
                g.selectAll("g")
                    .style("background", "grey")
                    .append("text")
                    .attr("class", "breakLabels")
                    .style("font-size", "0.4")
                    //.attr("x", cellWidth + cellPadding)
                    //.attr("y", 5 + cellHeight / 2)
                    .attr("x", function (d: any, i: any) {
                        console.log(d)
                        return i + "." + 25
                    })
                    .attr("y", 1.5)
                    .text(function (d: any, i: any) {
                        console.log(d)
                        return i;
                    })
            }
            // styling for main legend
            else {
                g.selectAll("g.legendCells")
                    .append("rect")
                    .attr("height", cellHeight)
                    .attr("width", cellWidth)
                    .style("fill", function (d: Record<string, unknown>) {
                        return d["color"];
                    });
                // Alighment of cell in straight line
                g.selectAll("g.legendCells").attr(
                    "transform",
                    function (_d: Record<string, unknown>, i: number) {
                        return (
                           "translate(0," + i * (cellHeight + cellPadding) + ")"
                           //"translate(0," + i + ")"
                        );
                    }
                );
            }
        }

        // display the discrete legend
        if (!isSelectorLegend) {
            g.selectAll("g.legendCells")
            .data(itemColor)
            .enter()
            .append("g")
            .attr("class", "legendCells")
        }
       
        drawLegend();
    }
    // eslint-disable-next-line
    // legend.inputScale = function (newScale: any) {
    //     // eslint-disable-next-line
    //     let scale: any = {};
    //     scale = newScale;
        
    //     scale.domain().forEach(function (el: any) {
    //         const cellObject = { color: scale(el), label: el };
    //         legendValues.push(cellObject);
    //     });
    //     return this;
    // };

    return legend;
}
