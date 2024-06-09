import { Container } from "react-bootstrap";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { UserContent, PostContent} from "./styled-components/styled";
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
  const { user, post, comments } = useLoaderData() as Awaited<ReturnType<typeof LoaderComments>>
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
        <br />
        
          
          {comments.map((comment)=>(
           <PostContent key={comment.id}>
             <p><strong>Id: </strong>{comment.id}</p>
             <p><strong>Post Id: </strong>{comment.postId}</p>
             <p><strong>Name: </strong> {comment.name}</p>
             <p><strong>Email: </strong> {comment.email}</p>
             <p><strong>Body: </strong> {comment.body}</p>
           </PostContent>
            
          ))}
      </Container>
    </>
  );
}
