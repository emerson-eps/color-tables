import React from "react";
import { ContinuousLegend } from "../../../component/Legend/ContinuousLegend";
export default {
  component: ContinuousLegend,
  title: "Legends/ContinousLegend",
};
import colorTables from "../../../component/color-tables.json";

export const BreakpointColorMap = (args) => {

    

    const [breakpoint, setBreakpoint] = React.useState(0.1);

    function breakpointColorMap(x, breakpoint) {
      if (x > breakpoint) return [0, 50, 200];
      return [255, 255, 0];
    }

    function createColorMap(breakpoint) {
      return (value) => breakpointColorMap(value, breakpoint);
    }

    const colorMap = React.useCallback(
      (value) => {
          return createColorMap(breakpoint)(value);
      },
      [breakpoint]
    );

    const colorMapFunction = colorMap

    console.log("colorMapFunction", colorMapFunction)

    const min = 2782;
    const max = 3513;
    const dataObjectName = "Wells / PERM";
    const position = [16, 10];
    const horizontal = true;
    const colorName = "Permeability";
    // const colorMapFunction = (x) => [255 - x * 100, 255 - x * 100, 255 * x];
    const reverseRange = false;

    //const Template = (args) => {
      return <ContinuousLegend 
        min={2782}
        max={3513}
        dataObjectName={"Wells / PERM"}
        position={[16, 10]}
        colorName={"Permeability"}
        colorTables={colorTables}
        horizontal={true}
        colorMapFunction={colorMapFunction}
        reverseRange={false}
      />;
    //};

    

}

//export const PermeabilityTemplate = Template.bind({});
// BreakpointColorMap.args = {
//   min,
//   max,
//   dataObjectName,
//   position,
//   colorName,
//   colorTables,
//   horizontal,
//   colorMapFunction,
//   reverseRange,
// };
