import { Dimension, Position } from "./class";

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  startPoint: Position,
  endpoint: Position
): void => {
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(endpoint.x, endpoint.y);
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
): void => {
  const { x, y } = position;
  const { width, height } = dimension;

  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fillStyle = filleStyle;
  ctx.fill();
  ctx.closePath();
};

export const resetCanvas = (
  ctx: CanvasRenderingContext2D,
  dimension: Dimension
): void => {
  ctx.clearRect(0, 0, dimension.width, dimension.height);
};

export const gridIndex = (position: Position): string => {
  return `${position.x}-${position.y}`;
};

export const isEqualPosition = (a: Position, b: Position): boolean => {
  return a.x === b.x && a.y === b.y;
};

export const delay = async (t: number) =>
  new Promise((resolve: any) => setTimeout(() => resolve(), t));
