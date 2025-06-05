import { useState, useContext } from 'react';
import http from '../../api/http';;
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserEmail } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await http.post('/api/Auth/login', { email, password });
            setUserEmail(email);
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data) {
                alert("Error: " + err.response.data);
            } else {
                alert("Unexpected error occurred.");
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={() => handleLogin(email, password)}>Sign in</button>
            </div>
        </div>
    );
}