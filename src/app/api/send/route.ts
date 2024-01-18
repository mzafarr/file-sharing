import { Resend } from "resend";
import EmailTemplate from "../../../components/email-template";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: any, res: any) {
  const body = await req.json();
  const { fileInfo } = body;
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [fileInfo.email],
      subject: `${fileInfo.fullName} has sent you a file`,
      react: EmailTemplate(fileInfo),
    });
    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(`${error}`, { status: 401 });
  }
}
