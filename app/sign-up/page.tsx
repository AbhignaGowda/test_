import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUp } from "@clerk/nextjs"
import Link from "next/link"
import { publishableKey } from "@/lib/clerk-config"

export default function SignUpPage() {
  return (
    <main className="min-h-[100dvh] bg-[#0b0f17] text-white">
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-xl mx-auto bg-[#0a0f16]/80 border-white/10">
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {publishableKey ? (
              <SignUp routing="path" path="/sign-up" signInUrl="/login" afterSignUpUrl="/register" />
            ) : (
              <div className="space-y-3 text-zinc-300">
                <p>Clerk is not configured yet. Add your keys to enable sign up.</p>
              </div>
            )}
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-emerald-200">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
