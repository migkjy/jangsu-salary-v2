import { render, screen, fireEvent } from '@testing-library/react'
import LoginPage from './page'

// Next.js의 useRouter를 모킹
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    }
  },
}))

describe('LoginPage', () => {
  it('renders login form', () => {
    render(<LoginPage />)
    
    expect(screen.getByText('로그인')).toBeInTheDocument()
    expect(screen.getByLabelText('이메일')).toBeInTheDocument()
    expect(screen.getByLabelText('비밀번호')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument()
  })

  it('updates form values on input change', () => {
    render(<LoginPage />)
    
    const emailInput = screen.getByLabelText('이메일')
    const passwordInput = screen.getByLabelText('비밀번호')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('password123')
  })

  it('shows sign up link', () => {
    render(<LoginPage />)
    
    const signupLink = screen.getByText('회원가입')
    expect(signupLink).toBeInTheDocument()
    expect(signupLink.getAttribute('href')).toBe('/signup')
  })
}) 