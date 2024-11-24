import Navbar from '../composants/Navbar/Navbar';
import BarreLaterale from '../composants/BarreLaterale/BarreLaterale';
import NutrientInfo from '../composants/NutrientInfo/NutrientInfo';
import InfoUtilisateur from '../composants/Utilisateur/InfoUtilisateur';
import UserActivityChart from '../composants/UserActivity/UserActivityChart';
import AverageSessionDurationChart from '../composants/AverageSession/AverageSessionDurationChart';
import '../App.scss';
import { useParams } from 'react-router-dom';
import { ActivitiesChart } from '../composants/Activities/ActivitiesChart';
import ProgressionChart from '../composants/Progression/ProgressionChart';

function User() {
    const { userid } = useParams(); // Récupère l'userid depuis les paramètres de l'URL
    const userId = Number(userid);  // Convertir l'userid en nombre
    
    if (isNaN(userId)) {
        return <div>Erreur : ID utilisateur invalide</div>;
    }
    return (
        <div className="app-container">
            <Navbar />
            <div className="main-content">
                <BarreLaterale />
                <div className="user-details-container">
                    <InfoUtilisateur userId={userId} />
                    <div className="info-activity-container">
                        <div className="charts-container">
                            <UserActivityChart userId={userId} />
                            <div className="charts-group">
                            <AverageSessionDurationChart userId={userId} />
                            <ActivitiesChart userId={userId} />
                            <ProgressionChart userId={userId}/>
                        </div>
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
