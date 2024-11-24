import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activities } from '../../service/getData';
import './UserActivityChart.scss';

const UserActivityChart = ({ userId }) => {
    const [activityData, setActivityData] = useState([]);
    const [ticks, setTicks] = useState([]); // Pour stocker les ticks dynamiques

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const result = await Activities(userId);

                if (result && result.data) {
                    const sessions = result.data.sessions;
                    setActivityData(sessions);

                    // Calculer les ticks dynamiquement
                    const kilograms = sessions.map((session) => session.kilogram);
                    const min = Math.min(...kilograms);
                    const max = Math.max(...kilograms);
                    setTicks(calculateThreeTicks(min, max)); // Générer 3 ticks
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'activité:", error);
            }
        };

        fetchActivityData();
    }, [userId]);

    /**
     * Calcul des trois ticks uniformément répartis
     * @param {number} min - Valeur minimale
     * @param {number} max - Valeur maximale
     * @returns {number[]} - Tableau contenant 3 ticks
     */
    const calculateThreeTicks = (min, max) => {
        // Ajuster légèrement les limites pour des valeurs arrondies
        const adjustedMin = Math.floor(min / 5) * 5; // Arrondi au multiple de 5 inférieur
        const adjustedMax = Math.ceil(max / 5) * 5; // Arrondi au multiple de 5 supérieur

        const step = (adjustedMax - adjustedMin) / 2; // Diviser la plage en deux pour 3 ticks
        return [adjustedMin, adjustedMin + step, adjustedMax];
    };

    const formatDay = (day) => {
        return day.slice(-1); // Affiche uniquement le dernier chiffre pour simplifier
    };

    return (
        <div className="user-activity-chart">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData} barSize={7} barGap={8} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    
                    {/* Axe X avec les jours */}
                    <XAxis 
                        dataKey="day" 
                        tickFormatter={formatDay} 
                        tickLine={false} 
                        tickMargin={16} 
                        tick={{ stroke: '#9B9EAC', fontSize: 14, fontWeight: 500 }} 
                    />
                    
                    {/* Axe Y pour Poids (kg) avec 3 ticks */}
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        orientation="right" 
                        tick={{ fontSize: 14, fontWeight: 500, fill: '#9B9EAC' }} 
                        domain={['auto', 'auto']} // Plage automatique pour s'adapter aux ticks calculés
                        ticks={ticks} // Ticks dynamiquement calculés
                        label={{ value: 'Poids (kg)', angle: 90, position: 'insideRight' }}
                        yAxisId="right"
                    
                    />
                    
                    {/* Axe Y gauche (invisible pour les calories) */}
                    <YAxis 
                        orientation="left" 
                        yAxisId="left" 
                        hide={true} 
                    />

                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} height={80} verticalAlign="top" align="right" />
                    
                    {/* Barre Poids (kg) avec l'axe Y à droite */}
                    <Bar name="Poids (kg)" dataKey="kilogram" fill="#282D30" radius={[3.5, 3.5, 0, 0]} yAxisId="right" />
                    
                    {/* Barre Calories (kCal), sans axe Y */}
                    <Bar name="Calories brûlées (kCal)" dataKey="calories" fill="#E60000" radius={[3.5, 3.5, 0, 0]} yAxisId="left" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const kilogram = payload.find((item) => item.dataKey === 'kilogram')?.value || 0;
        const calories = payload.find((item) => item.dataKey === 'calories')?.value || 0;

        return (
            <div className="custom-tooltip">
                <p>{` ${kilogram} kg`}</p>
                <p>{`${calories} kCal`}</p>
            </div>
        );
    }
    return null;
};

const CustomLegend = () => {
    return (
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
};

UserActivityChart.propTypes = {
    userId: PropTypes.number.isRequired,
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};

export default UserActivityChart;
