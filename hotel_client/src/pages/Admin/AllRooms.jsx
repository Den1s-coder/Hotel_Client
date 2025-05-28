import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import "./AllRooms.css";

function AllRooms() {
    const [rooms, setRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await http.get("/api/rooms");
                setRooms(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRooms();
    }, []);

    const handleDelete = async (roomId) => {
        try {
            await http.delete(`/api/Rooms/${roomId}`, {
                withCredentials: true
            });
            setRooms(rooms.filter(b => b.id !== roomId));
        } catch (err) {
            console.error(err);
        }
    };

    const filteredRooms = rooms.filter(room =>
        room.number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="select-room-container">
            <div className="header">
                <h2>All rooms</h2>
                <div className="actions">
                    <button className="action-btn add" onClick={() => navigate("/add-room")}>➕ Add Room</button>
                    <button className="action-btn update" onClick={() => navigate("/update-price")}>Update price</button>
                    <button className="action-btn booking" onClick={() => navigate("/allbookings")}>📄 All Bookings</button>
                </div>
            </div>
            <input
                type="text"
                placeholder="Find by number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />

            <ul className="room-list">
                {rooms
                    .filter(room =>
                        room.number.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(room => (
                        <li key={room.id} className="room-item">
                            <div className="room-info">
                                Room №{room.number} — {room.type}
                            </div>
                            <div className="room-actions">
                                <button className="update-button">Update</button>
                                <button className="delete-button">Delete</button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default AllRooms;