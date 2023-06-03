import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '80%',
    height: '80%'
};

export class MapContainer extends Component {
    state = {
        locations: [],
        activeMarker: null,
        selectedPlace: null,
        geocoder: null
    };

    componentDidMount() {
        this.setState({ geocoder: new window.google.maps.Geocoder() });

        fetch('api/LocCoord')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ locations: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    onMarkerClick = (props, marker, e) => {
        const { geocoder } = this.state;

        geocoder.geocode({ location: marker.position }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    const address = results[0].formatted_address;
                    this.setState({
                        activeMarker: marker,
                        selectedPlace: { name: props.name, address }
                    });
                }
            } else {
                console.error('Geocode was not successful for the following reason: ' + status);
            }
        });
    };

    render() {
        const { google } = this.props;
        const { locations, activeMarker, selectedPlace } = this.state;

        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '0 0 10%', padding: '10px' }}>
                    {selectedPlace && (
                        <div>
                            {locations.map((location, index) => (
                            <h3>{location.name}</h3>
                            ))}
                            <p>{selectedPlace.address}</p>
                        </div>
                    )}
                </div>
                <div style={{ flex: '1' }}>
                    <Map
                        google={google}
                        zoom={11}
                        style={mapStyles}
                        initialCenter={{ lat: 39.7684, lng: -86.1581 }}
                    >
                        {locations.map((location, index) => (
                            <Marker
                                key={index}
                                name={location.name}
                                position={{ lat: location.latitude, lng: location.longitude }}
                                onClick={this.onMarkerClick}
                            />
                        ))}
                    </Map>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDvsWr7a88qVT1KGFdPynD6MAcEA5NvjEw'
})(MapContainer);
