import React from 'react';
import Select from 'react-select';

const LocationFilter = (props) => {
    const {
        locationNameFilter,
        selectedServiceTags,
        handleLocationNameFilterChange,
        handleServiceTagChange,
        serviceTags,
        handleFilterClick,
    } = props;

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleFilterClick();
    };

    return (
        <div className="d-flex mb-3">
            <label className="me-3" htmlFor="locationNameFilter">
                Location Name Filter:
            </label>
            <input
                id="locationNameFilter"
                type="text"
                value={locationNameFilter}
                onChange={handleLocationNameFilterChange}
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
                onChange={handleServiceTagChange}
            />

            <button onClick={handleFormSubmit}>Search</button>
        </div>
    );
};

export default LocationFilter;
