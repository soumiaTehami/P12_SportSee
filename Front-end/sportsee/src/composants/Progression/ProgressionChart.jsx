import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";
import { Score } from "../../service/getData"; // Import de la fonction Score
import "./ProgressionChart.scss";

/**
 * Retourne une couleur en fonction de la valeur du score.
 * 
 * @param {number} score - Le score de l'utilisateur, compris entre 0 et 1.
 * @returns {string} - Code couleur hexadécimal (#RRGGBB).
 */
const getColor = (score) => {
  if (score > 0.8) return "#00FF00"; // Vert pour les scores élevés
  if (score > 0.5) return "#FFFF00"; // Jaune pour les scores moyens
  return "#FF0000"; // Rouge pour les scores faibles
};

/**
 * Composant React qui affiche un graphique circulaire représentant le score de progression de l'utilisateur.
 * 
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.userId - L'ID de l'utilisateur dont les données doivent être affichées.
 * @returns {JSX.Element} - Le composant graphique.
 */
function ProgressionChart({ userId }) {
  const [scoreData, setScoreData] = useState([
    { name: "Progression", value: 0 },
    { name: "Reste", value: 1 },
  ]);

  /**
   * Récupère les données de score de l'utilisateur et met à jour l'état local.
   * 
   * @async
   * @function fetchScoreData
   */
  useEffect(() => {
    if (!userId) {
      console.error("L'ID utilisateur est manquant ou invalide.");
      return;
    }

    const fetchScoreData = async () => {
      try {
        const responseData = await Score(userId);

        if (!responseData) {
          throw new Error("Les données récupérées ne sont pas valides.");
        }

        const data = responseData;
        const score = data?.score ?? data?.todayScore ?? 0;

        // Mise à jour des données du score avec les couleurs dynamiques
        setScoreData([
          { name: "Progression", value: score },
          { name: "Reste", value: 1 - score },
        ]);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchScoreData();
  }, [userId]);

  return (
    <div className="progression-chart-container">
      <h2 className="title">Score</h2>
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={scoreData}
            dataKey="value"
            innerRadius={70}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
            animationDuration={500} // Animation de 500ms
          >
            {scoreData.map((entry, index) =>
              index === 0 ? (
                <Cell
                  key={`cell-${index}`}
                  cornerRadius={10}
                  fill={getColor(scoreData[0].value)} // Utilisation de la couleur dynamique
                />
              ) : (
                <Cell key={`cell-${index}`} fill="transparent" />
              )
            )}
          </Pie>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="percentage-text"
          >
            {Math.round(scoreData[0].value * 100)}%
            <tspan x="50%" dy="1.2em">
              de votre
            </tspan>
            <tspan x="50%" dy="1.2em">
              objectif
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Ajout des PropTypes pour la validation des propriétés du composant
ProgressionChart.propTypes = {
  /** L'ID de l'utilisateur. */
  userId: PropTypes.number.isRequired,
};

export default ProgressionChart;
