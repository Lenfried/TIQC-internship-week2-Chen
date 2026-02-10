"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GitHubIcon } from "@/components/icons"
import { Code2, LogOut, Shield, User, Mail } from "lucide-react"

type UserData = {
  name: string
  login: string
  avatar: string
  email: string
}

export function DashboardContent({ user }: { user: UserData }) {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              DevFlow
            </span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={`${user.name}'s avatar`}
                className="h-8 w-8 rounded-full border border-border"
              />
              <span className="hidden text-sm font-medium text-foreground sm:inline-block">
                {user.name}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 py-10">
        <div className="mx-auto max-w-6xl px-6">
          {/* Welcome */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-muted-foreground">
              You are signed in via GitHub OAuth. Here is your account overview.
            </p>
          </div>

          {/* Profile card */}
          <Card className="mb-8 border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Your Profile</CardTitle>
              <CardDescription>
                Information synced from your GitHub account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={`${user.name}'s avatar`}
                  className="h-20 w-20 rounded-full border-2 border-border"
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {user.name}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <GitHubIcon className="h-4 w-4" />
                      <span>@{user.login}</span>
                    </div>
                  </div>
                  {user.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Authenticated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Signed in securely via GitHub OAuth
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Profile Synced
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your GitHub profile data is up to date
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
