"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur bg-[#0b0f17]/70">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_20px_2px_rgba(52,211,153,0.6)]" />
          <span className="font-semibold tracking-wider text-blue-400">
            NeonHack 2K25
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/about" label="About" />
          <NavLink href="/events" label="Events" />
          <NavLink href="/contact" label="Contact" />
          <NavLink href="/profile" label="MyEvents" />
          <Link
            href="/register"
            className="text-sm font-medium text-blue-400 hover:text-emerald-200"
          >
            Register
          </Link>

          <SignedOut>
            {/* Changed span → button to avoid React warning */}
            <SignInButton mode="redirect" signInUrl="/login">
              <button className="inline-flex h-9 items-center gap-2 rounded-md border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 text-fuchsia-300 hover:bg-fuchsia-500/20 cursor-pointer">
                Login
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "ring-2 ring-emerald-500/40 rounded-full",
                },
              }}
            />
          </SignedIn>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-blue-400">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0b0f17] border-white/10"
            >
              <div className="mt-8 flex flex-col gap-4">
                <MobileLink href="/about" label="About" />
                <MobileLink href="/events" label="Events" />
                <MobileLink href="/contact" label="Contact" />
                <MobileLink href="/register" label="Register" />

                <SignedOut>
                  {/* Changed span → button here as well */}
                  <SignInButton mode="redirect" signInUrl="/login">
                    <button className="inline-flex h-9 items-center justify-center rounded-md border border-fuchsia-500/40 bg-fuchsia-500/10 px-3 text-fuchsia-300 hover:bg-fuchsia-500/20 cursor-pointer">
                      Login
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="flex items-center">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-base font-medium text-zinc-200 hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}
