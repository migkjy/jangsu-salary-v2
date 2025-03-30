// 데이터베이스 연결 테스트 스크립트
require("dotenv").config()
const { PrismaClient } = require("@prisma/client")

async function main() {
  console.log("테스트 시작: NEON DB 연결 확인")

  try {
    const prisma = new PrismaClient()

    // 데이터베이스 연결 테스트
    console.log("사용자 수 확인 중...")
    const usersCount = await prisma.user.count()
    console.log(`데이터베이스 연결 성공! 현재 사용자 수: ${usersCount}`)

    // 테이블 스키마 확인
    console.log("\n데이터베이스 테이블 스키마 확인:")
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log("테이블 목록:", tables)

    await prisma.$disconnect()
    console.log("\n테스트 완료: NEON DB 연결 성공")
  } catch (error) {
    console.error("데이터베이스 연결 실패:", error)
    process.exit(1)
  }
}

main()
