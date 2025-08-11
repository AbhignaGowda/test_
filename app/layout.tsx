import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TopBar from "@/components/top-bar"
import SafeClerkProvider from "@/components/safe-clerk-provider"

export const metadata: Metadata = {
  title: "NeonHack 2K25 — College Hackathon",
  description: "Cyberpunk college hackathon with tech and gaming tracks",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeClerkProvider>
      <html lang="en" className="dark">
        <body className="min-h-dvh bg-[#0b0f17] text-white antialiased selection:bg-blue-500/30 selection:text-white">
          <TopBar />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </SafeClerkProvider>
  )
}
