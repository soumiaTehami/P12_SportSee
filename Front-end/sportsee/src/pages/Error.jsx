import { Link } from 'react-router-dom';
import './Error.scss';

export default function Error() {
  return (
    <div className="Main">
      <h1 className="Title">404</h1>
      <h2>Oops! La page que vous demandez n’existe pas</h2>
      <Link to="/">Retourner sur la page d’accueil</Link>
    </div>
  );
}
