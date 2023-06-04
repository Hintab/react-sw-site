import React from 'react';
import Select from 'react-select';

const ServiceTagForm = ({ serviceTags, onServiceTagsChange }) => {
    const handleMultiSelectChange = (selectedOptions) => {
        onServiceTagsChange(selectedOptions);
    };

    return (
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
                onChange={handleMultiSelectChange}
            />
        </div>
    );
};

export default ServiceTagForm;
