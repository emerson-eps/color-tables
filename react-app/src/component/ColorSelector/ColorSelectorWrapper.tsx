import * as React from "react";
import { d3ColorScales } from "../Utils/d3ColorScale";
import { ColorSelectorComponent } from "./ColorSelectorComponent";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { RGBToHex } from "../Utils/legendCommonFunction";
import { styled } from "@mui/system";

const StyledParentDiv = styled("div")({
  display: "flex",
});

const StyledContentCopyIcon = styled("div")({
  "&:hover": {
    background: "#f1f1f1",
    cursor: "pointer",
  },
});

export declare type colorScaleObj = {
  name: string;
  color:
    | [number, number, number, number][]
    | ((t: number) => string | string[]);
};
export type colorScaleArray = Array<colorScaleObj>;

declare type legendProps = {
  useColorTableColors?: boolean;
  newColorScaleData?: any;
  colorTables?: any;
  useRange?: boolean;
  getRange?: any;
  isCont?: boolean;
  useBreakpoint?: boolean;
  useInterpolation?: boolean;
  getInterpolation?: any;
  currentLegendName?: string;
  isCustomScale?: any;
  getDuplicatedLegendData?: any;
  selectedInterpolationType?: any;
  selectedRangeType?: any;
};

export const ColorSelectorWrapper: React.FC<legendProps> = ({
  newColorScaleData,
  colorTables,
  useRange,
  getRange,
  isCont,
  useInterpolation,
  getInterpolation,
  currentLegendName,
  isCustomScale,
  getDuplicatedLegendData,
  selectedInterpolationType,
  selectedRangeType,
}: legendProps) => {
  let continuousD3Legend;
  let discreteD3Legend;
  let continuousLegend;
  let discreteLegend;

  const continuosColorData: colorScaleArray = [];
  const continuosD3ColorData: colorScaleArray = [];
  const discreteColorData: colorScaleArray = [];
  const discreteD3ColorData: colorScaleArray = [];

  const [isAuto, setAuto] = React.useState(true);
  // For altering data range
  const onChangeRange = React.useCallback(
    (e: EventTarget) => {
      if ((e as any).value === "Auto") {
        getRange("Auto");
        setAuto(true);
      } else {
        setAuto(false);
        const inputValue1 = (
          document.getElementById("minV") as HTMLInputElement
        ).value;
        const inputValue2 = (
          document.getElementById("maxV") as HTMLInputElement
        ).value;
        getRange([parseFloat(inputValue1), parseFloat(inputValue2)]);
      }
    },
    [getRange]
  );

  // For interpolation
  const onChangeInterpolation = React.useCallback(
    (e: EventTarget) => {
      if ((e as any).value === "Logarithmic") {
        getInterpolation("Logarithmic");
      } else if ((e as any).value === "Linear") {
        getInterpolation("Linear");
      } else {
        getInterpolation("Nearest");
      }
    },
    [getInterpolation]
  );
  const [duplicatedLegendData, setDuplicatedLegendData] = React.useState([]);

  const copyLegend = (value: any) => {
    const test = value.color.map((item: any) => {
      return {
        position: item[0],
        color: RGBToHex(item).color,
        name: value.name,
      };
    });
    setDuplicatedLegendData([...duplicatedLegendData, test]);
    isCustomScale(value.name);
  };

  React.useEffect(() => {
    if (getDuplicatedLegendData) {
      getDuplicatedLegendData(duplicatedLegendData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duplicatedLegendData?.length]);

  if (!useRange || !useInterpolation) {
    // Continuous legend using color table  data
    const colorTableContinuousData = colorTables?.filter((element: any) => {
      return element.discrete === false;
    });

    colorTableContinuousData?.forEach((element: any) => {
      continuosColorData.push({ color: element.colors, name: element.name });
    });

    // Continuous legend using d3 data
    const d3continuousData = d3ColorScales?.filter((element: any) => {
      return element.discrete === false;
    });

    d3continuousData?.forEach((element: any) => {
      continuosD3ColorData.push({ color: element.colors, name: element.name });
    });

    // Discrete legend using color table data
    const discreteData = colorTables?.filter((element: any) => {
      return element.discrete === true;
    });

    discreteData?.forEach((element: any) => {
      discreteColorData.push({ color: element.colors, name: element.name });
    });

    // Discrete legend using d3 data
    const d3discreteData = d3ColorScales?.filter((element: any) => {
      return element.discrete === true;
    });

    d3discreteData?.forEach((element: any) => {
      discreteD3ColorData.push({ color: element.colors, name: element.name });
    });

    // return continuous and discrete legend which uses d3 data
    continuousD3Legend = continuosD3ColorData.map((val: any, index: any) => {
      return (
        <ColorSelectorComponent
          legendColor={val.color}
          legendColorName={val.name}
          useContColorTable={false}
          uniqueId={index}
          colorScaleData={newColorScaleData}
          key={index}
          currentLegendName={currentLegendName}
        />
      );
    });

    discreteD3Legend = d3discreteData.map((val: any, index: any) => {
      return (
        <ColorSelectorComponent
          colorsObject={val.colors}
          legendColorName={val.name}
          useDiscColorTable={false}
          colorScaleData={newColorScaleData}
          key={index}
          currentLegendName={currentLegendName}
        />
      );
    });

    // return continuous and discrete legend which uses colortable data
    continuousLegend = continuosColorData.map((value: any, index: any) => {
      return (
        <StyledParentDiv key={index}>
          <div>
            <ColorSelectorComponent
              colorsObject={value}
              legendColorName={value.name}
              useContColorTable={true}
              uniqueId={index}
              colorScaleData={newColorScaleData}
              key={index}
              currentLegendName={currentLegendName}
            />
          </div>
          <StyledContentCopyIcon
            title="Duplicate"
            style={{ cursor: "pointer" }}
          >
            <ContentCopyIcon
              fontSize="small"
              color="action"
              style={{ marginTop: 5 }}
              onClick={() => copyLegend(value)}
            />
          </StyledContentCopyIcon>
        </StyledParentDiv>
      );
    });

    discreteLegend = discreteColorData.map((val: any, index: any) => {
      return (
        <ColorSelectorComponent
          colorsObject={discreteColorData[index]}
          legendColorName={val.name}
          useDiscColorTable={true}
          colorScaleData={newColorScaleData}
          key={index}
          currentLegendName={currentLegendName}
        />
      );
    });
  }

  // Sampling through range
  if (useRange) {
    return (
      <div
        onChange={ev => {
          onChangeRange(ev.target);
        }}
        style={{
          height: 58,
          borderRadius: "0.5em",
          border: "1px solid #dadada",
        }}
      >
        <div style={{ marginTop: 8, marginLeft: 13 }}>
          <input
            type="radio"
            value="Auto"
            name="range"
            disabled={!isCont}
            defaultChecked={selectedRangeType?.isAuto}
          />{" "}
          Auto <br />
          <input
            type="radio"
            value="Domain"
            name="range"
            disabled={!isCont}
            defaultChecked={selectedRangeType?.isAuto === false}
          />
          <label style={{ marginLeft: 3, marginRight: 10 }}>Min</label>
          <input type="text" id="minV" size={3} disabled={isAuto || !isCont} />
          <label style={{ marginLeft: 10, marginRight: 10 }}>Max</label>
          <input type="text" id="maxV" size={3} disabled={isAuto || !isCont} />
        </div>
      </div>
    );
  }
  // Interpolation methods
  else if (useInterpolation) {
    return (
      <div
        onChange={ev => {
          onChangeInterpolation(ev.target);
        }}
        style={{
          height: 72,
          borderRadius: "0.5em",
          border: "1px solid #dadada",
        }}
      >
        <div style={{ marginTop: 8, marginLeft: 13 }}>
          <input
            type="radio"
            value="Linear"
            name="interpolation"
            disabled={!isCont}
            defaultChecked={selectedInterpolationType?.isLinear}
          />
          Linear <br />
          <input
            type="radio"
            value="Logarithmic"
            name="interpolation"
            disabled={!isCont}
            defaultChecked={selectedInterpolationType?.isLog}
          />
          Logarithmic <br />
          <input
            type="radio"
            value="Nearest"
            name="interpolation"
            disabled={!isCont}
            defaultChecked={selectedInterpolationType?.isNearest}
          />
          Nearest <br />
        </div>
      </div>
    );
  }

  return (
    <div
      className="legendWrapper"
      style={{
        height: 120,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        marginLeft: -12,
      }}
    >
      {continuousLegend}
      {continuousD3Legend}
      {discreteLegend}
      {discreteD3Legend}
    </div>
  );
};
