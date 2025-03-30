import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import { Pool } from "pg"

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined")
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

// 데이터베이스 연결 테스트
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack)
  } else {
    console.log("Database connection successful")
    release()
  }
})

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // 필수 필드 검증
    if (!email || !password || !name) {
      return NextResponse.json({ message: "모든 필드를 입력해주세요." }, { status: 400 })
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "올바른 이메일 형식이 아닙니다." }, { status: 400 })
    }

    // 비밀번호 길이 검증
    if (password.length < 6) {
      return NextResponse.json({ message: "비밀번호는 최소 6자 이상이어야 합니다." }, { status: 400 })
    }

    // 이메일 중복 검사
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: "이미 사용 중인 이메일입니다." }, { status: 400 })
    }

    // 비밀번호 해시화
    const hashedPassword = await hash(password, 12)

    // 사용자 생성
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name, role, hourly_rate) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, name, role`,
      [email, hashedPassword, name, "user", 9000] // 기본 시급 9000원으로 설정
    )

    const newUser = result.rows[0]

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("회원가입 에러:", error)

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "회원가입 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
