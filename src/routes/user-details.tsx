import { useLoaderData, useParams } from "react-router-dom";
import { Tabs, Tab, Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import styled from "styled-components";

const UsersContainer = styled.div`
  padding: 10px;
  border: 1px solid black;
  width: 300px;
  border-radius: 5px;
  background-color: #d2e8ff;
`;

const PostList = styled.div`
  padding: 16px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #d2e8ff;
`;

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

interface loaderParams {
  userId: string;
}

interface PostsProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface AlbumsProps {
  userId: number;
  id: number;
  title: string;
}

interface TodosPorps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function loader({ params }: { params: loaderParams }) {
  const { userId } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = (await response.json()) as User;
  if (!data.id) {
    throw new Response("", {
      status: 404,
      statusText: "User Post Not Fount",
    });
  }
  return { user: data };
}

export default function UserDetailsPage() {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { userId } = useParams() as unknown as loaderParams;
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const [albums, setAlbums] = useState<AlbumsProps[]>([]);
  const [todos, setTodos] = useState<TodosPorps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responsePosts = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/posts`
        );
        const postsData: PostsProps[] = await responsePosts.json();
        setPosts(postsData);

        const responseAlbums = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/albums`
        );
        const albumsData: AlbumsProps[] = await responseAlbums.json();
        setAlbums(albumsData);

        const responseTodos = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}/todos`
        );
        const todosData: TodosPorps[] = await responseTodos.json();
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [userId]);

  if(!todos && !albums && !posts) return <div>Yükleniyor...</div>
  return (
    <>
      {/* <pre>{JSON.stringify(user)}</pre> */}
      <Container className="mt-5">
        <UsersContainer className="my-5">
          <p>
            <strong>UserId:</strong> {userId}
          </p>
          <h4>
            {user.name} ({user.username})
          </h4>
        </UsersContainer>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Posts">
            {posts.map((post) => (
              <PostList className="mt-3" key={post.userId}>
                <p>
                  <strong>UserId:</strong> {post.userId}
                </p>
                <p>
                  <strong>Post Id: </strong> {post.id}
                </p>
                <h5>Title{post.title}</h5>
                <p>{post.body}</p>
              </PostList>
            ))}
          </Tab>
          <Tab eventKey="profile" title="Albums">
            {albums.map((album) => (
              <PostList className="mt-3" key={album.userId}>
                <p>
                  User Id: {album.userId} <br /> <br />
                  Album id: {album.id}
                </p>
                <p>
                  <strong>Album Name: </strong>
                  {album.title}
                </p>
              </PostList>
            ))}
          </Tab>
          <Tab eventKey="contact" title="Contact">
            {todos.map((todo) => (
              <PostList className="mt-3" key={todo.userId}>
                <p>
                  User Id: {todo.userId} <br /> <br />
                  Album id: {todo.id}
                </p>
                <h5>Title: {todo.title}</h5>
                <p>
                  <strong>Completed: </strong>
                  {todo.completed ? "✅" : "❌"}
                </p>
              </PostList>
            ))}
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
