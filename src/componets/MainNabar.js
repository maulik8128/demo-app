import {Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const MainNavBar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <NavLink to="/" className="nav-item nav-link navbar-brand">
          Home
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/posts" className="nav-item nav-link">
              Posts
            </NavLink>
            <NavLink to="/add-post" className="nav-item nav-link">
              create Post
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavBar;
