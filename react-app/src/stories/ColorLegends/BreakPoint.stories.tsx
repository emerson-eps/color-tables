import { withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { BreakPointComp } from "../../component/ColorSelector/breakPointModule";

storiesOf("Breakpoint/Custom Color Scale", module)
  .addDecorator(withKnobs)
  .addDecorator((storyFn) => <div>{storyFn()}</div>)
  .add("default", () => {
    const [colorScaleBreakpoints, setColorScaleBreakpoints] =
      React.useState<any>([
        {
          color: "#ff0000",
          position: 0,
        },
        {
          color: "#ffff00",
          position: 0.25,
        },
        {
          color: "#00ff00",
          position: 0.5,
        },
        {
          color: "#00ffff",
          position: 0.75,
        },
        {
          color: "#0000ff",
          position: 1,
        },
      ]);
    return (
      <BreakPointComp
        colorScaleBreakpoints={colorScaleBreakpoints}
        setColorScaleBreakpoints={setColorScaleBreakpoints}
      />
    );
  });
