import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserId = (req: Request): string | null => {
  if (!req.user || !("userId" in req.user)) return null;
  return req.user.userId as string;
};

// GET goals for a specific mentorship
export const getGoalsForMentorship = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { mentorshipId } = req.params;

  try {
    const mentorship = await prisma.mentorshipRequest.findFirst({
      where: {
        id: mentorshipId,
        OR: [{ menteeId: userId }, { mentorId: userId }],
      },
    });

    if (!mentorship) {
      return res
        .status(404)
        .json({ message: "Mentorship not found or access denied." });
    }

    const goals = await prisma.goal.findMany({
      where: { mentorshipRequestId: mentorshipId },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching goals." });
  }
};

// POST a new goal
export const createGoal = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { mentorshipRequestId, title, description } = req.body;

  try {
    const mentorship = await prisma.mentorshipRequest.findFirst({
      where: {
        id: mentorshipRequestId,
        menteeId: userId, // Only the mentee can create goals
      },
    });

    if (!mentorship) {
      return res
        .status(404)
        .json({ message: "Mentorship not found or you are not the mentee." });
    }

    const newGoal = await prisma.goal.create({
      data: { mentorshipRequestId, title, description },
    });

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: "Server error creating goal." });
  }
};

// PUT (update) a goal
export const updateGoal = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { goalId } = req.params;
  const { title, description, isCompleted } = req.body;

  try {
    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
      include: { mentorshipRequest: true },
    });

    if (!goal || goal.mentorshipRequest.menteeId !== userId) {
      return res
        .status(404)
        .json({ message: "Goal not found or you are not the mentee." });
    }

    const updatedGoal = await prisma.goal.update({
      where: { id: goalId },
      data: { title, description, isCompleted },
    });

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: "Server error updating goal." });
  }
};

// DELETE a goal
export const deleteGoal = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  const { goalId } = req.params;

  try {
    const goal = await prisma.goal.findUnique({
      where: { id: goalId },
      include: { mentorshipRequest: true },
    });

    if (!goal || goal.mentorshipRequest.menteeId !== userId) {
      return res
        .status(404)
        .json({ message: "Goal not found or you are not the mentee." });
    }

    await prisma.goal.delete({
      where: { id: goalId },
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: "Server error deleting goal." });
  }
};
