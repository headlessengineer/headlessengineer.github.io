import { NextResponse } from 'next/server';

// TODO: when wiring real email delivery, validate and sanitise { name, email, message }
// from the request body before passing to the email service.
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ success: true });
}
