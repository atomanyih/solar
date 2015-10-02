const React = require('react');

export default React.createClass({
  componentDidMount() {
    const {coordinates: {latitude, longitude}, onUpdatePosition} = this.props;

    var customMapType = new google.maps.StyledMapType([
      {
        stylers: [
          {hue: '#C4DBFF'},
          {visibility: 'simplified'},
          {gamma: 0.5},
          {weight: 0.5}
        ]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      },
      {
        featureType: 'water',
        stylers: [{color: '#1f252d'}]
      }
    ], {
      name: 'Custom Style'
    });

    var customMapTypeId = 'custom_style';

    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: latitude, lng: longitude},
      scrollwheel: false,
      zoom: 8,
      mapTypeControlOptions: {mapTypeIds: []},
      streetViewControl: false
    });

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      map: map
    });

    map.addListener('click', (e) => {
      var latLng = e.latLng;
      marker.setPosition(latLng);
      map.panTo(latLng);

      onUpdatePosition(latLng.lat(), latLng.lng())
    });
  },
  render() {
    return (
      <div id="map"/>
    )
  }
})
