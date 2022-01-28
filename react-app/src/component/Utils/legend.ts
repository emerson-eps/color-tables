declare type ItemColor = {	
    color: string;	
}

// eslint-disable-next-line
export default function legendUtil(itemColor: ItemColor[]): any {
    //let legendValues = [];
    let legendValues: { color: string }[] = [];
    let cellWidth = 10;
    //const cellHeight = 22;
    let cellHeight = 10;
    let cellPadding = 0;

    // eslint-disable-next-line
    function legend(g: any) {
        function drawLegend() {
            itemColor.forEach((item, index) => {
               legendValues[index].color = item.color;
            });
            //legendValues.pop()
            // Code to fill the color
            
            // Display the label
            // g.selectAll("g.legendCells")
            //     .append("text")
            //     .attr("class", "breakLabels")
            //     .style("fill", "#6F6F6F")
            //     .attr("x", cellWidth + cellPadding)
            //     .attr("y", 5 + cellHeight / 2)
            //     .text(function (d: Record<string, unknown>) {
            //         return d["label"];
            //     });
            // Alighment of cell in straight line
            g.selectAll("g.legendCells").attr("transform", function(d: any,i: any) {return "translate(" + (i * cellWidth) + ",0)" });
            // g.selectAll("g.legendCells").attr(
            //     "transform",
            //     function (_d: Record<string, unknown>, i: number) {
            //         return (
            //             "translate(0," + i * (cellHeight + cellPadding) + ")"
            //         );
            //     }
            // );
        }
        // display the discrete legend
        g.selectAll("g.legendCells")
            .data(legendValues)
            .enter()
            .append("g")
            .attr("class", "legendCells")
            .attr("transform", function(d: any,i: any) {return "translate(" + (i * (cellWidth + cellPadding)) + ",0)" });

            g.selectAll("g.legendCells")
                .append("rect")
                .attr("height", cellHeight)
                .attr("width", cellWidth)
                .style("stroke", "black")
                .style("stroke-width", "1px")
                .style("fill", function (d: Record<string, unknown>) {
                    return d["color"];
                });
        drawLegend();
    }

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
