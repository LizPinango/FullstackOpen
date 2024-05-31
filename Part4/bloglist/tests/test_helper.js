const Blog = require('../models/blog') //MongoDB Schema 

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}