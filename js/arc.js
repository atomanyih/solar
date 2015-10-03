const React = require('react');

function describeArc(circle, startAngle, endAngle){
  const {center: {x, y}, radius} = circle;

  var start = circle.getPointAtAngle(endAngle);
  var end = circle.getPointAtAngle(startAngle);

  if(endAngle > startAngle) {
    var arcSweep = endAngle - startAngle <= Math.PI ? "0" : "1";
  } else {
    var arcSweep = startAngle - endAngle >= Math.PI ? "0" : "1";
  }


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


    const startAngle = startTime.toAngle();
    const endAngle = endTime.toAngle();


    return (
      <path d={`${describeArc(circle, startAngle, endAngle)}`} {...others}/>
    );
  }
});

export default Arc;
