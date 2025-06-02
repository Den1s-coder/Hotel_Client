import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import './AllBookings.css'
import http from '../../api/http';
import CustomToolbar from './CustomToolbar';

const locales = momentLocalizer(moment)

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


export default function AllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await http.get("/api/Booking", { withCredentials: true });
                setBookings(response.data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const components = {
        toolbar: (props) => (
            <CustomToolbar
                {...props}
                onNavigate={(action) => {
                    if (action === 'PREV') {
                        setCurrentDate(moment(currentDate).subtract(1, currentView === 'month' ? 'month' : 'week').toDate());
                    } else if (action === 'NEXT') {
                        setCurrentDate(moment(currentDate).add(1, currentView === 'month' ? 'month' : 'week').toDate());
                    } else if (action === 'TODAY') {
                        setCurrentDate(new Date());
                    }
                }}
                onView={setCurrentView}
                view={currentView}
            />
        ),
        event: ({ event }) => (
            <div style={{ padding: '2px' }}>
                <strong>{event.title}</strong>
            </div>
        ),
    };

    const handleViewChange = (newView) => {
        setCurrentView(newView);
    };

    const handlePrev = () => {
        const unit = currentView === 'month' ? 'month' : 'week';
        setCurrentDate(moment(currentDate).subtract(1, unit).toDate());
    };

    const handleNext = () => {
        const unit = currentView === 'month' ? 'month' : 'week';
        setCurrentDate(moment(currentDate).add(1, unit).toDate());
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

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
                <div className="alert error">{error.message}</div>
            </div>
        );
    }

    const calendarEvents = bookings.map((booking) => ({
        id: booking.id,
        title: `${booking.user.email}(${booking.user.name}) / Room ${booking.room.number}`,
        start: new Date(booking.checkInDate),
        end: new Date(booking.checkOutDate),
    }));

    return (
        <div className="my-container">
            <h2>All bookings</h2>

            {bookings.length === 0 ? (
                <div className="alert info">No bookings found.</div>
            ) : (
                <>
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
                                    <td>
                                        {booking.checkInDate
                                            ? new Date(booking.checkInDate).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td>
                                        {booking.checkOutDate
                                            ? new Date(booking.checkOutDate).toLocaleDateString()
                                            : "—"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: "2rem" }}>
                        <h3>Booking calendar</h3>
                        <Calendar
                            localizer={localizer}
                            events={calendarEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500, margin: "2rem 0" }}
                            date={currentDate}
                            view={currentView}
                            onView={handleViewChange}
                            components={components}
                        />
                    </div>
                </>
            )}
        </div>
    );
}