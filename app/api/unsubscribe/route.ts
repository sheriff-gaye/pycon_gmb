import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

   
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    try {
      const removeResult = await resend.contacts.remove({
        email: email,
        audienceId: process.env.RESEND_AUDIENCE_ID!,
      });

      if (removeResult.error) {
        // If contact doesn't exist, still return success to avoid revealing user data
        if (removeResult.error.message?.includes('not found') || 
            removeResult.error.message?.includes('does not exist')) {
          return NextResponse.json({
            success: true,
            message: 'Successfully unsubscribed from newsletter!',
          });
        }
        
        console.error('Resend contact removal error:', removeResult.error);
        return NextResponse.json(
          { error: 'Failed to unsubscribe from newsletter' },
          { status: 500 }
        );
      }

      // Send confirmation email (optional)
      try {
        await resend.emails.send({
          from: 'PyConSeneGambia <noreply@pyconsenegambia.org>',
          to: [email],
          subject: 'You\'ve been unsubscribed from PyConSeneGambia Newsletter',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 28px;">Unsubscribed Successfully</h1>
              </div>
              
              <div style="padding: 40px 20px;">
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  Hi there,
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  You have been successfully unsubscribed from the PyConSeneGambia newsletter. 
                  We're sorry to see you go! 😢
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  You will no longer receive:
                </p>
                
                <ul style="font-size: 16px; line-height: 1.8; color: #333; padding-left: 20px;">
                  <li>Conference updates and announcements</li>
                  <li>Speaker reveals and session details</li>
                  <li>Early bird ticket releases</li>
                  <li>Networking events and workshops</li>
                  <li>Python community news in Senegambia</li>
                </ul>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                  <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 0;">
                    <strong>Changed your mind?</strong><br>
                    You can subscribe again anytime by visiting our website and signing up for our newsletter.
                  </p>
                </div>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="https://pyconsenegambia.org" 
                     style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                    Visit Our Website
                  </a>
                </div>
                
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  If you have any feedback about our emails or conference, we'd love to hear from you at 
                  <a href="mailto:info@pyconsenegambia.org" style="color: #667eea;">info@pyconsenegambia.org</a>
                </p>
                
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                  Thank you for being part of the PyConSeneGambia community! 🐍
                </p>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #666; margin: 0;">
                  This email was sent to confirm your unsubscription from PyConSeneGambia newsletter.
                </p>
              </div>
            </div>
          `,
          text: `
Unsubscribed Successfully

Hi there,

You have been successfully unsubscribed from the PyConSeneGambia newsletter. We're sorry to see you go!

You will no longer receive:
- Conference updates and announcements
- Speaker reveals and session details
- Early bird ticket releases
- Networking events and workshops
- Python community news in Senegambia

Changed your mind?
You can subscribe again anytime by visiting our website and signing up for our newsletter.

Visit our website: https://pyconsenegambia.org

If you have any feedback about our emails or conference, we'd love to hear from you at info@pyconsenegambia.org

Thank you for being part of the PyConSeneGambia community!

This email was sent to confirm your unsubscription from PyConSeneGambia newsletter.
          `
        });
      } catch (emailError) {
        // Don't fail the unsubscribe if confirmation email fails
        console.error('Unsubscribe confirmation email failed:', emailError);
      }

      return NextResponse.json({
        success: true,
        message: 'Successfully unsubscribed from newsletter!',
      });

    } catch (resendError) {
      console.error('Resend API error:', resendError);
      return NextResponse.json(
        { error: 'Failed to process unsubscribe request' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: `Failed to process unsubscribe request: ${error}` },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests for URL-based unsubscribe
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  
  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter is required' },
      { status: 400 }
    );
  }

  // For GET requests, just return the unsubscribe page with pre-filled email
  // The actual unsubscription will be handled by the POST request from the form
  return NextResponse.redirect(
    new URL(`/unsubscribe?email=${encodeURIComponent(email)}`, request.url)
  );
}