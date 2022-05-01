import * as React from "react";
import { DiscreteColorLegend } from "./DiscreteLegend";
import { ContinuousLegend } from "./ContinuousLegend";
import { useCallback } from "react"; 
import { ColorSelectorAccordion } from "../ColorSelector/ColorSelectorAccordion";
import { d3ColorScales } from "../Utils/d3ColorScale";

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
    isToggle: boolean;
}

// Todo: Adapt it for other layers too
export const ColorLegendComponent: React.FC<ColorLegendProps> = ({
    position,
    horizontal,
    colorTables,
    min,
    max,
    dataObjectName,
    colorName,
    discreteData,
    getColorMapname,
    isToggle
}: ColorLegendProps) => {

    const [isToggled, setIsToggled] = React.useState(false);

    const closeColorSelector = useCallback((prop: boolean) => {
        // console.log('isToggle', isToggle)
        isToggle == true ? setIsToggled(true) : setIsToggled(prop);
    }, []);

    const handleToggle = useCallback(() => {
        setIsToggled(true)
    //     console.log('isToggled', isToggled)
    //     if (isToggled === true) {
    //         setIsToggled(false)
    //     } else if (isToggled === false) {
    //         setIsToggled(true)
    //     }
    }, []);

    const [updateLegend, setUpdateLegendColor] = React.useState([] as any);

    const isColortableColors = colorTables.find(
        (value: any) => {
            return value?.name == colorName
        }
    );

    const isD3Colors = d3ColorScales.find(
        (value: any) => {
            return value?.name == colorName
        }
    );

    const [isCont, setIsCont] = React.useState(
        (isColortableColors || isD3Colors) && 
        (isColortableColors?.discrete == false || isD3Colors?.discrete == false) ? true : false
    );

    // Get new colorscale from colorselector and update legend
    const getSelectedColorScale = React.useCallback((data: any, value: any) => {
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
            <div onClick={handleToggle}>
                {isCont == true && (
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
                {isCont == false && (
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
                    <ColorSelectorAccordion
                        newColorScaleData={getSelectedColorScale} 
                        isHorizontal={horizontal} 
                        closeColorSelector={closeColorSelector} />
                )}
            </div>
        </div>
            
    );
};