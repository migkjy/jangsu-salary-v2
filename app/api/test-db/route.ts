import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // 데이터베이스 연결 테스트
    const usersCount = await prisma.user.count()

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: {
        usersCount,
        connectionDetails: "Connected to NEON DB",
      },
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
