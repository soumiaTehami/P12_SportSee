// src/components/Navbar
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="sportSee" aria-label="logo sportSee" />
      <ul className="navbar__list">
        <li>
          {/* Accueil */}
          <NavLink to="/">Accueil</NavLink>
        </li>
        <li>
          {/* Profil */}
          <NavLink to="#">Profil</NavLink>
        </li>
        <li>
          {/* Réglage */}
          <NavLink to="#">Réglage</NavLink>
        </li>
        <li>
          {/* Communauté */}
          <NavLink to="#">Communauté</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
