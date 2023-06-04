import React, { useState } from 'react';

const PhoneNumberForm = ({ onPhoneNumberChange }) => {
    const [phoneNum, setPhoneNum] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePhoneNumChange = (event) => {
        const phoneNumber = event.target.value;
        setPhoneNum(phoneNumber);
        onPhoneNumberChange(phoneNumber);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/; // 10 digits with hyphens
        return phoneNumberPattern.test(phoneNumber);
    };

    const handleSubmit = () => {
        if (isValidPhoneNumber(phoneNum)) {
            setErrorMessage('');
            // Perform further actions with the valid phone number
        } else {
            setErrorMessage('Please enter a valid phone number. (123-456-7890)');
        }
    };

    return (
        <div>
            <div className="d-flex mb-3">
                <label className="me-3" htmlFor="PhoneNum">
                    Phone Number:
                </label>
                <input
                    className="flex-fill"
                    type="text"
                    id="PhoneNum"
                    placeholder="123-456-7890"
                    value={phoneNum}
                    onChange={handlePhoneNumChange}
                />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default PhoneNumberForm;
