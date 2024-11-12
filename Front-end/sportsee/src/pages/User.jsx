import Navbar from '../composants/Navbar';
import BarreLaterale from '../composants/BarreLaterale';
import NutrientInfo from '../composants/NutrientInfo';
import InfoUtilisateur from '../composants/InfoUtilisateur';
import UserActivityChart from '../composants/UserActivityChart';
import AverageSessionDurationChart from '../composants/AverageSessionDurationChart';
import '../App.scss';
import { useParams } from 'react-router-dom';
import { ActivitiesChart } from '../composants/ActivitiesChart';
// import { ActivitiesChart } from '../composants/ActivitiesChart';

function User() {
    const { userid } = useParams(); // Récupère l'userid depuis les paramètres de l'URL
    const userId = Number(userid);  // Convertir l'userid en nombre

    console.log(userId); // Vérifier que userId est bien un nombre

    return (
        <div className="app-container">
            <Navbar />
            <div className="main-content">
                <BarreLaterale />
                <div>
                    <InfoUtilisateur userId={userId} />
                    <div className="info-activity-container">
                        <div className="charts-container">
                            <UserActivityChart userId={userId} />
                            <AverageSessionDurationChart userId={userId} />
                            <ActivitiesChart  />
                        </div>
                        <div className="nutrient-info-container">
                            <NutrientInfo type="Calories" userId={userId} />
                            <NutrientInfo type="Proteines" userId={userId} />
                            <NutrientInfo type="Glucides" userId={userId} />
                            <NutrientInfo type="Lipides" userId={userId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default User;
