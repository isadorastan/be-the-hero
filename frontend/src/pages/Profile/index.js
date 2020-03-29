import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile() {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('profile', { headers: { Authorization: ongId } }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    async function HandleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className="button">
                    Cadastrar novo Caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-Br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => HandleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
