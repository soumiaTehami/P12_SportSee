import PropTypes from 'prop-types';
import './InfoUtilisateur.scss';

/** Render a personalized greeting for the user.
 * @param {string} name - The user's name.
 * @return {JSX}
 */
export default function InfoUtilisateur({ name }) {
    return (
        <div className="info-utilisateur"> {/* Utilisation d'une balise div pour le conteneur */}
            <h1>Bonjour, <span className="nom-utilisateur">{name}</span></h1> {/* Utilisation d'une balise span pour le nom */}
            <span>Félicitations ! Vous avez explosé vos objectifs hier
            !&nbsp;👏</span>
        </div>
    );
}

InfoUtilisateur.propTypes = {
    name: PropTypes.string.isRequired,
};
