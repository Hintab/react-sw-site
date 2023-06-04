import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const LocationAddressForm = ({ onAddressChange, onAddressSelect }) => {
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSelect = async (value) => {
        try {
            setErrorMessage('');
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            onAddressSelect({
                address: results[0].formatted_address,
                latitude: latLng.lat,
                longitude: latLng.lng,
            });
        } catch (error) {
            console.log('Error occurred while geocoding:', error);
            setErrorMessage('Error occurred while geocoding. Please try again.');
        }
    };

    const handleAddressChange = (value) => {
        setAddress(value);
        onAddressChange(value);
    };

    return (
        <PlacesAutocomplete value={address} onChange={handleAddressChange} onSelect={handleSelect}>
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
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default LocationAddressForm;
