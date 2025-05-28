import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../../api/http';
import { AuthContext } from '../../context/AuthContext';
import "./MyBookings.css";

export default function MyBookings() {
    const navigate = useNavigate();
    const { userEmail, setUserEmail } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await http.get('/api/Booking/user', { withCredentials: true });
                setBookings(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    setUserEmail(null);
                    navigate('/login');
                } else {
                    setError('Помилка завантаження бронювань');
                }
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchBookings();
        } else {
            navigate('/login');
        }
    }, [userEmail, navigate, setUserEmail]);

    const handleCancel = async (bookingId) => {
        try {
            await http.delete(`/api/Booking/${bookingId}`, {
                withCredentials: true
            });
            setBookings(bookings.filter(b => b.id !== bookingId));
        } catch (err) {
            setError(err.response?.data?.message || 'Помилка при скасуванні бронювання');
        }
    };

    if (!userEmail) {
        return (
            <div className="my-container">
                <div className="alert error">Please log in to view reservations.</div>
            </div>
        );
    }

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
            <h2>My bookings</h2>
            {bookings.length === 0 ? (
                <div className="alert info">You have no active reservations.</div>
            ) : (
                <table className="my-table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Check-in date</th>
                            <th>Check-out date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.room.number}</td>
                                <td>{booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : "—"}</td>
                                <td>{booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : "—"}</td>
                                <td>
                                    <button className="cancel-btn" onClick={() => handleCancel(booking.id)}>Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
