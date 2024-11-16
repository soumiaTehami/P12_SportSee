import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activities } from '../service/getData'; // Import de la fonction Activities
import './UserActivityChart.scss';

/**
 * Composant UserActivityChart
 * 
 * Ce composant affiche l'activité quotidienne de l'utilisateur sous forme de graphique en barres.
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.userId - L'ID de l'utilisateur pour lequel les données d'activité sont récupérées
 * @returns {JSX.Element} - Le composant UserActivityChart
 */
const UserActivityChart = ({ userId }) => {
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const result = await Activities(userId); // Utilisation de la fonction Activities

                if (result && result.data) {
                    setActivityData(result.data.sessions);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'activité:", error);
            }
        };

        fetchActivityData();
    }, [userId]);

    // Fonction de formatage pour les jours
    const formatDay = (day) => {
        return day.slice(-1); // Affiche le dernier chiffre pour simplifier
    };

    return (
        <div className="user-activity-chart">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData} barSize={7} barGap={8} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} /> {/* Désactive les lignes verticales */}
                    <XAxis dataKey="day" tickFormatter={formatDay} tickLine={false} tickMargin={16} tick={{ stroke: '#9B9EAC', fontSize: 14, fontWeight: 500 }} />
                    <YAxis axisLine={false} tickLine={false} orientation="right" domain={[1, 100]} tickCount={10} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} height={80} verticalAlign="top" align="right" />
                    <Bar name="Poids (kg)" dataKey="kilogram" fill="#282D30" radius={[3.5, 3.5, 0, 0]} />
                    <Bar name="Calories brûlées (kCal)" dataKey="calories" fill="#E60000" radius={[3.5, 3.5, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

// CustomTooltip Component
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p>{` ${payload[0]?.value || 0} kCal`}</p>
                <p>{`${payload[1]?.value || 0} kg`}</p>
            </div>
        );
    }
    return null;
};

// CustomLegend Component
const CustomLegend = () => {
    return (
        <div className="custom-legend">
            <div className="legend-item">
                <span className="legend-icon" style={{ backgroundColor: '#282D30' }}></span>
                <span className="legend-text">Poids (kg)</span>
            </div>
            <div className="legend-item">
                <span className="legend-icon" style={{ backgroundColor: '#E60000' }}></span>
                <span className="legend-text" style={{ color: '#000000' }}>Calories brûlées (kCal)</span>
            </div>
        </div>
    );
};

UserActivityChart.propTypes = {
    userId: PropTypes.number.isRequired,
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};

export default UserActivityChart;
