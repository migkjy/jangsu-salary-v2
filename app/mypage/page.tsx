"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Navbar from "../components/Navbar"

interface Jangsu {
  id: string
  title: string
  status: "임시저장" | "발행됨"
  createdAt: string
}

export default function MyPage() {
  const [loading, setLoading] = useState(true)
  const [jangsuList, setJangsuList] = useState<Jangsu[]>([])
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    // 세션이 없으면 로그인 페이지로 리다이렉션
    if (!session) {
      router.push("/login")
      return
    }

    // 임시 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setJangsuList([
        {
          id: "1",
          title: "첫 번째 장수",
          status: "임시저장",
          createdAt: "2024-03-20",
        },
        {
          id: "2",
          title: "두 번째 장수",
          status: "발행됨",
          createdAt: "2024-03-21",
        },
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [session, router])

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="p-8">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-gray-600">로딩 중...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 메인 컨텐츠 */}
      <main className="p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">나의 장수 목록</h1>
            <Link href="/create" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              새 장수 작성
            </Link>
          </div>

          {jangsuList.length === 0 ? (
            <p className="text-center text-gray-600">아직 작성된 장수가 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {jangsuList.map((jangsu) => (
                <div key={jangsu.id} className="flex items-center justify-between rounded-lg border p-4 bg-white">
                  <div>
                    <Link href={`/jangsu/${jangsu.id}`} className="text-lg font-medium hover:text-blue-500">
                      {jangsu.title}
                    </Link>
                    <p className="text-sm text-gray-500">{jangsu.createdAt}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      jangsu.status === "임시저장" ? "bg-gray-100 text-gray-800" : "bg-green-100 text-green-800"
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
    </div>
  )
}
