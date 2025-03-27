import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

const Home = ({blogs, loggedUser }) => {
  return (
    <>
      <BlogForm />
      <BlogList blogs={blogs} loggedUser={loggedUser} />
    </>
  )
}

export default Home;