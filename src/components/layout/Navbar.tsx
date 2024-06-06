import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarBS from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Badge } from "react-bootstrap";
import { useAlbumStore } from "../../routes/favorites ";
import { usePostStore } from "../../routes/user-details";


const link = "https://remix.run/blog-images/posts/remixing-react-router/image.jpg"

const Logo = styled.img`
  height: 40px;
  width: 80px;
  border-radius: 5px;
`

const BadgeIcon = styled(Badge)`
color: #000000;
border-radius: 50%;
padding: 4px 8px;
font-size: 12px;
position: relative;
top: -8px;
right: -4px;
`

export function Navbar() {

const count = useAlbumStore((state)=> state.count)
const count2 = usePostStore((state) => state.count2)


  return (
    <NavbarBS expand="lg"className="bg-body-tertiary" >
      <Container>
        <NavbarBS.Brand href="/users"><Logo  src={link} alt="" /></NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBS.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
             Album Favorites<BadgeIcon>{count}</BadgeIcon>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/post-favorites">
             Post Favorites<BadgeIcon>{count2}</BadgeIcon>
            </Nav.Link>
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;
