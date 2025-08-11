import SectionReveal from "@/components/section-reveal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0b0f17] text-white">
      <section className="container mx-auto px-4 py-16">
        <SectionReveal>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">About NeonHack 2K25</h1>
          <p className="mt-3 text-zinc-300">
            A cyberpunk-themed college hackathon focusing on real-world problem solving, rapid prototyping, and
            cross-domain collaboration.
          </p>
        </SectionReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <SectionReveal>
            <Card className="bg-[#0a0f16]/80 border-white/10">
              <CardHeader>
                <CardTitle>Theme & Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                Build dystopian-resilient solutions: fintech, health, sustainability, and campus automation. Push the
                limits of creativity with ethical tech.
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal>
            <Card className="bg-[#0a0f16]/80 border-white/10">
              <CardHeader>
                <CardTitle>Eligibility</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                Open to all college students. Teams of up to 4-6 members recommended. Beginners are welcome—mentors will
                be available.
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal>
            <Card className="bg-[#0a0f16]/80 border-white/10">
              <CardHeader>
                <CardTitle>Rules</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300 space-y-2">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fresh code preferred; disclose any pre-built components.</li>
                  <li>Respect time limits for Code Sprint (1 hour).</li>
                  <li>Follow campus policies; maintain sportsmanship in gaming events.</li>
                  <li>Poster presentations must cite sources and be original.</li>
                </ul>
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal>
            <Card className="bg-[#0a0f16]/80 border-white/10">
              <CardHeader>
                <CardTitle>Prizes</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                Cash prizes for top teams, category awards, swags, and internship interview fast-tracks with partner
                companies.
              </CardContent>
            </Card>
          </SectionReveal>

          <SectionReveal>
            <Card className="bg-[#0a0f16]/80 border-white/10 md:col-span-2">
              <CardHeader>
                <CardTitle>Organizers</CardTitle>
              </CardHeader>
              <CardContent className="text-zinc-300">
                Hosted by the Department of Computer Science & Innovation Club in collaboration with eSports Society.
              </CardContent>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </main>
  )
}
