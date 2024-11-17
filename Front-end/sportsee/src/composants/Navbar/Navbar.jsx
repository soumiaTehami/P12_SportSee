/**
 * @file Navbar.jsx
 * @description Composant pour afficher une barre de navigation avec des liens de navigation.
 */

import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import './Navbar.scss';

/**
 * Navbar
 *
 * @component
 * @description Ce composant représente une barre de navigation comprenant un logo et des liens de navigation 
 * vers différentes sections de l'application.
 *
 * @returns {JSX.Element} Une barre de navigation avec un logo et des liens de navigation.
 *
 * @example
 * <Navbar />
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo de l'application */}
      <img src={logo} alt="sportSee" aria-label="logo sportSee" />
      <ul className="navbar__list">
        <li>
          {/* Lien vers l'accueil */}
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li>
          {/* Lien vers le profil */}
          <NavLink to="#">Profil</NavLink>
        </li>
        <li>
          {/* Lien vers les réglages */}
          <NavLink to="#">Réglage</NavLink>
        </li>
        <li>
          {/* Lien vers la communauté */}
          <NavLink to="#">Communauté</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
