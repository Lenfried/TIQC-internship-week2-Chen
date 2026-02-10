import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Users, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Industry-standard OAuth 2.0 flow with PKCE. Your credentials never touch our servers.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description:
      "One click to authenticate. No passwords to remember, no forms to fill out.",
  },
  {
    icon: Users,
    title: "Team Ready",
    description:
      "Map GitHub organizations and teams directly to your app's roles and permissions.",
  },
  {
    icon: Lock,
    title: "Granular Scopes",
    description:
      "Request only the permissions you need. Users stay in control of their data.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border bg-card/50 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for auth
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Built on top of GitHub OAuth with best practices baked in, so you can focus on building your product.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
