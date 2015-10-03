const {cartesianToAngle} = require('./polar');

function Circle(center, radius) {
  return {
    center: center,
    radius: radius,
    getPointAtAngle(angle){
      return {
        x: center.x + radius * Math.sin(angle),
        y: center.y - radius * Math.cos(angle)
      }
    },
    getAngleFromPoint(point) {
      const xAroundCircle = point.x - center.x;
      const yAroundCircle = -(point.y - center.y);
      return cartesianToAngle(xAroundCircle, yAroundCircle)
    }
  }
}

export default Circle
