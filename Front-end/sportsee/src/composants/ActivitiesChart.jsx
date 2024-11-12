import PropTypes from 'prop-types';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

const ACTIVITIES_ORDER_IN_CHART = [
  "Intensité", "Vitesse", "Force", "Endurance", "Energie", "Cardio",
];

// Exemple de données factices
const dummyData = [
  { activity: "Intensité", value: 70 },
  { activity: "Vitesse", value: 80 },
  { activity: "Force", value: 60 },
  { activity: "Endurance", value: 90 },
  { activity: "Energie", value: 50 },
  { activity: "Cardio", value: 100 },
];

// Déclaration du composant principal
export function ActivitiesChart() {
  // Réorganise les activités selon l'ordre défini
  const orderedActivities = ACTIVITIES_ORDER_IN_CHART.map(activity => ({
    activity,
    value: dummyData.find(item => item.activity === activity)?.value || 0,
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
            fill="#FF0101B2"
            fillOpacity={0.7}
            stroke="transparent"
          />
        </RadarChart>
      </ResponsiveContainer>
    </ActivitiesChartContainer>
  );
}

ActivitiesChart.propTypes = {
  userId: PropTypes.number,
};

// Style du conteneur du graphique
const ActivitiesChartContainer = styled.div`
  background: #282D30;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  height: 200px;
`;
