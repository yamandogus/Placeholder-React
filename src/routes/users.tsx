import {
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";

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
      <h1 className="text-center my-3">Users Information</h1>
      <Container>
      <Row>
        {usersData.map((user) => (
          <Col key={user.id} sm={6} md={4} lg={3}>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Body>
                <Card.Title>{user.name} ({user.username})</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Address:</strong> {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}<br />
                  <strong>Phone:</strong> {user.phone}<br />
                  <strong>Website:</strong> <a href={`http://${user.website}`}>{user.website}</a><br />
                  <strong>Company:</strong> {user.company.name}<br />
                  <strong>Catch Phrase:</strong> {user.company.catchPhrase}<br />
                  <strong>BS:</strong> {user.company.bs}
                </Card.Text>
                <Link to={`/details/${user.id}`} className="btn btn-primary">
                    View Details
                  </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
}
