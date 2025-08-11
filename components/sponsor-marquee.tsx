"use client"

import { useEffect, useRef } from "react"

const sponsors = ["ADJEN", "MX", "WISE", "GALILEO", "VISA", "STRIPE", "LITHIC", "MASTERCARD", "PAYPAL", "SYNOVUS"]

export default function SponsorMarquee() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const scroller = el.querySelector("[data-track]") as HTMLDivElement
    if (!scroller) return
    scroller.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
      duration: 18000,
      iterations: Number.POSITIVE_INFINITY,
      easing: "linear",
    })
  }, [])

  const item =
    "mx-4 px-4 py-2 rounded-md border border-white/10 bg-white/5 text-xs tracking-[0.2em] text-zinc-300 whitespace-nowrap"

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-white/10 bg-[#0a0f16]">
      <div className="py-5 flex">
        <div data-track className="flex min-w-max">
          {[...sponsors, ...sponsors].map((s, i) => (
            <div key={i} className={item}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
