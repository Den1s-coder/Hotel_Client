import React, { useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await http.post("/api/Auth/register", form);
            navigate("/login");
        } catch (err) {
            alert("Error: " + err);
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-form">
                <h1>Реєстрація</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Ім'я"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        placeholder="Пароль"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Зареєструватися</button>
                </form>
            </div>
        </div>
    );
}

export default Register;