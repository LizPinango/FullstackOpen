import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

const Home = ({blogs, loggedUser }) => {
  return (
    <div>
      <BlogForm />
      <BlogList blogs={blogs} loggedUser={loggedUser} />
    </div>
  )
}

export default Home;