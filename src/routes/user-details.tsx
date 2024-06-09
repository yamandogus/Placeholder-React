import { Link, useLoaderData, useParams } from "react-router-dom";
import { Tabs, Tab, Container} from "react-bootstrap";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ButonNew, PostList, UsersContainer } from "./styled-components/styled";
import { GrUpdate } from "react-icons/gr";
import { AiFillHeart } from "react-icons/ai";

export interface User {
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
  userId?: number;
  id?: number;
  title: string;
  body: string;
}
interface PostsPropsStore {
  count2: number;
  userId?: number;
  id?: number;
  title: string;
  body: string;
  posts: PostsProps[],
  setUserId: (payload: number) => void,
  setId: (payload: number) => void,
  setTitle: (payload: string) => void,
  setBody: (payload: string) => void,
  addPosts: (post: PostsProps) => void;  
  removePosts: (postId: number) => void;
  increaceCount: () => void;
  decreaseCount: () => void;
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
  const { userId} = params;
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

export const usePostStore = create<PostsPropsStore>()(
  persist(
    (set) => ({
      count2:0,
      userId: undefined,
      id: undefined,
      title: "",
      body: "",
      posts: [],
      increaceCount: () => set((state) => ({ count2: state.count2 + 1 })),
      decreaseCount: () => set((state) => ({ count2: state.count2 - 1 })),
      setUserId: (payload) => set({ userId: payload }),
      setId: (payload) => set({ id: payload }),
      setTitle: (payload) => set({ title: payload }),
      setBody: (payload) => set({ body: payload }),
      addPosts: (post) =>
        set((state) => ({
          posts: [...state.posts, post],
        })),
      removePosts: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
    }),
    {
      name: "post-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default function UserDetailsPage() {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { userId } = useParams() as unknown as loaderParams;
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const [albums, setAlbums] = useState<AlbumsProps[]>([]);
  const [todos, setTodos] = useState<TodosPorps[]>([]);
  const addPosts = usePostStore((state) => state.addPosts);
  const increaceCount = usePostStore((state) => state.increaceCount)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLike = (post: PostsProps)=> {
   addPosts(post)
   increaceCount();
  }

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

  if(!todos && !albums && !posts) return <div><GrUpdate /></div>

  

  return (
    <>
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
              <PostList className="mt-3" key={post.id}>
                <p>
                  <strong>User Id:</strong> {post.userId}
                </p>
                <p>
                  <strong>Post Id: </strong> {post.id}
                </p>
                <h5>Title: {post.title}</h5>
                <p>{post.body}</p>
               
               <ButonNew>
                <Link to={`/users/${userId}/posts/${post.id}`}>
                 Comments Details
                </Link>
                </ButonNew>
                <AiFillHeart style={{
                  fontSize:"30px",
                  marginLeft:"150px"
                }} onClick={()=> handleLike(post)} />
              </PostList>
            ))}
          </Tab>
          <Tab eventKey="profile" title="Albums">
            {albums.map((album) => (
              <PostList className="mt-3" key={album.id}>
                <p>
                  <strong>User Id:</strong> {album.userId} <br /> <br />
                  <strong>Album Id:</strong> {album.id}
                </p>
                <p>
                  <strong>Album Name: </strong>
                  {album.title}
                </p>
                <ButonNew>
                <Link to={`/users/${userId}/albums/${album.id}`}>Albums</Link>
                </ButonNew>
              </PostList>
            ))}
          </Tab>
          <Tab eventKey="contact" title="Todos">
            {todos.map((todo) => (
              <PostList className="mt-3" key={todo.id}>
                <p>
                  <strong>User Id:</strong> {todo.userId} <br /> <br />
                  <strong>Album id:</strong> {todo.id}
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
