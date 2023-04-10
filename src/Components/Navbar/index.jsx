import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import "../../Assets/Styles/Navbar/navbar.scss";

function CollapsibleExample() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className='navbar' style={{ color: "white" }}>
        <Container>
          {/* <img src='./alice_conf.png' alt='logo' className='logo' /> */}
          <img src='./alice.jpg' alt='logo' className='logo' />
          {/* <Navbar.Brand>Alice Conference</Navbar.Brand> */}
          <Navbar.Brand>Alice Reception</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className='nav-link'>
              <Nav className='view-reservation'>
                <Link to="/started">
                  <p>View Reservation</p>
                </Link>
              </Nav>
            </div>
            <div className='nav-link'>
              <Nav className='make-reservation'>
                <Link to="/register">
                  <p>Make Reservation</p>
                </Link>
              </Nav>
            </div>
            <div className='nav-link'>
              <Nav className='view-availability'>
                <Link to="/schedule">
                  <p>View Availability </p>
                </Link>
              </Nav>
            </div>
            <div className='nav-link'>
              <Nav className='view-availability'>
                <Link to="/CustomerDetails">
                  <p>Customer Details</p>
                </Link>
              </Nav>
            </div>
            <div className='nav-link'>
              <Nav className='view-availability'>
                <Link to="/availability">
                  <p>View Schedule</p>
                </Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CollapsibleExample;