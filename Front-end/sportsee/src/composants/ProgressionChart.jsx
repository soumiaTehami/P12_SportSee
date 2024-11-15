import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "./ProgressionChart.scss";

const COLORS = ["#FF0000"];

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

    const url = `http://localhost:3000/user/${userId}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        const data = responseData?.data; // Accéder à la clé `data`
        console.log("Données récupérées :", data);

        // Utiliser `score` ou `todayScore`
        const score = data?.score ?? data?.todayScore ?? 0;
        setScoreData([
          { name: "Progression", value: score },
          { name: "Reste", value: 1 - score },
        ]);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
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
