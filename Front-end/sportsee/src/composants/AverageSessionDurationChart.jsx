import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './AverageSessionDurationChart.scss';

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
                const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
                const result = await response.json();
                
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
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={sessionData} margin={{ top: 20, right: 20, left: 20, bottom: 0 }}>
                    <XAxis 
                        dataKey="day" 
                        tickFormatter={(tick) => String.fromCharCode(65 + tick)} // Conversion des chiffres en lettres A, B, C, ...
                        tick={{ fontSize: 12, fontWeight: 500, fill: '#fff' }} // Couleur des tick labels
                        axisLine={false} // Désactive la ligne de l'axe X
                        tickLine={false} // Désactive les ticks de l'axe X
                    />
                    <YAxis 
                        hide={true} // Masquer l'axe Y
                    />
                    <Tooltip />
                    <Line 
                        type="monotone" 
                        dataKey="sessionLength" 
                        stroke="#D3D3D3" // Gris clair pour la ligne
                        strokeWidth={2} 
                        dot={false}  // Enlever les "dots" à chaque point
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
