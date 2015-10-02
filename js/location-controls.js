const React = require('react');
const Map = require('./map');

export default React.createClass({
  render() {
    const {coordinates, onUpdatePosition} = this.props;

    const controls = Map.withFallback(
      () => <Map coordinates={coordinates} onUpdatePosition={onUpdatePosition}/>,
      () => <div> nomap </div>
    );

    return(
      <div>
        {controls}
      </div>
    )
  }
})
