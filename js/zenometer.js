const React = require('react');

function Scale(min, max, height) {
  return {
    at(pin) {
      return (max - pin)/(max - min) * height;
    }
  };
}

const Range = React.createClass({
  render() {
    const {min, max} = this.props;
    const width = 5;

    return (
      <path className="pin" d={`M ${width} ${max} L ${1} ${max} L ${1} ${min} L ${width} ${min}`} />
    )
  }
});

const Zenometer = React.createClass({
  render() {
    const {time, astronomy} = this.props;
    const sunPosition = astronomy.getSunPosition(time);

    const width = 32;
    const height = 512;

    const radianAltitudeScale = new Scale(-Math.PI/2, Math.PI/2, 512);

    const pinPosition = radianAltitudeScale.at(sunPosition.altitude);
    const positionRange = astronomy.getSunPositionRange(time);
    const maxPosition = radianAltitudeScale.at(positionRange[0]);
    const minPosition = radianAltitudeScale.at(positionRange[1]);

    return (
      <svg xmlns="http://www.w3.org/svg/2000"
           viewBox={`0 0 ${width} ${height}`}
           width={width}
           height={height}
           className="zenometer">
        <rect className="area day" x={0} y={0} width={width} height={height/2} />
        <rect className="area night" x={0} y={height/2} width={width} height={height/2} />

        <rect className="area civil-twilight" x={0} y={height/2} width={width} height={6/180 * height} />
        <rect className="area nautical-twilight" x={0} y={height/2 + 6/180 * height} width={width} height={6/180 * height} />
        <rect className="area astronomical-twilight" x={0} y={height/2 + 12/180 * height} width={width} height={6/180 * height} />

        <path className="pin" d={`M ${10} ${pinPosition} L ${width} ${pinPosition}`} />
        <Range min={minPosition} max={maxPosition} />
      </svg>
    );
  }
});

export default Zenometer;
