import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Score } from "../../service/getData"; // Import de la fonction Score
import "./ProgressionChart.scss";

const COLORS = ["#FF0000"];
/**
 * ProgressionChart
 *
 * @component
 * @description Ce composant affiche un graphique circulaire représentant le pourcentage de progression d'un utilisateur 
 * par rapport à son objectif quotidien.
 *
 * @param {Object} props Les propriétés du composant.
 * @param {number} props.userId L'identifiant unique de l'utilisateur pour récupérer ses données.
 *
 * @returns {JSX.Element} Un graphique circulaire avec les données de progression.
 *
 * @example
 * <ProgressionChart userId={12} />
 *
 * @throws {Error} Si les données ne peuvent pas être récupérées depuis l'API.
 */

// eslint-disable-next-line react/prop-types
function ProgressionChart({ userId }) {
  const [scoreData, setScoreData] = useState([
    { name: "Progression", value: 0 },
    { name: "Reste", value: 1 },
  ]);

  useEffect(() => {
    if (!userId) {
      console.error("L'ID utilisateur est manquant ou invalide.");
      return;
    }

    const fetchScoreData = async () => {
      try {
        const responseData = await Score(userId); // Utilisation de la fonction Score

        if (!responseData || !responseData.data) {
          throw new Error("Les données récupérées ne sont pas valides.");
        }

        const data = responseData.data;

        // Utiliser `score` ou `todayScore`
        const score = data?.score ?? data?.todayScore ?? 0;

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
            innerRadius={60}
            outerRadius={80}
            startAngle={90}
            endAngle={450}
          >
            {scoreData.map((entry, index) =>
              index === 0 ? (
                <Cell
                  key={`cell-${index}`}
                  cornerRadius={10}
                  fill={COLORS[0]}
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

export default ProgressionChart;
