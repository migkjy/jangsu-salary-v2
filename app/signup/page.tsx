"use client"

import Link from "next/link"
import { useState } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    } else if (name === "confirmPassword") {
      setConfirmPassword(value)
    } else if (name === "name") {
      setName(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 회원가입 로직 구현
    console.log("회원가입 시도:", { email, password, confirmPassword, name })
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">회원가입</h2>
          <p className="mt-2 text-center text-gray-600">장수와 함께 특별한 순간을 준비하세요</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={name}
                onChange={handleChange}
              />
            </div>
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button type="submit" className="bg-primary hover:bg-primary/90 w-full rounded-md px-4 py-2 text-white">
              가입하기
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
