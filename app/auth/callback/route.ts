import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/dashboard"

    console.log("[v0] Callback route hit with code:", code ? "present" : "missing")
    console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

    if (code) {
      console.log("[v0] Creating Supabase server client...")
      const supabase = await createClient()
      console.log("[v0] Exchanging code for session...")
      const { error, data } = await supabase.auth.exchangeCodeForSession(code)
      console.log("[v0] Exchange result - Error:", error, "Data:", data)

      if (!error) {
        console.log("[v0] Session exchanged successfully, redirecting to", next)
        const forwardedHost = request.headers.get("x-forwarded-host")
        const isLocalEnv = process.env.NODE_ENV === "development"
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          return NextResponse.redirect(`${origin}${next}`)
        }
      }
      console.log("[v0] Error exchanging code:", error)
    }

    // Return the user to an error page with instructions
    console.log("[v0] Redirecting to error page")
    return NextResponse.redirect(`${origin}/auth/error?error=auth_callback_error`)
  } catch (err) {
    console.error("[v0] Callback route error:", err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
