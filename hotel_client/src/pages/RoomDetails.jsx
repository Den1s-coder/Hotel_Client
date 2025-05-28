import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../api/http";
import "./RoomDetails.css";

const RoomDetails = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [checkIn, setCheckInDate] = useState("");
    const [checkOut, setCheckOutDate] = useState("");

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await http.get(`/api/rooms/${id}`);
                setRoom(res.data);
            } catch (err) {
                console.error("Помилка завантаження кімнати:", err);
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
                alert("Кімнату заброньовано успішно!");
        } catch (err) {
            {
                alert("Ця кімната вже заброньована на вказаний період.");
            }
        }
    };

    if (!room) return <p>Завантаження...</p>;

    return (
        <div className="room-details-wrapper">
            <div className="room-details-card">
                <h2>{room.type}</h2>
                <img src={`http://localhost:5007${room.image}`} alt="room" />
                <p><strong>Номер:</strong> {room.number}</p>
                <p><strong>Ціна за ніч:</strong> {room.pricePerNight}₴</p>
                <p><strong>Статус:</strong> {room.isAvailable ? "Доступна" : "Зайнята"}</p>

                <div className="booking-form">
                    <label>Дата заїзду:</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckInDate(e.target.value)}
                    />

                    <label>Дата виїзду:</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                    />

                    <button onClick={handleBooking}>Забронювати</button>
                </div>
            </div>
        </div>
    );
};

export default RoomDetails;