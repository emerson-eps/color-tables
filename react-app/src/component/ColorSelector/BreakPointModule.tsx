import * as React from "react";
import { ColorScale } from "../BreakPoint/ColorScale";
import { useRef } from "react";
import clsx from "clsx";
import { createStyles, IconButton, makeStyles, Theme } from "@material-ui/core";
import { scaleLinear } from "d3";
import { clamp } from "lodash";
import { getColorArrayFromBreakPoints } from "../Utils/legendCommonFunction";
import AddCircleOutlineSharpIcon from "@material-ui/icons/AddCircleOutlineSharp";
import RemoveCircleOutlineSharpIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import { SketchPicker } from "react-color";
import ColorizeIcon from "@material-ui/icons/Colorize";

declare type moduleProps = {
  colorScaleBreakpoints?: any;
  setColorScaleBreakpoints?: any;
  editedBreakpoint?: any;
  customScalesName?: string;
};

export const BreakPointComp: React.FC<moduleProps> = ({
  colorScaleBreakpoints,
  setColorScaleBreakpoints,
  editedBreakpoint,
  customScalesName,
}: moduleProps) => {
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

      const clampedNewWidth =
        clamp(offset, rectBox.left, rectBox.right) - rectBox.left;

      const normalizer = scaleLinear().domain([0, rectBox.width]);
      const normalizedPosition = normalizer(clampedNewWidth) as number;

      const firstItemIndex = 0;
      const lastItemIndex = colorScaleBreakpoints.length - 1;

      if (getIndex !== firstItemIndex && getIndex !== lastItemIndex) {
        setColorScaleBreakpoints((items: any) =>
          items.map((item: any, index: any) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rectBox, colorScaleBreakpoints.length, getIndex]
  );

  const orderedSelectedColors = React.useMemo(() => {
    return Object.values(colorScaleBreakpoints).sort(
      (a: any, b: any) => a.position - b.position
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorScaleBreakpoints.length,
    setColorScaleBreakpoints,
    colorScaleBreakpoints,
  ]);

  const arrayOfColors = React.useMemo(
    () => getColorArrayFromBreakPoints(orderedSelectedColors),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      orderedSelectedColors,
      colorScaleBreakpoints.length,
      setColorScaleBreakpoints,
    ]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onMouseMove, colorScaleBreakpoints, colorScaleBreakpoints.length]);

  const isBreakpointMovingRef = React.useRef(false);
  const selectedIndexRef = React.useRef(0);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(1);

  const onMouseDown = React.useCallback((index: number) => {
    isBreakpointMovingRef.current = true;
    selectedIndexRef.current = index;
    setIndex(index);
    setSelectedIndex(index);
  }, []);

  const RAIL_HEIGHT = 16;

  const useStyles = makeStyles<Theme>((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        marginTop: "17px",
        marginLeft: "37px",
        height: "140px",
        width: "240px",
      },
      controllersContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: "18px",
        marginLeft: "30px",
      },
      colorScaleContainer: {
        height: RAIL_HEIGHT,
        borderRadius: theme.shape.borderRadius,
        overflow: "visible",
        position: "relative",
        marginTop: "9px",
      },
      texture: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: theme.shape.borderRadius,
        cursor: "pointer",
        overflow: "hidden",
        zIndex: 999,
      },
      rail: {
        position: "absolute",
        width: "100%",
        height: "100%",
      },
      pointerContainer: {
        userSelect: "none",
        cursor: "pointer",
      },
      pointer: {
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
      },
      selectedPointer: {
        borderColor: "black",
        borderWidth: 2,
      },
      pointerArrow: {
        position: "absolute",
        top: 16,
        width: 0,
        height: 0,
        borderLeft: `${pointer_width / 2}px solid transparent`,
        borderRight: `${pointer_width / 2}px solid transparent`,
        borderTop: "4px solid black",
        transform: "rotate(180deg)",
      },
      selectedPointerArrow: {
        borderTopColor: "black",
      },
      grow: {
        flexGrow: 1,
      },
    })
  );

  const classes = useStyles();
  const width = 200;

  const onChangeComplete = React.useCallback(
    (color: any) => {
      setColorScaleBreakpoints((items: any[]) =>
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
    setColorScaleBreakpoints((items: any) => [
      ...items.splice(colorScaleBreakpoints.length - 1, 0, {
        position: 0.5,
        color: "#FF69B4",
      }),
      ...items,
    ]);
    setSelectedIndex(colorScaleBreakpoints.length);
    selectedIndexRef.current = colorScaleBreakpoints.length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    colorScaleBreakpoints,
    colorScaleBreakpoints.length,
    setColorScaleBreakpoints,
  ]);

  const deleteBreakPoint = React.useCallback(
    (indexToDelete: number) => {
      if (
        indexToDelete !== 0 &&
        indexToDelete !== colorScaleBreakpoints.length - 1
      ) {
        setColorScaleBreakpoints((items: any[]) =>
          items.filter((_, index) => index !== indexToDelete)
        );

        if (selectedIndexRef.current === indexToDelete) {
          setSelectedIndex(1);
          selectedIndexRef.current = 1;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      setColorScaleBreakpoints,
      colorScaleBreakpoints,
      colorScaleBreakpoints.length,
    ]
  );

  return (
    <div className={classes.root}>
      <label style={{ fontWeight: "bold" }}>
        Edit : {customScalesName + " " + "Copy"}
      </label>
      <div className={classes.colorScaleContainer} style={{ width }}>
        <div className={classes.texture}>
          <ColorScale arrayOfColors={arrayOfColors} />
        </div>
        <div className={classes.rail} ref={setBoundingClientRect}>
          {colorScaleBreakpoints.map(({ color, position }: any, index: any) => {
            const left = position * rectBox.width - pointer_width / 2;
            const onMoveStart = () => onMouseDown(index);
            return (
              <div
                key={index}
                className={classes.pointerContainer}
                onMouseDown={onMoveStart}
              >
                <div
                  className={clsx(classes.pointerArrow, {
                    [classes.selectedPointerArrow]: selectedIndex === index,
                  })}
                  style={{ left }}
                />
                <div
                  className={clsx(classes.pointer, {
                    [classes.selectedPointer]: selectedIndex === index,
                  })}
                  style={{ left, backgroundColor: color }}
                />
              </div>
            );
          })}
          <div style={{ marginTop: "120px", position: "fixed" }} ref={divRef}>
            {popUpState ? (
              <SketchPicker color={"red"} onChangeComplete={onChangeComplete} />
            ) : null}
          </div>
        </div>
      </div>
      <div className={classes.controllersContainer}>
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
      </div>
    </div>
  );
};
