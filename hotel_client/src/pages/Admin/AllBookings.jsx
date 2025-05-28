import { useState, useEffect } from 'react';
import http from '../../api/http';
import './AllBookings.css';

export default function AllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await http.get('/api/Booking', { withCredentials: true });
                setBookings(response.data);
            } catch (err) {
                console.error(err)
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="my-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="my-container">
                <div className="alert error">{error}</div>
            </div>
        );
    }

    return (
        <div className="my-container">
            <h2>All bookings</h2>
            {bookings.length === 0 ? (
                <div className="alert info">No bookings found.</div>
            ) : (
                <table className="my-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Room Number</th>
                            <th>Check-in Date</th>
                            <th>Check-out Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.user.email}</td>
                                <td>{booking.room.number}</td>
                                <td>{booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : '—'}</td>
                                <td>{booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : '—'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
