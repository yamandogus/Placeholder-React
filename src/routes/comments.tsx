import { useLoaderData } from "react-router-dom";

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

interface CommnetsProps{
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
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
    `https://jsonplaceholder.typicode.com/users/${userId}/posts/${postId}/comments`
  );
  const commentsData: CommnetsProps[] = await commentsResponse.json();

  if (!dataUser.id) {
    throw new Response("", {
      status: 404,
      statusText: "User Post Not Fount",
    });
  }
  return { user: dataUser, post: postData, comments: commentsData };
}
export default function CommentsPage() {
  const { user, post, comments } = useLoaderData() as { user: User; post: PostsProps; comments: CommnetsProps };

  return (
    <div>
      <pre>{JSON.stringify(user)}</pre>
      <pre>{JSON.stringify(post)}</pre>
      <pre>{JSON.stringify(comments)}</pre>
    </div>
  );
}
