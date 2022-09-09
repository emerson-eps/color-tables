import { createStyles, makeStyles, Theme } from "@material-ui/core";
import * as d3 from "d3";
import React, { useCallback, useRef } from "react";
import Canvas from "./Canvas";
import { get2DContext } from "./canvass";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100%",
      position: "relative",
    },
  })
);

type Props = {
  /**
   * The color texture to be used to draw the canvas.
   * Can be provided as a list of colors or as a function returning
   * a color in a hex format for each normalised value in [0,1]
   */
  texture: string[] | ((index: number) => string);
  /**
   * Whether the colors are drawn from top to bottom instead of from left to right
   */
  vertical?: boolean;
  onClick?: any;
};

/**
 * A component displaying a custom texture.
 * This is suitable for drawing color scales or continueous legends.
 */
export const Texture: React.FC<Props> = React.memo(({ texture, vertical }) => {
  // Style
  const classes = useStyles();

  // A reference to the canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCanvas = useCallback(() => {
    // Canvas
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    // Canvas context
    const ctx = get2DContext(canvas);
    if (!ctx) {
      return;
    }

    const height = canvas.getBoundingClientRect().height;
    const width = canvas.getBoundingClientRect().width;
    const max = vertical ? height : width;

    const pixelToColor = Array.isArray(texture)
      ? (pixel: number) => {
          const scale = d3
            .scaleQuantize<string>()
            .domain([0, max - 1])
            .range(texture);
          return scale(pixel)!;
        }
      : (pixel: number) => texture(max > 1 ? pixel / (max - 1) : 0);

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
  }, [texture, vertical]);

  return (
    <div className={classes.root}>
      <Canvas ref={canvasRef} drawCallback={drawCanvas} />
    </div>
  );
});
