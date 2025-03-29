'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface JangsuPreview {
  id: string
  title: string
  createdAt: string
  status: 'draft' | 'published'
}

export default function MyPage() {
  const [jangsuList, setJangsuList] = useState<JangsuPreview[]>([])

  useEffect(() => {
    // TODO: API 호출로 사용자의 장수 목록을 가져옵니다
    const fetchJangsuList = async () => {
      // 임시 데이터
      setJangsuList([
        {
          id: '1',
          title: '나의 첫 번째 장수',
          createdAt: '2024-03-29',
          status: 'draft'
        },
        {
          id: '2',
          title: '완성된 장수',
          createdAt: '2024-03-28',
          status: 'published'
        }
      ])
    }

    fetchJangsuList()
  }, [])

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">마이페이지</h1>
          <Link
            href="/create"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
          >
            새 장수 만들기
          </Link>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">나의 장수 목록</h2>
          
          {jangsuList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              아직 작성한 장수가 없습니다.
            </div>
          ) : (
            <div className="grid gap-4">
              {jangsuList.map((jangsu) => (
                <Link
                  key={jangsu.id}
                  href={`/jangsu/${jangsu.id}`}
                  className="block p-4 border rounded-lg hover:border-primary"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{jangsu.title}</h3>
                      <p className="text-sm text-gray-500">
                        작성일: {jangsu.createdAt}
                      </p>
                    </div>
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
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
} 