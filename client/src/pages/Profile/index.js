import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImage from '../../assets/logo.svg';

export default function Profile() {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);

    const organizationName = localStorage.getItem('organization_name');
    const organizationId = localStorage.getItem('organization_id');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: organizationId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [organizationId]);

    /**
     * Handles the delete incident button.
     * 
     * @param {*} id The incident ID.
     */
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: organizationId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Error deleting case. Try again.');
        }
    }

    /**
     * Handles the logout button.
     */
    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero" />
                <span>Welcome, {organizationName}</span>

                <Link to="/incidents/new" className="button">Register new case</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Registered cases</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat(
                                'en-US',
                                { style: 'currency', currency: 'USD' }
                            ).format(incident.value)}</p>

                        <button type="button" onClick={
                            () => handleDeleteIncident(incident.id)
                        }>
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
