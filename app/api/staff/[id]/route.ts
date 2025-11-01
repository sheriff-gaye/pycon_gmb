// /app/api/admin/staff/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface UpdateStaffRequest {
  firstName?: string;
  lastName?: string;
  role?: "ADMIN" | "FRONTDESK" | "SECURITY";
  isActive?: boolean;
}

// GET Single Staff Member
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    
    const staff = await db.staff.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            checkedInTickets: true
          }
        }
      }
    });

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff member not found",
          error: "NOT_FOUND"
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Staff member retrieved successfully",
        data: { staff }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch staff member",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}

// UPDATE Staff Member
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const body: UpdateStaffRequest = await req.json();
    const { firstName, lastName, role, isActive } = body;

    // Check if staff exists
    const existingStaff = await db.staff.findUnique({
      where: { id }
    });

    if (!existingStaff) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff member not found",
          error: "NOT_FOUND"
        },
        { status: 404 }
      );
    }

    // Update staff
    const updatedStaff = await db.staff.update({
      where: { id },
      data: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(role && { role }),
        ...(isActive !== undefined && { isActive }),
        updatedAt: new Date()
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        updatedAt: true
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Staff member updated successfully",
        data: { staff: updatedStaff }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating staff:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update staff member",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}

// DELETE Staff Member
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    
    // Check if staff exists
    const existingStaff = await db.staff.findUnique({
      where: { id }
    });

    if (!existingStaff) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff member not found",
          error: "NOT_FOUND"
        },
        { status: 404 }
      );
    }

    // Soft delete by deactivating instead of hard delete
    await db.staff.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date()
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Staff member deactivated successfully"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error deleting staff:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete staff member",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}


// /app/api/admin/staff/[id]/reset-password/route.ts
// Reset password and send new credentials
function generateRandomPassword(length: number = 12): string {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

async function sendPasswordResetEmail(
  email: string,
  firstName: string,
  newPassword: string
): Promise<void> {
  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Reset - PyCon Senegambia</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f8fafc; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden;">
            <div style="background: #667eea; color: white; padding: 30px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">🔒 Password Reset</h1>
                <p style="margin: 10px 0 0 0;">PyCon Senegambia Staff Portal</p>
            </div>
            
            <div style="padding: 30px;">
                <h2 style="margin: 0 0 15px; color: #1e293b;">Hello ${firstName},</h2>
                
                <p>Your password has been reset by an administrator. Here is your new temporary password:</p>
                
                <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                    <h3 style="margin: 0 0 10px; color: #1e293b;">New Password</h3>
                    <code style="background: white; padding: 12px 16px; border-radius: 4px; display: inline-block; font-size: 18px; font-weight: bold;">${newPassword}</code>
                </div>

                <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 3px solid #f59e0b; margin: 20px 0;">
                    <p style="margin: 0; color: #92400e; font-size: 14px;">
                        <strong>⚠️ Security Reminder:</strong> Please change this password immediately after logging in. Never share your password with anyone.
                    </p>
                </div>

                <p style="color: #64748b; font-size: 13px; margin-top: 20px;">
                    If you didn't request this password reset, please contact admin immediately.
                </p>
            </div>

            <div style="background: #1e293b; color: white; padding: 15px; text-align: center; font-size: 12px;">
                <p style="margin: 0;"><strong>PyCon Senegambia 2025</strong></p>
            </div>
        </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: 'PyCon Senegambia <info@pyconsenegambia.org>',
    to: [email],
    subject: 'Password Reset - PyCon Senegambia Staff Portal',
    html: emailHTML
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    
    const staff = await db.staff.findUnique({
      where: { id }
    });

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Staff member not found",
          error: "NOT_FOUND"
        },
        { status: 404 }
      );
    }

    // Generate new password
    const newPassword = generateRandomPassword(12);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.staff.update({
      where: { id },
      data: {
        password: hashedPassword,
        updatedAt: new Date()
      }
    });

    // Send email with new password
    try {
      await sendPasswordResetEmail(staff.email, staff.firstName, newPassword);
    } catch (emailError) {
      console.error('Email failed:', emailError);
      return NextResponse.json(
        {
          success: true,
          message: "Password reset but email failed to send",
          data: { newPassword }, // Return so admin can share manually
          warning: "EMAIL_FAILED"
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Password reset successfully. Email sent to ${staff.email}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to reset password",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}