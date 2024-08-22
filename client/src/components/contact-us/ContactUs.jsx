import React, { useState } from 'react';
import './contactUs.css';

import { useNavigate } from 'react-router-dom';
import valitadeInputs from '../../util/validateFormInputs';

function ContactUs() {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let contactUsInput = valitadeInputs.validateContactUs(formData);

        if (Object.keys(contactUsInput).length > 0) {
            setErrors(contactUsInput);
            return;
        }

        console.log('Email recieved:', formData);
        navigate('/')
    };

    return (
        <div className="contact-us">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='name'
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='email'
                        value={formData.email}
                        onChange={handleChange}
                  
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder='message'
                        value={formData.message}
                        onChange={handleChange}
                
                    ></textarea>
                    {errors.message && <p className="error">{errors.message}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;
