import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body: ContactPayload = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  // TODO: wire up an email provider (e.g. Resend) to actually deliver this.
  console.log("New contact submission:", body);

  return NextResponse.json({ success: true });
}
