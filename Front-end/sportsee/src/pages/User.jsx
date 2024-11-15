import Navbar from '../composants/Navbar';
import BarreLaterale from '../composants/BarreLaterale';
import NutrientInfo from '../composants/NutrientInfo';
import InfoUtilisateur from '../composants/InfoUtilisateur';
import UserActivityChart from '../composants/UserActivityChart';
import AverageSessionDurationChart from '../composants/AverageSessionDurationChart';
import '../App.scss';
import { useParams } from 'react-router-dom';
import { ActivitiesChart } from '../composants/ActivitiesChart';
import ProgressionChart from '../composants/ProgressionChart';

function User() {
    const { userid } = useParams(); // Récupère l'userid depuis les paramètres de l'URL
    const userId = Number(userid);  // Convertir l'userid en nombre
    
    if (isNaN(userId)) {
        return <div>Erreur : ID utilisateur invalide</div>;
    }

    console.log("ID utilisateur:", userId); // Vérifier que userId est bien un nombre

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
