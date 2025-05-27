import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
    const { userEmail, setUserEmail } = useContext(AuthContext);
    const { userRole, setUserRole } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    return (
        <BootstrapNavbar bg="primary" data-bs-theme="dark">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">Готель</BootstrapNavbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/rooms">Кімнати</Nav.Link>
                    {userEmail && <Nav.Link as={Link} to="/MyBookings">Мої бронювання</Nav.Link>}
                    {userRole === "Admin" && <Nav.Link href="/admin">Адмін-панель</Nav.Link>}
                </Nav>
                <Nav>
                    {userEmail ? (
                        <>
                            <span className="navbar-text text-white me-2">{userEmail}</span>
                            <Button variant="outline-light" onClick={logout}>Вийти</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/login">Логін</Nav.Link>
                            <Nav.Link href="/">Реєстрація</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </BootstrapNavbar>
    );
};

export default MyNavbar;