import { useDispatch } from "react-redux";
import { likeOneBlog, deleteOneBlog } from "../reducers/blogReducer";
import { useState } from "react";

const BlogDisplay = ({ blog, loggedUser }) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div className="blogInfo">
      <div className="blogInfoHeader">
        <p>
          <b>{blog.title}</b> by {blog.author}
        </p>
        <button className="btnShowMore" onClick={() => setVisible(!visible)}>
          {visible ? "Show Less" : "Show More"}
        </button>
      </div>
      <div className="blogInfoBody" style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button onClick={() => dispatch(likeOneBlog(blog))}>like</button>
        </p>
      </div>
      <div className="blogInfoFooter" style={showWhenVisible}>
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
