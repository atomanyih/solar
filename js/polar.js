export function cartesianToAngle(xOrig, yOrig) {
  const y = xOrig;
  const x = yOrig;

  if (x > 0 && y >= 0) {
    return Math.atan(y / x);
  } else if(x > 0 && y < 0) {
    return Math.atan(y / x) + 2 * Math.PI;
  } else if (x < 0 && y >= 0) {
    return Math.atan(y / x) + Math.PI;
  } else if (x < 0 && y < 0) {
    return Math.atan(y / x) - Math.PI + 2 * Math.PI;
  } else if (x == 0 && y > 0) {
    return Math.PI / 2;
  } else if (x == 0 && y < 0) {
    return 3 * Math.PI / 2;
  } else if (x == 0 && y == 0) {

  }
}
