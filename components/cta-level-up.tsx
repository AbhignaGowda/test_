import Link from "next/link"
import { pressStart } from "./pixel-fonts"

export default function CtaLevelUp() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a1020]">
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)]" />
      <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=16&width=16')] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative px-6 py-16 sm:px-10 sm:py-20 grid place-items-center text-center">
        <h2
          className={`${pressStart.variable} font-[family-name:var(--font-press-start)] text-4xl sm:text-5xl text-zinc-100`}
        >
          LEVEL UP
          <br />
          <span className="text-blue-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]">JOIN NOW</span>
        </h2>
        <Link
          href="/register"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-blue-500 px-6 text-sm font-medium text-black hover:bg-blue-500"
        >
          Register
        </Link>
      </div>
    </section>
  )
}
