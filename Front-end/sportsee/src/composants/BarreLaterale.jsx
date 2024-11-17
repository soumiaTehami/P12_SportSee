/**
 * @file BarreLaterale.jsx
 * @description Composant pour afficher une barre latérale avec des icônes d'activités sportives et un copyright dynamique.
 */

import yoga from '../assets/yoga.png';
import swim from '../assets/swim.png';
import bike from '../assets/bike.png';
import dumbbell from '../assets/dumbbell.png';
import './BarreLaterale.scss';

/**
 * BarreLaterale
 *
 * @component
 * @description Ce composant représente une barre latérale contenant des icônes pour différentes activités sportives
 * (yoga, natation, vélo, haltères) et un texte de copyright dynamique basé sur l'année actuelle.
 *
 * @returns {JSX.Element} Une section HTML représentant la barre latérale.
 *
 * @example
 * <BarreLaterale />
 */
const BarreLaterale = () => {
  const annee = new Date().getFullYear();

  return (
    <section className="barre-laterale">
      <nav className="barre-laterale__navigation">
        <ul className="barre-laterale__icones">
          <li className="barre-laterale__icone" aria-label="Yoga">
            <img src={yoga} alt="Icône de yoga" />
          </li>
          <li className="barre-laterale__icone" aria-label="Natation">
            <img src={swim} alt="Icône de natation" />
          </li>
          <li className="barre-laterale__icone" aria-label="Vélo">
            <img src={bike} alt="Icône de vélo" />
          </li>
          <li className="barre-laterale__icone" aria-label="Haltères">
            <img src={dumbbell} alt="Icône d'haltères" />
          </li>
        </ul>
        <p className="barre-laterale__copyright">
          Copyright, SportSee {annee}
        </p>
      </nav>
    </section>
  );
};

export default BarreLaterale;
