'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface JangsuForm {
  title: string
  birthDate: string
  deathDate: string
  story: string
  wishes: string
  messages: string
}

export default function CreatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<JangsuForm>({
    title: '',
    birthDate: '',
    deathDate: '',
    story: '',
    wishes: '',
    messages: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API 호출로 장수 생성
    console.log('Create jangsu:', formData)
    router.push('/mypage')
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">새로운 장수 만들기</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.title}
              onChange={handleChange}
              placeholder="당신의 장수 제목을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                출생일
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700 mb-1">
                사망일
              </label>
              <input
                type="date"
                id="deathDate"
                name="deathDate"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.deathDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
              나의 이야기
            </label>
            <textarea
              id="story"
              name="story"
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.story}
              onChange={handleChange}
              placeholder="당신의 인생 이야기를 들려주세요"
            />
          </div>

          <div>
            <label htmlFor="wishes" className="block text-sm font-medium text-gray-700 mb-1">
              마지막 소원
            </label>
            <textarea
              id="wishes"
              name="wishes"
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.wishes}
              onChange={handleChange}
              placeholder="당신의 마지막 소원을 적어주세요"
            />
          </div>

          <div>
            <label htmlFor="messages" className="block text-sm font-medium text-gray-700 mb-1">
              남기고 싶은 메시지
            </label>
            <textarea
              id="messages"
              name="messages"
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.messages}
              onChange={handleChange}
              placeholder="소중한 사람들에게 전하고 싶은 메시지를 남겨주세요"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
            >
              저장하기
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </main>
  )
} 