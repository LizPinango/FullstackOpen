const Blog = require('../models/blog')  
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog_1',
    author: 'Person_1',
    url: 'https://www.Blog_1.com/p?n=123',
    likes: 1
  }, 
  {
    title: 'Blog_2',
    author: 'Person_2',
    url: 'https://www.Blog_2.com/p?n=456',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'blogToRemove',
    author: 'person',
    url: 'https://www.blogToRemove.com/p?n=4',
    likes: 1
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}