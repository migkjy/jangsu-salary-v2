import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "장수 - 당신의 장례식을 미리 준비하세요",
  description: "소중한 사람들과 함께 나누는 특별한 순간, 장수와 함께 준비하세요.",
}

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <section className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">장수에 오신 것을 환영합니다</h1>
        <p className="mb-8 text-xl">
          소중한 사람들과 함께 나누는 특별한 순간,
          <br />
          미리 준비하는 당신만의 이야기
        </p>
        <div className="flex gap-4">
          <Link href="/create" className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 text-white">
            장수 만들기
          </Link>
          <Link href="/login" className="rounded-lg bg-gray-100 px-6 py-3 text-gray-800 hover:bg-gray-200">
            로그인
          </Link>
        </div>
      </section>
    </main>
  )
}
