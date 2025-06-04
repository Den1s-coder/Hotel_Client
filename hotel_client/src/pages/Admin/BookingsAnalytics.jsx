import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import http from '../../api/http';
import './BookingAnalytics.css';

function fillMissingDates(startDateStr, endDateStr, data) {
    const result = [];
    const map = new Map(data.map(item => [item.date, item.count]));

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toLocaleDateString('uk-UA');
        result.push({
            date: dateStr,
            count: map.get(dateStr) || 0
        });
    }

    return result;
}

export default function BookingsAnalytics() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('2025-06-01');
    const [endDate, setEndDate] = useState('2025-06-30');

    const fetchData = async () => {
        try {
            const response = await http.get(`/api/Booking/bookings-per-day?startDate=${startDate}&endDate=${endDate}`)
                .then(response => {
                    const raw = response.data.map(item => ({
                        date: new Date(item.date).toLocaleDateString('uk-UA'),
                        count: item.count
                    }));

                    const filled = fillMissingDates(startDate, endDate, raw);
                    setData(filled);
                })
        } catch (error) {
            console.error( error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="booking-analytics-container">
            <h2 className="booking-analytics-title">Booking analytics by day</h2>

            <div className="booking-analytics-form">
                <div>
                    <label>Start date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label>End date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />
                </div>
                <button onClick={fetchData}>Load</button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#4f46e5" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}