import { useEffect, useState } from 'react';
import http from '../api/http';

export default function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        http.get('/api/Rooms')
            .then(res => setRooms(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Room list</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.Id}>
                        <img src={`http://localhost:5007${room.image}`} alt="room" width="200" />
                        Number {room.number} Type {room.type } Price {room.pricePerNight} 
                    </li>
                ))}
            </ul>
            
        </div>
    );
}