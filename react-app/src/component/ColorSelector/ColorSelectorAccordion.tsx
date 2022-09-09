import * as React from "react";
import { Accordion } from "@equinor/eds-core-react";
import { ColorSelectorWrapper } from "./ColorSelectorWrapper";
import { LegendComp } from "./legend"

export const ColorSelectorAccordion = (props: any) => {
  const [colorScaleBreakpoints, setColorScaleBreakpoints] = React.useState<
      any
    >([
      {
        color: "#ff0000",
        position: 0
      },
      {
        color: "#ffff00",
        position: 0.25
      },
      {
        color: "#00ff00",
        position: 0.5
      },
      {
        color: "#00ffff",
        position: 0.75
      },
      {
        color: "#0000ff",
        position: 1
      }
    ]);

    const [breakpointValues, setBreakPointValues] = React.useState(colorScaleBreakpoints);

    const editedData = React.useCallback((data) => {
      setBreakPointValues(data);
      props.getEditedBreakPoint(data)
    }, []);

    

  return (
    <div
      className="Container"
      style={{
        width: "316px",
        position: "absolute",
        zIndex: 1,
        top: props.isHorizontal ? 100 : 30,
        right: props.isHorizontal ? 5 : 165,
      }}
    >
      <Accordion>
        <Accordion.Item isExpanded>
          <Accordion.Header>Color Scales</Accordion.Header>
          <Accordion.Panel>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Geologic Color Scale</Accordion.Header>
                <Accordion.Panel>
                  <ColorSelectorWrapper
                    useColorTableColors={true}
                    newColorScaleData={props?.newColorScaleData}
                    colorTables={props?.colorTables}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>D3 Color Scale</Accordion.Header>
                <Accordion.Panel>
                  <ColorSelectorWrapper
                    useColorTableColors={false}
                    newColorScaleData={props?.newColorScaleData}
                    colorTables={props?.colorTables}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item disabled={!props.isCont}>
          <Accordion.Header>Color Sampling</Accordion.Header>
          <Accordion.Panel>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Range</Accordion.Header>
                <Accordion.Panel>
                  <ColorSelectorWrapper
                    useRange={true}
                    getRange={props?.getRange}
                    isCont={props?.isCont}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>Breakpoint</Accordion.Header>
                <Accordion.Panel>
                  <ColorSelectorWrapper
                    useBreakpoint={true}
                    getBreakpoint={props?.getBreakpoint}
                  />
                 <LegendComp
                    colorScaleBreakpoints={breakpointValues}
                    // setColorScaleBreakpoints={setColorScaleBreakpoints}
                    editedData={editedData}
                  />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
