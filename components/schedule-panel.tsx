import { CalendarClock, Clock, Gamepad2, Terminal } from "lucide-react"
import Link from "next/link"

export default function SchedulePanel() {
  const row = (time: string, title: string, type: "talk" | "workshop" | "game" | "hack") => (
    <div
      className="grid grid-cols-[90px_1fr] items-start gap-4 py-3 border-b border-white/10 last:border-0"
      key={time + title}
    >
      <div className="text-xs text-zinc-400 flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5 text-blue-500" />
        {time}
      </div>
      <div className="text-sm text-zinc-200 flex items-center gap-2">
        {type === "hack" && <Terminal className="h-4 w-4 text-blue-500" />}
        {type === "workshop" && <CalendarClock className="h-4 w-4 text-cyan-400" />}
        {type === "talk" && <CalendarClock className="h-4 w-4 text-fuchsia-400" />}
        {type === "game" && <Gamepad2 className="h-4 w-4 text-amber-400" />}
        <span>{title}</span>
      </div>
    </div>
  )

  return (
    <div className="relative rounded-xl border border-emerald-500/30 bg-[#081018]/70 p-0 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-emerald-500/70 via-fuchsia-500/70 to-cyan-500/70" />
      <div className="p-5 border-b border-white/10">
        <h3 className="text-xl font-semibold">Event Details</h3>
        <p className="text-sm text-zinc-400">Quick snapshot — see full agenda on Events page</p>
      </div>
      <div className="p-5">
        <h4 className="text-blue-400 text-sm tracking-wide mb-2">Day 1 — Oct 18</h4>
        {[
          row("10:00", "Hackathon Kickoff", "hack"),
          row("12:00", "Workshop: Cloud & DevOps", "workshop"),
          row("14:00", "Quiz", "talk"),
          row("15:00", "Code Sprint (1 hr)", "talk"),
          row("16:00", "Debate", "talk"),
          row("17:00", "Tech Talk: GenAI & RAG", "talk"),
          row("18:30", "Valorant & BGMI Rounds Begin", "game"),
        ]}
        <h4 className="text-blue-400 text-sm tracking-wide mt-5 mb-2">Day 2 — Oct 19</h4>
        {[
          row("09:00", "Treasure Hunt", "talk"),
          row("11:00", "Poster Presentation", "talk"),
          row("13:00", "Final Demos & Judging", "hack"),
          row("16:00", "Awards & Closing", "hack"),
        ]}
        <div className="mt-5">
          <Link href="/events" className="text-blue-400 text-sm hover:text-emerald-200">
            View complete schedule →
          </Link>
        </div>
      </div>
    </div>
  )
}
