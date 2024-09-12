import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Testing Blog Component: ', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Liz P',
    url: 'https://blog.com',
    likes: 15,
    user: {
        username: 'newUser',
        name: 'Luis Lopez',
    }
  }

  const loggedUser = {
    username: 'newUser',
    name: 'Luis Lopez',
  }
 
  const mockIncreseLikes = vi.fn()
  const mockRemoveBlog = vi.fn()
  
  test('renders title and author', () => {
    const { container } = render(<Blog blog={blog} loggedUser={loggedUser} increseLikes={mockIncreseLikes} removeBlog={mockRemoveBlog} />)
  
    const div = container.querySelector('.blogInfoHeader')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library by Liz P'
    )
  })
})

