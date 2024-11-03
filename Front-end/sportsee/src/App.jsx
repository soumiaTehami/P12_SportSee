import Navbar from './composants/Navbar';
import BarreLaterale from './composants/BarreLaterale';
import NutrientInfo from './composants/NutrientInfo';
import './App.scss';
function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <BarreLaterale />
        <div className="nutrient-info-container">
          <NutrientInfo type="Calories" value={2200} />
          <NutrientInfo type="Proteines" value={130} />
          <NutrientInfo type="Glucides" value={280} />
          <NutrientInfo type="Lipides" value={70} />
        </div>
      </div>
    </div>
  );
}

export default App;
