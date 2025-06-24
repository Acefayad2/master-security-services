import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export async function POST(request: NextRequest) {
  try {
    const { subject, html, email } = await request.json();

    // Using SendGrid to send emails
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'master.sllc@aol.com',
      from: 'acefayad@outlook.com',
      replyTo: email || undefined,
      subject: subject,
      html: html,
    };
    console.log("TO:", msg.to, "FROM:", msg.from, "REPLY-TO:", msg.replyTo);
    await sgMail.send(msg);

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email' 
      },
      { status: 500 }
    );
  }
} 