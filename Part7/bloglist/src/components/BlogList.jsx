import { useSelector, useDispatch } from "react-redux";
import BlogDisplay from "./BlogDisplay";

const BlogList = ({ increseLikes, loggedUser, removeBlog }) => {  
  const blogs = useSelector(state => state.blog) 
  
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogDisplay key={blog.id} blog={blog} loggedUser={loggedUser}/>
        ))}
    </>    
  );
};

export default BlogList;
