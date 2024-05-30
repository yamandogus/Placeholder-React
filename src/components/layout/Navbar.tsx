import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBS from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const link = "https://remix.run/blog-images/posts/remixing-react-router/image.jpg"

const Logo = styled.img`
  height: 40px;
  width: 80px;
  border-radius: 5px;
`

export function Navbar() {
  return (
    <NavbarBS expand="lg" className="bg-body-tertiary">
      <Container>
        <NavbarBS.Brand href="#home"><Logo  src={link} alt="" /></NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBS.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
              Favorites
            </Nav.Link>
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;
