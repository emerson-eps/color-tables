import * as React from "react";
import { Accordion } from "@equinor/eds-core-react";
import { ColorSelectorWrapper } from "./ColorSelectorWrapper";
import { LegendComp } from "../BreakPoint/Legend";
import defaultColorTables from "../color-tables.json";
import { RGBToHex } from "../Utils/legendCommonFunction";
import { getColorSelectorPosition } from "../Utils/legendCommonFunction";
import CancelIcon from "@mui/icons-material/Cancel";

export const ColorSelectorAccordion = (props: any) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScaleBreakpoints.length]);

  const editedData = React.useCallback((data) => {
    setBreakPointValues(data);
    props.getEditedBreakPoint(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="Container"
      style={{
        width: "316px",
        position: "absolute",
        zIndex: 1000,
        top: getColorSelectorPosition(props.position, props.isHorizontal).top,
        left: getColorSelectorPosition(props.position, props.isHorizontal).left,
      }}
    >
      {!props.isModal && (
        <div style={{ cursor: "pointer" }}>
          <CancelIcon
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              cursor: "pointer",
              color: "#007079",
            }}
            onMouseOver={(e) => {
              e.preventDefault();
              const target = e.target as SVGAElement;
              target.style.color = "#1099a5";
            }}
            onMouseOut={(e) => {
              const target = e.target as SVGAElement;
              target.style.color = "#007079";
            }}
            onClick={props.setIsOpen}
          />
        </div>
      )}
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
                    currentLegendName={props?.currentLegendName}
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
                    currentLegendName={props?.currentLegendName}
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
                  {/* <ColorSelectorWrapper
                    useBreakpoint={true}
                    getBreakpoint={props?.getBreakpoint}
                  /> */}
                  {breakpointValues?.length > 0 && (
                    <LegendComp
                      colorScaleBreakpoints={breakpointValues}
                      editedData={editedData}
                      isModal={props.isModal}
                      handleModalClick={props.handleModalClick}
                    />
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
