"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

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
    title: "",
    birthDate: "",
    deathDate: "",
    story: "",
    wishes: "",
    messages: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 장수 생성 로직 구현
    console.log("장수 생성 시도:", formData)
    router.push("/mypage")
  }

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">새로운 장수 만들기</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.title}
              onChange={handleChange}
              placeholder="당신의 장수 제목을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="birthDate" className="mb-1 block text-sm font-medium text-gray-700">
                출생일
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="deathDate" className="mb-1 block text-sm font-medium text-gray-700">
                사망일
              </label>
              <input
                type="date"
                id="deathDate"
                name="deathDate"
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.deathDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="story" className="mb-1 block text-sm font-medium text-gray-700">
              나의 이야기
            </label>
            <textarea
              id="story"
              name="story"
              required
              rows={5}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.story}
              onChange={handleChange}
              placeholder="당신의 인생 이야기를 들려주세요"
            />
          </div>

          <div>
            <label htmlFor="wishes" className="mb-1 block text-sm font-medium text-gray-700">
              마지막 소원
            </label>
            <textarea
              id="wishes"
              name="wishes"
              required
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.wishes}
              onChange={handleChange}
              placeholder="당신의 마지막 소원을 적어주세요"
            />
          </div>

          <div>
            <label htmlFor="messages" className="mb-1 block text-sm font-medium text-gray-700">
              남기고 싶은 메시지
            </label>
            <textarea
              id="messages"
              name="messages"
              required
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={formData.messages}
              onChange={handleChange}
              placeholder="소중한 사람들에게 전하고 싶은 메시지를 남겨주세요"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="bg-primary hover:bg-primary/90 flex-1 rounded-md px-4 py-2 text-white">
              저장하기
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-md bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
