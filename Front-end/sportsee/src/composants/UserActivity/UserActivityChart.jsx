/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activities } from '../../service/getData';
import './UserActivityChart.scss';

const UserActivityChart = ({ userId }) => {
    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        const fetchActivityData = async () => {
            try {
                const result = await Activities(userId);

                if (result && result) {
                    setActivityData(result.sessions);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données d'activité:", error);
            }
        };

        fetchActivityData();
    }, [userId]);

    const formatDay = (day) => day.slice(-1); // Récupère le dernier chiffre du jour

    function ActivityToolType({ active, payload }) {
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
    }

    return (
        <div className="user-activity-chart">
            <h2>Activité quotidienne</h2>
            <ResponsiveContainer height={200}>
                <BarChart data={activityData} barGap={8} barCategoryGap={1}>
                    <CartesianGrid vertical={false} strokeDasharray="1 1" />
                    <XAxis 
                        dataKey="day" 
                        tickLine={false} 
                        tick={{ fontSize: 14 }} 
                        dy={15} 
                        stroke="1 1" 
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
                        hide={true} 
                    />
                    <Tooltip content={<ActivityToolType />} />
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
