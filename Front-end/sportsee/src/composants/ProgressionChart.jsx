import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "./ProgressionChart.scss"; // Importation du fichier SCSS

// Couleurs pour chaque section du graphique
const COLORS = ['#FF0000', '#E0E0E0']; // Rouge pour la progression et gris pour le reste

// Composant pour afficher la progression du score
function ProgressionChart() {
  // Exemple de données statiques pour le graphique
  const scoreData = [
    { name: 'Progression', value: 0.75 }, // 75% de progression
    { name: 'Reste', value: 0.25 } // 25% restant
  ];

  return (
    <div className="container">
      <h2 className="title">Score</h2>
      <ResponsiveContainer width={150} height={150}> {/* Taille du conteneur ajustée */}
        <PieChart>
          <Pie
            data={scoreData}
            dataKey="value"
            innerRadius={50}  
            outerRadius={70} 
            startAngle={90}
            endAngle={450}
          >
            {scoreData.map((entry, index) =>
              index === 0 ? (
                <Cell key={`cell-${index}`} cornerRadius={10} fill={COLORS[0]} />
              ) : (
                <Cell key={`cell-${index}`} fill={COLORS[1]} />
              )
            )}
          </Pie>
          {/* Ajout du texte à l'intérieur du cercle */}
          <text
  x="50%"
  y="50%"
  textAnchor="middle"
  dominantBaseline="middle"
  className="percentage-text"
>
  {Math.round(scoreData[0].value * 100)}%<tspan x="50%" dy="1.2em">de votre</tspan>
  <tspan x="50%" dy="1.2em">objectif</tspan>
</text>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}



export default ProgressionChart;
