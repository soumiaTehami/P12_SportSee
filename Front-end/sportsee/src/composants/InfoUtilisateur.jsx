/**
 * @file InfoUtilisateur.jsx
 * @description Composant pour afficher un message de bienvenue personnalisé pour l'utilisateur en fonction de son prénom.
 */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Utilisateur } from '../service/getData'; // Importer la fonction Utilisateur
import './InfoUtilisateur.scss';

/**
 * InfoUtilisateur
 *
 * @component
 * @description Ce composant affiche un message de bienvenue personnalisé à l'utilisateur
 * en fonction de son prénom récupéré depuis l'API. Si aucune donnée n'est disponible, 
 * il affiche "Utilisateur" par défaut.
 *
 * @param {Object} props Les propriétés du composant.
 * @param {number} props.userId L'identifiant unique de l'utilisateur pour récupérer ses informations.
 *
 * @returns {JSX.Element} Un message de bienvenue personnalisé.
 *
 * @example
 * <InfoUtilisateur userId={12} />
 *
 * @throws Affiche "Utilisateur" si le prénom n'est pas récupéré ou en cas d'erreur.
 */
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
    /** L'identifiant unique de l'utilisateur pour récupérer ses informations. */
    userId: PropTypes.number.isRequired,
};
