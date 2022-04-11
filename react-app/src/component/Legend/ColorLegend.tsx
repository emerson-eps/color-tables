import * as React from "react";
import { DiscreteColorLegend } from "./DiscreteLegend";
import { ContinuousLegend } from "./ContinuousLegend";
import {useCallback} from "react"; 
import { ColorSelectorAccordion } from "../ColorSelector/ColorSelectorAccordion";

declare type ColorLegendProps = {
    colorTables: any;
    min: number;
    max: number;
    dataObjectName: string;
    position?: number[] | null;
    colorName: string;
    horizontal?: boolean | null;
    discreteData: { objects: Record<string, [number[], number]> };
    getColorMapname?: any;
}

// Todo: Adapt it for other layers too
export const ColorLegend: React.FC<ColorLegendProps> = ({
    position,
    horizontal,
    colorTables,
    min,
    max,
    dataObjectName,
    colorName,
    discreteData,
    getColorMapname
}: ColorLegendProps) => {

    const [isToggled, setIsToggled] = React.useState(false);
    const handleClick = useCallback(() => {
        setIsToggled(true);
    }, []);

    const [updateLegend, setUpdateLegendColor] = React.useState([] as any);
    const [isCont, setIsCont] = React.useState(true);

    // Get new colorscale from colorselector and update legend
    const colorScaleObject = React.useCallback((data: any, value: any) => {
        // update color map layer
        if (data.name && getColorMapname) {
            getColorMapname(data.name);
        }
        // d3 color name
        else if (getColorMapname) {
            getColorMapname(data.legendColorName);
        }
        setUpdateLegendColor(data);
        setIsCont(value);
    }, []);

    return (
        <div>
            <div onClick={handleClick}>
                {isCont && (
                    <ContinuousLegend
                        min={min}
                        max={max}
                        dataObjectName={dataObjectName}
                        position={position}
                        colorName={colorName}
                        colorTables={colorTables}
                        horizontal={horizontal}
                        updateLegend={updateLegend}
                    />
                )}
                {!isCont && (
                    <DiscreteColorLegend
                        discreteData={discreteData}
                        dataObjectName={dataObjectName}
                        position={position}
                        colorName={colorName}
                        colorTables={colorTables}
                        horizontal={horizontal}
                        updateLegend={updateLegend}
                    />
                )}
            </div>
            <div>
                {isToggled && (
                    <ColorSelectorAccordion colorScaleObject={colorScaleObject} isHorizontal={horizontal} />
                )}
            </div>
        </div>
            
    );
};