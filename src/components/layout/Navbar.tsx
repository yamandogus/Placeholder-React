import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBS from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useAlbumStore } from "../../routes/favorites ";
import { usePostStore } from "../../routes/user-details";
import {Logo, BadgeIcon} from "../../routes/styled-components/styled"

const link = "https://remix.run/blog-images/posts/remixing-react-router/image.jpg"

export function Navbar() {

const count = useAlbumStore((state)=> state.count)
const count2 = usePostStore((state) => state.count2)


  return (
    <NavbarBS expand="lg" bg="dark" data-bs-theme="dark" >
      <Container>
        <NavbarBS.Brand href="/users"><Logo  src={link} alt="" /></NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBS.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  as={NavLink} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
             Album Favorites<BadgeIcon>{count}</BadgeIcon>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/post-favorites">
             Post Favorites<BadgeIcon className="badge2">{count2}</BadgeIcon>
            </Nav.Link>
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;
