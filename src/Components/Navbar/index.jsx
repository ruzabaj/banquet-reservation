import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "../../Assets/Styles/Navbar/navbar.scss";

function CollapsibleExample() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className='navbar' style={{ color: "white" }}>
        <Container>
          <img src='./alice.jpg' alt='logo' className='logo' />
          <Navbar.Brand>Alice Reception</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <p>Started</p>
            </Nav>
            <Nav className='make-reservation'>
                <Link to="/">
                  <p>Make a Reservation</p>
                </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CollapsibleExample;