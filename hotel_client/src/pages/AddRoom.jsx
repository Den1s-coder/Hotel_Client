import { useState } from "react";
import axios from "axios";

export default function AddRoom() {
    const [number, setNumber] = useState("");
    const [type, setType] = useState("");
    const [pricePerNight, setPricePerNight] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage("ќбер≥ть фото.");
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
        <div style={{ maxWidth: 600, margin: "auto" }}>
            <h2>Add room</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Number:</label>
                    <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <button type="submit">Add</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}