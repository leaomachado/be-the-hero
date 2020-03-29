import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImage from '../../assets/logo.svg';

export default function Register() {
    // States for form data.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    // History for redirect.
    const history = useHistory();

    /**
     * Handles the form.
     * 
     * @param {*} event Event from form submit.
     */
    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            phone,
            city,
            state
        };

        try {
            const response = await api.post('organizations', data);

            alert(`Your access ID:: ${response.data.id}`);

            history.push('/');
        } catch (error) {
            alert('Registration error. Please try again.');
        }
    }

    return (
        <div className="register-container">
            <main>
                <section>
                    <img src={logoImage} alt="Be The Hero" />

                    <h1>Register</h1>
                    <p>Make your registration, enter the platform and help to find the incidents of your NGO.</p>

                    <Link to="/" className="main-link">
                        <FiArrowLeft size="16" color="#E02041" />
                        Back to login
                    </Link>
                </section>
                
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Name of the NGO"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />

                    <input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />

                    <input
                        placeholder="WhatsApp"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="City"
                            value={city}
                            onChange={event => setCity(event.target.value)}
                        />

                        <input
                            placeholder="FS"
                            style={{ width: 80 }}
                            value={state}
                            onChange={event => setState(event.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Register</button>
                </form>
            </main>
        </div>
    );
}