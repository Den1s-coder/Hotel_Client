import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from "./pages/Register";
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import AddRoom from "./pages/AddRoom";
import Booking from "./pages/Booking";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Register />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                <Route path="/add-room" element={<AddRoom />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
