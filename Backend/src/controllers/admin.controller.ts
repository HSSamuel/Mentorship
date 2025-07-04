import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

// GET /admin/users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { profile: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users." });
  }
};

// PUT /admin/users/:id/role
export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role: role as Role },
    });
    const { password, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Error updating user role." });
  }
};

// GET /admin/matches
export const getAllMatches = async (req: Request, res: Response) => {
  try {
    const matches = await prisma.mentorshipRequest.findMany({
      include: {
        mentor: { select: { profile: true } },
        mentee: { select: { profile: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches." });
  }
};

// GET /admin/sessions
export const getAllSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        mentor: { select: { profile: true } },
        mentee: { select: { profile: true } },
      },
      orderBy: { date: "desc" },
    });
    const totalCount = await prisma.session.count();
    res.status(200).json({ totalCount, sessions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching sessions." });
  }
};

export const assignMentor = async (req: Request, res: Response) => {
  const { menteeId, mentorId } = req.body;

  if (!menteeId || !mentorId) {
    res.status(400).json({ message: "Mentee ID and Mentor ID are required" });
    return;
  }

  try {
    const newRequest = await prisma.mentorshipRequest.create({
      data: {
        menteeId,
        mentorId,
        status: "ACCEPTED",
      },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error while creating request" });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalMatches = await prisma.mentorshipRequest.count({
      where: { status: "ACCEPTED" },
    });
    const totalSessions = await prisma.session.count();

    res.status(200).json({ totalUsers, totalMatches, totalSessions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin stats." });
  }
};
