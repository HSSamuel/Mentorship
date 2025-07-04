import { User as PrismaUser } from "@prisma/client";

// Define a unified User type for the request
interface RequestUser extends PrismaUser {
  userId: string;
  role: "ADMIN" | "MENTOR" | "MENTEE";
}

// Extend the Express Request interface
declare global {
  namespace Express {
    export interface Request {
      user?: RequestUser;
    }
  }
}
