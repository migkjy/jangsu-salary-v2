"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface User {
  id: string
  name: string
  role: string
}

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    // TODO: API 호출로 사용자 정보를 가져오는 로직 구현
    setUser({
      id: "1",
      name: "관리자",
      role: "admin",
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/auth/login")
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">관리자 메인 ({user.name})</h1>
            </div>
            <div className="flex items-center">
              <button onClick={handleLogout} className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-800">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="/admin/users"
            className="overflow-hidden rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md"
          >
            <div className="text-lg font-medium text-gray-900">직원 관리</div>
            <div className="mt-2 text-sm text-gray-500">직원 정보 등록 및 관리</div>
          </Link>

          <Link
            href="/admin/work-logs"
            className="overflow-hidden rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md"
          >
            <div className="text-lg font-medium text-gray-900">근무내역 관리</div>
            <div className="mt-2 text-sm text-gray-500">직원별 근무시간 및 급여 관리</div>
          </Link>

          <Link
            href="/admin/salary"
            className="overflow-hidden rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md"
          >
            <div className="text-lg font-medium text-gray-900">급여 확인/다운로드</div>
            <div className="mt-2 text-sm text-gray-500">급여 명세서 생성 및 관리</div>
          </Link>
        </div>
      </main>
    </div>
  )
}
