import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' },
];

const TestPage = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSelect = (selectedValues) => {
        setSelectedOptions(selectedValues);
    };

    return (
        <div>
            <h1>Multi-Select Dropdown</h1>
            <Select
                options={options}
                value={selectedOptions}
                onChange={handleSelect}
                isMulti
            />
            <div>
                Selected Options:
                {selectedOptions.map((option) => (
                    <span key={option.value}> {option.label},</span>
                ))}
            </div>
        </div>
    );
};

export default TestPage;
