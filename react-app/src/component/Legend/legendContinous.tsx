import * as React from "react";
import { RGBToHex } from "../Utils/continousLegend";
import {colorScalesCont} from "../Utils/d3ColorScale"
import * as d3 from "d3";
// import {
//     select,
//     scaleLinear,
//     range,
//     axisRight,
//     rgb,
//     scaleSequential,
// } from "d3";
import { interpolatorContinuous } from "../Utils/d3ColorSet";

interface legendProps {
    position: number[];
    colorArray: any;
    test?: any;
    useContColorTable: boolean;
    legendColor?: string;
    legendColorName: string;
}

interface ItemColor {
    color: string;
    offset: number;
}

export const LegendContinous: React.FC<legendProps> = ({
    position,
    colorArray,
    test,
    useContColorTable,
    legendColor,
    legendColorName
}: legendProps) => {
    React.useEffect(() => {
        if (useContColorTable == true) {
            colortableLegend(".legend")
        } else if (useContColorTable == false) {
            d3Legend(".legend1",d3.scaleSequential(legendColor).domain([0,1]));
        }
    }, [useContColorTable]); 

    function colortableLegend(selected_id: string) {
        const itemColor: ItemColor[] = [];
        colorArray.color.forEach((value: [number, number, number, number]) => {
            // return the color and offset needed to draw the legend
            itemColor.push({
                offset: RGBToHex(value).offset,
                color: RGBToHex(value).color,
            });
        });

        // // create an array of steps based on the color scale
        // var data1 = d3.range(10).map(d=> ({color:d3.interpolateSpectral(d/10), value:d}))
        // // get the array's min and max value
        // var extent = d3.extent(data1, d => d.value); 

        var data = d3.schemeCategory10.map((d,i) => ({color:d, value:i}))


        // append a defs (for definition) element to your SVG
        const svgLegend = d3.select(selected_id)
            .append("svg")
            .style("height", "50px")
            .style("display", "flex")

        const defs = svgLegend.append("defs");
        let test2 = "linear-gradient-" +test;
        // append a linearGradient element to the defs and give it a unique id
        const linearGradient = defs
            .append("linearGradient")
            .attr("id", test2)
            .attr("x1", "0%")
            .attr("x2", "100%") //since it's a horizontal linear gradient
            .attr("y1", "0%")
            .attr("y2", "0%");
        // append multiple color stops by using D3's data/enter step

        linearGradient.selectAll("stop")
    .data(data)
    .enter().append("stop")
    .attr("offset", function (d) {
        return d.value/9 * 100 + "%";
    })
    .attr("stop-color", function (d) {
        return d.color;
    });
    //.attr("offset", d => d.value/9 * 100) + "%") // index/length
    //.attr("stop-color", d => d.color);

        // linearGradient
        //     .selectAll("stop")
        //     .data(itemColor)
        //     .enter()
        //     .append("stop")
        //     .attr("offset", function (data) {
        //         return data.offset + "%";
        //     })
        //     .attr("stop-color", function (data) {
        //         return data.color;
        //     });

        // linearGradient.selectAll("stop")
        //     .data(data1)
        //     .enter().append("stop")
        //     .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
        //     .attr("stop-color", d => d.color);

        // append title
        svgLegend
            .append("text")
            .attr("class", "legendTitle")
            .attr("x", 0)
            .attr("y", 43)
            .style("text-anchor", "left")
            .text(colorArray.name);

        // draw the rectangle and fill with gradient
        svgLegend
            .append("rect")
            .attr("x", 180)
            .attr("y", 30)
            .attr("width", 150)
            .attr("height", 25)
            .style("fill", "url(#"+test2+")");
    }

    function d3Legend(
        selected_id: string,
        colorscale: d3.ScaleSequential<string, never>
    ) {
       // console.log('----------------')
        const legendheight = 130,
            legendwidth = 80,
            margin = { top: 15, right: 60, bottom: 15, left: 2 };

        const canvas = d3.select(selected_id)
            .style("width", 105 + "px")
            .style("transform", "translate(237px, 0px)")
            .append("canvas")
            .style("transform", "rotate(270deg)")
            .attr("height", legendheight + 5 - margin.top - margin.bottom)
            .attr("width", 1)
            .style("height",legendheight + 5 - margin.top - margin.bottom + "px")
            .style("width",legendwidth + 13 - margin.left - margin.right + "px")
            .style("border", "1px solid")
            .node();

        if (canvas) {
            const context = canvas.getContext("2d");
            const legendscale = d3.scaleLinear()
                .range([legendheight - margin.top - margin.bottom, 0])
                .domain(colorscale.domain());

            if (context) {
                const image = context.createImageData(1, legendheight);
                d3.range(legendheight).forEach(function (i) {
                    const c = d3.rgb(colorscale(legendscale.invert(i)));
                    image.data[4 * i] = c.r;
                    image.data[4 * i + 1] = c.g;
                    image.data[4 * i + 2] = c.b;
                    image.data[4 * i + 3] = 255;
                });
                context.putImageData(image, 0, 0);
            }

            // const legendaxis = axisRight(legendscale)
            //     .scale(legendscale)
            //     .tickValues(legendscale.domain());
            const svg = d3.select(selected_id)
                .append("svg")
                .attr("height", legendheight - 3 + "px")
                .attr("width", legendwidth - 20 + "px")
                .style("transform", "rotate(270deg)")
                svg.append("g")
                .attr("class", "axis")
                .style("font-size", "14px")
                .style("font-weight", "700")
                // .attr(
                //     "transform",
                //     "translate(" +
                //         (180 - margin.left - margin.right - 25) +
                //         "," +
                //         (margin.top + 7) +
                //         ")"
                // )
                //.call(legendaxis)
                .selectAll("text")
                .style("fill", "#6F6F6F");

                svg
                .append("text")
                .attr("class", "legendTitle")
                .attr("x", 10)
                .attr("y", 13)
                .style("text-anchor", "left")
                .text(legendColorName);

            //setLegendLoaded(true);
        }
    }

    return (
        <div
            style={{
                // position: "absolute",
                right: position[0],
                top: position[1],
            }}
        >
            {useContColorTable ?

<div className="legend"></div> :

<div className="legend1"></div>

}
        </div>
    );
};

// export default legendContinous;
