import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http";
import "./RoomDetails.css";

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [checkIn, setCheckInDate] = useState("");
    const [checkOut, setCheckOutDate] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await http.get(`/api/rooms/${id}`);
                setRoom(res.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    navigate('/login');
                } else {
                    console.error("Room loading error:", err);
                }
            }
        };

        fetchRoom();
    }, [id]);

    const handleBooking = async () => {
        const checkInUtc = new Date(checkIn + "T00:00:00Z").toISOString();
        const checkOutUtc = new Date(checkOut + "T00:00:00Z").toISOString();

        try {
            const res = await http.post("/api/booking", {
                roomId: room.id,
                checkInDate: checkInUtc,
                checkOutDate: checkOutUtc
            });
                alert("The room has been booked successfully!");
        } catch (err) {
            if (err.response?.status === 401) {
                navigate('/login');
            } else
            {
                alert("This room is already booked for the specified period..");
            }
        }
    };

    if (!room) return <p>Завантаження...</p>;

    return (
        <div className="room-details-wrapper">
            <div className="room-details-card">
                <h2>{room.type}</h2>
                <img src={`http://localhost:5007${room.image}`} alt="room" />
                <p><strong>Number:</strong> {room.number}</p>
                <p><strong>Price per night:</strong> {room.pricePerNight}₴</p>
                <p><strong>Status:</strong> {room.isAvailable ? "Available" : "Busy"}</p>

                <div className="booking-form">
                    <label>Check-in date:</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckInDate(e.target.value)}
                    />

                    <label>Check-out date:</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                    />

                    <button onClick={handleBooking}>Reserve</button>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;