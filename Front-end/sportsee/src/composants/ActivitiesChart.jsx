import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

const ACTIVITIES_ORDER_IN_CHART = [
  "Intensité", "Vitesse", "Force", "Endurance", "Energie", "Cardio",
];

// Composant principal
export function ActivitiesChart({ userId }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId == null) {
      setError("L'ID utilisateur est manquant ou invalide.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
        
        if (!response.ok) {
          throw new Error(`Erreur de chargement des données : ${response.statusText}`);
        }

        const result = await response.json();

        if (result && result.data && result.data.data && Array.isArray(result.data.data)) {
          const transformedData = result.data.data.map(item => {
            const activityName = result.data.kind[item.kind];
            return {
              activity: activityName,
              value: item.value,
            };
          });

          setData(transformedData);
        } else {
          setError("Les données récupérées ne sont pas au format attendu");
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (isLoading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur : {error}</div>;

  const orderedActivities = ACTIVITIES_ORDER_IN_CHART.map(activity => ({
    activity,
    value: data.find(item => item.activity === activity)?.value || 0,
  }));

  return (
    <ActivitiesChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={orderedActivities}
          outerRadius="70%"
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey="activity"
            stroke="white"
            dy={4}
            tickLine={false}
            tick={{
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <Radar
            dataKey="value"
            fill="#FF0000"   // Remplacez la couleur par rouge
            fillOpacity={0.7}
            stroke="#FF0000"  // Ligne de contour également en rouge pour unifier le style
          />
        </RadarChart>
      </ResponsiveContainer>
    </ActivitiesChartContainer>
  );
}

ActivitiesChart.propTypes = {
  userId: PropTypes.number.isRequired,
};

// Style du conteneur du graphique
const ActivitiesChartContainer = styled.div`
  background: #282D30;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  height: 200px;
`;
