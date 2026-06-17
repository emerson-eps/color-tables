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

      const { width, height, ref: resizeRef } =
        useResizeDetector<HTMLCanvasElement>({ onResize: onResizeCallback });

      React.useLayoutEffect(() => {
        if (!drawCallback) {
          return;
        }
        const frameId = requestAnimationFrame(drawCallback);
        return () => cancelAnimationFrame(frameId);
      }, [drawCallback, width, height]);

      const setRef = React.useCallback(
        (node: HTMLCanvasElement | null) => {
          resizeRef(node);
          if (typeof externalRef === "function") {
            externalRef(node);
          } else if (externalRef) {
            (externalRef as { current: HTMLCanvasElement | null }).current =
              node;
          }
        },
        // resizeRef is a new function each render but stable enough as a callback ref;
        // including it would cause unnecessary ref detach/reattach cycles
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [externalRef]
      );

      return <StyledCanvas ref={setRef} {...props} />;
    }
  )
);

export default Canvas;
