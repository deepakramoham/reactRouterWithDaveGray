import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "../context/DataContext";
import api from "../api/posts";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const PostPage = () => {
  const { id } = useParams();
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();
  const post = posts.find((post) => post.id.toString() === id);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      history.push("/");
    } catch (err) {
      console.log(`Error:${err.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to="/">Visit Our Homepage</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};
export default PostPage;
