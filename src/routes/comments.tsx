import { Container } from "react-bootstrap";
import { Link, useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";

const UserContent = styled.div`
  margin: 10px 0 10px 0;
  padding: 16px;
  border-radius: 5px;
  background-color: #d2e8ff;
  width: 300px;
  border: 1px solid black;
`;
const PostContent = styled.div`
  padding: 16px;
  margin: 10px 0 10px 0;
  border-radius: 5px;
  background-color: #d2e8ff;
  width: 500px;
  border: 1px solid black;
`;
interface UserProps {
  userId: string;
  postId: string;
}

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

interface PostsProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface CommnetsProps {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export async function LoaderComments({ params }: { params: UserProps }) {
  const { userId, postId } = params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const dataUser: User = await response.json();

  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const postData: PostsProps = await postResponse.json();

  const commentsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${userId}/comments`
  );
  const commentsData: CommnetsProps[] = await commentsResponse.json();
  console.log(commentsData);
  

  if (!dataUser.id) {
    throw new Response("", {
      status: 404,
      statusText: "User Post Not Fount",
    });
  }
  return { user: dataUser, post: postData, comments: commentsData };
}
export default function CommentsPage() {
  const { user, post, comments } = useLoaderData() as {
    user: User;
    post: PostsProps;
    comments: CommnetsProps;
  };
  const { userId } = useParams() as unknown as UserProps;
  // const { postId } = useParams() as unknown as UserProps;
  return (
    <>
      <Container>
        <UserContent>
          <h4>{user.name}({user.username})</h4>
          <Link to={`/users/${userId}/`}>Profile</Link>
        </UserContent>
        <PostContent>
          <p>
            <strong>Post Id:</strong> {post.id}
          </p>
          <p>
            <strong>User Id:</strong> {post.userId}
          </p>
          <p>
            <strong>Post Title:</strong> {post.title}
          </p>
          <p>
            <strong>Post Body:</strong> {post.body}
          </p>
        </PostContent>
        {/* <div style={{
          backgroundColor:"#d2e8ff"
        }}>
          <p>Comment Id: {comments.id}</p>
          <p>Post Id: {comments.postId}</p>
          <p>Comments Name: {comments.name}</p>
          <p>Email: {comments.email}</p>
          <p>Comments Body: <br /> {comments.body}</p>
        </div> */}
        <pre>{JSON.stringify(comments)}</pre>
      </Container>
    </>
  );
}
