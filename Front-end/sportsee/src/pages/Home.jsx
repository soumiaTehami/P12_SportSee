import Navbar from '../composants/Navbar/Navbar';
import { Link } from "react-router-dom";
import './Home.scss'; 
import CeciliaPhoto from './../assets/Cecilia.jpg'; 
import KarlPhoto from './../assets/Karl.jpg'; 

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="user-container">
        <div className="user-card">
          <img
            src={KarlPhoto} // Utilisation de l'import correct
            alt="Karl"
            className="user-photo"
          />
          <h2>Karl</h2>
          <Link to="/User/12" className="user-link">Voir le profil</Link>
        </div>
        <div className="user-card">
          <img
            src={CeciliaPhoto} // Utilisation de l'import correct
            alt="Cecilia"
            className="user-photo"
          />
          <h2>Cecilia</h2>
          <Link to="/User/18" className="user-link">Voir le profil</Link>
        </div>
      </div>
    </>
  );
}
