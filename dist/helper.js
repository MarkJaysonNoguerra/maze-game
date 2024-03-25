export const drawLine = (ctx, startPoint, endpoint) => {
  ctx.beginPath();
  ctx.moveTo(...startPoint);
  ctx.lineTo(...endpoint);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
};
export const drawRect = (ctx, startPoint, widthHeight, filleStyle = "blue") => {
  ctx.beginPath();
  ctx.rect(...startPoint, ...widthHeight);
  ctx.fillStyle = filleStyle;
  ctx.fill();
  ctx.closePath();
};
export const delay = async (t) => new Promise((resolve) => setTimeout(() => resolve(), t));
