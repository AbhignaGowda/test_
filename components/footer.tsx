import Link from "next/link"
import { Github, Instagram, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#090d14]">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <h3 className="text-blue-400 font-semibold tracking-wide">NeonHack 2K25</h3>
          <p className="text-sm text-zinc-400">
            A dystopian-themed college hackathon celebrating code, creativity, and collaboration.
          </p>
        </div>
        <div>
          <h4 className="text-sm text-zinc-400 mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="hover:text-white text-zinc-300" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-white text-zinc-300" href="/events">
                Events
              </Link>
            </li>
            <li>
              <Link className="hover:text-white text-zinc-300" href="/register">
                Register
              </Link>
            </li>
            <li>
              <Link className="hover:text-white text-zinc-300" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm text-zinc-400 mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-500" /> neonhack@college.edu
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" /> Cyber Arena, Campus Main Block
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm text-zinc-400 mb-3">Social</h4>
          <div className="flex items-center gap-3">
            <Link href="#" className="text-zinc-300 hover:text-white">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-zinc-300 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} NeonHack 2K25. All rights reserved.
      </div>
    </footer>
  )
}
