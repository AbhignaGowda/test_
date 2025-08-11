"use client"

import { useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

type Registration = {
  teamName: string
  members: number
  college: string
  eventChoice: "Tech" | "Valorant" | "BGMI"
  specificEvent?: string
  notes?: string
}

export default function RegisterForm() {
  const params = useSearchParams()
  const router = useRouter()
  const { user, isLoaded, isSignedIn } = useUser()

  const preselect = useMemo(() => decodeURIComponent(params.get("event") || ""), [params])

  const [data, setData] = useState<Registration>({
    teamName: "",
    members: 1,
    college: "",
    eventChoice: preselect === "Valorant" ? "Valorant" : preselect === "BGMI" ? "BGMI" : "Tech",
    specificEvent: preselect && !["Valorant", "BGMI"].includes(preselect) ? preselect : "",
    notes: "",
  })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded) return
    if (!isSignedIn || !user) {
      toast({
        title: "Not signed in",
        description: "Please sign in to register your team.",
        variant: "destructive",
      })
      return
    }

    try {
      const { data: team, error } = await supabase
        .from("registrations")
        .insert([
          {
            user_id: user.id,
            team_name: data.teamName,
            members: data.members,
            college: data.college,
            event_choice: data.eventChoice,
            specific_event: data.specificEvent,
            notes: data.notes,
          },
        ])
        .select()
        .single()

      if (error) throw error
      if (!team) throw new Error("Team creation failed")

      // Add leader as approved member
      const { error: mErr } = await supabase
        .from("team_members")
        .insert([{ team_id: team.id, user_id: user.id, status: "approved" }])

      if (mErr) throw mErr

      toast({
        title: "Registered!",
        description: "Team created and you have been added as leader.",
      })

      router.push("/profile")
    } catch (err: any) {
      console.error(err)
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* team name + members */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="teamName">Team name</Label>
          <Input id="teamName" placeholder="e.g., Cyber Ninjas" value={data.teamName}
            onChange={(e) => setData((d) => ({ ...d, teamName: e.target.value }))} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="members">Number of members</Label>
          <Input id="members" type="number" min={1} max={6} value={data.members}
            onChange={(e) => setData((d) => ({ ...d, members: Number(e.target.value) }))} required />
        </div>
      </div>

      {/* college */}
      <div className="space-y-2">
        <Label htmlFor="college">College / University name</Label>
        <Input id="college" placeholder="Your College Name" value={data.college}
          onChange={(e) => setData((d) => ({ ...d, college: e.target.value }))} required />
      </div>

      {/* event choice */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Choice of event</Label>
          <Select value={data.eventChoice}
            onValueChange={(v: "Tech" | "Valorant" | "BGMI") => setData((d) => ({ ...d, eventChoice: v }))}>
            <SelectTrigger><SelectValue placeholder="Select event" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Tech">Tech</SelectItem>
              <SelectItem value="Valorant">Valorant</SelectItem>
              <SelectItem value="BGMI">BGMI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Specific Tech Event (optional)</Label>
          <Input placeholder="Quiz / Debate / Code Sprint ..." value={data.specificEvent || ""}
            onChange={(e) => setData((d) => ({ ...d, specificEvent: e.target.value }))}
            disabled={data.eventChoice !== "Tech"} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (platform IDs, etc.)</Label>
        <Textarea id="notes" placeholder="Add details" value={data.notes}
          onChange={(e) => setData((d) => ({ ...d, notes: e.target.value }))} rows={4} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" className="bg-blue-500 text-black">Submit Registration</Button>
      </div>
    </form>
  )
}
