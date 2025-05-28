import { useState } from "react";
import http from "../../api/http";
import "./ChangePrices.css";

export default function ChangePrices() {
    const [type, setType] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!type || !newPrice) {
            setError("Всі поля обов’язкові.");
            return;
        }

        const formData = new FormData();
        formData.append("Type", type);
        formData.append("NewPrice", newPrice);

        try {
            await http.post("/api/rooms/update-prices", formData);

            setMessage("Price updated succesful!.");
            setType("");
            setNewPrice("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="update-prices-container">
            <h2>Update price by room type</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Room type:</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Simple: Comfort, Deluxe"
                    />
                </div>
                <div className="form-group">
                    <label>New price (₴):</label>
                    <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        step="0.01"
                        min="0"
                    />
                </div>
                <button type="submit">Update price</button>
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}