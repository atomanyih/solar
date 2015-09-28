const React = require('react');

function polarToCartesian(centerX, centerY, radius, angleInRadians) {
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var arcSweep = endAngle - startAngle <= Math.PI ? "0" : "1";

  var d = [
    "M", x, y,
    "L", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
    "L", x, y,

  ].join(" ");

  return d;
}

const Arc = React.createClass({
  render() {
    const {circle, startTime, endTime, ...others} = this.props;
    const {center, radius} = circle;

    const startAngle = startTime.toAngle();
    const endAngle = endTime.toAngle();

    return (
      <path d={`${describeArc(center.x, center.y, radius, startAngle, endAngle)}`} {...others}/>
    );
  }
});

export default Arc;