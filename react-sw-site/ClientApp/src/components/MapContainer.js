import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Accordion, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const mapStyles = {
    width: '100%',
    height: '80vh',
};

const accordionsContainerStyles = {
    height: '80vh',
    overflowY: 'auto',
};

const accordionStyles = {
    marginBottom: '10px',
};

export class MapContainer extends Component {
    state = {
        locations: [],
        activeMarker: null,
        selectedPlace: null,
        geocoder: null,
        activeAccordionIndex: -1,
        center: { lat: 39.7684, lng: -86.1581 },
        serviceTags: {},
        selectedServiceTags: [],
        filteredLocations: [],
        locationNameFilter: '', // State variable for location name filter
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

        fetch('api/ServiceTags')
            .then((response) => response.json())
            .then((data) => {
                const serviceTags = {};
                data.forEach((tag) => {
                    serviceTags[tag.id] = tag.service_Name;
                });
                this.setState({ serviceTags });
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
            const marker = this.getMarkerByName(selectedLocation.loc_Name);
            this.setState({
                activeMarker: marker,
                selectedPlace: { name: selectedLocation.loc_Name, address: selectedLocation.loc_Address },
                activeAccordionIndex: locations.indexOf(selectedLocation),
                center: newCenter,
            });
        }
    };

    getMarkerByName = (name) => {
        const { locations } = this.state;
        const markerIndex = locations.findIndex((location) => location.loc_Name === name);

        if (markerIndex !== -1) {
            const markerRef = this[`marker_${markerIndex}`];
            if (markerRef && markerRef.marker) {
                return markerRef.marker;
            }
        }

        return null;
    };

    onMarkerClick = (props, marker) => {
        const { filteredLocations } = this.state;
        const selectedLocation = filteredLocations.find(
            (location) => location.loc_Name === props.name
        );

        if (selectedLocation) {
            this.setState({
                activeMarker: marker,
                selectedPlace: {
                    name: selectedLocation.loc_Name,
                    address: selectedLocation.loc_Address,
                },
                activeAccordionIndex: filteredLocations.indexOf(selectedLocation),
                center: marker.position,
            });

            const accordionItem = document.getElementById(
                `accordion-item-${filteredLocations.indexOf(selectedLocation)}`
            );
            if (accordionItem) {
                accordionItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };


    handleServiceTagChange = (selectedOptions) => {
        this.setState({ selectedServiceTags: selectedOptions });
    };

    handleFilterClick = () => {
        const { locations, selectedServiceTags, locationNameFilter } = this.state;

        const filteredLocations = locations.filter((location) => {
            const locationServiceTags = location.service_Tags
                .split(',')
                .map((tag) => parseInt(tag.trim(), 10))
                .filter((tag) => !isNaN(tag)); // Exclude NaN values

            const hasMatchingTag = selectedServiceTags.every((selectedTag) =>
                locationServiceTags.includes(parseInt(selectedTag.value, 10))
            );

            const nameFilter = location.loc_Name.toLowerCase().includes(locationNameFilter.toLowerCase());

            return hasMatchingTag && nameFilter;
        });

        this.setState({ filteredLocations });
    };

    handleLocationNameFilterChange = (event) => {
        this.setState({ locationNameFilter: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleFilterClick();
    };

    render() {
        const { google } = this.props;
        const {
            filteredLocations,
            activeMarker,
            selectedPlace,
            activeAccordionIndex,
            center,
            serviceTags,
            selectedServiceTags,
            locationNameFilter,
        } = this.state;

        return (
            <div className="container">
                <div className="d-flex mb-3">
                    <form onSubmit={this.handleSubmit} className="d-flex">
                        <label className="me-3" htmlFor="locationNameFilter">
                            Location Name Filter:
                        </label>
                        <input
                            id="locationNameFilter"
                            type="text"
                            value={locationNameFilter}
                            onChange={this.handleLocationNameFilterChange}
                        />
                        <label className="me-3" htmlFor="serviceTags">
                            Services:
                        </label>
                        <Select
                            id="serviceTags"
                            className="flex-fill"
                            type="text"
                            placeholder="Select Services One or Multiple"
                            isMulti
                            options={Object.entries(serviceTags).map(([id, label]) => ({ value: id, label }))}
                            value={selectedServiceTags}
                            onChange={this.handleServiceTagChange}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="row">
                    <div className="col-3" style={accordionsContainerStyles}>
                        <Accordion activeKey={activeAccordionIndex.toString()}>
                            {filteredLocations.map((location, index) => (
                                <Card key={index} style={accordionStyles}>
                                    <Accordion.Item eventKey={index.toString()} id={`accordion-item-${index}`}>
                                        <Accordion.Header
                                            onClick={() =>
                                                this.onAccordionHeaderClick(location.longitude, location.latitude, index)
                                            }
                                            eventkey={index.toString()}
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
                                                {location.service_Tags
                                                    .split(',')
                                                    .map((tag) => serviceTags[parseInt(tag, 10)])
                                                    .join(', ')}
                                            </div>
                                            <div>
                                                <div className="col">
                                                    <Link to={`/ContactDetails/${location.id}`}>Details</Link>
                                                </div>
                                                <div className="col">
                                                    <Link to={`/EditData/${location.id}`}>Edit</Link>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Card>
                            ))}
                        </Accordion>
                    </div>
                    <div className="col-lg-8 col-md-11 position-relative map-container">
                        <Map google={google} zoom={11} style={mapStyles} initialCenter={center} center={center}>
                            {filteredLocations.map((location, index) => (
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
                                                : new google.maps.Size(32, 32),
                                    }}
                                />
                            ))}
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
