import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, ArrowLeft } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
          <Code2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground">DevFlow</span>
      </div>

      <Card className="w-full max-w-sm border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-foreground">
            Authentication Error
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {params?.error ? (
            <p className="text-center text-sm text-muted-foreground">
              Error code: {params.error}
            </p>
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              An unexpected error occurred during authentication. Please try
              again.
            </p>
          )}
          <Link href="/login" className="w-full">
            <Button className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
