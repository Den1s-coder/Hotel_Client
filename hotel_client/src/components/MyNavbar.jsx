import { Navbar as BootstrapNavbar, Container, Nav, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyNavbar = () => {
    const { userEmail, setUserEmail } = useContext(AuthContext);

    const logout = () => {
        document.cookie = "wery_good_cookies";
        setUserEmail(null);
    };

    return (
        <BootstrapNavbar bg="primary" data-bs-theme="dark">
            <Container>
                <BootstrapNavbar.Brand href="/">Готель</BootstrapNavbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/rooms">Кімнати</Nav.Link>
                    {userEmail && <Nav.Link href="/bookings">Мої бронювання</Nav.Link>}
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