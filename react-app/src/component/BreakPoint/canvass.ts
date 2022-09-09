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
