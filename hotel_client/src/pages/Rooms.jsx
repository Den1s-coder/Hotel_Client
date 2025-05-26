import React, { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

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
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Список кімнат</h2>
            {rooms.length === 0 ? (
                <p>Немає кімнат</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="border rounded-lg shadow p-4 flex flex-col justify-between"
                        >
                            <img src={`http://localhost:5007${room.image}`} alt="room" width="200" />
                            <h3 className="text-xl mt-2 font-semibold">{room.type}</h3>
                            <p>Номер: {room.number}</p>
                            <p>Ціна за ніч: {room.pricePerNight}₴</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={() => handleView(room.id)}
                            >
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