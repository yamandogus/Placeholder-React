import { Container } from "react-bootstrap";
import { usePostStore } from "./user-details";
import { PostList } from "./user-details";
import { IoHeartDislikeOutline } from "react-icons/io5";

export default function PostFavorites() {
  const posts = usePostStore((state) => state.posts);
  const removePosts = usePostStore((state) => state.removePosts);
  const decreaseCount = usePostStore((state) => state.decreaseCount)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDislike = (postId: any) => {
      removePosts(postId)
      decreaseCount()
  }

  return (
    <>
      <Container>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostList key={post.id} className="mt-3">
              <p>
                <strong>UserId:</strong> {post.userId}
              </p>
              <p>
                <strong>Post Id: </strong> {post.id}
              </p>
              <h5>Title: {post.title}</h5>
              <p>{post.body}</p>
              <div className="text-center">
              <IoHeartDislikeOutline onClick={()=> handleDislike(post.id)} />
              </div>
            </PostList>
          ))
        ) : (
          <p>No favorite posts.</p>
        )}
      </Container>
    </>
  );
}
