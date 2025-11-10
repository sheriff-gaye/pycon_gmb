// /app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth-check";

interface LogoutResponse {
  success: boolean;
  message: string;
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<LogoutResponse>> {
  try {
    // Authenticate request to verify token is valid
    const auth = await authenticateRequest(req);
    
    if (!auth.authenticated) {
      // Even if not authenticated, we can return success
      // since the goal is to log out anyway
      return NextResponse.json(
        {
          success: true,
          message: "Logged out successfully"
        },
        { status: 200 }
      );
    }

    // In a JWT-based system, logout is primarily client-side
    // The client should delete the token from storage
    // Here we can log the logout event or perform any cleanup

    console.log(`Staff ${auth.staff!.email} logged out at ${new Date().toISOString()}`);

    // Optional: If you want to track logout events, you could add a logout log table
    // or update the staff's lastLogout field

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Logout error:', error);
    
    // Even on error, we can return success for logout
    // since the client will delete the token anyway
    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully"
      },
      { status: 200 }
    );
  }
}

// Optional: GET endpoint to invalidate token
export async function GET(req: NextRequest): Promise<NextResponse<LogoutResponse>> {
  return POST(req);
}