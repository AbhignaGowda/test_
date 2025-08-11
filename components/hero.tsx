"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import NeonGrid from "./neon-grid"
import { pressStart, orbitron, chakra } from "./pixel-fonts"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title-line", { opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: "power2.out" })
      gsap.from(".hero-sub", { opacity: 0, y: 16, duration: 0.8, delay: 0.2, ease: "power2.out" })
      gsap.from(".hero-cta", { opacity: 0, y: 10, duration: 0.8, delay: 0.35, ease: "power2.out" })
      gsap.from(".hero-badges > *", { opacity: 0, y: 12, duration: 0.6, delay: 0.5, stagger: 0.08 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden isolate">
      <NeonGrid />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#0b0f17] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-10 md:pt-28 md:pb-16">
        <div className="max-w-5xl">
          <h1 className={`${pressStart.variable} ${orbitron.variable} ${chakra.variable}`}>
            <span className="hero-title-line block font-[family-name:var(--font-press-start)] text-blue-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)] text-base sm:text-lg tracking-[0.25em]">
              NEONHACK 2K25
            </span>
            <span className="hero-title-line mt-3 block font-[family-name:var(--font-chakra)] text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight">
              The Fintech x Cyberpunk Hackathon
            </span>
          </h1>

          <p className="hero-sub mt-5 text-lg text-zinc-300 max-w-2xl font-[family-name:var(--font-chakra)]">
            Build, ship, and compete across 24 hours. Includes Quiz, Debate, Code Sprint (1 hr), Treasure Hunt, Poster
            Presentation, workshops, tech talks, and Gaming: Valorant &amp; BGMI.
          </p>

          <div className="hero-badges mt-6 flex flex-wrap items-center gap-3">
            <Badge tone="emerald">24H Hackathon</Badge>
            <Badge tone="fuchsia">Tech Talks</Badge>
            <Badge tone="cyan">Workshops</Badge>
            <Badge tone="amber">Prizes &amp; Swag</Badge>
          </div>

          <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-md bg-blue-500 px-6 text-sm font-medium text-black hover:bg-blue-500"
            >
              Register Now
            </Link>
            <Link
              href="/events"
              className="inline-flex h-11 items-center justify-center rounded-md border border-emerald-500/40 bg-blue-500/10 px-6 text-sm font-medium text-blue-400 hover:bg-blue-500/20"
            >
              View Schedule
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Badge({ tone, children }: { tone: "emerald" | "fuchsia" | "cyan" | "amber"; children: React.ReactNode }) {
  const tones: Record<string, string> = {
    emerald: "border-emerald-500/40 bg-blue-500/10 text-blue-400",
    fuchsia: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300",
    cyan: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${tones[tone]} select-none`}>
      {children}
    </span>
  )
}
