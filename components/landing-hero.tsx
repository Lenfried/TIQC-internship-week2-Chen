import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GitHubIcon, CheckIcon } from "@/components/icons"
import { ArrowRight } from "lucide-react"

const features = [
  "One-click GitHub OAuth sign in",
  "Secure token-based sessions",
  "Team and organization support",
  "Built for developer workflows",
]

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-20 text-center lg:pb-32 lg:pt-28">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Now supporting GitHub Organizations
        </div>

        {/* Heading */}
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Authentication built for{" "}
          <span className="text-primary">developers</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Sign in with your GitHub account and start shipping faster. Secure, simple, and designed for modern development teams.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/login">
            <Button size="lg" className="gap-2 px-8">
              <GitHubIcon className="h-5 w-5" />
              Sign in with GitHub
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg" className="gap-2 px-8 bg-transparent">
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Feature checklist */}
        <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckIcon className="h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
