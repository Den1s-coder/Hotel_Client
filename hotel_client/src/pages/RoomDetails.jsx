import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../api/http";

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
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold">{room.type}</h2>
            <img src={`http://localhost:5007${room.image}`} alt="room" width="200" />
            <p>Номер: {room.number}</p>
            <p>Ціна за ніч: {room.pricePerNight}₴</p>
            <p>Статус: {room.isAvailable ? "Доступна" : "Зайнята"}</p>

            <div className="mt-4">
                <label>Дата заїзду:</label>
                <input
                    type="date"
                    className="block w-full p-2 border rounded my-2"
                    value={checkIn}
                    onChange={(e) => setCheckInDate(e.target.value)}
                />

                <label>Дата виїзду:</label>
                <input
                    type="date"
                    className="block w-full p-2 border rounded my-2"
                    value={checkOut}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />

                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleBooking}
                >
                    Забронювати
                </button>
            </div>
        </div>
    );
};

export default RoomDetails;