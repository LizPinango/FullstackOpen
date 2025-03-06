import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

const Home = ({ loggedUser }) => {
  return (
    <div>
      <BlogForm />
      <BlogList loggedUser={loggedUser} />
    </div>
  )
}

export default Home;