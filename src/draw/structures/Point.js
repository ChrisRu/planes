/**
 * Point on the canvas
 */
export default class Point {
  /**
   * Create a point using an X and Y position
   * @param {number} x - X position 
   * @param {number} y - Y position 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Add a point
   * @param {Point} point - Point to add to the point 
   */
  add(point) {
    this.x += point.x;
    this.y += point.y;
    return this;
  }

  /**
   * Substract a point
   * @param {Point} point - Point to substract from the point
   */
  remove(point) {
    this.x -= point.x;
    this.y -= point.y;
    return this;
  }

  /**
   * Clone the point
   * @returns {Point} New point with the same data
   */
  clone() {
    return new Point(this.x, this.y);
  }
}
