import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { GitHubIcon } from "@/components/icons"
import { Code2 } from "lucide-react"

export async function Header() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    (user ? `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}` : null)

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.user_name ||
    user?.email ||
    "User"

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">DevFlow</span>
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard" className="flex items-center gap-3">
              <img
                src={avatarUrl || ""}
                alt={`${displayName}'s avatar`}
                className="h-8 w-8 rounded-full border border-border"
              />
              <span className="hidden text-sm font-medium text-foreground sm:inline-block">
                {displayName}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm" className="gap-2">
                  <GitHubIcon className="h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
