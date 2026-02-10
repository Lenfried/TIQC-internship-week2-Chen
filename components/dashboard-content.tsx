"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GitHubIcon } from "@/components/icons"
import { Code2, LogOut, GitBranch, Star, Activity } from "lucide-react"

const DEMO_USER = {
  name: "Jane Developer",
  login: "janedev",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=janedev",
  email: "jane@example.com",
}

const stats = [
  { label: "Repositories", value: "42", icon: GitBranch },
  { label: "Stars Earned", value: "128", icon: Star },
  { label: "Contributions", value: "1,247", icon: Activity },
]

export function DashboardContent() {
  const router = useRouter()

  function handleSignOut() {
    router.push("/")
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
            <span className="text-lg font-semibold text-foreground">DevFlow</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={DEMO_USER.avatar || "/placeholder.svg"}
                alt={`${DEMO_USER.name}'s avatar`}
                className="h-8 w-8 rounded-full border border-border"
              />
              <span className="hidden text-sm font-medium text-foreground sm:inline-block">
                {DEMO_USER.name}
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
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Welcome back, {DEMO_USER.name}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here is an overview of your GitHub activity and account.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-10 grid gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Profile card */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Your Profile</CardTitle>
              <CardDescription>
                Information synced from your GitHub account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <img
                  src={DEMO_USER.avatar || "/placeholder.svg"}
                  alt={`${DEMO_USER.name}'s avatar`}
                  className="h-20 w-20 rounded-full border-2 border-border"
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{DEMO_USER.name}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <GitHubIcon className="h-4 w-4" />
                      <span>@{DEMO_USER.login}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{DEMO_USER.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demo notice */}
          <div className="mt-8 rounded-lg border border-border bg-muted/50 px-6 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              This is a demo dashboard. Connect a real GitHub OAuth integration to see live data.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
