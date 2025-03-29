import { render, screen, waitFor } from '@testing-library/react'
import JangsuDetailPage from './page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    }
  },
  useParams() {
    return { id: '1' }
  }
}))

describe('JangsuDetailPage', () => {
  it('shows loading state initially', () => {
    render(<JangsuDetailPage />)
    expect(screen.getByText('로딩 중...')).toBeInTheDocument()
  })

  it('displays jangsu details after loading', async () => {
    render(<JangsuDetailPage />)
    
    await waitFor(() => {
      expect(screen.getByText('나의 첫 번째 장수')).toBeInTheDocument()
    })

    expect(screen.getByText('생애')).toBeInTheDocument()
    expect(screen.getByText('1990-01-01 ~ 2070-12-31')).toBeInTheDocument()
    expect(screen.getByText('나의 이야기')).toBeInTheDocument()
    expect(screen.getByText('마지막 소원')).toBeInTheDocument()
    expect(screen.getByText('남기고 싶은 메시지')).toBeInTheDocument()
  })

  it('shows correct status badge', async () => {
    render(<JangsuDetailPage />)
    
    await waitFor(() => {
      const statusBadge = screen.getByText('임시저장')
      expect(statusBadge).toBeInTheDocument()
      expect(statusBadge).toHaveClass('bg-gray-100')
    })
  })

  it('shows edit and back buttons', async () => {
    render(<JangsuDetailPage />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '수정하기' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '돌아가기' })).toBeInTheDocument()
    })
  })
}) 