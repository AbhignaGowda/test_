"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const nums = el.querySelectorAll("[data-count]")
    nums.forEach((n) => {
      const target = Number(n.getAttribute("data-count") || "0")
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          n.textContent = `${Math.floor(obj.val)}`
        },
        scrollTrigger: { trigger: el, start: "top 85%" },
      } as any)
    })
  }, [])

  const cell =
    "rounded-xl border border-white/10 bg-[#0a0f16]/80 px-5 py-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className={cell}>
        <div className="text-4xl font-bold text-blue-400 tabular-nums" data-count={884}>
          0
        </div>
        <div className="mt-1 text-sm text-zinc-400">Registered Hackers</div>
      </div>
      <div className={cell}>
        <div className="text-4xl font-bold text-fuchsia-300 tabular-nums" data-count={22}>
          0
        </div>
        <div className="mt-1 text-sm text-zinc-400">Live Sessions</div>
      </div>
      <div className={cell}>
        <div className="text-4xl font-bold text-cyan-300 tabular-nums" data-count={18}>
          0
        </div>
        <div className="mt-1 text-sm text-zinc-400">Workshops & Talks</div>
      </div>
      <div className={cell}>
        <div className="text-4xl font-bold text-amber-300 tabular-nums" data-count={8}>
          0
        </div>
        <div className="mt-1 text-sm text-zinc-400">Mini Events</div>
      </div>
    </div>
  )
}
