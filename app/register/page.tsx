import RegisterForm from "@/components/register-form"
import SectionReveal from "@/components/section-reveal"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { publishableKey } from "@/lib/clerk-config"

export default function RegisterPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0b0f17] text-white">
      <section className="container mx-auto px-4 py-16">
        <SectionReveal>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Team Registration</h1>
          <p className="mt-3 text-zinc-300">
            Sign in to register your team and manage submissions. Valorant and BGMI require separate registration.
          </p>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#0a0f16] p-6">
            {publishableKey ? (
              <>
                <SignedIn>
                  <RegisterForm />
                </SignedIn>
                <SignedOut>
                  <div className="text-zinc-300">
                    <p className="mb-4">Please sign in to continue.</p>
                    <SignInButton mode="redirect" signInUrl="/login">
                      <span className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-6 text-sm font-medium text-black hover:bg-blue-500 cursor-pointer">
                        Sign in
                      </span>
                    </SignInButton>
                  </div>
                </SignedOut>
              </>
            ) : (
              <div className="text-zinc-300">
                <p className="mb-2">Clerk keys missing. Add keys to enable registration login.</p>
                <pre className="rounded bg-black/40 p-3 text-xs overflow-auto">{`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...`}</pre>/ make homepage public
              </div>
            )}
          </div>

          <p className="mt-3 text-xs text-zinc-500">
            Valorant and BGMI require platform IDs and rosters. Use the notes field or attach details after sign-in.
          </p>
        </SectionReveal>
      </section>
    </main>
  )
}
