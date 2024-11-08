import Navbar from '../composants/Navbar';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <Link to="/User/12">User 12</Link>
        <Link to="/User/18">User 18</Link>
      </div>
    </>
  );
}
