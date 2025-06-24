import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    const msg = {
      to: 'master.sllc@aol.com',           // Recipient (your AOL inbox)
      from: 'acefayad@outlook.com',        // Verified sender (must be verified in SendGrid)
      replyTo: data.email,                 // The visitor's email from the form
      subject: 'Custom Security Plan Request',
      text: `New message from ${data.name} - ${data.email}\n\n${data.message}`,
      html: `<strong>New message from ${data.name} (${data.email})</strong><p>${data.message}</p>`,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SENDGRID ERROR:", error.response?.body || error.message);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}