import * as React from "react";

import { useRef } from "react";
import { IconButton } from "@mui/material";
import { scaleLinear } from "d3";
import { clamp } from "lodash";

import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import RemoveCircleOutlineSharpIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import { SketchPicker } from "react-color";
import ColorizeIcon from "@mui/icons-material/Colorize";
import { styled } from "@mui/system";

import { getColorArrayFromBreakPoints } from "../Utils/legendCommonFunction";
import { ColorScale } from "../BreakPoint/ColorScale";

export type IBreakPointArrayItem = {
  position: number;
  color: string;
  name?: string;
};

export type BreakPointCompProps = {
  colorScaleBreakpoints?: IBreakPointArrayItem[];
  setColorScaleBreakpoints?: any;
  editedBreakpoint?: (colorScaleBreakpoints: IBreakPointArrayItem[]) => void;
  customScalesName?: string;
};

/**
 * @deprecated use BreakPointCompProps instead.
 */
export type moduleProps = BreakPointCompProps;

const RAIL_HEIGHT = 16;
const pointer_width = 12;

const StyledControllersContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  marginTop: "18px",
  marginLeft: "30px",
});

const StyledRail = styled("div")({
  position: "absolute",
  width: "100%",
  height: "100%",
});

const StyledPointerContainer = styled("div")({
  userSelect: "none",
  cursor: "pointer",
});

const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  marginTop: "17px",
  marginLeft: "37px",
  height: "140px",
  width: "240px",
}));

const StyledColorScaleContainer = styled("div")(({ theme }) => ({
  height: RAIL_HEIGHT,
  borderRadius: theme.shape.borderRadius,
  overflow: "visible",
  position: "relative",
  marginTop: "9px",
}));

const StyledTextureContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  overflow: "hidden",
  zIndex: 999,
}));

const StyledPointer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 20,
  width: pointer_width,
  height: RAIL_HEIGHT,
  borderWidth: "thin",
  borderStyle: "solid",
  borderColor: "white",
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  boxSizing: "border-box",
}));

const StyledPointerArrow = styled("div")({
  position: "absolute",
  top: 16,
  width: 0,
  height: 0,
  borderLeft: `${pointer_width / 2}px solid transparent`,
  borderRight: `${pointer_width / 2}px solid transparent`,
  borderTop: "4px solid black",
  transform: "rotate(180deg)",
});

const StyledSketchPicker = styled("div")({
  marginTop: "120px",
  position: "fixed",
});

