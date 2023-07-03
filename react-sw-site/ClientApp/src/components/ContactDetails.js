import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from './ContactForm';

const ContactDetails = (props) => {
    const { id } = useParams();
    const [locContactDetails, setLocContactDetails] = useState([]);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetchLocContactDetails(id);
    }, [id]);

    const fetchLocContactDetails = async (id) => {
        try {
            const response = await fetch(`/api/LocContactDetails/${id}`);
            const data = await response.json();
            setLocContactDetails(data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleDeleteContact = async (contactID, contactName) => {
        const enteredName = window.prompt(`Please enter the contact's name (${contactName}) to confirm deletion:`);
        if (enteredName === contactName) {
            try {
                const response = await fetch(`/api/LocContactDetails/${contactID}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    const updatedContactDetails = locContactDetails.filter((contact) => contact.contactID !== contactID);
                    setLocContactDetails(updatedContactDetails);
                    window.location.reload();
                } else {
                    console.log('Failed to delete contact:', response.statusText);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            window.alert('Confirmation failed. The contact name does not match.');
        }
    };

    const handleAddContact = () => {
        setSelectedContact(null);
        setIsAddFormVisible(true);
    };

    const handleEditContact = (contact) => {
        setSelectedContact(contact);
        setIsAddFormVisible(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            formData.locID = id;

            if (selectedContact) {
                const response = await fetch(`/api/LocContactDetails/${selectedContact.contactID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setSelectedContact(null);
                    setIsAddFormVisible(false);
                    window.location.reload();
                } else {
                    console.log('Failed to update contact:', response.statusText);
                }
            } else {
                const response = await fetch('/api/LocContactDetails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setIsAddFormVisible(false);
                    window.location.reload();
                } else {
                    console.log('Failed to add contact:', response.statusText);
                }
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleCancelForm = () => {
        setIsAddFormVisible(false);
    };

    return (
        <div>
            <div className="list-group">
                {locContactDetails.length > 0 ? (
                    locContactDetails.map((contact) => (
                        <div key={contact.contactID} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {contact.contactName && <h5 className="mb-1">Name: {contact.contactName}</h5>}
                                {contact.contactPosition && <p className="mb-1">Position: {contact.contactPosition}</p>}
                                {contact.contactPhoneNum && <p className="mb-1">Phone Number: {contact.contactPhoneNum}</p>}
                                {contact.contactEmailAdd && <p className="mb-1">Email Address: {contact.contactEmailAdd}</p>}
                                {contact.contactFaxNum && <p className="mb-1">Fax Number: {contact.contactFaxNum}</p>}
                                {contact.contactNotes && <p className="mb-1">Extra Notes: {contact.contactNotes}</p>}
                            </div>
                            <div>
                                <button className="btn btn-primary me-2" onClick={() => handleEditContact(contact)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDeleteContact(contact.contactID, contact.contactName)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Contacts Entered!</p>
                )}
            </div>
            {isAddFormVisible ? (
                <ContactForm onSubmit={handleFormSubmit} onCancel={handleCancelForm} selectedContact={selectedContact} />
            ) : (
                <button className="btn btn-primary mt-3" onClick={handleAddContact}>Add Contact</button>
            )}
        </div>
    );
};

export default ContactDetails;
