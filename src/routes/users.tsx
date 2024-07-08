import {
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaAddressCard, FaChartLine, FaPhoneAlt, FaUserAlt } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { SiTheboringcompany } from "react-icons/si";
import { GiSaberToothedCatHead } from "react-icons/gi";
import { ButonNew, NewCard, Strong, CardBody } from "./styled-components/styled";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export async function loader() {
  const contacts = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = (await contacts.json()) as User[];
  console.log(usersData);
  return { usersData };
}

export default function Users() {
  const { usersData } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <>
      <h3 className="text-center my-3">Users Information</h3>
      <Container>
        <Row>
          {usersData.map((user) => (
            <Col key={user.id} sm={6} md={4} lg={3} style={{marginBottom:"20px"}}>
              <NewCard style={{ marginBottom: '20px'}}>
                <CardBody>
                  <Card.Title className="titleStyle"><FaUserAlt className="userFav" style={{fontSize:"25px"}} /> {user.name} ({user.username})</Card.Title>
                  <Card.Text>
                    <Strong><MdEmail style={{ fontSize:"25px" }}/></Strong> {user.email}<br />
                    <Strong><FaAddressCard style={{ fontSize:"25px" }}/></Strong> {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}<br />
                    <Strong><FaPhoneAlt style={{ fontSize:"25px" }}/></Strong> {user.phone}<br />
                    <Strong><CgWebsite style={{ fontSize:"25px" }}/></Strong> <a href={`http://${user.website}`}>{user.website}</a><br />
                    <Strong><SiTheboringcompany style={{ fontSize:"25px" }}/></Strong> {user.company.name}<br />
                    <Strong><GiSaberToothedCatHead style={{ fontSize:"25px" }}/></Strong> {user.company.catchPhrase}<br />
                    <Strong><FaChartLine style={{ fontSize:"25px" }}/></Strong> {user.company.bs}
                  </Card.Text>
                  <div style={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                  }}>
                    <ButonNew>
                      <Link to={`/users/${user.id}`} >
                        View Details
                      </Link>
                    </ButonNew>
                  </div>
                </CardBody>
              </NewCard>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
