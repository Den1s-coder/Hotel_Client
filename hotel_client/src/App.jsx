import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import Rooms from './pages/Rooms';
import AddRoom from "./pages/AddRoom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Register />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/add-room" element={<AddRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
