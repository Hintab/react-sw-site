import React, { useState } from 'react';
import Select from 'react-select';
import { Accordion, Card } from 'react-bootstrap';

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
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>TAB 1</Accordion.Header>
                    <Accordion.Body>
                        This is the first tab body
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>TAB 2</Accordion.Header>
                    <Accordion.Body>
                        This is the second tab body
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default TestPage;
