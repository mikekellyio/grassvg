/**
 * given a line segment, return the perpendicular segment
 * @param {Array[2]} a
 * @param {Array[2]} b
 */
export default function(a, b, length) {
  // Calculate perpendicular offset
  var ax = parseFloat(a[0]),
    ay = parseFloat(a[1]),
    bx = parseFloat(b[0]),
    by = parseFloat(b[1]);

  var dx = ax - bx;
  var dy = ay - by;

  var dist = Math.sqrt(dx * dx + dy * dy);

  var offset = dist / length;

  var normX = dx / dist;
  var normY = dy / dist;

  var xPerp = offset * normX;
  var yPerp = offset * normY;

  // Create perpendicular points
  var cx = ax + yPerp;
  var cy = ay - xPerp;
  dx = ax - yPerp;
  dy = ay + xPerp;

  return { x1: cx, y1: cy, x2: dx, y2: dy };
}
