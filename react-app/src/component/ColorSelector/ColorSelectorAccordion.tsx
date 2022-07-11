import * as React from "react";
import { Accordion } from "@equinor/eds-core-react";
import { ColorSelectorWrapper } from "./ColorSelectorWrapper";
import { DiscreteColorLegend } from "../Legend/DiscreteLegend";
import { ContinuousLegend } from "../Legend/ContinuousLegend";

export const ColorSelectorAccordion = (props: any) => {
  // onChangeData: (e: any) => {
  //   React.useState({site: e.currentTarget.value});
  // }

  const onChangeData = React.useCallback((e) => {
    if (e.value == "Linear") {
      console.log("Linear")
    } else {
      // <DiscreteColorLegend discreteData={{
      //   objects: undefined
      // }} dataObjectName={""} colorName={""} colorTables={""} />
      <ContinuousLegend min={0} max={100} dataObjectName={""} />
    }
    //React.useState({site: e.currentTarget});
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
        <Accordion.Item>
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
        <Accordion.Item>
          <Accordion.Header>Color Sampling</Accordion.Header>
            <Accordion.Panel>
              <Accordion>
                <Accordion.Item>
                  <Accordion.Header>Interpolation</Accordion.Header>
                  <Accordion.Panel>
                      {/* <fieldset>
                        <div>
                          <input type="radio" value="linear" checked={true} onChange={(ev) => {console.log(ev)}} />
                          Linear
                        </div>
                        <div>
                          <input type="radio" value="logarithm" checked={false} onChange={(ev) => {console.log(ev)}} />
                          Logarithm
                        </div>
                      </fieldset> */}
                      <div onChange={(ev) => {onChangeData(ev.target)}}>
                        <input type="radio" value="Linear" name="legend" defaultChecked /> Linear <br />
                        <input type="radio" value="Logarithm" name="legend"/> Logarithm
                      </div>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
