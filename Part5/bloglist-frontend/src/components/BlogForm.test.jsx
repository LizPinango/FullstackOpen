import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('Testing BlogForm Component: ', () => {

  test('The form calls the event handler with the right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('New Blog')
    const inputAuthor = screen.getByPlaceholderText('Jhon Doe')
    const inputUrl = screen.getByPlaceholderText('https://www.webpage.com')
    const sendButton = screen.getByText('Save')

    await user.type(inputTitle, 'testing a form title')
    await user.type(inputAuthor, 'testing a form author')
    await user.type(inputUrl, 'testing a form url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form title')
    expect(createBlog.mock.calls[0][0].author).toBe('testing a form author')
    expect(createBlog.mock.calls[0][0].url).toBe('testing a form url')
  })
})