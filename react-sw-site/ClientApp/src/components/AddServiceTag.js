import React, { useState, useEffect } from 'react';

const AddServiceTag = () => {
    const [serviceName, setServiceName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [serviceTags, setServiceTags] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getServiceTags();
    }, []);

    const getServiceTags = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/ServiceTags');
            if (response.ok) {
                const serviceTagsData = await response.json();
                setServiceTags(serviceTagsData);
            } else {
                console.error('Failed to fetch service tags.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setServiceName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newServiceTag = {
            Service_Name: serviceName,
        };

        try {
            const response = await fetch('/api/ServiceTags', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newServiceTag),
            });

            if (response.ok) {
                setSuccessMessage('Service tag created successfully!');
                setErrorMessage('');
                setServiceName('');
                getServiceTags();
            } else {
                const errorMessage = await response.text();
                if (response.status === 409) {
                    setErrorMessage('Service tag already exists.');
                } else {
                    setErrorMessage(`Failed to create service tag: ${errorMessage}`);
                }
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error}`);
            setSuccessMessage('');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/ServiceTags/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setSuccessMessage('Service tag deleted successfully!');
                setErrorMessage('');
                getServiceTags();
            } else {
                const errorMessage = await response.text();
                setErrorMessage(`Failed to delete service tag: ${errorMessage}`);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error}`);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Add New Service Tag</h2>
            {successMessage && <div className="success">{successMessage}</div>}
            {errorMessage && <div className="error">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="serviceName">Service Name:</label>
                    <input
                        type="text"
                        id="serviceName"
                        value={serviceName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Add Service Tag</button>
            </form>

            <h2>All Service Tags</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : serviceTags.length === 0 ? (
                <p>No service tags found.</p>
            ) : (
                <ul>
                    {serviceTags.map((serviceTag) => (
                        <li key={serviceTag.ID}>
                            {serviceTag.service_Name}{' '}
                            <button onClick={() => handleDelete(serviceTag.ID)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddServiceTag;
