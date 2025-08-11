import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignIn } from "@clerk/nextjs"
import Link from "next/link"
import { publishableKey } from "@/lib/clerk-config"

export default function LoginPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0b0f17] text-white">
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-xl mx-auto bg-[#0a0f16]/80 border-white/10">
          <CardHeader>
            <CardTitle>Login / Register</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {publishableKey ? (
              <SignIn routing="path" path="/login" signUpUrl="/sign-up" afterSignInUrl="/" />
            ) : (
              <div className="space-y-3 text-zinc-300">
                <p>Clerk is not configured yet. Add keys to enable sign in:</p>
                <pre className="rounded bg-black/40 p-3 text-xs overflow-auto">{`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...`}</pre>
                <p className="text-xs text-zinc-500">
                  In Next.js, only NEXT_PUBLIC_ variables are exposed to the client. Ensure the publishable key uses the
                  NEXT_PUBLIC_ prefix [^1].
                </p>
              </div>
            )}
            <p className="text-xs text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-blue-400 hover:text-emerald-200">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
