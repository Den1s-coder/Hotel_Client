import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import Login from './pages/Login';
import Register from "./pages/Register";
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import AddRoom from "./pages/AddRoom";
import MyBookings from "./pages/MyBookings";

function App() {
    return (
        <BrowserRouter>
        <MyNavbar/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Register />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                <Route path="/add-room" element={<AddRoom />} />
                <Route path="/MyBookings" element={<MyBookings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
