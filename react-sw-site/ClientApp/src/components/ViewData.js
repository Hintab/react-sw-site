import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Select from 'react-select';
import { useParams, useNavigate } from 'react-router-dom';


const ViewData = (props) => {
    const [locations, setLocations] = useState([]);
    const [activeMarker, setActiveMarker] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [address, setAddress] = useState('');
    const [locationName, setLocationName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [mapStyles, setMapStyles] = useState({
        width: '100%',
        height: '100%',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [serviceTags, setServiceTags] = useState([]);
    const [selectedServiceTags, setSelectedServiceTags] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
   

    useEffect(() => {
        let options; // Declare the options variable

        fetch('api/ServiceTags')
            .then((response) => response.json())
            .then((data) => {
                options = data.map((tag) => ({ value: tag.id, label: tag.service_Name }));
                setServiceTags(options);
                console.log(options);
                if (id) {
                    fetchLocationData(id, options); // Pass options as a parameter
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);



    const handleSelect = async (value) => {
        // Clear any previous error message
        setErrorMessage('');

        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setActiveMarker(null);
        setSelectedPlace({
            name: value,
            address: results[0].formatted_address,
            latitude: latLng.lat,
            longitude: latLng.lng,
        });
        setLocations([{ name: locationName, latitude: latLng.lat, longitude: latLng.lng }]);
        setAddress(value);
        setShowSubmitButton(true);
    };

    const handleSubmit = async () => {
        try {
            const results = await geocodeByAddress(address);
            const selectedFormattedAddress = results[0].formatted_address;

            if (
                selectedPlace &&
                selectedPlace.address === selectedFormattedAddress &&
                countCommas(address) >= 3
            ) {
                if (isValidPhoneNumber(phoneNum)) {
                    // Convert latitude and longitude to strings with 8 digits after the decimal
                    const latitude = selectedPlace.latitude.toFixed(8);
                    const longitude = selectedPlace.longitude.toFixed(8);


                    // Convert selected service tags to a comma-delimited string
                    const serviceTagsString = selectedServiceTags.map((tag) => tag.value).join(',');

                    // Create the location data object
                    const locationData = {
                        Loc_Name: locationName,
                        Loc_Address: selectedFormattedAddress,
                        Latitude: latitude,
                        Longitude: longitude,
                        Phone_Num: phoneNum,
                        Service_Tags: serviceTagsString,
                    };
                    console.log(locationData);

                    if (id) {
                        // If ID exists, update the existing location
                        await fetch(`api/LocCoord/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(locationData),
                        });
                        console.log('Location data updated successfully.');
                        // Perform any further actions after successful update
                        navigate('/map');
                    } else {
                        // If ID doesn't exist, create a new location
                        await fetch('api/LocCoord', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(locationData),
                        });
                        console.log('Location data submitted successfully.');
                        // Perform any further actions after successful submission
                        navigate('/map');
                    }
                } else {
                    setErrorMessage('Please enter a valid phone number. (123-456-7890)');
                }
            } else {
                setErrorMessage('Please select a valid address with at least 3 commas.');
            }
        } catch (error) {
            console.log('Error occurred while geocoding:', error);
            setErrorMessage('Error occurred while geocoding. Please try again.');
        }
    };




    const fetchLocationData = async (id, options) => {
        try {
            const response = await fetch(`api/LocCoord/${id}`);
            const data = await response.json();
            setLocationName(data.loc_Name);
            setAddress(data.loc_Address);
            setPhoneNum(data.phone_Num);
            const latitude = parseFloat(data.latitude);
            const longitude = parseFloat(data.longitude);
            setSelectedPlace({
                name: data.loc_Name,
                address: data.loc_Address,
                latitude,
                longitude,
            });
            setLocations([{ name: data.loc_Name, latitude, longitude }]);
            setShowSubmitButton(true);

            const tagIds = data.service_Tags.split(',');

            // Find the corresponding service tag labels based on the tag IDs
            const selectedTags = tagIds.map((tagId) => {
                const selectedTag = options.find((option) => option.value === parseInt(tagId));
                return selectedTag ? selectedTag : null;
            });

            setSelectedServiceTags(selectedTags); // Set the selected service tags
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleLocationNameChange = (event) => {
        setLocationName(event.target.value);
    };

    const handlePhoneNumChange = (event) => {
        setPhoneNum(event.target.value);
    };

    const countCommas = (str) => {
        return (str.match(/,/g) || []).length;
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/; // 10 digits with hyphens
        return phoneNumberPattern.test(phoneNumber);
    };


    function getIDFromURL() {
        const url = window.location.href; // Get the current URL
        const urlParams = new URLSearchParams(url.split('?')[1]); // Extract query parameters from the URL

        // Assuming the ID is passed as a query parameter with the key 'id'
        const id = urlParams.get('id');

        return id;
    }


    useEffect(() => {
        const id = getIDFromURL(); // Implement this function to extract the ID from the URL
        if (id) {
            fetchLocationData(id);
        }
    }, []);

    useEffect(() => {
        if (address) {
            const geocodeAddress = async () => {
                try {
                    const results = await geocodeByAddress(address);
                    const latLng = await getLatLng(results[0]);
                    setSelectedPlace({
                        name: address,
                        address: results[0].formatted_address,
                        latitude: latLng.lat,
                        longitude: latLng.lng,
                    });
                } catch (error) {
                    console.log('Error occurred while geocoding:', error);
                }
            };
            geocodeAddress();
        }
    }, [address]);

    const handleMultiSelectChange = (selectedOptions) => {
        setSelectedServiceTags(selectedOptions);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-11 mt-3">
                    <div className="d-flex mb-3">
                        <label className="me-3" htmlFor="LocName">
                            Location Name:
                        </label>
                        <input className="flex-fill" type="text" id="LocName" placeholder="Enter Location Name" value={locationName} onChange={handleLocationNameChange} />
                    </div>
                    <PlacesAutocomplete id="LocAdd" value={address} onChange={setAddress} onSelect={handleSelect}>
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div className="position-relative">
                                <div className="d-flex mb-3">
                                    <label className="me-3" htmlFor="LocAdd">
                                        Location Address:
                                    </label>
                                    <input className="flex-fill" {...getInputProps({ placeholder: 'Enter Address' })} />
                                </div>
                                {loading && <div>Loading...</div>}
                                {suggestions.length > 0 && (
                                    <div className="suggestions-dropdown">
                                        {suggestions.map((suggestion, index) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                            };
                                            return (
                                                <div key={index} {...getSuggestionItemProps(suggestion, { style })} className="suggestion-item">
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <div className="d-flex mb-3">
                        <label className="me-3" htmlFor="PhoneNum">
                            Phone Number:
                        </label>
                        <input className="flex-fill" type="text" id="PhoneNum" placeholder="123-456-7890" value={phoneNum} onChange={handlePhoneNumChange} />
                    </div>
                    <div className="d-flex mb-3">
                        <label className="me-3" htmlFor="ServiceTags">
                            Services:
                        </label>
                        <Select
                            id="ServiceTags"
                            className="flex-fill"
                            type="text"
                            placeholder="Select Services One or Multiple"
                            isMulti
                            options={serviceTags}
                            value={selectedServiceTags}
                            onChange={handleMultiSelectChange}
                        />
                    </div>

                    {showSubmitButton && <button onClick={handleSubmit}>Submit</button>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
                <div className="col-lg-3 col-md-11 position-relative map-container">
                    <Map
                        google={props.google}
                        zoom={11}
                        style={mapStyles}
                        initialCenter={{
                            lat: selectedPlace ? selectedPlace.latitude : 39.7684,
                            lng: selectedPlace ? selectedPlace.longitude : -86.1581,
                        }}
                        center={{
                            lat: selectedPlace ? selectedPlace.latitude : 39.7684,
                            lng: selectedPlace ? selectedPlace.longitude : -86.1581,
                        }}
                    >
                        {locations.map((location, index) => (
                            <Marker key={index} name={location.name} position={{ lat: location.latitude, lng: location.longitude }} />
                        ))}
                    </Map>
                </div>
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAYim6O-QhgNWuL-ZZSQPo-nyLqe4Uvg-c',
})(ViewData);
