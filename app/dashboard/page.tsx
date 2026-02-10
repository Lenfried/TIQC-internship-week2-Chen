import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardContent } from "@/components/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.user_name ||
    user.email ||
    "Developer"

  const avatarUrl =
    user.user_metadata?.avatar_url ||
    `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`

  const login = user.user_metadata?.user_name || user.email?.split("@")[0] || "user"

  const email = user.email || ""

  return (
    <DashboardContent
      user={{
        name: displayName,
        login,
        avatar: avatarUrl,
        email,
      }}
    />
  )
}
