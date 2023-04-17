import { createStyles, makeStyles } from "@mui/styles";
import * as d3 from "d3";
import React, { useCallback, useRef } from "react";
import Canvas from "./Canvas";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      position: "relative",
      cursor: "pointer",
    },
  })
);

type Props = {
  arrayOfColors: string[] | ((index: number) => string);
  vertical?: boolean;
  onClick?: any;
};

export const get2DContext = (
  canvas: HTMLCanvasElement,
  options?: CanvasRenderingContext2DSettings
) => {
  const dpi = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.ceil(rect.width * dpi);
  canvas.height = Math.ceil(rect.height * dpi);
  const ctx = canvas.getContext("2d", options);
  ctx?.scale(dpi, dpi);
  return ctx;
};

export const ColorScale: React.FC<Props> = React.memo(
  ({ arrayOfColors, vertical }) => {
    const classes = useStyles();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const drawCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const ctx = get2DContext(canvas);
      if (!ctx) {
        return;
      }

      const height = canvas.getBoundingClientRect().height;
      const width = canvas.getBoundingClientRect().width;
      const max = vertical ? height : width;

      const pixelToColor = Array.isArray(arrayOfColors)
        ? (pixel: number) => {
            const scale = d3
              .scaleQuantize<string>()
              .domain([0, max - 1])
              .range(arrayOfColors);
            return scale(pixel)!;
          }
        : (pixel: number) => arrayOfColors(max > 1 ? pixel / (max - 1) : 0);

      ctx.globalAlpha = 1;
      for (let pixel = 0; pixel < max; pixel++) {
        const color = pixelToColor(pixel);
        ctx.fillStyle = color;
        if (vertical) {
          ctx.fillRect(0, max - pixel, width, 2);
        } else {
          ctx.fillRect(pixel, 0, pixel + 1, height);
        }
      }
    }, [arrayOfColors, vertical]);

    return (
      <div className={classes.root}>
        <Canvas ref={canvasRef} drawCallback={drawCanvas} />
      </div>
    );
  }
);
