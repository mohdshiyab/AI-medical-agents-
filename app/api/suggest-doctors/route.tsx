import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-lite-preview-06-17",
      messages: [
        { role: "system", content: JSON.stringify(AIDoctorAgents) },
        { role: "user", content: `User Notes/Symptoms: ${notes}. Suggest doctors in JSON only.` }
      ],
    });

    const rawResp = completion.choices[0].message;
    // @ts-ignore
    const Resp = rawResp.content.trim().replace("```json", "").replace("```", "");
    const JSONResp = JSON.parse(Resp);

    return NextResponse.json(JSONResp);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}


