import { render, screen, waitFor } from '@testing-library/react'
import MyPage from './page'

describe('MyPage', () => {
  it('renders page title and create button', () => {
    render(<MyPage />)
    
    expect(screen.getByText('마이페이지')).toBeInTheDocument()
    expect(screen.getByText('새 장수 만들기')).toBeInTheDocument()
  })

  it('shows empty state when no jangsu exists', () => {
    render(<MyPage />)
    
    expect(screen.getByText('아직 작성한 장수가 없습니다.')).toBeInTheDocument()
  })

  it('displays jangsu list when data is loaded', async () => {
    render(<MyPage />)
    
    await waitFor(() => {
      expect(screen.getByText('나의 첫 번째 장수')).toBeInTheDocument()
      expect(screen.getByText('완성된 장수')).toBeInTheDocument()
    })

    expect(screen.getByText('임시저장')).toBeInTheDocument()
    expect(screen.getByText('발행됨')).toBeInTheDocument()
  })

  it('shows correct status badges', async () => {
    render(<MyPage />)
    
    await waitFor(() => {
      const draftBadge = screen.getByText('임시저장')
      const publishedBadge = screen.getByText('발행됨')
      
      expect(draftBadge).toHaveClass('bg-gray-100')
      expect(publishedBadge).toHaveClass('bg-green-100')
    })
  })
}) 