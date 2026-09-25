import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App.jsx'

describe('App', () => {
  it('renders the heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /get started github actions/i, level: 1 }),
    ).toBeInTheDocument()
  })

  it('renders the hero logos', () => {
    render(<App />)

    expect(screen.getByAltText('React logo')).toBeInTheDocument()
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
  })

  it('starts the counter at zero', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
  })

  it('increments the counter on each click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const counter = screen.getByRole('button', { name: /count is/i })

    await user.click(counter)
    expect(counter).toHaveTextContent('Count is 1')

    await user.click(counter)
    await user.click(counter)
    expect(counter).toHaveTextContent('Count is 3')
  })

  it('renders the next-steps section headings', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /documentation/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /connect with us/i })).toBeInTheDocument()
  })

  it('links out to the Vite and React docs', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /explore vite/i })).toHaveAttribute(
      'href',
      'https://vite.dev/',
    )
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute(
      'href',
      'https://react.dev/',
    )
  })

  it('renders every community link', () => {
    render(<App />)

    const expected = [
      [/github/i, 'https://github.com/vitejs/vite'],
      [/discord/i, 'https://chat.vite.dev/'],
      [/x\.com/i, 'https://x.com/vite_js'],
      [/bluesky/i, 'https://bsky.app/profile/vite.dev'],
    ]

    for (const [name, href] of expected) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
    }
  })
})
