import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from 'recharts';
import { Performance } from '../service/getData'; // Import de la fonction Performance
import './ActivitiesChart.scss';

const KIND_TO_ACTIVITY_MAP = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

const ACTIVITIES_ORDER_IN_CHART = [
  "Intensité", "Vitesse", "Force", "Endurance", "Energie", "Cardio",
];

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
        const result = await Performance(userId); // Utilisation de la fonction Performance

        if (result && result.data && result.data.kind && Array.isArray(result.data.data)) {
          const transformedData = result.data.data.map(item => ({
            activity: KIND_TO_ACTIVITY_MAP[item.kind] || 'Inconnu',
            value: item.value,
          }));
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

  // Réorganiser les données selon l'ordre défini dans ACTIVITIES_ORDER_IN_CHART
  const orderedActivities = ACTIVITIES_ORDER_IN_CHART.map(activity => ({
    activity,
    value: data.find(item => item.activity === activity)?.value || 0,
  }));

  return (
    <div className="activities-chart-container">
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
            fill="#FF0000"
            fillOpacity={0.7}
            stroke="#FF0000"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

ActivitiesChart.propTypes = {
  userId: PropTypes.number.isRequired,
};
