"use client"

import { useUser, SignIn } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function ManageTeamPage() {
  const { teamId } = useParams() as { teamId: string }
  const { user, isLoaded, isSignedIn } = useUser()
  const [team, setTeam] = useState<any | null>(null)
  const [members, setMembers] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!teamId) return
    const load = async () => {
      const { data: t } = await supabase.from("registrations").select("*").eq("id", teamId).single()
      setTeam(t || null)
      const { data: mem } = await supabase.from("team_members").select("*").eq("team_id", teamId)
      setMembers(mem || [])
    }
    load()
  }, [teamId])

  if (!isLoaded) return <div className="text-white p-6">Loading...</div>
  if (!isSignedIn) return <div className="text-white p-6"><SignIn afterSignInUrl={`/manage/${teamId}`} /></div>
  if (!team) return <div className="text-white p-6">Team not found</div>

  if (team.user_id !== user?.id) return <div className="text-white p-6">You are not the team leader.</div>

  async function approve(memberUserId: string) {
    const res = await fetch("/api/team/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team_id: teamId, member_user_id: memberUserId }),
    })
    const json = await res.json()
    if (json.ok) router.refresh()
    else alert(json.error || "Error")
  }

  async function removeMember(memberUserId: string) {
    const res = await fetch("/api/team/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ team_id: teamId, member_user_id: memberUserId }),
    })
    const json = await res.json()
    if (json.ok) router.refresh()
    else alert(json.error || "Error")
  }

  return (
    <div className="container mx-auto p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Manage: {team.team_name}</h1>

      <section className="mb-6">
        <h2 className="text-lg font-semibold">Pending Requests</h2>
        {members.filter(m => m.status === "pending").length === 0 && <p>No pending requests.</p>}
        {members.filter(m => m.status === "pending").map(m => (
          <div key={m.user_id} className="p-3 border rounded mb-2">
            <p>User ID: {m.user_id}</p>
            <div className="mt-2">
              <button onClick={() => approve(m.user_id)} className="px-3 py-1 mr-2 bg-green-600 rounded">Approve</button>
              <button onClick={() => removeMember(m.user_id)} className="px-3 py-1 bg-red-600 rounded">Reject</button>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Members</h2>
        {members.filter(m => m.status === "approved").length === 0 && <p>No members yet.</p>}
        {members.filter(m => m.status === "approved").map(m => (
          <div key={m.user_id} className="p-3 border rounded mb-2">
            <p>User ID: {m.user_id}</p>
            {m.user_id !== team.user_id && <button onClick={() => removeMember(m.user_id)} className="mt-2 px-3 py-1 bg-red-600 rounded">Remove</button>}
          </div>
        ))}
      </section>
    </div>
  )
}
