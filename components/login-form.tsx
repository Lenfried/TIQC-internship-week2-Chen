"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GitHubIcon } from "@/components/icons"
import { Code2, Loader2, ArrowLeft } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGitHubLogin() {
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Background pattern */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Back link */}
      <div className="relative mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      {/* Logo */}
      <div className="relative mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Code2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground">DevFlow</span>
      </div>

      {/* Login card */}
      <Card className="relative w-full max-w-sm border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full gap-2"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <GitHubIcon className="h-5 w-5" />
            )}
            {isLoading ? "Redirecting to GitHub..." : "Continue with GitHub"}
          </Button>

          {error && (
            <p className="text-center text-sm text-destructive">{error}</p>
          )}

          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            GitHub OAuth is the only supported sign-in method. We use it to
            securely verify your developer identity.
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-4 pt-0">
          <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>
              We only request read access to your public profile.
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Footer */}
      <p className="relative mt-8 text-center text-xs text-muted-foreground">
        By signing in, you agree to our{" "}
        <span className="underline underline-offset-4 hover:text-foreground cursor-pointer">
          Terms of Service
        </span>{" "}
        and{" "}
        <span className="underline underline-offset-4 hover:text-foreground cursor-pointer">
          Privacy Policy
        </span>
      </p>
    </div>
  )
}
