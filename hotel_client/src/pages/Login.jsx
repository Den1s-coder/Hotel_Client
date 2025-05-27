import { useState, useContext } from 'react';
import http from '../api/http';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUserEmail } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const response = await http.post('/api/Auth/login', { email, password });
            setUserEmail(email);
            navigate('/rooms');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}