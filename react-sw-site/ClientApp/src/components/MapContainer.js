import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Accordion, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const mapStyles = {
    width: '100%',
    height: '100%',
};

export class MapContainer extends Component {
    state = {
        locations: [],
        activeMarker: null,
        selectedPlace: null,
        geocoder: null,
        activeAccordionIndex: -1,
        center: { lat: 39.7684, lng: -86.1581 },
        serviceTags: {}, // Add the serviceTags state variable here
    };


    componentDidMount() {
        this.setState({ geocoder: new window.google.maps.Geocoder() });

        fetch('api/LocCoord')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ locations: data });
                console.log(this.state.locations);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // Fetch service names from the cross-reference table
        fetch('api/ServiceTags')
            .then((response) => response.json())
            .then((data) => {
                const serviceTags = {};
                data.forEach((tag) => {
                    serviceTags[tag.id] = tag.service_Name;
                });
                this.setState({ serviceTags });
                console.log(this.state.serviceTags);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    onAccordionHeaderClick = (longitude, latitude, index) => {
        if (index === this.state.activeAccordionIndex) {
            this.setState({
                activeMarker: null,
                selectedPlace: null,
                activeAccordionIndex: -1,
            });
        } else {
            const newCenter = { lat: latitude, lng: longitude };
            const { locations } = this.state;
            const selectedLocation = locations[index];
            const marker = this.getMarkerByLocation(selectedLocation);

            this.setState({
                activeMarker: marker,
                selectedPlace: { name: selectedLocation.loc_Name, address: selectedLocation.loc_Address },
                activeAccordionIndex: index,
                center: newCenter,
            });
        }
    };


    onMarkerClick = (props, marker) => {
        const { locations } = this.state;
        const selectedLocation = locations.find((location) => location.loc_Name === props.name);

        this.setState({
            activeMarker: marker,
            selectedPlace: { name: selectedLocation.loc_Name, address: selectedLocation.loc_Address },
            activeAccordionIndex: locations.indexOf(selectedLocation),
            center: marker.position,
        });
    };

    getMarkerByLocation = (location) => {
        const { google } = this.props;
        const { locations } = this.state;

        const index = locations.findIndex((loc) => loc === location);
        const markerRef = this[`marker_${index}`];

        return markerRef && markerRef.marker
            ? markerRef.marker
            : new google.maps.Marker({ position: { lat: location.latitude, lng: location.longitude } });
    };

    render() {
        const { google } = this.props;
        const {
            locations,
            activeMarker,
            selectedPlace,
            activeAccordionIndex,
            center,
            serviceTags,
        } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                    <Accordion activeKey={activeAccordionIndex.toString()}>
                        {locations.map((location, index) => (
                            <Card key={index}>
                                <Accordion.Item eventKey={index.toString()}>
                                    <Accordion.Header
                                        onClick={() =>
                                            this.onAccordionHeaderClick(
                                                location.longitude,
                                                location.latitude,
                                                index
                                            )
                                        }
                                        eventKey={index.toString()}
                                    >
                                        {location.loc_Name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div>
                                            <strong>Address:</strong> {location.loc_Address}
                                        </div>
                                        <div>
                                            <strong>Phone Number:</strong> {location.phone_Num}
                                        </div>
                                        <div>
                                            <strong>Service Tags:</strong>{' '}
                                            {location.service_Tags.split(',').map((tag) => serviceTags[parseInt(tag, 10)]).join(', ')}
                                        </div>
                                        <div>
                                            <div class="col">
                                                <Link to={`/ContactDetails/${location.id}`}>Details</Link>
                                            </div>
                                            <div class="col">
                                                <Link to={`/EditData/${location.id}`}>Edit</Link>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Card>
                        ))}
                    </Accordion>
                    </div>
                <div class="col-lg-8 col-md-11 position-relative map-container">
                    <Map
                        google={google}
                        zoom={11}
                        style={mapStyles}
                        initialCenter={center}
                        center={center}
                    >
                        {locations.map((location, index) => {
                            const marker = this.getMarkerByLocation(location);
                            return (
                                <Marker
                                    key={index}
                                    ref={(ref) => (this[`marker_${index}`] = ref)}
                                    name={location.loc_Name}
                                    position={{ lat: location.latitude, lng: location.longitude }}
                                    onClick={this.onMarkerClick}
                                    icon={{
                                        url:
                                            activeMarker && activeMarker.name === location.loc_Name
                                                ? 'https://maps.google.com/mapfiles/ms/micons/green-dot.png'
                                                : 'https://maps.google.com/mapfiles/ms/micons/red-dot.png',
                                        anchor: new google.maps.Point(
                                            activeMarker && activeMarker.name === location.loc_Name ? 24 : 16,
                                            activeMarker && activeMarker.name === location.loc_Name ? 48 : 32
                                        ),
                                        scaledSize:
                                            activeMarker && activeMarker.name === location.loc_Name
                                                ? new google.maps.Size(48, 48)
                                                : new google.maps.Size(32, 32), // Adjust the size of inactive markers here
                                    }}
                                />
                            );

                        })}

                        <InfoWindow
                            marker={activeMarker}
                            visible={Boolean(activeMarker)}
                            onClose={() =>
                                this.setState({
                                    activeMarker: null,
                                    selectedPlace: null,
                                    activeAccordionIndex: -1,
                                })
                            }
                        >
                            <div>
                                <h3>{selectedPlace && selectedPlace.name}</h3>
                                <h6>{selectedPlace && selectedPlace.address}</h6>
                            </div>
                        </InfoWindow>
                        </Map>
                    </div>

                </div>
            </div>
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAYim6O-QhgNWuL-ZZSQPo-nyLqe4Uvg-c',
})(MapContainer);
