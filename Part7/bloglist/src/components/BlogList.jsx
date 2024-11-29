import { useSelector } from "react-redux";
import BlogDisplay from "./BlogDisplay";

const BlogList = ({ loggedUser }) => {
  const blogs = useSelector((state) => state.blog);

  return (
    <>
      <h3>Blogs</h3>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <BlogDisplay key={blog.id} blog={blog} loggedUser={loggedUser} />
        ))}
    </>
  );
};

export default BlogList;
