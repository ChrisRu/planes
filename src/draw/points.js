import Point from './structures/Point';
import Curve from './structures/Curve';
import { randomGaussian } from './util';

/**
 * Get a random point based on previous point
 * @param {Point} from - Previous point to base new point on 
 * @returns {Point} New point
 */
export const generateRandomPoint = from => {
  const deviation = 4;
  const x = randomGaussian() * 200;
  const y =
    randomGaussian() * window.innerHeight / deviation -
    window.innerHeight / (deviation * 2);

  return from.clone().add(new Point(x, y));
};

/**
 * Calculate continious point based on previous curve
 * @param {Point} p1 - Firs point of previous curve
 * @param {Point} p2 - Second point of previous curve
 * @param {Point} q2 - Point to go to
 * @returns {Point} New point
 */
export const generateContinuePoint = (p2, p3) =>
  p3
    .clone()
    .remove(p2)
    .add(p3);

/**
 * Create a new Curve
 * @param {any} ctx - Context to draw to
 * @param {Point} next - Next point to draw to continue previous curve
 */
export const generateCurve = prevCurve => {
  const p1 = prevCurve.p2;
  const p2 = generateContinuePoint(prevCurve.p1, prevCurve.p2);
  const p3 = generateRandomPoint(p2);

  return new Curve(p1, p2, p3);
};

/**
 * Generate a new path based on the previous curve
 * @param {Curve} origin - Origin curve
 * @returns {}
 */
export const generatePath = color => {
  const points = [generateOriginCurve()];

  let point = points[0];
  while (point.p.x < window.innerWidth) {
    point = points[points.length - 1];
    points.push(generateCurve(point));
  }

  return points.map(point => point.color(color));
};

/**
 * Generate multiple paths
 * @param {number} colors - Amount of paths
 * @param {Curve} origin - Origin curve
 */
export const generatePaths = amount =>
  Array(amount)
    .fill(0)
    .map(generatePath);

/**
 * Create an origin curve
 * @param {number} winHeight - Window height
 * @param {number} lineWidth - Line size
 * @returns {Point} Origin point
 */
export const generateOriginCurve = () => {
  const winHeight = window.innerHeight;
  const originX = -10;
  const originY = Math.random() * winHeight / 1.8 + winHeight * 0.25;

  const point = new Point(originX, originY);
  const point2 = generateRandomPoint(point);
  const point3 = generateRandomPoint(point2);
  return new Curve(point, point2, point3);
};
