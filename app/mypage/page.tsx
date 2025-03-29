'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Jangsu {
  id: string
  title: string
  status: '임시저장' | '발행됨'
  createdAt: string
}

export default function MyPage() {
  const [loading, setLoading] = useState(true)
  const [jangsuList, setJangsuList] = useState<Jangsu[]>([])

  useEffect(() => {
    // 임시 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setJangsuList([
        {
          id: '1',
          title: '첫 번째 장수',
          status: '임시저장',
          createdAt: '2024-03-20'
        },
        {
          id: '2',
          title: '두 번째 장수',
          status: '발행됨',
          createdAt: '2024-03-21'
        }
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600">로딩 중...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">나의 장수 목록</h1>
          <Link
            href="/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            새 장수 작성
          </Link>
        </div>

        {jangsuList.length === 0 ? (
          <p className="text-center text-gray-600">아직 작성된 장수가 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {jangsuList.map((jangsu) => (
              <div
                key={jangsu.id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <Link
                    href={`/jangsu/${jangsu.id}`}
                    className="text-lg font-medium hover:text-blue-500"
                  >
                    {jangsu.title}
                  </Link>
                  <p className="text-sm text-gray-500">{jangsu.createdAt}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    jangsu.status === '임시저장'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {jangsu.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
} 