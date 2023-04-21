import * as React from "react";
import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ColorSelectorWrapper } from "./ColorSelectorWrapper";
import { LegendComp } from "../BreakPoint/Legend";
import defaultColorTables from "../color-tables.json";
import { RGBToHex } from "../Utils/legendCommonFunction";
import { getColorSelectorPosition } from "../Utils/legendCommonFunction";
import CancelIcon from "@mui/icons-material/Cancel";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3),
  width: theme.spacing(38),
  border: "1px solid #dadada",

  "& .MuiButtonBase-root.MuiAccordionSummary-root": {
    minHeight: 30,
    marginLeft: -15,
  },

  "& .MuiAccordionSummary-content": {
    height: 0,
    marginTop: 0,
  },

  "& .expandMoreIcon": {
    marginRight: 8,
    marginTop: -4,
  },

  "& .MuiPaper-root.MuiAccordion-root.Mui-expanded.MuiAccordion-rounded.MuiPaper-elevation1.MuiPaper-rounded":
    {
      border: "1px solid #dadada",
    },

  "& .makeStyles-accordion-1 .MuiAccordionDetails-root": {
    marginTop: -15,
  },

  "& .MuiAccordionDetails-root": {
    display: "block",

    "& .colorScalesDetails": {
      marginLeft: -27,
    },
  },

  "& .MuiAccordion-root.Mui-expanded": {
    margin: "auto",
  },

  "& h5": {
    marginTop: 0,
    marginLeft: -7,
    height: 0,
  },
}));

export const ColorSelectorAccordion = (props: any) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  let colorScaleBreakpoints: any = [];
  const [customScalesName, setCustomScalesName] = React.useState();
  const [duplicatedData, setDuplicatedData] = React.useState([]);
  let getColorScaleArray;
  if (customScalesName) {
    getColorScaleArray = defaultColorTables.find((value: any) => {
      return value.name === customScalesName;
    });
  }

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

  const breakpointValues =
    props.breakPointFlag?.length > 0
      ? props.breakPointFlag
      : colorScaleBreakpoints;

  const editedData = React.useCallback(
    (data: { colorArray: any; customizeFlag: any }) => {
      props.getEditedBreakPoint({
        colorArray: data.colorArray,
        customizeFlag: data.customizeFlag,
      });
    },
    [props]
  );

  const isCustomScale = React.useCallback(
    (data: (prevState: undefined) => undefined) => {
      setCustomScalesName(data);
    },
    []
  );

  const getDuplicatedLegendData = React.useCallback(
    (data: React.SetStateAction<any[]>) => {
      setDuplicatedData(data);
    },
    []
  );

  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) =>
    (_event_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  if (duplicatedData?.length > 0) {
    var testComponent = duplicatedData?.map((val: any, index: any) => {
      return (
        <LegendComp
          colorScaleBreakpoints={val}
          editedData={editedData}
          isModal={props.isModal}
          handleModalClick={props.handleModalClick}
          customScalesName={val[0].name}
          key={index}
        />
      );
    });
  }

  return (
    <div
      ref={containerRef}
      className="Container"
      style={{
        width: "316px",
        position: "absolute",
        zIndex: 1000,
        top: getColorSelectorPosition(
          props.cssLegendStyles,
          props.isHorizontal,
          props.legendScaleSize
        ).top,
        left: getColorSelectorPosition(
          props.cssLegendStyles,
          props.isHorizontal,
          props.legendScaleSize
        ).left,
        right: getColorSelectorPosition(
          props.cssLegendStyles,
          props.isHorizontal,
          props.legendScaleSize
        ).right,
        bottom: getColorSelectorPosition(
          props.cssLegendStyles,
          props.isHorizontal,
          props.legendScaleSize
        ).bottom,
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
      <StyledBox>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary className={"colorScaleSummary"}>
            <ExpandMoreIcon className={"expandMoreIcon"} fontSize="medium" />
            <h5>Color Scales</h5>
          </AccordionSummary>
          <AccordionDetails className={"colorScaleDetails"}>
            <ColorSelectorWrapper
              useColorTableColors={true}
              newColorScaleData={props?.newColorScaleData}
              colorTables={props?.colorTables}
              currentLegendName={props?.currentLegendName}
              isCustomScale={isCustomScale}
              getDuplicatedLegendData={getDuplicatedLegendData}
            />
            {(breakpointValues?.colorArray?.length > 0 ||
              breakpointValues?.length > 0) &&
              customScalesName && (
                <>
                  <h5>Custom scales: </h5>
                  <div style={{ marginTop: -12, marginBottom: -15 }}>
                    {testComponent}
                    <br />
                  </div>
                </>
              )}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary>
            <ExpandMoreIcon className={"expandMoreIcon"} fontSize="medium" />
            <h5>Color Sampling</h5>
          </AccordionSummary>
          <AccordionDetails>
            <h5>Range :</h5>
            <ColorSelectorWrapper
              useRange={true}
              getRange={props?.getRange}
              isCont={props?.isCont}
              selectedRangeType={props?.selectedRangeType}
            />
            <h5 style={{ marginTop: 10 }}>Interpolations :</h5>
            <ColorSelectorWrapper
              useInterpolation={true}
              isCont={props?.isCont}
              getInterpolation={props?.getInterpolation}
              selectedInterpolationType={props?.selectedInterpolationType}
            />
          </AccordionDetails>
        </Accordion>
      </StyledBox>
    </div>
  );
};
