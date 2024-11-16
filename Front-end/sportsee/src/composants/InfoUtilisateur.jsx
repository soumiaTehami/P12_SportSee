import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Utilisateur } from '../service/getData'; // Importer la fonction Utilisateur
import './InfoUtilisateur.scss';

export default function InfoUtilisateur({ userId }) {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await Utilisateur(userId); // Appel à la fonction Utilisateur
                
                // Accéder à `userInfos` depuis `data`
                const firstName = data?.data?.userInfos?.firstName; 
                setUserName(firstName || 'Utilisateur');
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div className="info-utilisateur">
            <h1>Bonjour, <span className="nom-utilisateur">{userName}</span></h1>
            <span>Félicitations ! Vous avez explosé vos objectifs hier&nbsp;👏</span>
        </div>
    );
}

InfoUtilisateur.propTypes = {
    userId: PropTypes.number.isRequired,
};
