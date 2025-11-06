// /app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d"; // Token valid for 7 days

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
  };
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginRequest = await req.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
          error: "MISSING_CREDENTIALS"
        },
        { status: 400 }
      );
    }

    // Find staff by email
    const staff = await db.staff.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!staff) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
          error: "INVALID_CREDENTIALS"
        },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!staff.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been deactivated. Please contact admin.",
          error: "ACCOUNT_INACTIVE"
        },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, staff.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
          error: "INVALID_CREDENTIALS"
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        staffId: staff.id,
        email: staff.email,
        role: staff.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Update last login
    await db.staff.update({
      where: { id: staff.id },
      data: { lastLogin: new Date() }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: {
          token,
         
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred during login",
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}


// /app/api/auth/verify/route.ts
// Verify if token is still valid
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: "No token provided", error: "NO_TOKEN" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Check if staff still exists and is active
      const staff = await db.staff.findUnique({
        where: { id: decoded.staffId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isActive: true
        }
      });

      if (!staff || !staff.isActive) {
        return NextResponse.json(
          { success: false, message: "Invalid token", error: "INVALID_TOKEN" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Token is valid",
          data: { staff }
        },
        { status: 200 }
      );

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token", error: "TOKEN_EXPIRED" },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, message: "Server error", error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}