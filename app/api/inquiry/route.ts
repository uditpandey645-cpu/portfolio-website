import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, scope, details } = body;

    console.log("=========================================");
    console.log("NEW PORTFOLIO INQUIRY RECEIVED");
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`To: uditpandey645@gmail.com`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Scope: ${scope || "General"}`);
    console.log(`Details: ${details}`);
    console.log("=========================================");

    // In production with an email provider (Resend, SendGrid, or nodemailer):
    // await resend.emails.send({ ... })

    return NextResponse.json({
      success: true,
      recipient: "uditpandey645@gmail.com",
      message: "Inquiry logged successfully",
    });
  } catch (error) {
    console.error("Inquiry logging error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
