'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Jangsu {
  id: string
  title: string
  birthDate: string
  deathDate: string
  story: string
  wishes: string
  messages: string
  status: 'draft' | 'published'
}

export default function JangsuDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [jangsu, setJangsu] = useState<Jangsu | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 임시 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setJangsu({
        id: params.id as string,
        title: '나의 첫 번째 장수',
        birthDate: '1990-01-01',
        deathDate: '2070-12-31',
        story: '이것은 나의 인생 이야기입니다...',
        wishes: '마지막으로 하고 싶은 것들...',
        messages: '사랑하는 이들에게 전하는 메시지...',
        status: 'draft'
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-600">로딩 중...</p>
        </div>
      </main>
    )
  }

  if (!jangsu) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">장수를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{jangsu.title}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              jangsu.status === 'published'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {jangsu.status === 'published' ? '발행됨' : '임시저장'}
          </span>
        </div>

        <div className="space-y-8">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">생애</h2>
            <p className="text-gray-600">
              {jangsu.birthDate} ~ {jangsu.deathDate}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">나의 이야기</h2>
            <p className="text-gray-800 whitespace-pre-line">{jangsu.story}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">마지막 소원</h2>
            <p className="text-gray-800 whitespace-pre-line">{jangsu.wishes}</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">남기고 싶은 메시지</h2>
            <p className="text-gray-800 whitespace-pre-line">{jangsu.messages}</p>
          </section>

          <div className="flex gap-4 pt-8">
            <button
              onClick={() => router.push(`/jangsu/${jangsu.id}/edit`)}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90"
            >
              수정하기
            </button>
            <button
              onClick={() => router.back()}
              className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 