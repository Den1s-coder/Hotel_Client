import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Rooms from './pages/Rooms';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/rooms" element={<Rooms />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
