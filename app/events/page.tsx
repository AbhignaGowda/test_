import EventCard from "@/components/event-card"
import SectionReveal from "@/components/section-reveal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventsPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0b0f17] text-white">
      <section className="container mx-auto px-4 py-16">
        <SectionReveal>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Events & Schedule</h1>
          <p className="mt-3 text-zinc-300">
            Split into Tech and Gaming tracks. Tech includes the main hackathon, workshops, tech talks, and mini-events.
            Gaming hosts Valorant and BGMI with separate registration.
          </p>
        </SectionReveal>

        <div className="mt-8">
          <Tabs defaultValue="tech" className="w-full">
            <TabsList className="bg-white/5">
              <TabsTrigger value="tech">Tech Events</TabsTrigger>
              <TabsTrigger value="gaming">Gaming Events</TabsTrigger>
            </TabsList>

            <TabsContent value="tech" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <EventCard
                  title="Main Hackathon"
                  category="Tech"
                  desc="24-hour build marathon. Present to judges and win big."
                  time="Day 1 10:00 → Day 2 10:00"
                  href="/register?event=Tech"
                  highlight="Mentor hours + tech talks in between"
                />
                <EventCard
                  title="Workshop: Cloud & DevOps"
                  category="Tech"
                  desc="Hands-on session for rapid deployment and CI workflows."
                  time="Day 1 12:00–13:30"
                  href="/register?event=Tech"
                />
                <EventCard
                  title="Tech Talk: GenAI & RAG"
                  category="Tech"
                  desc="Learn modern AI patterns and productization."
                  time="Day 1 17:00–18:00"
                  href="/register?event=Tech"
                />
                <EventCard
                  title="Quiz"
                  category="Tech"
                  desc="Battle of wits across CS, tech history, and logic."
                  time="Day 1 14:00–15:00"
                  href="/register?event=Quiz"
                />
                <EventCard
                  title="Debate"
                  category="Tech"
                  desc="Face-off on ethics, AI, privacy, and open source."
                  time="Day 1 16:00–17:00"
                  href="/register?event=Debate"
                />
                <EventCard
                  title="Code Sprint (1 hr)"
                  category="Tech"
                  desc="Rapid-fire coding of small snippets. Accuracy over speed."
                  time="Day 1 15:00–16:00"
                  href="/register?event=Code%20Sprint"
                />
                <EventCard
                  title="Treasure Hunt"
                  category="Tech"
                  desc="Decrypt clues and navigate campus in teams."
                  time="Day 2 09:00–10:00"
                  href="/register?event=Treasure%20Hunt"
                />
                <EventCard
                  title="Poster Presentation"
                  category="Tech"
                  desc="Showcase recent technologies and business models."
                  time="Day 2 11:00–12:30"
                  href="/register?event=Poster%20Presentation"
                />
              </div>
            </TabsContent>

            <TabsContent value="gaming" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <EventCard
                  title="Valorant Tournament"
                  category="Gaming"
                  desc="Team-based tactical FPS tournament with pro rules."
                  time="Day 1–Day 2"
                  href="/register?event=Valorant"
                  highlight="Separate registration required"
                />
                <EventCard
                  title="BGMI Tournament"
                  category="Gaming"
                  desc="Battle royale action. Squads compete for the top spot."
                  time="Day 1–Day 2"
                  href="/register?event=BGMI"
                  highlight="Separate registration required"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  )
}
