import * as React from "react";
import { RGBToHex } from "../Utils/continousLegend";
import { select } from "d3";
import {colorScalesCont} from "../Utils/d3ColorScale"
import * as d3 from "d3";

interface legendProps {
    position: number[];
    colorArray: any;
    test: any;
    colorTableColors: boolean
}

interface ItemColor {
    color: string;
    offset: number;
}

const ContinuousLegends: React.FC<legendProps> = ({
    position,
    colorArray,
    test,
    colorTableColors,
}: legendProps) => {
    React.useEffect(() => {
        continuousLegend(".legend");
        //continuousLegend1(".legend");
    }, [colorArray]);

    console.log('colorArray', colorArray)

    function continuousLegend(selected_id: string) {
        const itemColor: ItemColor[] = [];
        colorArray.color.forEach((value: [number, number, number, number]) => {
            // return the color and offset needed to draw the legend
            itemColor.push({
                offset: RGBToHex(value).offset,
                color: RGBToHex(value).color,
            });
        });

        // append a defs (for definition) element to your SVG
        const svgLegend = select(selected_id)
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

    function continuousLegend1(selected_id: string) {
        console.log('colorScalesCont--', colorScalesCont.Blues(0))
    }

    return (
        <div
            style={{
                // position: "absolute",
                right: position[0],
                top: position[1],
            }}
        ><div className="legend"></div>
        </div>
    );
};

export default ContinuousLegends;
