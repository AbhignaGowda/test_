import Image from "next/image"

const items = [
  { title: "Quiz", img: "/placeholder.svg?height=240&width=320", blurb: "Tech trivia and logic." },
  { title: "Debate", img: "/placeholder.svg?height=240&width=320", blurb: "Ethics and AI." },
  { title: "Code Sprint (1hr)", img: "/placeholder.svg?height=240&width=320", blurb: "Snippets showdown." },
  { title: "Treasure Hunt", img: "/placeholder.svg?height=240&width=320", blurb: "Decrypt & explore." },
  { title: "Poster Presentation", img: "/placeholder.svg?height=240&width=320", blurb: "Tech + business." },
  { title: "Tech Talks", img: "/placeholder.svg?height=240&width=320", blurb: "Industry insights." },
]

export default function HighlightCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <div
          key={it.title}
          className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-[#0a0f16]/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:border-emerald-500/40 transition-colors"
        >
          <div className="border-b border-white/10">
            <Image
              src={it.img || "/placeholder.svg"}
              alt={it.title}
              width={800}
              height={480}
              className="w-full h-44 object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{it.title}</h3>
              <span className="text-[10px] tracking-widest text-blue-400">EVENT</span>
            </div>
            <p className="mt-1 text-sm text-zinc-300">{it.blurb}</p>
          </div>
          <div className="absolute inset-x-0 -bottom-10 h-10 bg-gradient-to-t from-emerald-500/10 to-transparent group-hover:bottom-0 transition-all" />
        </div>
      ))}
    </div>
  )
}
