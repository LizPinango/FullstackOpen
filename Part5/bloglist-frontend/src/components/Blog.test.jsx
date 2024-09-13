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

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} loggedUser={loggedUser} increseLikes={mockIncreseLikes} removeBlog={mockRemoveBlog} />).container
  })
  
  test('renders title and author', () => {
    const div = container.querySelector('.blogInfoHeader')
    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library by Liz P'
    )
  })

  test('URL and Likes are show when buttom is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show More')
    await user.click(button)

    const div = container.querySelector('.blogInfoBody')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockIncreseLikes.mock.calls).toHaveLength(2)
  })
})

