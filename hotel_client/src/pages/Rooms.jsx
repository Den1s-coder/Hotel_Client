import React, { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";
import "./Rooms.css";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
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

    const handleView = (id) => {
        navigate(`/rooms/${id}`);
    };

    return (
        <div className="room-list-wrapper">
            <h2>Список кімнат</h2>
            {rooms.length === 0 ? (
                <p>Немає кімнат</p>
            ) : (
                <div className="room-grid">
                    {rooms.map((room) => (
                        <div key={room.id} className="room-card">
                            <img src={`http://localhost:5007${room.image}`} alt="room" />
                            <h3>{room.type}</h3>
                            <p>Номер: {room.number}</p>
                            <p>Ціна за ніч: {room.pricePerNight}₴</p>
                            <button onClick={() => handleView(room.id)}>
                                Переглянути
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Rooms;