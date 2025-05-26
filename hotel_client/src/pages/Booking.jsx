import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BookingPage() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5007/api/Rooms", { withCredentials: true })
            .then(res => setRooms(res.data))
            .catch(err => console.error("Failed to load rooms:", err));
    }, []);

    const handleBooking = async () => {
        try {
            const checkInUtc = new Date(checkIn + "T00:00:00Z").toISOString();
            const checkOutUtc = new Date(checkOut + "T00:00:00Z").toISOString();

            const res = await axios.post("http://localhost:5007/api/Booking", {
                roomId: selectedRoomId,
                checkInDate: checkInUtc,
                checkOutDate: checkOutUtc
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            alert("Бронювання успішне!");
        } catch (err) {
            console.error("Деталі помилки:", {
                response: err.response?.data,
                status: err.response?.status,
                headers: err.response?.headers
            });
            alert("Помилка бронювання: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Забронювати кімнату</h1>

            <label className="block mb-2">Оберіть кімнату:</label>
            <select
                className="w-full border p-2 mb-4"
                onChange={(e) => setSelectedRoomId(e.target.value)}
                value={selectedRoomId || ""}
            >
                <option value="">-- Оберіть кімнату --</option>
                {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                        {room.number} | {room.type} | {room.pricePerNight}₴
                    </option>
                ))}
            </select>

            <label className="block mb-2">Дата заїзду:</label>
            <input
                type="date"
                className="w-full border p-2 mb-4"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
            />

            <label className="block mb-2">Дата виїзду:</label>
            <input
                type="date"
                className="w-full border p-2 mb-4"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleBooking}
                disabled={!selectedRoomId || !checkIn || !checkOut}
            >
                Забронювати
            </button>
        </div>
    );
}