"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

interface JangsuPreview {
  id: string
  title: string
  createdAt: string
  status: "draft" | "published"
}

export default function MyPage() {
  const [jangsuList, setJangsuList] = useState<JangsuPreview[]>([])

  useEffect(() => {
    // TODO: API로 장수 목록을 가져오는 로직 구현
    const tempData: JangsuPreview[] = [
      {
        id: "1",
        title: "나의 첫 번째 장수",
        createdAt: "2024-03-20",
        status: "draft",
      },
      {
        id: "2",
        title: "완성된 장수",
        createdAt: "2024-03-19",
        status: "published",
      },
    ]
    setJangsuList(tempData)
  }, [])

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">마이페이지</h1>
          <Link href="/create" className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white">
            새 장수 만들기
          </Link>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">나의 장수 목록</h2>

          {jangsuList.length === 0 ? (
            <div className="py-8 text-center text-gray-500">아직 작성한 장수가 없습니다.</div>
          ) : (
            <div className="grid gap-4">
              {jangsuList.map((jangsu) => (
                <Link
                  key={jangsu.id}
                  href={`/jangsu/${jangsu.id}`}
                  className="hover:border-primary block rounded-lg border p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{jangsu.title}</h3>
                      <p className="text-sm text-gray-500">작성일: {jangsu.createdAt}</p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        jangsu.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {jangsu.status === "published" ? "발행됨" : "임시저장"}
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
