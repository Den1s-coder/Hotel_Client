import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from '../../api/http';;
import "./UpdateRoom.css";

const UpdateRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [number, setNumber] = useState("");
    const [type, setType] = useState("");
    const [pricePerNight, setPricePerNight] = useState("");
    const [capacity, setCapacity] = useState("");
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await http.get(`/api/rooms/${id}`);
                const room = res.data;
                setNumber(room.number);
                setType(room.type);
                setPricePerNight(room.pricePerNight);
                setCapacity(room.capacity);
                setExistingImage(room.image);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRoom();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Number", number);
        formData.append("Type", type);
        formData.append("PricePerNight", pricePerNight);
        formData.append("Capacity", capacity);
        if (image) {
            formData.append("Image", image); 
        }

        try {
            await http.put(`/api/rooms/${id}`, formData);
            setMessage("Room updated");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="update-room-container">
            <h2>Update room</h2>
            <form className="update-room-form" onSubmit={handleSubmit}>
                <label>Number room</label>
                <input
                    type="text"
                    value={number || ""}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />

                <label>Type:</label>
                <input
                    type="text"
                    value={type || ""}
                    onChange={(e) => setType(e.target.value)}
                    required
                />

                <label>Price per night:</label>
                <input
                    type="number"
                    value={pricePerNight || ""}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    required
                />

                <label>Capasity:</label>
                <input
                    type="number"
                    value={capacity || ""}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />

                <label>New image (optional):</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                {existingImage && (
                    <div>
                        <label>Current image:</label>
                        <img src={`http://localhost:5007${existingImage}`} alt="room" />
                    </div>
                )}

                <button type="submit">Update</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UpdateRoom;