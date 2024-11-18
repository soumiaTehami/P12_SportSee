import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { AverageSession } from '../../service/getData';
import './AverageSessionDurationChart.scss';

/**
 * Tooltip personnalisé pour afficher la durée dans un carré blanc.
 */
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="tooltip-value">{`${payload[0].value} min`}</p>
            </div>
        );
    }
    return null;
};

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};

/**
 * Composant AverageSessionDurationChart
 * 
 * Ce composant affiche la durée moyenne des sessions de l'utilisateur sous forme de graphique en ligne.
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.userId - L'ID de l'utilisateur pour lequel les données de session sont récupérées
 * @returns {JSX.Element} - Le composant AverageSessionDurationChart
 */
const AverageSessionDurationChart = ({ userId }) => {
    const [sessionData, setSessionData] = useState([]);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const result = await AverageSession(userId);

                if (result && result.data) {
                    setSessionData(result.data.sessions);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données de session:", error);
            }
        };

        fetchSessionData();
    }, [userId]);

    return (
        <div className="average-session-duration-chart">
            <h2 className="average-session-title">Durée moyenne des <br />sessions</h2>
            <ResponsiveContainer width="100%" height={100}>
                <LineChart data={sessionData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                    <XAxis 
                        dataKey="day" 
                        tickFormatter={(tick) => String.fromCharCode(65 + tick)} 
                        tick={{ fontSize: 12, fontWeight: 500, fill: '#fff' }}
                        axisLine={false} 
                        tickLine={false} 
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                        type="monotone" 
                        dataKey="sessionLength" 
                        stroke="#D3D3D3" 
                        strokeWidth={2} 
                        dot={false}  
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

AverageSessionDurationChart.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default AverageSessionDurationChart;
