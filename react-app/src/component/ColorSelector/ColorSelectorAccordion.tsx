import * as React from "react";
import { Accordion } from "@equinor/eds-core-react";
import { ColorSelectorWrapper } from "./ColorSelectorWrapper";
import { LegendComp } from "../BreakPoint/Legend";
import defaultColorTables from "../color-tables.json";
import { RGBToHex } from "../Utils/legendCommonFunction";

export const ColorSelectorAccordion = (props: any) => {
  const currentLegendName = props.currentLegendName;
  let colorScaleBreakpoints: any = [];

  const getColorScaleArray = defaultColorTables.find((value: any) => {
    return value.name === currentLegendName;
  });

  getColorScaleArray?.colors.forEach(
    (value: [number, number, number, number]) => {
      // return the color and breakPoint needed to draw the legend
      colorScaleBreakpoints.push({
        // to support discrete color for continous data
        position: value[0],
        color: RGBToHex(value).color,
      });
    }
  );

  const [breakpointValues, setBreakPointValues] = React.useState(
    colorScaleBreakpoints
  );

  React.useEffect(() => {
    setBreakPointValues(colorScaleBreakpoints);
  }, [colorScaleBreakpoints.length]);

  const editedData = React.useCallback((data) => {
    setBreakPointValues(data);
    props.getEditedBreakPoint(data);
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
              <Accordion.Item disabled={!props.isCont}>
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
              <Accordion.Item disabled={!props.isCont}>
                <Accordion.Header>Domain</Accordion.Header>
                <Accordion.Panel>
                  {breakpointValues?.length > 0 && (
                    <LegendComp
                      colorScaleBreakpoints={breakpointValues}
                      editedData={editedData}
                    />
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion>
              <Accordion.Item disabled={!props.isCont}>
                <Accordion.Header>Interpolation</Accordion.Header>
                <Accordion.Panel>
                  <ColorSelectorWrapper
                    useInterpolation={true}
                    isCont={props?.isCont}
                    getInterpolation={props?.getInterpolation}
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
