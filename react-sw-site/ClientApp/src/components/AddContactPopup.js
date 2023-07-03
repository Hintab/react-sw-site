import React, { useState } from 'react';

const AddContactPopup = ({ onClose, onAddContact }) => {
    const [newContact, setNewContact] = useState({
        contactName: '',
        contactPosition: '',
        contactPhoneNum: '',
        contactEmailAdd: '',
        contactFaxNum: '',
        contactNotes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddContact(newContact);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <h4>Add New Contact</h4>
                <form onSubmit={handleSubmit}>
                    {/* Form fields for new contact */}
                    <div>
                        <label htmlFor="contactName">Name:</label>
                        <input
                            type="text"
                            id="contactName"
                            name="contactName"
                            value={newContact.contactName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Add other input fields for contact details */}
                    <button type="submit">Add Contact</button>
                </form>
            </div>
        </div>
    );
};

export default AddContactPopup;
