import { Link } from 'react-router-dom'

const BlogList = ({blogs}) => {
  return (
    <div>
      <h3>Blogs</h3>
      <ul>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>  
            </li>
          ))
        }
      </ul>
      
    </div>
  );
};

export default BlogList;
