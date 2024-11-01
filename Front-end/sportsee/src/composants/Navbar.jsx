// src/components/Navbar
import logo from "../assets/logo.svg";

import './Navbar.scss';
const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="sportSee" aria-label="logo sportSee" />
      <ul className="navbar__list">
        <li>
          {/* Accueil */}
          
          <span>Accueil</span>
        </li>
        
        <li>
          {/* Profil */}
          <span>Profil</span>
        </li>
        <li>
          {/*Réglage  */}
          <span>Réglage</span>
        </li>
        <li>
          {/*Communauté*/}
          <span>Communauté</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
