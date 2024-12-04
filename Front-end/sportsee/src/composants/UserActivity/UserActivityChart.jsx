/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Activities } from '../../service/getData';
import './UserActivityChart.scss';

// Tooltip personnalisé pour afficher les données d'activité
const CustomTooltip = ({ active, payload }) => {
    if (active&& payload && payload.length) {
        // Vérifiez le contenu du payload pour débogage
        console.log(payload);

        return (
            <div className="custom-tooltip">
                <p>{`${payload[0].value} kg`}</p>
                <p>{`${payload[1].value} kCal`}</p>
            </div>
        );
    }
    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};

// Légende personnalisée pour le graphique
const CustomLegend = () => (
    <div className="custom-legend">
        <div className="legend-item">
            <span className="legend-icon" style={{ backgroundColor: '#282D30' }}></span>
            <span className="legend-text">Poids (kg)</span>
        </div>
        <div className="legend-item">
            <span className="legend-icon" style={{ backgroundColor: '#E60000' }}></span>
            <span className="legend-text">Calories brûlées (kCal)</span>
        </div>
    </div>
);

// Composant principal
const UserActivityChart = ({ userId }) => {
    const [activityData, setActivityData] = useState([]);

    // Récupération des données d'activité
    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const result = await Activities(userId);

                if (result && result.sessions) {
                    setActivityData(result.sessions);
                } else {
                    console.error("Aucune donnée d'activité disponible.");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'activité:", error);
            }
        };

        fetchActivityData();
    }, [userId]);

    // Formater le jour pour n'afficher que le dernier chiffre
    const formatDay = (day) => day.slice(-1);

    return (
        <div className="user-activity-chart">
            <h2>Activité quotidienne</h2>
            <CustomLegend />
            <ResponsiveContainer height={200}>
                <BarChart data={activityData} barGap={8} barCategoryGap={1}>
                    <CartesianGrid vertical={false} strokeDasharray="1 1" />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tick={{ fontSize: 14 }}
                        dy={15}
                        tickFormatter={formatDay}
                    />
                    <YAxis
                        yAxisId="kilogram"
                        dataKey="kilogram"
                        type="number"
                        domain={['dataMin - 2', 'dataMax + 1']}
                        tickCount={4}
                        axisLine={false}
                        orientation="right"
                        tickLine={false}
                        tick={{ fontSize: 14 }}
                        dx={15}
                    />
                    <YAxis
                        yAxisId="calories"
                        dataKey="calories"
                        type="number"
                        domain={['dataMin - 20', 'dataMax + 10']}
                        hide
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        yAxisId="kilogram"
                        dataKey="kilogram"
                        fill="#282D30"
                        barSize={7}
                        radius={[50, 50, 0, 0]}
                    />
                    <Bar
                        yAxisId="calories"
                        dataKey="calories"
                        fill="#E60000"
                        barSize={7}
                        radius={[50, 50, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

UserActivityChart.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default UserActivityChart;
