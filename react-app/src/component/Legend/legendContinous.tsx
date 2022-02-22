import * as React from "react";
import { useRef } from "react";
import { RGBToHex } from "../Utils/continousLegend";
import {colorScalesCont} from "../Utils/d3ColorScale"
import BasicPopover from "../Utils/popOver"
import * as d3 from "d3";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

interface legendProps {
    position: number[];
    colorArray: any;
    legendColor: any;
    legendColorName: string;
    useContColorTable: boolean;
    valueIndex: any;
}

interface ItemColor {
    color: string;
    offset: number;
}

export const LegendContinous: React.FC<legendProps> = ({
    position,
    colorArray,
    legendColor,
    legendColorName,
    useContColorTable,
    valueIndex,
}: legendProps) => {

    //popover
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // duplicate click
    const duplicateClick = (event: any) => {
        console.log('duplicate')
    };

    const divRef = useRef<HTMLDivElement>(null);

    function changeHandler() {
        console.log('click me')
    }

    React.useEffect(() => {
        // colortable colors
        if (useContColorTable == true && divRef.current) {
            colortableLegend()
            return function cleanup() {
                d3.select(divRef.current).select("svg").remove();
            };
        } 
        // d3 colors
        else if (useContColorTable == false && divRef.current) {
            d3colorLegend(colorScalesCont);
            return function cleanup() {
                d3.select(divRef.current).select("svg").remove();
            };
        }
    }, [useContColorTable]); 

    function colortableLegend() {
        const itemColor: ItemColor[] = [];
        colorArray.color.forEach((value: [number, number, number, number]) => {
            // return the color and offset needed to draw the legend
            itemColor.push({
                offset: RGBToHex(value).offset,
                color: RGBToHex(value).color,
            });
        });

        // append a defs (for definition) element to your SVG
        const svgLegend = d3.select(divRef.current)
            .append("svg")
            .style("height", "50px")
            .style("display", "flex")

        const defs = svgLegend.append("defs");
        let currentIndex = "linear-gradient-" + valueIndex;
        // append a linearGradient element to the defs and give it a unique id
        const linearGradient = defs
            .append("linearGradient")
            .attr("id", currentIndex)
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
            .style("fill", "url(#"+currentIndex+")");
    }

    // continuous legend using d3 color scale (linear gradiend code)
    function d3colorLegend(colorscale: any) {
        const itemColor: any = [];

        colorscale.forEach((value: any) => {
            // return the color and offset needed to draw the legend
            itemColor.push(value.colors);
        });

        // create an array of steps based on the color scale
        // returns an array of evenly-spaced numbers. Returns the integers from zero to the specified end minus one.
        // d3.range(start, stop, step)
        var data = d3.range(10).map(d=> ({color:legendColor(d/10), value:d}))
        // get the array's min and max value
        var extent: any = d3.extent(data, d => d.value); 

        // append a defs (for definition) element to your SVG
        const svgLegend = d3.select(divRef.current)
            .append("svg")
            .style("height", "50px")
            .style("display", "flex")

        const defs = svgLegend.append("defs");
        let currentIndex = "linear-gradient-" + valueIndex;
        // append a linearGradient element to the defs and give it a unique id
        const linearGradient = defs
            .append("linearGradient")
            .attr("id", currentIndex)
            .attr("x1", "0%")
            .attr("x2", "100%") //since it's a horizontal linear gradient
            .attr("y1", "0%")
            .attr("y2", "0%");

        // append multiple color stops by using D3's data/enter step
        linearGradient.selectAll("stop")
            .data(data)
            .enter().append("stop")
            .attr("offset", d => ((d.value - extent[0]) / (extent[1] - extent[0]) * 100) + "%")
            .attr("stop-color", d => d.color);

        // append title
        svgLegend
            .append("text")
            .attr("class", "legendTitle")
            .attr("x", 0)
            .attr("y", 43)
            .style("text-anchor", "left")
            .text(legendColorName);


        // draw the rectangle and fill with gradient
        svgLegend
            .append("rect")
            .attr("x", 180)
            .attr("y", 30)
            .attr("width", 150)
            .attr("height", 25)
            .style("fill", "url(#"+currentIndex+")");
    }

    return (
        <div
            style={{
                right: position[0],
                top: position[1],
            }}
        >
           
            {   useContColorTable ? 
                    <div>
                        <div className="mainDiv" ref={divRef}>
                            <div className="icon" 
                                style={{height: "0", float: "right", marginTop: "27px"}}>
                                    <MoreHorizIcon onClick={handleClick} />
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                        }}
                                    >
                                        <Typography sx={{ p: 1 }} onClick={duplicateClick} >Duplicate</Typography>
                                    </Popover>
                            </div>
                            <div className="colortableLegend"></div>
                        </div>
                    </div>
                    : 
                    <div className="mainDiv" ref={divRef}>
                        <div className="icon" 
                            style={{height: "0", float: "right", marginTop: "27px"}}>
                                <MoreHorizIcon onClick={() => changeHandler()} /></div>
                        <div className="d3colorLegend" style={{float: "left"}}></div>
                    </div>
            }
            {/* <div><BasicPopover/></div> */}
        </div>
    );
};