import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { Pool } from "pg"

if (!process.env.POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined")
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "이메일", type: "text" },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.")
        }

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [credentials.email])

        const user = result.rows[0]

        if (!user) {
          throw new Error("등록되지 않은 이메일입니다.")
        }

        const isValid = await bcrypt.compare(credentials.password, user.password_hash)

        if (!isValid) {
          throw new Error("비밀번호가 일치하지 않습니다.")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
