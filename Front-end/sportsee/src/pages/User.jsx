import Navbar from '../composants/Navbar';
import BarreLaterale from '../composants/BarreLaterale';
import NutrientInfo from '../composants/NutrientInfo';
import InfoUtilisateur from '../composants/InfoUtilisateur';
import UserActivityChart from '../composants/UserActivityChart';
import '../App.scss';
import { useParams } from 'react-router-dom';

function User() {
    const userid=useParams().userid;
    console.log(userid);
    
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <BarreLaterale />
        <div>
       
        <InfoUtilisateur userId={userid} />
        <div className="info-activity-container">
        <UserActivityChart userId={userid} />
       
          <div className="nutrient-info-container">
            <NutrientInfo type="Calories" userId={userid} />
            <NutrientInfo type="Proteines" userId={userid}  />
            <NutrientInfo type="Glucides" userId={userid}  />
            <NutrientInfo type="Lipides" userId={userid}  />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
