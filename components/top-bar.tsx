import { CalendarDays, MapPin, Radio } from "lucide-react"
import Link from "next/link"

export default function TopBar() {
  return (
    <div className="w-full border-b border-white/10 bg-[#0a0f16]">
      <div className="container mx-auto px-4 h-9 text-xs flex items-center justify-between text-zinc-300">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-blue-500" />
            Oct 18–19, 2025
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-fuchsia-400" />
            Cyber Arena, Main Campus
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/events" className="hover:text-white">
            Schedule
          </Link>
          <Link href="/register" className="hover:text-white">
            Register
          </Link>
          <a href="#" className="inline-flex items-center gap-1 hover:text-white">
            <Radio className="h-3.5 w-3.5 text-cyan-400" />
            Livestream
          </a>
        </div>
      </div>
    </div>
  )
}
