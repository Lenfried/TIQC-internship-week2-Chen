import { Header } from "@/components/header"
import { LandingHero } from "@/components/landing-hero"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <LandingHero />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
