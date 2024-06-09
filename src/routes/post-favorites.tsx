import { Container } from "react-bootstrap";
import { usePostStore } from "./user-details";
import { Empty, PostList} from "./styled-components/styled";
import { IoIosHeartDislike } from "react-icons/io";

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
              <IoIosHeartDislike style={{fontSize:"25px"}} onClick={()=> handleDislike(post.id)} />
              </div>
            </PostList>
          ))
        ) : (
          <Empty>Favorites box is empty</Empty>
        )}
      </Container>
    </>
  );
}
