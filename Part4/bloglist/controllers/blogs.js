const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })  
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body  
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author, 
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog) 
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if(!blog.user || blog.user.toString() !== user.id.toString()){
    return response.status(401).json({error: 'blog can only be delete by the user who add it'})
  }
  
  await blog.deleteOne()
  user.blogs = user.blogs.filter(b => b.id !== blog.id)
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
 
  const blog = {
    title: body.title,
    author: body.name, 
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    
  if(!updatedBlog){
    response.status(404).send({ error: 'The Blog has been eliminated' })
  }else{
    response.status(200).json(updatedBlog) 
  }    
})

module.exports = blogsRouter;