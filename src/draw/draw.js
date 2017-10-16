import { generatePaths } from './points';

const colors = [
  '#E23500',
  '#FDD800',
  '#83C600',
  '#00B7E4',
  '#883D84',
  '#656E6D'
];
let paths = generatePaths(colors.length);
let interval = 0.01;

/**
 * Change the interval
 * @param newInterval {number} New interval to update 
 */
export const updateInterval = newInterval => {
  interval = newInterval;
};

/**
 * Animate the application
 * @param ctx {any} Context of the canvas to animate
 * @param 
 */
export const animate = (ctx, index = 0, percent = 0) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  paths.forEach((curves, pathIndex) => {
    const color = colors[pathIndex % colors.length];
    curves.forEach((curve, curveIndex) => {
      ctx.beginPath();
      curve.draw(ctx, curveIndex, index, percent, color);
      ctx.closePath();
    });
  });

  let newPercent = percent + interval;
  let newIndex = index;
  if (newPercent >= 1) {
    newPercent = 0;
    newIndex++;
  }

  paths.forEach(curves => {
    if (curves[index]) {
      curves[index].drawPlane(ctx, percent);
    } else {
      newIndex = 0;
      newPercent = 0;
      paths = generatePaths(colors.length);
    }
  });

  requestAnimationFrame(() => animate(ctx, newIndex, newPercent));
};
