import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './InfoUtilisateur.scss';

export default function InfoUtilisateur({ userId }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Simuler une récupération de données avec `fetch`
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                
                const data = await response.json();
                
                // Accéder à userInfos depuis data
                const firstName = data.data.userInfos.firstName; 
                setUserName(firstName);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className="info-utilisateur">
            <h1>Bonjour, <span className="nom-utilisateur">{userName || 'Utilisateur'}</span></h1>
            <span>Félicitations ! Vous avez explosé vos objectifs hier&nbsp;👏</span>
        </div>
    );
}

InfoUtilisateur.propTypes = {
    userId: PropTypes.number.isRequired,
};
