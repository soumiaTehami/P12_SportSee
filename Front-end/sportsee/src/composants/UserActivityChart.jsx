import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserActivityChart = () => {
    const userId = 18;
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
                const result = await response.json();
                
                if (result && result.data) {
                    setActivityData(result.data.sessions);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'activité:", error);
            }
        };

        fetchActivityData();
    }, [userId]);

    return (
        <div className="user-activity-chart">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserActivityChart;
