import { useDispatch } from "react-redux";
import { likeOneBlog, deleteOneBlog, commentOneBlog } from "../reducers/blogReducer";
import { useParams} from 'react-router-dom'

const BlogDisplay = ({ blogs, loggedUser }) => {
  const dispatch = useDispatch();
  const id = useParams().id  
  const blog = blogs.find(u => u.id === id) 

  const addComment = async (event) => {    
    event.preventDefault();

    const newComment = event.target.Comment.value     

    event.target.Comment.value = "";    

    dispatch(commentOneBlog(blog, newComment) );
  };

  if (!blog) {    
    return null  
  }

  return (
    <section id="blogInfo">
      <div id="blog-info-header">
        <h2>
          {blog.title}
        </h2>        
      </div>
      <div id="blog-info-body">
        <p>Author: {blog.author}</p>
        <p>{blog.url}</p>  
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>          
        <form onSubmit={addComment}>
          <label htmlFor="Comment">Leave a Comment!</label>
          <br></br>
          <input id="Comment" name="Comment" />
          <button id="btn-comment" type="submit">submit</button>
        </form>
      </div>
      <div id="blog-info-footer">
        {blog.user ? <p>save by {blog.user.username}</p> : <></>}
        <div id='footer-buttons'>
          <p>
            {blog.likes}{" "}
            <button id="btn-like" onClick={() => dispatch(likeOneBlog(blog))}>
              like
            </button>
          </p>
          {blog.user.username === loggedUser.username ? (
            <button
              id="btn-remove"
              onClick={() => dispatch(deleteOneBlog(blog.id, blog.title))}
            >
              Remove
            </button>
          ) : (
            <></>
          )}
        </div>        
      </div>
    </section>
  );
};

export default BlogDisplay;
