import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

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

    
    const contactParams = {
      email: email,
      unsubscribed: false,
      audienceId:  process.env.RESEND_AUDIENCE_ID!, 
    };

    const contactResult = await resend.contacts.create(contactParams);

    if (contactResult.error) {
      if (contactResult.error.message?.includes('already exists')) {
        return NextResponse.json(
          { error: 'Email is already subscribed to our newsletter' },
          { status: 409 }
        );
      }
      
      console.error('Resend contact creation error:', contactResult.error);
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }

   
    const unsubscribeUrl = `${'https://pyconsenegambia.org'}/unsubscribe?email=${encodeURIComponent(email)}`;

    try {
      await resend.emails.send({
        from: 'PyConSeneGambia <noreply@pyconsenegambia.org>',
        to: [email],
        subject: 'Welcome to PyConSeneGambia Newsletter!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 28px;">Welcome to PyConSeneGambia!</h1>
            </div>
            
            <div style="padding: 40px 20px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Hi ${name || 'there'},
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Thank you for subscribing to the PyConSeneGambia newsletter! 🎉
              </p>
              
              <p style="font-size: 16px; line-height: 1.6; color: #333;">
                You'll be the first to know about:
              </p>
              
              <ul style="font-size: 16px; line-height: 1.8; color: #333; padding-left: 20px;">
                <li>Conference updates and announcements</li>
                <li>Speaker reveals and session details</li>
                <li>Early bird ticket releases</li>
                <li>Networking events and workshops</li>
                <li>Python community news in Senegambia</li>
              </ul>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="https://pyconsenegambia.org" 
                   style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                  Visit Our Website
                </a>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #333; margin-top: 0;">Stay Connected</h3>
                <p style="font-size: 14px; color: #666; margin: 10px 0;">
                  Follow us on social media for real-time updates:
                </p>
                <div style="text-align: center;">
                  <a href="https://x.com/PyconSenegambia" style="color: #1da1f2; text-decoration: none; margin: 0 10px;">Twitter</a>
                  <a href="https://www.linkedin.com/company/pycon-senegambia" style="color: #0077b5; text-decoration: none; margin: 0 10px;">LinkedIn</a>
                  <a href="https://www.instagram.com/pyconsenegambia/" style="color: #e4405f; text-decoration: none; margin: 0 10px;">Instagram</a>
                </div>
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #666; margin: 0;">
                You received this email because you subscribed to PyConSeneGambia newsletter.
                <br>
                <a href="${unsubscribeUrl}" style="color: #666; text-decoration: underline;">
                  Unsubscribe from this list
                </a>
              </p>
            </div>
          </div>
        `,
        text: `
Welcome to PyConSeneGambia Newsletter!

Hi ${name || 'there'},

Thank you for subscribing to the PyConSeneGambia newsletter!

You'll be the first to know about:
- Conference updates and announcements
- Speaker reveals and session details
- Early bird ticket releases
- Networking events and workshops
- Python community news in Senegambia

Visit our website: https://pyconsenegambia.org

Stay Connected:
Follow us on social media for real-time updates:
- Twitter: https://x.com/PyconSenegambia
- LinkedIn: https://www.linkedin.com/company/pycon-senegambia
- Instagram: https://www.instagram.com/pyconsenegambia/

You received this email because you subscribed to PyConSeneGambia newsletter.
Unsubscribe: ${unsubscribeUrl}
        `
      });
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      contact_id: contactResult.data?.id
    });

  } catch (error) {
    return NextResponse.json(
      { error: `Failed to process subscription ${error}` },
      { status: 500 }
    );
  }
}