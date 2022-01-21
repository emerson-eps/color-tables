import * as React from "react";
import * as d3 from "d3"
import {
    select,
    scaleLinear,
    range,
    axisRight,
    rgb,
    ScaleSequential,
} from "d3";
import { interpolatorContinuous } from "../Utils/d3ColorSet";

interface legendProps {
    colors: any;
    colorTableColors: any
    // min: number;
    // max: number;
    // // logName: string;
    // // logType: string;
    // position: number[];
}

const ContinuousLegendtt: React.FC<legendProps> = ({
    // min,
    // max,
    // // logName,
    // // logType,
    // position,
    colors,
    colorTableColors
}: legendProps) => {
    const [legendLoaded, setLegendLoaded] = React.useState(false);
    React.useEffect(() => {
        continuousLegend("#legend",d3.scaleSequential(colors).domain());
    }, [0, 1]);

    function continuousLegend(
        selected_id: string,
        colorscale: ScaleSequential<string, never>
    ) {
        const legendheight = 130,
            legendwidth = 80,
            margin = { top: 15, right: 60, bottom: 15, left: 2 };

        const canvas = select(selected_id)
            .style("width", 150 + "px")
            .append("canvas")
            .attr("height", legendheight + 5 - margin.top - margin.bottom)
            .attr("width", 1)
            .style(
                "height",
                legendheight + 5 - margin.top - margin.bottom + "px"
            )
            .style(
                "width",
                legendwidth + 13 - margin.left - margin.right + "px"
            )
            .style("border", "1px solid")
            .node();

        if (canvas) {
            const context = canvas.getContext("2d");
            const legendscale = scaleLinear()
                .range([legendheight - margin.top - margin.bottom, 0])
                .domain(colorscale.domain());

            if (context) {
                const image = context.createImageData(1, legendheight);
                range(legendheight).forEach(function (i) {
                    const c = rgb(colorscale(legendscale.invert(i)));
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
            const svg = select(selected_id)
                .append("svg")
                .attr("height", legendheight - 3 + "px")
                .attr("width", legendwidth - 20 + "px");

            svg.append("g")
                .attr("class", "axis")
                .style("font-size", "14px")
                .style("font-weight", "700")
                .attr(
                    "transform",
                    "translate(" +
                        (180 - margin.left - margin.right - 25) +
                        "," +
                        (margin.top + 7) +
                        ")"
                )
                //.call(legendaxis)
                .selectAll("text")
                .style("fill", "#6F6F6F");

            setLegendLoaded(true);
        }
    }

    return (
        <div
            style={{
                //position: "absolute",
                // right: position[0],
                // top: position[1],
            }}
        >
            {legendLoaded && (
                <label style={{ color: "#6F6F6F" }}>
                    {/* {logName}/{logType} */}
                </label>
            )}
            <div id="legend"></div>
        </div>
    );
};

export default ContinuousLegendtt;