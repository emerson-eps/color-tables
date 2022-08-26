import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import ReactResizeDetector from "react-resize-detector";

const useStyles = makeStyles(() =>
  createStyles({
    canvas: {
      position: "absolute",
      left: 0,
      right: 0,
      height: "100%",
      width: "100%",
      pointerEvents: "none"
    }
  })
);

type Props = {
  drawCallback?: () => void;
  onResize?: (width: number, height: number) => void;
};

export const Canvas = React.forwardRef<
  HTMLCanvasElement,
  React.DetailedHTMLProps<
    React.CanvasHTMLAttributes<HTMLCanvasElement>,
    HTMLCanvasElement
  > &
    Props
>(({ drawCallback, onResize, ...props }, ref) => {
  // Style
  const classes = useStyles();

  // State
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  // Callbacks
  const onResizeHandler = React.useCallback(
    (w: number, h: number) => {
      setWidth(w);
      setHeight(h);
      onResize?.(w, h);
    },
    [onResize]
  );

  // Effects
  React.useLayoutEffect(() => {
    if (!drawCallback) {
      return;
    }
    const frameId = requestAnimationFrame(drawCallback);
    return () => cancelAnimationFrame(frameId);
  }, [drawCallback, width, height]);

  return (
    <ReactResizeDetector handleHeight handleWidth onResize={onResizeHandler}>
      <canvas ref={ref} className={classes.canvas} {...props} />
    </ReactResizeDetector>
  );
});

export default React.memo(Canvas);
