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
                <BootstrapNavbar.Brand as={Link} to="/">Hotel</BootstrapNavbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Rooms</Nav.Link>
                    {userEmail && <Nav.Link as={Link} to="/MyBookings">My booking</Nav.Link>}
                    {userRole === "Admin" && <Nav.Link href="/allrooms">Admin-panel</Nav.Link>}
                </Nav>
                <Nav>
                    {userEmail ? (
                        <>
                            <span className="navbar-text text-white me-2">{userEmail}</span>
                            <Button variant="outline-light" onClick={logout}>Log out</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/login">Log in</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </BootstrapNavbar>
    );
};

export default MyNavbar;