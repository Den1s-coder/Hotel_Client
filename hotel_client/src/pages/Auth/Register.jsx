import React, { useState } from "react";
import http from '../../api/http';;
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
            if (err.response && err.response.data) {
                alert("Error: " + err.response.data); 
            } else {
                alert("Unexpected error occurred.");
            }
        }
    };

    return (
        <div className="register-wrapper">
            <div className="register-form">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
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
                        placeholder="Password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;