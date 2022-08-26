import * as React from "react";
import { Texture } from "../BreakPoint/Texture";
import clsx from "clsx";
import {
    createStyles,
    IconButton,
    makeStyles,
    Theme,
    Tooltip
  } from "@material-ui/core";
import { scaleLinear } from "d3";
import { clamp } from "lodash";
import { convertBreakpointsToColorArray } from "../Utils/legendCommonFunction";

  declare type moduleProps = {
    colorScaleBreakpoints?: any;
    setColorScaleBreakpoints?: any;
  };

export const BreakPointComp: React.FC<moduleProps> = ({
    colorScaleBreakpoints,
    setColorScaleBreakpoints
}: moduleProps) => {
    
    const THUMB_WIDTH = 12;

    const [railBoundingBox, setRailBoundingBox] = React.useState<DOMRect>({
        width: 0,
        left: 0
    } as DOMRect);

    const setBoundingClientRect = React.useCallback(
        (node: HTMLDivElement | null) => {
          node && setRailBoundingBox(node.getBoundingClientRect());
        },
        []
      );

      const onMouseUp = React.useCallback(() => {
        isBreakpointMovingRef.current = false;
      }, []);

      const onMouseMove = React.useCallback(
        (e: MouseEvent | TouchEvent) => {
          if (!isBreakpointMovingRef.current) {
            return;
          }
    
          const offset =
            (e as TouchEvent).touches?.[0]?.clientX ?? (e as MouseEvent).clientX;
    
          const clampedNewWidth =
            clamp(offset, railBoundingBox.left, railBoundingBox.right) -
            railBoundingBox.left;
    
          const normalizer = scaleLinear().domain([0, railBoundingBox.width]);
          const normalizedPosition = normalizer(clampedNewWidth) as number;
    
          setColorScaleBreakpoints((items: any) =>
            items.map((item: any, index: any) =>
              index === selectedIndexRef.current
                ? {
                    ...item,
                    position: normalizedPosition
                  }
                : item
            )
          );
        },
        [railBoundingBox, setColorScaleBreakpoints]
      );

      const orderedSelectedColors = React.useMemo(() => {
        return Object.values(colorScaleBreakpoints).sort(
          (a, b) => a.position - b.position
        );
      }, [colorScaleBreakpoints]);

      const texture = React.useMemo(
        () => convertBreakpointsToColorArray(orderedSelectedColors),
        [orderedSelectedColors]
      );

      React.useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    
        return () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
      }, [onMouseMove]);

    const isBreakpointMovingRef = React.useRef(false);
    const selectedIndexRef = React.useRef(0);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

    const onMouseDown = React.useCallback((index: number) => {
        isBreakpointMovingRef.current = true;
        selectedIndexRef.current = index;
        setSelectedIndex(index);
      }, []);

      //const RAIL_DEFAULT_WIDTH = 250;
      const RAIL_HEIGHT = 16;
      const THUMB_OFFSET = 5;
      //const DEFAULT_THUMB_COLOR = defaultColorScales.Tableau10.colors[4];

      const useStyles = makeStyles<Theme>((theme: Theme) =>
      createStyles({
        root: {
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2)
        },
        controllersContainer: {
          display: "flex",
          flexDirection: "row"
        },
        colorScaleContainer: {
          height: RAIL_HEIGHT,
          borderRadius: theme.shape.borderRadius,
          overflow: "visible",
          position: "relative"
        },
        texture: {
          position: "absolute",
          width: "100%",
          height: "100%",
          borderRadius: theme.shape.borderRadius,
          cursor: "pointer",
          overflow: "hidden"
        },
        rail: {
          position: "absolute",
          width: "100%",
          height: "100%"
        },
        thumbContainer: {
          userSelect: "none",
          cursor: "pointer"
        },
        thumb: {
          position: "absolute",
          top: -THUMB_OFFSET,
          width: THUMB_WIDTH,
          height: RAIL_HEIGHT,
          borderWidth: "thin",
          borderStyle: "solid",
          borderColor: "white",
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          boxSizing: "border-box"
        },
        selectedThumb: {
          borderColor: "orange",
          borderWidth: 2
        },
        thumbArrow: {
          position: "absolute",
          // top: RAIL_HEIGHT - THUMB_OFFSET,
          top: 11,
          width: 0,
          height: 0,
          borderLeft: `${THUMB_WIDTH / 2}px solid transparent`,
          borderRight: `${THUMB_WIDTH / 2}px solid transparent`,
          borderTop: "4px solid white"
        },
        selectedThumbArrow: {
          borderTopColor: "orange"
        },
        grow: {
          flexGrow: 1
        }
      })
        );

      const classes = useStyles();
        const width = 200;
    return (
        <div className={classes.root}>
            <div className={classes.colorScaleContainer} style={{ width }}>
                <div className={classes.texture}>
                    <Texture texture={texture} />
                </div>
                <div className={classes.rail} ref={setBoundingClientRect}>
                    {colorScaleBreakpoints.map(({ color, position }: any, index: any) => {
                        const left = position * railBoundingBox.width - THUMB_WIDTH / 2;
                        const onMoveStart = () => onMouseDown(index);

                        return (
                            <div
                                key={index}
                                className={classes.thumbContainer}
                                onMouseDown={onMoveStart}
                            >
                                <div
                                className={clsx(classes.thumbArrow, {
                                    [classes.selectedThumbArrow]: selectedIndex === index
                                })}
                                style={{ left }}
                                />
                                <div
                                className={clsx(classes.thumb, {
                                    [classes.selectedThumb]: selectedIndex === index
                                })}
                                style={{ left, backgroundColor: color }}
                                />
                                
                            </div>
                        );
                    })}
            </div>
        </div>
        </div>
    )
}