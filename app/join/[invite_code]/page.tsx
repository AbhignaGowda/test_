"use client"

import { SignIn, useUser } from "@clerk/nextjs"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function JoinTeamPage() {
  const { invite_code } = useParams() as { invite_code: string }
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()
  const [team, setTeam] = useState<any | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!invite_code) return
    const fetchTeam = async () => {
      const { data, error } = await supabase.from("registrations").select("*").eq("invite_code", invite_code).single()
      if (error) {
        console.error(error)
        setMessage("Invalid invite link.")
      } else setTeam(data)
    }
    fetchTeam()
  }, [invite_code])

  async function handleJoin() {
    if (!isLoaded) return
    if (!isSignedIn || !user) {
      setMessage("Please sign in to join this team.")
      return
    }
    if (!team) return

    // Check existing
    const { data: existing } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", team.id)
      .eq("user_id", user.id)

    if (existing && existing.length > 0) {
      setMessage("You have already requested or are part of this team.")
      return
    }

    const { error } = await supabase
      .from("team_members")
      .insert([{ team_id: team.id, user_id: user.id, status: "pending" }])

    if (error) {
      console.error(error)
      setMessage("Error sending join request.")
    } else {
      setMessage("Join request submitted to the team leader.")
      setTimeout(() => router.push("/profile"), 1500)
    }
  }

  if (!team) return <div className="text-white p-6">{message ?? "Loading..."}</div>

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Join Team: {team.team_name}</h1>
      <p>Event: {team.event_choice}</p>
      {message && <p className="mt-3">{message}</p>}

      {!isSignedIn ? (
        <div className="mt-4">
          <SignIn afterSignInUrl={`/join/${invite_code}`} />
        </div>
      ) : (
        <div className="mt-4">
          <button onClick={handleJoin} className="px-4 py-2 rounded bg-blue-500">Request to Join</button>
        </div>
      )}
    </div>
  )
}
