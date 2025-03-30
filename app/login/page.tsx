"use client"

import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 로그인 로직 구현
    console.log("로그인 시도:", { email, password })
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">로그인</h2>
          <p className="mt-2 text-center text-gray-600">장수에 오신 것을 환영합니다</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 text-white">
              로그인
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
