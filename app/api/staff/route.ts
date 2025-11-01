// /app/api/admin/staff/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CreateStaffRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "FRONTDESK" | "SECURITY";
}

// Generate random password
function generateRandomPassword(length: number = 12): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

// Send welcome email with credentials
async function sendWelcomeEmail(
  email: string,
  firstName: string,
  tempPassword: string
): Promise<void> {
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome to PyCon Senegambia Staff Portal</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
            <div style="background: #667eea; color: white; padding: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Welcome to the Team! 🎉</h1>
                <p style="margin: 10px 0 0 0;">PyCon Senegambia 2025 Staff Portal</p>
            </div>
            
            <div style="padding: 30px;">
                <h2 style="margin: 0 0 15px; color: #1e293b;">Hello ${firstName}!</h2>
                
                <p>You've been added as a staff member for PyCon Senegambia 2025. You can now access the mobile check-in app to verify and check in conference attendees.</p>
                
                <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                    <h3 style="margin: 0 0 15px; color: #1e293b;">📱 Your Login Credentials</h3>
                    <div style="margin: 10px 0;">
                        <strong style="color: #475569;">Email:</strong><br/>
                        <code style="background: white; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 5px;">${email}</code>
                    </div>
                    <div style="margin: 10px 0;">
                        <strong style="color: #475569;">Temporary Password:</strong><br/>
                        <code style="background: white; padding: 8px 12px; border-radius: 4px; display: inline-block; margin-top: 5px; font-size: 16px;">${tempPassword}</code>
                    </div>
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #92400e;">🔒 Important Security Notice</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 14px;">
                        <li>Keep this password secure and don't share it with anyone</li>
                        <li>We recommend changing your password after first login</li>
                        <li>Use the mobile app to log in with these credentials</li>
                        <li>If you didn't request this account, contact admin immediately</li>
                    </ul>
                </div>

                <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin: 0 0 10px; color: #1e293b;">📋 Next Steps</h4>
                    <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px;">
                        <li>Download the PyCon Senegambia Staff App</li>
                        <li>Log in using your credentials above</li>
                        <li>Familiarize yourself with the check-in process</li>
                        <li>Contact your supervisor for training if needed</li>
                    </ol>
                </div>

                <p style="color: #64748b; font-size: 13px; margin-top: 20px;">
                    Need help? Contact us at <a href="mailto:info@pyconsenegambia.org" style="color: #667eea;">info@pyconsenegambia.org</a>
                </p>
            </div>

            <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">
                    <strong>PyCon Senegambia 2025</strong><br/>
                    Staff Portal - Confidential
                </p>
            </div>
        </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: 'PyCon Senegambia <info@pyconsenegambia.org>',
      to: [email],
      subject: 'Welcome to PyCon Senegambia 2025 Staff Portal',
      html: emailHTML,
      text: `Hello ${firstName}!\n\nYou've been added as a staff member for PyCon Senegambia 2025.\n\nYour login credentials:\nEmail: ${email}\nTemporary Password: ${tempPassword}\n\nPlease keep these credentials secure and log in to the mobile app.\n\nPyCon Senegambia 2025`
    });
    console.log('✅ Welcome email sent to:', email);
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
    throw error;
  }
}

// CREATE Staff Member
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateStaffRequest = await req.json();
    const { email, firstName, lastName, role } = body;

    // Validate input
    if (!email || !firstName || !lastName || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
          error: "MISSING_FIELDS"
        },
        { status: 400 }
      );
    }

    // // Check if email already exists
    // const existingStaff = await db.staff.findUnique({
    //   where: { email: email.toLowerCase() }
    // });

    // if (existingStaff) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "A staff member with this email already exists",
    //       error: "EMAIL_EXISTS"
    //     },
    //     { status: 400 }
    //   );
    // }

    // Generate temporary password
    const tempPassword = generateRandomPassword(12);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Create staff member
    const staff = await db.staff.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        role,
        isActive: true
      }
    });

    // Send welcome email with credentials
    try {
      await sendWelcomeEmail(email, firstName, tempPassword);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the whole operation if email fails
      return NextResponse.json(
        {
          success: true,
          message: "Staff member created but email failed to send. Please share credentials manually.",
          data: {
            staff: {
              id: staff.id,
              email: staff.email,
              firstName: staff.firstName,
              lastName: staff.lastName,
              role: staff.role
            },
            tempPassword // Return password so admin can share manually
          },
          warning: "EMAIL_FAILED"
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Staff member created successfully. Welcome email sent to ${email}`,
        data: {
          staff: {
            id: staff.id,
            email: staff.email,
            firstName: staff.firstName,
            lastName: staff.lastName,
            role: staff.role,
            createdAt: staff.createdAt
          }
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating staff member:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create staff member",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}

// GET All Staff Members
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const isActive = searchParams.get('isActive');

    const where = isActive !== null ? { isActive: isActive === 'true' } : {};

    const staff = await db.staff.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        _count: {
          select: {
            checkedInTickets: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Staff members retrieved successfully",
        data: { staff, total: staff.length }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch staff members",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}