/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { AverageSession } from '../../service/getData';
import './AverageSessionDurationChart.scss';

/**
 * Composant AverageSessionDurationChart
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

                if (result && result.sessions) {
                    setSessionData(result.sessions);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données de session:", error);
            }
        };

        fetchSessionData();
    }, [userId]);

    /**
     * Tooltip personnalisé pour afficher la durée dans un carré blanc.
     */
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip animated-tooltip">
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
     * Curseur personnalisé pour ajouter une animation de survol.
     */
    const CustomCursor = ({ points, width,height }) => {
        const { x } = points[0]
        return (
          <Rectangle fill="hsla(0, 0%, 0%, 9.75%)" x={x} width={width} height={height} />
        )
      }

    // Tableau des jours de la semaine
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    return (
        <div className="average-session-duration-chart">
            <h2 className="average-session-title">Durée moyenne des <br />sessions</h2>
            <ResponsiveContainer width="100%" height={170}>
                <LineChart 
                    data={sessionData} 
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                    <XAxis 
                        dataKey="day" 
                        tickFormatter={(tick) => daysOfWeek[tick - 1]} 
                        tick={{ fontSize: 12, fontWeight: 500, fill: 'rgba(255, 255, 255, 0.5)' }} // Couleur adaptée
                        axisLine={false} 
                        tickLine={false} 
                        height={20} // Espace sous le diagramme
                    />
                    <YAxis hide={true} />
                    <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
                    <Line 
                        type="monotone" 
                        dataKey="sessionLength" 
                        stroke="rgba(255, 255, 255, 0.5)" 
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
