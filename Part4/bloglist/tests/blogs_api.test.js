const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')  
const User = require('../models/user')

beforeEach(async () => { 
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there is initially some blogs saved:', () => {
  let header

  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    //LOGIN
    const login = await api
      .post('/api/login')
      .send({'username': 'root', 'password': 'sekret' })
    header = {'Authorization': `Bearer ${login.body.token}`}
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('2 blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
  
  test('unique identifier property of the blog post is named id', async () => {
    const response = await api.get('/api/blogs');
    
    assert(Object.keys(response.body[0]).includes('id'))
  })
  
  describe('addition of a new blog:', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'new_blog',
        author: 'new_person',
        url: 'https://www.new_blog.com/p?n=4',
        likes: 3
      }      
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(header)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
    
      const contents = response.body.map(r => r.title)
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    
      assert(contents.includes('new_blog'))
    })
    
    test('if the likes are missing it will default to 0', async () => {
      const newBlog = {
        title: 'new_blog',
        author: 'new_person',
        url: 'https://www.new_blog.com/p?n=4',
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(header)
        .expect(201)
    
      const response = await api.get('/api/blogs')
    
      assert.strictEqual(response.body[2].likes, 0)  
    })
    
    test('fails without the tittle data', async () => {
      const newBlog = {
        author: 'new_person',
        url: 'https://www.new_blog.com/p?n=4',
        likes: 3
      }
    
      await api
      .post('/api/blogs')
      .send(newBlog)
      .set(header)
      .expect(400)  
    
      const response = await api.get('/api/blogs')  
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
    test('fails without the url data', async () => {
      const newBlog = {
        title: 'new_blog',
        author: 'new_person',    
        likes: 3
      }
    
      await api
      .post('/api/blogs')
      .send(newBlog)
      .set(header)
      .expect(400)  
    
      const response = await api.get('/api/blogs')  
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('fails with status code 401 if a token is not provided', async () => {
      const newBlog = {
        title: 'new_blog',
        author: 'new_person',
        url: 'https://www.new_blog.com/p?n=4',
        likes: 3
      } 

      await api
      .post('/api/blogs')
      .send(newBlog)      
      .expect(401)  
    
      const response = await api.get('/api/blogs')  
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog:', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const newBlog = {
        title: 'new_blog',
        author: 'new_person',
        url: 'https://www.new_blog.com/p?n=4',
        likes: 3
      }      
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(header)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const allBlogs = await helper.blogsInDb()
      const blogToDelete = allBlogs.find(b => b.title === newBlog.title)        

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(header)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('updating a blog:', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const update = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(update)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const blogsAfterUpdate = await helper.blogsInDb()

      const updatedBlog = blogsAfterUpdate.filter(b => b.id === blogToUpdate.id)
      
      assert.strictEqual(updatedBlog[0].likes, blogToUpdate.likes + 1)      
    })

    test('fails with status code 400 if id is invalid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const update = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1,
      }

      await api
        .put(`/api/blogs/invalidId12345`)
        .send(update)
        .expect(400)        
    
      const blogsAfterUpdate = await helper.blogsInDb()      
      
      assert.strictEqual(blogsAfterUpdate[0].likes, blogToUpdate.likes) 
    })

    test('fails with status code 404 if id does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      const update = {
        title: 'updatedTitle',
        author: 'updatedAuthor',
        url: 'updatedUrl',
        likes: 1,
      }

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(update)
        .expect(404)    
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})