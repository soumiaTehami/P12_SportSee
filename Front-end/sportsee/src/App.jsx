import Navbar from './composants/Navbar';
import BarreLaterale from './composants/BarreLaterale';
import NutrientInfo from './composants/NutrientInfo';
import InfoUtilisateur from './composants/InfoUtilisateur';
import UserActivityChart from './composants/UserActivityChart';
import './App.scss';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <BarreLaterale />
        <div>
       
        <InfoUtilisateur userId={18} />
        <div className="info-activity-container">
        <UserActivityChart userId={18} />
       
          <div className="nutrient-info-container">
            <NutrientInfo type="Calories" userId={12} />
            <NutrientInfo type="Proteines" userId={12}  />
            <NutrientInfo type="Glucides" userId={12}  />
            <NutrientInfo type="Lipides" userId={12}  />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
