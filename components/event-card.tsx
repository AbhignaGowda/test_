import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function EventCard({
  title,
  category,
  desc,
  time,
  href,
  highlight,
}: {
  title: string
  category: "Tech" | "Gaming"
  desc: string
  time?: string
  href: string
  highlight?: string
}) {
  return (
    <Card className="bg-[#0a0f16]/80 border-white/10 hover:border-emerald-500/40 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{title}</CardTitle>
          <Badge
            variant="outline"
            className={
              category === "Tech" ? "border-emerald-500/40 text-blue-400" : "border-fuchsia-500/40 text-fuchsia-300"
            }
          >
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-zinc-300">{desc}</p>
        {time ? <p className="text-xs text-zinc-400">Time: {time}</p> : null}
        {highlight ? <p className="text-xs text-cyan-300">{highlight}</p> : null}
        <Link href={href} className="inline-flex text-sm text-blue-400 hover:text-emerald-200">
          Register →
        </Link>
      </CardContent>
    </Card>
  )
}
