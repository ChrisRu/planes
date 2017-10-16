import Point from './structures/Point';

/**
 * Generate a random number by gaussian
 * @returns Random number between 0 and 1
 */
export const randomGaussian = (times = 4) => {
  const total = Array(times)
    .fill(0)
    .reduce(prev => prev + Math.random(), 0);

  return total / times;
};

/**
 * Get quadratic bezier x and y at percentage
 * @param {Point} startPt 
 * @param {Point} controlPt 
 * @param {Point} endPt 
 * @param {number} percent 
 * @returns {Point} Current position
 */
export const getCurrentPos = (startPt, controlPt, endPt, percent) => {
  const calculatePoint = key =>
    (1 - percent) ** 2 * startPt[key] +
    2 * (1 - percent) * percent * controlPt[key] +
    percent ** 2 * endPt[key];

  const x = calculatePoint('x');
  const y = calculatePoint('y');
  return new Point(x, y);
};

/**
 * Calculate the angle between two points
 * @param p1 {Point} First point
 * @param p2 {Point} Second point
 * @returns {number} Angle in degrees
 */
export const calculateAngle = (p1, p2) => {
  const diff = p2.clone().remove(p1);
  return Math.atan2(diff.x, diff.y);
};

/**
 * Get a gradient for a line
 * @param ctx {any} Context to draw to
 * @param color {string} Color of gradient
 * @param curveIndex {number} Index of the curve
 * @param index {number} Index of a path in the curve
 * @param x {number} X position of the gradient
 * @param width {number} Width of the gradient
 * @param percent {number} Percentage of line that has finished
 * @returns {CanvasGradient} New gradient
 */
export const getGradient = (
  ctx,
  color,
  curveIndex,
  index,
  x,
  width,
  percent
) => {
  const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
  const trailLength = 3;

  if (curveIndex === index) {
    gradient.addColorStop(percent, color);
    gradient.addColorStop(percent, 'transparent');
  } else if (curveIndex + trailLength < index) {
    gradient.addColorStop(0, 'transparent');
  } else if (curveIndex + trailLength === index && color !== '#1C1D22') {
    const transPercent = percent > 0.5 ? (percent - 0.5) * 2 : 0;
    const colorPercent = percent < 0.5 ? percent * 2 : 1;
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(transPercent, 'transparent');
    gradient.addColorStop(colorPercent, color);
    gradient.addColorStop(1, color);
  } else if (curveIndex < index) {
    gradient.addColorStop(0, color);
  }

  return gradient;
};

/**
 * Calculate the distance between two points
 * @param p1 {Point} First point
 * @param p2 {Point} Second point
 * @returns {number} Distance between points
 */
export const lineDistance = (p1, p2) => Math.hypot(p2.x - p1.x, p2.y - p1.y);
