// app/api/team/remove/route.ts
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  const auth = getAuth(req);
  const userId = auth.userId;
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { team_id, member_user_id } = body;
  if (!team_id || !member_user_id) return NextResponse.json({ error: "Missing params" }, { status: 400 });

  const { data: team, error: tErr } = await supabaseServer
    .from("registrations")
    .select("id, user_id")
    .eq("id", team_id)
    .single();

  if (tErr || !team) return NextResponse.json({ error: "Team not found" }, { status: 404 });
  if (team.user_id !== userId) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Prevent removing owner
  if (member_user_id === userId) return NextResponse.json({ error: "Cannot remove leader" }, { status: 400 });

  const { error } = await supabaseServer
    .from("team_members")
    .delete()
    .eq("team_id", team_id)
    .eq("user_id", member_user_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
