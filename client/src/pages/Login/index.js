import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import Footer from '../../partials/Footer';

import api from '../../services/api';

import './style.css';

import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

export default function Login() {
    // ID state for form data.
    const [id, setId] = useState('');

    // History for redirect.
    const history = useHistory();

    /**
     * Handles the form.
     * 
     * @param {*} event Event from form submit.
     */
    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('organization_id', id);
            localStorage.setItem('organization_name', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Login failed. Try again.');
        }
    }

    return (
        <div className="wrapper">
            <main className="login-container">
                <section className="form">
                    <img src={logoImage} alt="Be The Hero" />

                    <form onSubmit={handleLogin}>
                        <h1>Make your access</h1>

                        <input 
                            placeholder="Your ID"
                            value={id}
                            onChange={event => setId(event.target.value)}
                        />
                        <button className="button" type="submit">Login</button>
    
                        <Link to="/register" className="main-link">
                        <FiLogIn size={16} color="#E02041" />
                        I have no registration
                        </Link>
                    </form>
                </section>
                <img src={heroesImage} alt="Heroes" className="heroes" />
            </main>
            <Footer />
        </div>
    );
}