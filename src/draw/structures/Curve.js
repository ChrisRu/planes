import { getCurrentPos, calculateAngle, getGradient } from '../util';

/**
 * Curve on the canvas
 */
export default class Curve {
  /**
   * Create a curve using 3 positions
   * @param p {Point} Original position
   * @param p1 {Point} Control point 1
   * @param p2 {Point} Control point 2
   */
  constructor(p, p1, p2) {
    this.p = p;
    this.p1 = p1;
    this.p2 = p2;
    this.image = new Image();
    this.image.src = 'plane.svg';
    this.image.width = 20;
    this.image.height = 20;
  }

  get points() {
    return [this.p, this.p1, this.p2];
  }

  /**
   * Draw the curve to a context
   * @param ctx {any} Context of a canvas to draw to 
   * @param curveIndex {number} Index of the curve
   * @param index {number} Index of part of the curve
   * @param percent {number} Percentage of partial curve passed
   * @param color {string} Color of the curve
   * @param offsetX {number} X offset
   */
  draw(ctx, curveIndex, index, percent, color) {
    const { p, p1, p2 } = this;
    const x = Math.min(p.x, p1.x, p2.x);
    const width = p2.x - p.x;
    
    ctx.bezierCurveTo(p.x, p.y, p1.x, p1.y, p2.x, p2.y);
    ctx.strokeStyle = getGradient(
      ctx,
      '#1C1D22',
      curveIndex,
      index,
      x,
      width,
      percent
    );
    ctx.lineWidth = 15;
    ctx.stroke();

    ctx.strokeStyle = getGradient(
      ctx,
      color,
      curveIndex,
      index,
      x,
      width,
      percent
    );
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  /**
   * Draw a plane in the right place
   * @param {any} ctx - Context of canvas to draw to
   * @param {number} percent - Percentage plane flown on curve
   */
  drawPlane(ctx, percent) {
    const p1 = getCurrentPos(this.p, this.p1, this.p2, percent);
    const p2 = getCurrentPos(this.p, this.p1, this.p2, percent + 0.01);
    const angle = calculateAngle(p2, p1);
    const imgSize = 60;
    const imgPos = imgSize * -0.5;

    ctx.save();
    ctx.translate(p1.x, p1.y);
    ctx.rotate(-angle);
    ctx.drawImage(this.image, imgPos, imgPos, imgSize, imgSize);
    // ctx.drawImage(this.image, p1.x, p1.y, imgSize, imgSize);
    ctx.restore();
  }

  /**
   * Color of the path
   * @param {string} color 
   */
  color(color) {
    this.color = color;
    return this;
  }

  /**
   * Clone the curve
   * @returns {Curve} A new curve with the same data
   */
  clone() {
    return new Curve(this.p, this.p1, this.p2);
  }
}
