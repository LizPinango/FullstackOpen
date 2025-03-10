import { useDispatch } from "react-redux";
import { likeOneBlog, deleteOneBlog } from "../reducers/blogReducer";
import { useParams} from 'react-router-dom'

const BlogDisplay = ({ blogs, loggedUser }) => {
  const dispatch = useDispatch();
  const id = useParams().id  
  const blog = blogs.find(u => u.id === id) 

  return (
    <div className="blogInfo">
      <div className="blogInfoHeader">
        <h2>
          <b>{blog.title}</b>
        </h2>        
      </div>
      <div className="blogInfoBody">
        <p>Author: {blog.author}</p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button onClick={() => dispatch(likeOneBlog(blog))}>like</button>
        </p>
      </div>
      <div className="blogInfoFooter">
        {blog.user ? <p>save by {blog.user.username}</p> : <></>}
        {blog.user.username === loggedUser.username ? (
          <button
            className="btnRemove"
            onClick={() => dispatch(deleteOneBlog(blog.id, blog.title))}
          >
            Remove
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BlogDisplay;
