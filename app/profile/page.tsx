"use client"

import { useUser, SignIn } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [ownedTeams, setOwnedTeams] = useState<any[]>([])
  const [joinedTeams, setJoinedTeams] = useState<any[]>([])

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return

    const fetchOwned = async () => {
      const { data, error } = await supabase.from("registrations").select("*").eq("user_id", user.id)
      if (error) console.error(error)
      else setOwnedTeams(data || [])
    }

    const fetchJoined = async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("team_id, status, joined_at, registrations(*)")
        .eq("user_id", user.id)
      if (error) {
        console.error(error)
        return
      }
      const mapped = (data || []).map((row: any) => ({
        team_id: row.team_id,
        status: row.status,
        joined_at: row.joined_at,
        ...row.registrations,
      }))
      setJoinedTeams(mapped || [])
    }

    fetchOwned()
    fetchJoined()
  }, [isLoaded, isSignedIn, user])

  if (!isLoaded) return <div className="flex items-center justify-center h-screen text-white">Loading...</div>

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

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Teams I lead</h2>
        {ownedTeams.length === 0 && <p>No teams created yet.</p>}
        {ownedTeams.map((team) => (
          <div key={team.id} className="p-4 border border-gray-700 rounded mb-3">
            <h3 className="font-bold">{team.team_name}</h3>
            <p>Event: {team.event_choice}</p>
            <p>Max members: {team.members}</p>
            <p>College: {team.college}</p>
            <p>Notes: {team.notes}</p>
            <p className="mt-2">Invite Link:</p>
            <code className="text-blue-400 block">
              {`${process.env.NEXT_PUBLIC_BASE_URL}/join/${team.invite_code}`}
            </code>
            <div className="mt-3">
              <Link href={`/manage/${team.id}`} className="inline-block px-3 py-2 bg-gray-700 rounded">
                Manage Team
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Teams I'm part of</h2>
        {joinedTeams.length === 0 && <p>You haven't joined any teams yet.</p>}
        {joinedTeams.map((t) => (
          <div key={t.team_id} className="p-4 border border-gray-700 rounded mb-3">
            <h3 className="font-bold">{t.team_name}</h3>
            <p>Role: member</p>
            <p>Status: {t.status}</p>
            <p>Event: {t.event_choice}</p>
            <p>Invite link: <code>{`${process.env.NEXT_PUBLIC_BASE_URL}/join/${t.invite_code}`}</code></p>
          </div>
        ))}
      </section>
    </div>
  )
}
