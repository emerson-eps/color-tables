import { styled } from "@mui/system";
import React from "react";
import { useResizeDetector } from "react-resize-detector";

const StyledCanvas = styled("canvas")({
  position: "absolute",
  left: 0,
  right: 0,
  height: "100%",
  width: "100%",
  pointerEvents: "none",
});

export type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  drawCallback?: () => void;
  onResize?: (width: number, height: number) => void;
};

export const Canvas = React.memo(
  React.forwardRef<HTMLCanvasElement, Omit<CanvasProps, "ref">>(
    function Canvas({ drawCallback, onResize, ...props }, externalRef) {
      // Stable callback forwarded to useResizeDetector; guards against null dimensions.
      const onResizeCallback = React.useCallback(
        ({
          width: w,
          height: h,
        }: {
          width: number | null;
          height: number | null;
        }) => {
          if (w !== null && h !== null) {
            onResize?.(w, h);
          }
        },
        [onResize]
      );

      // width/height are used as effect deps to re-trigger drawing after resize.
      const { width, height, ref: resizeRef } =
        useResizeDetector<HTMLCanvasElement>({ onResize: onResizeCallback });

      // Keep a ref to the latest resizeRef callback so setRef below doesn't
      // need resizeRef as a useCallback dep (which would cause detach/reattach
      // cycles since resizeRef gets a new identity whenever the observed element changes).
      const resizeRefLatest = React.useRef(resizeRef);
      resizeRefLatest.current = resizeRef;

      // Schedule a draw on the next animation frame whenever the callback or
      // canvas dimensions change.
      React.useLayoutEffect(() => {
        if (!drawCallback) {
          return;
        }
        const frameId = requestAnimationFrame(drawCallback);
        return () => cancelAnimationFrame(frameId);
      }, [drawCallback, width, height]);

      // Merged ref: forwards the canvas node to both react-resize-detector and
      // any ref passed by the consumer via forwardRef.
      const setRef = React.useCallback(
        (node: HTMLCanvasElement | null) => {
          resizeRefLatest.current(node);
          if (typeof externalRef === "function") {
            externalRef(node);
          } else if (externalRef) {
            (externalRef as { current: HTMLCanvasElement | null }).current =
              node;
          }
        },
        [externalRef]
      );

      return <StyledCanvas ref={setRef} {...props} />;
    }
  )
);
