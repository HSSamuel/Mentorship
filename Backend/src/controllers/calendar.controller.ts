import { Request, Response } from "express";
import {
  generateAuthUrl,
  getTokensFromCode,
} from "../services/calendar.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserId = (req: Request): string | null => {
  if (!req.user || !("userId" in req.user)) return null;
  return req.user.userId as string;
};

/**
 * Redirects the user to the Google consent screen.
 */
export const googleAuth = (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ message: "Authentication error" });
  }
  const url = generateAuthUrl(userId);
  res.redirect(url);
};

/**
 * Handles the callback from Google after user grants permission.
 */
export const googleAuthCallback = async (req: Request, res: Response) => {
  const { code, state } = req.query;
  const userId = state as string; // The userId we passed in the state

  if (!code) {
    return res
      .status(400)
      .send("Error: Google did not return an authorization code.");
  }

  try {
    const tokens = await getTokensFromCode(code as string);

    // Securely store the tokens in the database for the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
      },
    });

    // Redirect user to a success page or their profile settings
    res.redirect(`${process.env.FRONTEND_URL}/profile/edit?calendar=success`);
  } catch (error) {
    console.error("Error getting Google Calendar tokens:", error);
    res.status(500).send("Failed to authenticate with Google Calendar.");
  }
};
