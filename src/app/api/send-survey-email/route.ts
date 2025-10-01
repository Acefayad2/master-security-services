import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { subject, html, email, surveyData } = await request.json();

    // Using Resend to send emails
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        {
          success: false,
          message: 'Email service not configured',
        },
        { status: 500 }
      );
    }
    const resend = new Resend(apiKey);
    
    const businessEmail = 'master.sllc@aol.com';
    const from = 'noreply@mastersecurity.services';
    
    // Send business notification email
    const businessEmailResult = await resend.emails.send({
      to: businessEmail,
      from,
      subject: 'New Security Assessment Survey Submission',
      html: html,
      replyTo: email || undefined,
    });
    
    if (businessEmailResult.error) {
      console.error('Resend business email error:', JSON.stringify(businessEmailResult.error, null, 2));
      return NextResponse.json({ success: false, message: 'Failed to send business notification' }, { status: 500 });
    }

    // Send confirmation email to submitter if email provided
    if (email) {
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://mastersecurity.services/logo.png" alt="Master Security Services" style="max-width: 200px; height: auto;">
          </div>
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #b1001a; margin-bottom: 20px; text-align: center;">Thank You for Your Submission!</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              We received your security assessment survey submission and truly appreciate you taking the time to share your needs with us.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
              Our team will review your requirements carefully and get back to you as soon as possible with a customized security solution tailored to your specific needs.
            </p>
            <div style="background-color: #f7f7fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #b1001a; margin-bottom: 15px;">What happens next?</h3>
              <ul style="color: #555; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>Our security experts will review your submission</li>
                <li>We'll prepare a customized security plan for your business</li>
                <li>You'll receive a detailed proposal within 24-48 hours</li>
                <li>We'll schedule a consultation to discuss your options</li>
              </ul>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 30px;">
              If you have any urgent security needs or questions, please don't hesitate to contact us directly at <a href="mailto:master.sllc@aol.com" style="color: #b1001a;">master.sllc@aol.com</a>.
            </p>
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                <strong>Master Security Services LLC</strong><br>
                Safeguarding Success with Superior Solutions
              </p>
            </div>
          </div>
        </div>
      `;

      const confirmationResult = await resend.emails.send({
        to: email,
        from,
        subject: 'Thank You - Security Assessment Received',
        html: confirmationHtml,
      });
      
      if (confirmationResult.error) {
        console.error('Resend confirmation email error:', confirmationResult.error);
        // Don't fail the whole request if confirmation fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Emails sent successfully' 
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