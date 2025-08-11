"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabaseClient"

export default function JoinTeamPage() {
  const { invite_code } = useParams()
  const { user } = useUser()
  const router = useRouter()
  const [team, setTeam] = useState<any>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("invite_code", invite_code)
        .single()

      if (!error) setTeam(data)
    }
    fetchTeam()
  }, [invite_code])

  async function handleJoin() {
    if (!user || !team) return

    const { error } = await supabase
      .from("team_members")
      .insert([{ team_id: team.id, user_id: user.id }])

    if (!error) {
      alert("Joined successfully!")
      router.push("/profile")
    } else {
      alert(error.message)
    }
  }

  if (!team) return <p className="text-white p-6">Loading team...</p>

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Join Team: {team.team_name}</h1>
      <p>Event: {team.event_choice}</p>
      {user ? (
        <button
          onClick={handleJoin}
          className="mt-4 px-4 py-2 bg-blue-500 rounded"
        >
          Join Team
        </button>
      ) : (
        <p className="mt-4 text-red-400">Please sign in to join.</p>
      )}
    </div>
  )
}
