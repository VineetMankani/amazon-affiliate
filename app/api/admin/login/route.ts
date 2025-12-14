import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const adminUsername = process.env.ADMIN_USERNAME
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials not configured" },
        { status: 500 }
      )
    }

    if (username === adminUsername && password === adminPassword) {
      // Simple session token (in production, use proper session management)
      const token = Buffer.from(`${username}:${Date.now()}`).toString("base64")
      
      const response = NextResponse.json({ success: true, token })
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      })
      
      return response
    }

    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    )
  }
}

