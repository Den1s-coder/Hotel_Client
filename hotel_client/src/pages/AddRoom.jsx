import { useState } from "react";
import axios from "axios";
import "./AddRoom.css";

export default function AddRoom() {
    const [number, setNumber] = useState("");
    const [type, setType] = useState("");
    const [pricePerNight, setPricePerNight] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("Оберіть фото.");
            return;
        }

        const formData = new FormData();
        formData.append("Number", number); 
        formData.append("Type", type);
        formData.append("PricePerNight", pricePerNight); 
        formData.append("Image", image);

        try {
            await axios.post("http://localhost:5007/api/rooms", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            setMessage("Room added");
            setNumber("");
            setType("");
            setPricePerNight("");
            setImage(null);
        } catch (err) {
            console.error(err);
            setMessage("Error." + err);
        }
    };

    return (
        <div className="form-container">
            <h2>Додати кімнату</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Номер:</label>
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Тип:</label>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Ціна:</label>
                    <input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Зображення:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <button type="submit" className="submit-btn">Додати</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}