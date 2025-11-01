import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface AuthenticatedStaff {
  staffId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

export async function authenticateRequest(
  req: NextRequest
): Promise<{ authenticated: boolean; staff?: AuthenticatedStaff; error?: string }> {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        authenticated: false,
        error: "NO_TOKEN"
      };
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      // Verify staff exists and is active
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
        return {
          authenticated: false,
          error: "INVALID_TOKEN"
        };
      }

      return {
        authenticated: true,
        staff: {
          staffId: staff.id,
          email: staff.email,
          role: staff.role,
          firstName: staff.firstName,
          lastName: staff.lastName
        }
      };

    } catch (jwtError) {
      return {
        authenticated: false,
        error: "TOKEN_EXPIRED"
      };
    }

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      authenticated: false,
      error: "AUTH_ERROR"
    };
  }
}
