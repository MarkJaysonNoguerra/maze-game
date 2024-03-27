import { Dimension } from "./type/dimension";
import { Position } from "./type/position";

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  startPoint: [number, number],
  endpoint: [number, number]
) => {
  ctx.beginPath();
  ctx.moveTo(...startPoint);
  ctx.lineTo(...endpoint);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
};

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  position: Position,
  dimension: Dimension,
  filleStyle = "blue"
) => {
  const { x, y } = position;
  const { width, height } = dimension;

  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = filleStyle;
  ctx.fill();
  ctx.closePath();
};

export const delay = async (t: number) =>
  new Promise((resolve: any) => setTimeout(() => resolve(), t));
