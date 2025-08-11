import type React from "react"
import { ClerkProvider } from "@clerk/nextjs"

// Server Component wrapper that only mounts Clerk when a publishable key exists.
// Prevents the runtime "Missing publishableKey" error on preview/local when env isn't set.
export default function SafeClerkProvider({ children }: { children: React.ReactNode }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  if (!publishableKey) {
    // Render app without Clerk; pages can show helpful messaging if needed.
    return <>{children}</>
  }
  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>
}
