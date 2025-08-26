import { db } from "@/config/db";
import { SessionChatTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { desc, eq } from "drizzle-orm";



export async function POST(req: NextRequest) {
  const { notes, selectedDoctor } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const userEmail = user.primaryEmailAddress?.emailAddress!;
  const userName = [user.firstName, user.lastName].filter(Boolean).join(" ") || "Unknown";

  try {
    // ✅ Ensure user exists in usersTable
    await db
      .insert(usersTable)
      .values({
        name: userName,
        email: userEmail,
      })
      .onConflictDoNothing({ target: usersTable.email });

    // ✅ Create new session
    const sessionId = uuidv4();
    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId,
        createdBy: userEmail,
        notes,
        selectedDoctor,
        createdOn: new Date().toISOString(),
      })
      .returning(); // ✅ fixed returning

    return NextResponse.json(result[0]); // return inserted row
  } catch (e) {
    console.error("DB Insert Error:", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('sessionId');
  const user = await currentUser();

  if (sessionId == 'all') {
    const result = await db.select().from(SessionChatTable)
      //@ts-ignore
      .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(SessionChatTable.id));

    return NextResponse.json(result);
  }
 else {
  const result = await db.select().from(SessionChatTable)
    //@ts-ignore
    .where(eq(SessionChatTable.sessionId, sessionId));

  return NextResponse.json(result[0]);
}
}

