import LoadingScreen from "@/components/loading-screen"
import Hero from "@/components/hero"
import SectionReveal from "@/components/section-reveal"
import StatsRow from "@/components/stats-row"
import HighlightCards from "@/components/highlight-cards"
import SponsorMarquee from "@/components/sponsor-marquee"
import SchedulePanel from "@/components/schedule-panel"
import CtaLevelUp from "@/components/cta-level-up"

export default function Page() {
  return (
    <main className="min-h-[100dvh] bg-[#0b0f17] text-white">
      <LoadingScreen />
      <Hero />

      <section className="container mx-auto px-4 py-12">
        <SectionReveal>
          <StatsRow />
        </SectionReveal>
      </section>

      <section className="container mx-auto px-4 py-12">
        <SectionReveal>
          <h2 className="text-2xl font-bold mb-4">Highlights</h2>
          <HighlightCards />
        </SectionReveal>
      </section>

      <SponsorMarquee />

      <section className="container mx-auto px-4 py-12">
        <SectionReveal>
          <SchedulePanel />
        </SectionReveal>
      </section>

      <section className="container mx-auto px-4 py-14">
        <SectionReveal>
          <CtaLevelUp />
        </SectionReveal>
      </section>
    </main>
  )
}
