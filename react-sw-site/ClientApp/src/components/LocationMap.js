import React from 'react';
import { Map, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '80vh',
};

const LocationMap = (props) => {
    const {
        google,
        filteredLocations,
        activeMarker,
        selectedPlace,
        onMarkerClick,
        center,
    } = props;

    return (
        <div className="col-lg-8 col-md-11 position-relative map-container">
            <Map google={google} zoom={11} style={mapStyles} initialCenter={center} center={center}>
                {filteredLocations.map((location, index) => (
                    <Marker
                        key={index}
                        name={location.loc_Name}
                        position={{ lat: location.latitude, lng: location.longitude }}
                        onClick={onMarkerClick}
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
    );
};

export default LocationMap;
