import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CreatePage from './page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreatePage', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders create form', () => {
    render(<CreatePage />);
    
    expect(screen.getByLabelText('제목')).toBeInTheDocument();
    expect(screen.getByLabelText('생년월일')).toBeInTheDocument();
    expect(screen.getByLabelText('사망일')).toBeInTheDocument();
    expect(screen.getByLabelText('나의 이야기')).toBeInTheDocument();
    expect(screen.getByLabelText('마지막 소원')).toBeInTheDocument();
    expect(screen.getByLabelText('마지막 메시지')).toBeInTheDocument();
  });

  it('updates form values on input change', () => {
    render(<CreatePage />)
    
    const titleInput = screen.getByLabelText('제목')
    const storyInput = screen.getByLabelText('나의 이야기')
    const wishesInput = screen.getByLabelText('마지막 소원')
    const messagesInput = screen.getByLabelText('남기고 싶은 메시지')

    fireEvent.change(titleInput, { target: { value: '나의 장수 이야기' } })
    fireEvent.change(storyInput, { target: { value: '이것은 나의 인생 이야기입니다.' } })
    fireEvent.change(wishesInput, { target: { value: '행복하게 살아주세요.' } })
    fireEvent.change(messagesInput, { target: { value: '사랑합니다.' } })

    expect(titleInput).toHaveValue('나의 장수 이야기')
    expect(storyInput).toHaveValue('이것은 나의 인생 이야기입니다.')
    expect(wishesInput).toHaveValue('행복하게 살아주세요.')
    expect(messagesInput).toHaveValue('사랑합니다.')
  })

  it('shows save and cancel buttons', () => {
    render(<CreatePage />)
    
    expect(screen.getByRole('button', { name: '저장하기' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '취소' })).toBeInTheDocument()
  })

  it('requires all fields', () => {
    render(<CreatePage />)
    
    const titleInput = screen.getByLabelText('제목')
    const birthDateInput = screen.getByLabelText('출생일')
    const deathDateInput = screen.getByLabelText('사망일')
    const storyInput = screen.getByLabelText('나의 이야기')
    const wishesInput = screen.getByLabelText('마지막 소원')
    const messagesInput = screen.getByLabelText('남기고 싶은 메시지')

    expect(titleInput).toBeRequired()
    expect(birthDateInput).toBeRequired()
    expect(deathDateInput).toBeRequired()
    expect(storyInput).toBeRequired()
    expect(wishesInput).toBeRequired()
    expect(messagesInput).toBeRequired()
  })
}) 