import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyNavbar from "./components/MyNavbar";
import Login from './pages/Auth/Login';
import Register from "./pages/Auth/Register";
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import AddRoom from "./pages/Admin/AddRoom";
import MyBookings from "./pages/User/MyBookings";
import UpdateRoom from "./pages/Admin/UpdateRoom";
import AllRooms from "./pages/Admin/AllRooms";
import AllBookings from "./pages/Admin/AllBookings";
import ChangePrices from "./pages/Admin/ChangePrices";

function App() {
    return (
        <BrowserRouter>
        <MyNavbar/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Rooms />} />
                <Route path="/rooms/:id" element={<RoomDetails />} />
                <Route path="/add-room" element={<AddRoom />} />
                <Route path="/MyBookings" element={<MyBookings />} />
                <Route path="/update-room/:id" element={<UpdateRoom />} />
                <Route path="/update-price" element={<ChangePrices />} />
                <Route path="/allrooms" element={<AllRooms />} />
                <Route path="/allbookings" element={<AllBookings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
