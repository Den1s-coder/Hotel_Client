import React, { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [capacity, setCapacity] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await http.get("/api/rooms");
                setRooms(res.data);
            } catch (err) {
                console.error("Помилка завантаження кімнат:", err);
            }
        };

        fetchRooms();
    }, []);

    const fetchAvailableRooms = async () => {
        if (!checkIn || !checkOut) return;

        const checkInUtc = new Date(checkIn + "T00:00:00Z").toISOString();
        const checkOutUtc = new Date(checkOut + "T00:00:00Z").toISOString();

        try {
            const res = await http.get("/api/rooms/available", {
                params: {
                    checkInDate: checkInUtc,
                    checkOutDate: checkOutUtc,
                    maxPrice: maxPrice || null,
                    capacity: capacity || null
                }
            });
            setRooms(res.data);
        } catch (error) {
            console.error("Помилка при отриманні кімнат:", error);
        }
    };

    const handleView = (id) => {
        navigate(`/rooms/${id}`);
    };

    return (
        <div className="room-page">
            <div className="room-layout">
                <div className="date-filter">
                    <h2>Search</h2>

                    <label>Check-in:</label>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />

                    <label>Check-out:</label>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

                    <label>Max. price oer night:</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max. price"
                    />

                    <label>Peoples capasity:</label>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="Peoplec count"
                    />

                    <button onClick={fetchAvailableRooms}>🔍 Search</button>
                </div>

                <div className="room-list-section">
                    <h2 className="section-title">Rooms</h2>
                    <div className="room-list">
                        {rooms.map(room => (
                            <div className="room-card" key={room.id}>
                                <img src={`http://localhost:5007${room.image}`} alt="room" />
                                <div className="room-card-details">
                                    <h3>{room.type}</h3>
                                    <p>Number: {room.number}</p>
                                    <p>Capasity: {room.capacity }</p>
                                    <p>Price per night: {room.pricePerNight}₴</p>
                                    <button onClick={() => handleView(room.id)}>Reserve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rooms;