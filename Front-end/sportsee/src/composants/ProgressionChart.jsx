import { useState, useEffect } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "./ProgressionChart.scss";

const COLORS = ['#FF0000', '#E0E0E0'];

 // eslint-disable-next-line react/prop-types
 function ProgressionChart( {userId}) { 
  console.log(userId);
  
  const [scoreData, setScoreData] = useState([
    { name: 'Progression', value: 0 },
    { name: 'Reste', value: 1 }
  ]);

   useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/user/${userId}/`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const score = data?.score || data?.todayScore || 0;
          console.log("score"+data);
          setScoreData([
            { name: 'Progression', value: score },
            { name: 'Reste', value: 1 - score }
          ]);
        })
        .catch(error => console.error("Erreur lors de la récupération des données :", error));
    }
  }, [userId]);

  return (
    <div className="container">
      <h2 className="title">Score</h2>
      <ResponsiveContainer width={150} height={150}>
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
