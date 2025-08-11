"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react" // Official GSAP hook for React
import gsap from "gsap"
import { vt323 } from "./pixel-fonts" // Assuming this is your next/font object

// Register the useGSAP plugin
gsap.registerPlugin(useGSAP)

export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const container = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  // useGSAP provides a modern, safe way to use GSAP in React.
  // It handles automatic cleanup.
  useGSAP(
    () => {
      // 1. Animate counter directly on the DOM element for better performance
      const counter = { val: 0 }
      gsap.to(counter, {
        val: 100,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            // Update innerText directly, avoiding React re-renders
            counterRef.current.innerText = String(Math.floor(counter.val))
          }
        },
      })

      // 2. Create the main reveal timeline
      const tl = gsap.timeline({
        onComplete: () => onDone?.(),
      })

      // 3. Vertical split reveal animation
      tl.addLabel("split", "+=1.2") // Add a label to sync animations
        .to(".left-panel", { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, "split")
        .to(".right-panel", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "split")

        // Flash the vertical line during the split
        .fromTo(".v-line", { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "power3.out" }, "split")
        .to(".v-line", { opacity: 0, duration: 0.3, ease: "power2.in" }, "split+=0.3")
        
        // Fade out the counter text and the entire container
        .to(".counter-wrap", { opacity: 0, duration: 0.3, ease: "power2.in" }, "split")
        .to(container.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              if (container.current) {
                // Hide the component completely after animation
                container.current.style.display = "none"
              }
            },
          },"split+=0.5")
    },
    { scope: container }, // Scope GSAP selectors to the container element
  )

  return (
    <div ref={container} className="fixed inset-0 z-[100] bg-[#05080f] text-blue-400" role="status" aria-live="polite">
      {/* Left half panel (slides down) */}
      <div className="left-panel absolute left-0 top-0 h-full w-1/2 bg-[#05080f]" style={{ willChange: "transform" }} />
      {/* Right half panel (slides up) */}
      <div className="right-panel absolute right-0 top-0 h-full w-1/2 bg-[#05080f]" style={{ willChange: "transform" }} />
      {/* Center vertical glow line (visual split) */}
      <div className="v-line pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-400/80 to-transparent shadow-[0_0_18px_2px_rgba(16,185,129,0.55)]" />

      {/* Centered content */}
      <div className="counter-wrap relative z-10 grid h-full place-items-center">
        <div
          // This is the correct way to apply the custom font with Tailwind CSS
          className={`${vt323.className} text-[64px] leading-none drop-shadow-[0_0_14px_rgba(16,185,129,0.5)] sm:text-[88px] md:text-[112px]`}
        >
          <span ref={counterRef}>0</span>
          <span className="text-3xl text-zinc-400 align-top">%</span>
        </div>
        <p className="mt-3 text-xs text-zinc-400">Initializing systems…</p>
      </div>
    </div>
  )
}
