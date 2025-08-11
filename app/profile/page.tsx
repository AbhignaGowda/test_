"use client"

import { useUser, SignIn } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [teams, setTeams] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    const fetchTeams = async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", user.id)

      if (!error) setTeams(data || [])
      else console.error(error)
    }
    fetchTeams()
  }, [user])

  // Show loading until Clerk is ready
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    )
  }

  // If user is not signed in, show Sign In form
  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SignIn afterSignInUrl="/profile" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Teams</h1>
      {teams.length === 0 && <p>No teams registered yet.</p>}
      {teams.map((team) => (
        <div key={team.id} className="p-4 border border-gray-700 rounded mb-3">
          <h2 className="font-bold">{team.team_name}</h2>
          <p>Event: {team.event_choice}</p>
          <p>Members: {team.members}</p>
          <p>College: {team.college}</p>
          <p>Notes: {team.notes}</p>
          <p>Invite Link:</p>
          <code className="text-blue-400">
            {`${process.env.NEXT_PUBLIC_BASE_URL}/join/${team.invite_code}`}
          </code>
        </div>
      ))}
    </div>
  )
}
