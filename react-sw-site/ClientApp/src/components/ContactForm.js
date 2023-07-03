import React, { useState, useEffect } from 'react';

const ContactForm = ({ onSubmit, onCancel, selectedContact }) => {
    const [formData, setFormData] = useState({
        contactName: '',
        contactPosition: '',
        contactPhoneNum: '',
        contactEmailAdd: '',
        contactFaxNum: '',
        contactNotes: '',
    });

    useEffect(() => {
        if (selectedContact) {
            setFormData(selectedContact);
        } else {
            setFormData({
                contactName: '',
                contactPosition: '',
                contactPhoneNum: '',
                contactEmailAdd: '',
                contactFaxNum: '',
                contactNotes: '',
            });
        }
    }, [selectedContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>{selectedContact ? 'Edit Contact' : 'Add New Contact'}</h4>
            <div className="d-flex mb-3">
                <label htmlFor="contactName" className="me-3">Name</label>
                <input type="text" className="flex-fill" id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} required />
            </div>
            <div className="d-flex mb-3">
                <label htmlFor="contactPosition" className="me-3">Position</label>
                <input type="text" className="flex-fill" id="contactPosition" name="contactPosition" value={formData.contactPosition} onChange={handleChange} />
            </div>
            <div className="d-flex mb-3">
                <label htmlFor="contactPhoneNum" className="me-3">Phone Number</label>
                <input type="text" className="flex-fill" id="contactPhoneNum" name="contactPhoneNum" value={formData.contactPhoneNum} onChange={handleChange} />
            </div>
            <div className="d-flex mb-3">
                <label htmlFor="contactEmailAdd" className="me-3">Email Address</label>
                <input type="email" className="flex-fill" id="contactEmailAdd" name="contactEmailAdd" value={formData.contactEmailAdd} onChange={handleChange} />
            </div>
            <div className="d-flex mb-3">
                <label htmlFor="contactFaxNum" className="me-3">Fax Number</label>
                <input type="text" className="flex-fill" id="contactFaxNum" name="contactFaxNum" value={formData.contactFaxNum} onChange={handleChange} />
            </div>
            <div className="d-flex mb-3">
                <label htmlFor="contactNotes" className="me-3">Extra Notes</label>
                <textarea className="flex-fill" id="contactNotes" name="contactNotes" value={formData.contactNotes} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
            <button type="button" className="btn btn-secondary mb-3 ms-3" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default ContactForm;
