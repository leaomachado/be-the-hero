import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImage from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    
    const organizationId = localStorage.getItem('organization_id');

    /**
     * Handles the form.
     * 
     * @param {*} event Event from form submit.
     */
    async function handleNewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: organizationId
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Error when registering new case. Try again.');
        }
    }

    return (
        <div className="register-container">
            <main>
                <section>
                    <img src={logoImage} alt="Be The Hero" />

                    <h1>Register new case</h1>
                    <p>Describe the case in detail to find a hero to solve it.</p>

                    <Link to="/profile" className="main-link">
                        <FiArrowLeft size="16" color="#E02041" />
                        Back to home
                    </Link>
                </section>
                
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Incident title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <input
                        placeholder="Dollar value"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />

                    <button className="button" type="submit">Register</button>
                </form>
            </main>
        </div>
    );
}