export const BreakPointComp: React.FC<BreakPointCompProps> = ({
  colorScaleBreakpoints,
  setColorScaleBreakpoints,
  editedBreakpoint,
  customScalesName,
}: BreakPointCompProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const pointer_width = 12;
  const [rectBox, setRectBox] = React.useState<DOMRect>({
    width: 0,
    left: 0,
  } as DOMRect);
  const setBoundingClientRect = React.useCallback(
    (node: HTMLDivElement | null) => {
      node && setRectBox(node.getBoundingClientRect());
    },
    []
  );
  const onMouseUp = React.useCallback(() => {
    isBreakpointMovingRef.current = false;
  }, []);

  const [getIndex, setIndex] = React.useState<number>(0);

  const onMouseMove = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isBreakpointMovingRef.current) {
        return;
      }

      const offset =
        (e as TouchEvent).touches?.[0]?.clientX ?? (e as MouseEvent).clientX;

      const clampedNewWidth: number =
        clamp(offset, rectBox.left, rectBox.right) - rectBox.left;

      const normalizer = scaleLinear().domain([0, rectBox.width]);
      const normalizedPosition = normalizer(clampedNewWidth);

      const firstItemIndex = 0;
      const lastItemIndex = colorScaleBreakpoints.length - 1;

      if (getIndex !== firstItemIndex && getIndex !== lastItemIndex) {
        setColorScaleBreakpoints((items: IBreakPointArrayItem[]) =>
          items.map((item, index) =>
            index === selectedIndexRef.current
              ? {
                  ...item,
                  position: normalizedPosition,
                }
              : item
          )
        );
      }
    },
    [
      rectBox.left,
      rectBox.right,
      rectBox.width,
      colorScaleBreakpoints.length,
      getIndex,
      setColorScaleBreakpoints,
    ]
  );

  const orderedSelectedColors: any = React.useMemo(() => {
    return Object.values(colorScaleBreakpoints).sort(
      (a, b) => a.position - b.position
    );
  }, [colorScaleBreakpoints]);

  const arrayOfColors = React.useMemo(
    () => getColorArrayFromBreakPoints(orderedSelectedColors),
    [orderedSelectedColors]
  );

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    if (editedBreakpoint) {
      editedBreakpoint(colorScaleBreakpoints);
    }
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [
    onMouseMove,
    colorScaleBreakpoints,
    colorScaleBreakpoints.length,
    onMouseUp,
    editedBreakpoint,
  ]);

  const isBreakpointMovingRef = React.useRef(false);
  const selectedIndexRef = React.useRef(0);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);

  const onMouseDown = React.useCallback((index: number) => {
    isBreakpointMovingRef.current = true;
    selectedIndexRef.current = index;
    setIndex(index);
    setSelectedIndex(index);
  }, []);

  const selectedPointerArrowStyle = {
    borderTopColor: "black",
  };

  const selectedPointerStyle = {
    borderColor: "black",
    borderWidth: 2,
  };

  const width = 200;

  const onChangeComplete = React.useCallback(
    (color: { hex: string }) => {
      setColorScaleBreakpoints((items: IBreakPointArrayItem[]) =>
        items.map((item, index) =>
          index === selectedIndexRef.current
            ? {
                ...item,
                color: color.hex,
              }
            : item
        )
      );
    },
    [setColorScaleBreakpoints]
  );

  const [popUpState, setPopUpState] = React.useState(false);

  const launchPicker = React.useCallback(() => {
    setPopUpState(true);
  }, []);

  const addBreakpoint = React.useCallback(() => {
    setColorScaleBreakpoints((items: IBreakPointArrayItem[]) => [
      ...items.splice(colorScaleBreakpoints.length - 1, 0, {
        position: 0.5,
        color: "#FF69B4",
      }),
      ...items,
    ]);
    setSelectedIndex(colorScaleBreakpoints.length);
    selectedIndexRef.current = colorScaleBreakpoints.length;
  }, [colorScaleBreakpoints, setColorScaleBreakpoints]);

  const deleteBreakPoint = React.useCallback(
    (indexToDelete: number) => {
      if (
        indexToDelete !== 0 &&
        indexToDelete !== colorScaleBreakpoints.length - 1
      ) {
        setColorScaleBreakpoints((items: IBreakPointArrayItem[]) =>
          items.filter((_, index) => index !== indexToDelete)
        );

        if (selectedIndexRef.current === indexToDelete) {
          setSelectedIndex(1);
          selectedIndexRef.current = 1;
        }
      }
    },
    [setColorScaleBreakpoints, colorScaleBreakpoints]
  );

  return (
    <StyledRoot>
      <label style={{ fontWeight: "bold" }}>
        Edit : {customScalesName + " Copy"}
      </label>
      <StyledColorScaleContainer style={{ width }}>
        <StyledTextureContainer>
          <ColorScale arrayOfColors={arrayOfColors} />
        </StyledTextureContainer>
        <StyledRail ref={setBoundingClientRect}>
          {colorScaleBreakpoints.map(({ color, position }, index) => {
            const left = position * rectBox.width - pointer_width / 2;
            const onMoveStart = () => onMouseDown(index);

            const pointerArrowStyle =
              selectedIndex === index ? selectedPointerArrowStyle : {};
            const pointerStyle =
              selectedIndex === index ? selectedPointerStyle : {};

            return (
              <StyledPointerContainer key={index} onMouseDown={onMoveStart}>
                <StyledPointerArrow sx={pointerArrowStyle} style={{ left }} />
                <StyledPointer
                  sx={pointerStyle}
                  style={{ left, backgroundColor: color }}
                />
              </StyledPointerContainer>
            );
          })}
          <StyledSketchPicker ref={divRef}>
            {popUpState ? (
              <SketchPicker color={"red"} onChangeComplete={onChangeComplete} />
            ) : null}
          </StyledSketchPicker>
        </StyledRail>
      </StyledColorScaleContainer>
      <StyledControllersContainer>
        <IconButton size="medium" color="primary" onClick={addBreakpoint}>
          <AddCircleOutlineSharpIcon fontSize="medium" />
        </IconButton>
        <IconButton
          size="medium"
          color="secondary"
          onClick={() => deleteBreakPoint(selectedIndexRef.current)}
          disabled={colorScaleBreakpoints.length === 1}
        >
          <RemoveCircleOutlineSharpIcon fontSize="medium" />
        </IconButton>
        <IconButton color="primary" size="medium" onClick={launchPicker}>
          <ColorizeIcon fontSize="medium" />
        </IconButton>
      </StyledControllersContainer>
    </StyledRoot>
  );
};
