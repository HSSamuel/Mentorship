import { User as PrismaUser } from "@prisma/client";

// Define the shape of the user object from our JWT
type JwtUser = {
  userId: string;
  role: string;
};

// Extend the Express Request interface
declare global {
  namespace Express {
    export interface Request {
      user?: JwtUser | PrismaUser;
    }
  }
}
