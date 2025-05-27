import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../api/http';
import { AuthContext } from '../context/AuthContext';
import { Table, Button, Container, Alert } from 'react-bootstrap';

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
            <Container className="mt-5">
                <Alert variant="danger">Будь ласка, увійдіть в систему для перегляду бронювань</Alert>
            </Container>
        );
    }

    if (loading) {
        return <Container className="mt-5">Завантаження...</Container>;
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2>Мої бронювання</h2>
            {bookings.length === 0 ? (
                <Alert variant="info">У вас немає активних бронювань</Alert>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Номер</th>
                            <th>Дата заїзду</th>
                            <th>Дата виїзду</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.roomId}</td>
                                <td>
                                    {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : '—'}
                                </td>
                                <td>
                                    {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : '—'}
                                </td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleCancel(booking.id)}
                                        disabled={booking.status !== 'Active'}
                                    >
                                        Скасувати
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}
