function Circle(center, radius) {
  return {
    center: center,
    radius: radius,
    getPointAtAngle(angle){
      return {
        x: center.x + radius * Math.sin(angle),
        y: center.y - radius * Math.cos(angle)
      }
    }
  }
}

export default Circle
